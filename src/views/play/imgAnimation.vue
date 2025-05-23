<template>
  <div class="animation-container" ref="container">
    <img
      v-for="(img, index) in images"
      :key="index"
      :src="img"
      class="animated-logo"
      :style="{
        'animation-delay': `${index * 1}s`,
        'animation-play-state': isAnimating ? 'running' : 'paused'
      }"
      @animationend="handleAnimationEnd(index)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
onMounted(async () => {
  await loadImages()
  await nextTick()
})
// 品牌logo循环动画
const isAnimating = ref(true)
const container = ref(null)
const images = ref([])
const imageModules = import.meta.glob('@/assets/icon/img_*.jpg')
async function loadImages() {
  const keys = Object.keys(imageModules)
  const imagePaths = await Promise.all(
    keys.map(async key => {
      const module = await imageModules[key]()
      return module.default
    })
  )
  images.value = imagePaths
}
// 动画结束时处理
const handleAnimationEnd = index => {
  if (index === images.value.length - 1) {
    // 最后一个动画结束时，重置所有图片位置
    isAnimating.value = false
    setTimeout(() => {
      const logos = document.querySelectorAll('.animated-logo')
      logos.forEach(logo => {
        logo.style.animation = 'none'
        logo.offsetHeight // 触发重绘
        logo.style.animation = ''
      })
      isAnimating.value = true
    }, 100) // 短暂延迟确保重置生效
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
img {
  width: auto;
  height: 100px;
}
.animation-container {
  position: relative;
  height: 500px;
  width: 50%;
  overflow: hidden;
  border: 1px solid #ccc;
}

.animated-logo {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: logoScroll 3s linear;
}

@keyframes logoScroll {
  0% {
    top: 0;
    transform: translateX(-50%) translateY(-100%) scale(1);
    opacity: 0;
  }
  50% {
    top: 50%;
    transform: translateX(-50%) translateY(-50%) scale(1.2);
    opacity: 1;
  }
  100% {
    top: 100%;
    transform: translateX(-50%) translateY(0%) scale(1);
    opacity: 0;
  }
}
@media (max-width: 768px) {
  /* 手机端 */
  .desktop {
    display: none;
  }
  .animation-container {
    width: 100%;
  }
}

@media (min-width: 769px) {
  /* 电脑端 */
  .mobile {
    display: none;
  }
}
</style>
