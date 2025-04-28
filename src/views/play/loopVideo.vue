<template>
  <!-- 保持不变 -->
  <div class="containerLoop-music" ref="container">
    <div class="imagesBox" ref="imagesBox">
      <img v-for="(img, index) in images2" :key="index" :src="img" class="scrolling-image" />
    </div>
    <div class="imagesBox clone" ref="cloneBox">
      <img v-for="(img, index) in images2" :key="index" :src="img" class="scrolling-image" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images2 = ref([])
const imagesBox = ref(null)
const cloneBox = ref(null)
const container = ref(null)
let cleanupFn = null // 用于保存清理函数

// 提前注册生命周期钩子
onBeforeUnmount(() => {
  cleanupFn?.()
})

const imageModules = import.meta.glob('@/assets/icon/img_*.jpg')

async function loadImages() {
  const keys = Object.keys(imageModules)
  const imagePaths = await Promise.all(
    keys.map(async key => {
      const module = await imageModules[key]()
      return module.default
    })
  )
  images2.value = imagePaths
}

onMounted(async () => {
  await loadImages()
  await nextTick()

  if (imagesBox.value && container.value) {
    // 将清理函数保存到外部变量
    cleanupFn = setupInfiniteScroll()
  }
})

function setupInfiniteScroll() {
  // 创建清理函数集合
  const cleanupCallbacks = []

  const boxHeight = imagesBox.value.scrollHeight
  const containerHeight = container.value.clientHeight

  gsap.set(imagesBox.value, { y: 0 })
  gsap.set(cloneBox.value, { y: -boxHeight })

  // 计算动画持续时间（可根据需要调整速度）
  const duration = boxHeight / 200 // 200px每秒的速度
  console.log(duration)
  const allImages = [
    ...imagesBox.value.querySelectorAll('.scrolling-image'),
    ...cloneBox.value.querySelectorAll('.scrolling-image')
  ]

  let containerRect = container.value.getBoundingClientRect()
  let containerCenterY = containerRect.top + containerRect.height / 2

  // 窗口resize处理
  const onResize = () => {
    containerRect = container.value.getBoundingClientRect()
    containerCenterY = containerRect.top + containerRect.height / 2
  }
  window.addEventListener('resize', onResize)
  cleanupCallbacks.push(() => window.removeEventListener('resize', onResize))

  // 动画更新回调
  function updateImageEffects() {
    allImages.forEach(img => {
      const imgRect = img.getBoundingClientRect()
      const imgCenterY = imgRect.top + imgRect.height / 2
      const distance = Math.abs(imgCenterY - containerCenterY)
      const maxDistance = containerRect.height / 2

      let opacity = 1 - distance / maxDistance
      opacity = Math.max(0, Math.min(1, opacity))

      const scale = 1 + 0.4 * opacity

      gsap.set(img, {
        opacity: opacity,
        scale: scale
      })
    })
  }

  const tl = gsap.timeline({
    repeat: -1,
    onUpdate: updateImageEffects
  })

  tl.to([imagesBox.value, cloneBox.value], {
    y: `+=${boxHeight}`,
    duration: duration,
    ease: 'none',
    modifiers: {
      y: gsap.utils.unitize(y => parseFloat(y) % boxHeight)
    }
  })

  // 返回清理函数
  return () => {
    cleanupCallbacks.forEach(fn => fn())
    tl.kill()
  }
}
</script>

<style scoped>
/* 其他样式保持不变 */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.containerLoop-music {
  position: relative;
  width: 50%;
  height: 42vw;
  border: 2px solid #333;
  overflow: hidden;
  background: #f0f0f0;
}
/* 新增transform-origin */
.scrolling-image {
  transform-origin: center;
  opacity: 0; /* 初始透明度 */
}
.imagesBox img {
  /* width: 200px; */
  width: auto;
  height: 40px;
  margin: 80px 0;
}
.imagesBox {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 0;
  width: 100%;
}
</style>
