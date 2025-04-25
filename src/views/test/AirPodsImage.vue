<template>
  <!-- 红色占位区块，用于测试滚动 -->
  <div style="height: 200vh; background-color: red"></div>

  <!-- 主要动画容器 -->
  <div class="airpods-container">
    <div class="AirPodsImage">
      <!-- 使用Canvas渲染序列帧动画 -->
      <h1>你好eversolo</h1>
      <h1>你很好eversolo</h1>
      <canvas ref="canvasRef" class="scroll-canvas" />
    </div>
  </div>

  <!-- 固定位置的标题 -->
  <h1>霓虹</h1>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 注册GSAP滚动插件
gsap.registerPlugin(ScrollTrigger)

// Canvas相关引用
const canvasRef = ref(null) // Canvas DOM引用
const context = ref(null) // Canvas 2D上下文
const loadedImages = ref([]) // 图片缓存数组

// 动画配置常量
const IMG_COUNT = 64 // 总共64张序列帧图片
const CANVAS_CONFIG = {
  // Canvas分辨率配置
  width: 1440, // 匹配苹果官网原图尺寸
  height: 810
}

/**
 * 图片预加载函数
 * 采用分批次并行加载策略（每次加载5张）
 * 避免同时发起过多网络请求
 */
const preloadImages = async () => {
  // 单张图片加载Promise
  const loadImage = i =>
    new Promise(resolve => {
      const img = new Image()
      img.src = getImageUrl(i)
      // 图片加载完成后存入缓存数组
      img.onload = () => {
        loadedImages.value[i] = img
        resolve()
      }
    })

  // 分批次加载队列
  const preloadQueue = []
  for (let i = 1; i <= IMG_COUNT; i++) {
    preloadQueue.push(loadImage(i))
    // 每5张图片为一组进行并行加载
    if (preloadQueue.length >= 5) {
      await Promise.all(preloadQueue)
      preloadQueue.length = 0 // 清空当前批次
    }
  }
  // 加载剩余图片
  await Promise.all(preloadQueue)
}

/**
 * 生成图片URL
 * @param {number} index - 图片序号（1-64）
 * @returns {string} 完整图片URL
 * 使用苹果官网CDN地址，图片编号需要4位补零（如0001.jpg）
 */
const getImageUrl = index => {
  const paddedIndex = index.toString().padStart(4, '0')
  return `https://www.apple.com.cn/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/large/${paddedIndex}.png`
}

/**
 * 更新Canvas显示内容
 * @param {number} index - 要显示的图片序号（1-64）
 * 直接从缓存中获取已加载的图片
 */
const updateCanvasImage = index => {
  if (!context.value || index < 1 || index > IMG_COUNT) return

  const img = loadedImages.value[index]
  if (!img) {
    console.error('Image not found in cache:', index)
    return
  }

  // 清除画布并绘制缓存图片
  context.value.clearRect(0, 0, CANVAS_CONFIG.width, CANVAS_CONFIG.height)
  context.value.drawImage(img, 0, 0)
}

const setupAnimation = () => {
  // 创建时间轴动画
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.AirPodsImage', // 触发元素选择器
      start: 'top top', // 当容器顶部接触视口顶部时开始
      end: '+=500%', // 滚动500%容器高度后结束
      scrub: 1, // 1秒的滚动平滑过渡
      pin: true, // 固定容器位置
      anticipatePin: 1, // 预判固定位置（单位：秒）

      // 滚动更新回调
      onUpdate: self => {
        // 根据滚动进度计算当前帧数
        // console.log(self.progress)
        const progress = self.progress // 0~1的进度值
        const frameIndex = Math.min(IMG_COUNT - 1, Math.floor(progress * IMG_COUNT))
        // 直接使用缓存图片更新Canvas
        updateCanvasImage(frameIndex + 1)

        // 控制 <h1> 的显示和隐藏
        const h1First = document.querySelector('.AirPodsImage h1:nth-child(1)')
        const h1Second = document.querySelector('.AirPodsImage h1:nth-child(2)')
        if (progress < 0.2 && progress >= 0.01) {
          h1First.classList.add('active')
        } else {
          h1First.classList.remove('active')
        }
        if (progress >= 0.3 && progress < 0.5) {
          h1Second.classList.add('active')
        } else {
          h1Second.classList.remove('active')
        }
      }
    }
  })

  tl.to({}, { duration: 1 })
}

// 组件挂载生命周期
onMounted(async () => {
  // 初始化Canvas
  canvasRef.value.width = CANVAS_CONFIG.width
  canvasRef.value.height = CANVAS_CONFIG.height
  context.value = canvasRef.value.getContext('2d')

  // 预加载图片并显示第一帧
  await preloadImages()
  updateCanvasImage(1) // 直接使用缓存图片

  // 启动滚动动画
  setupAnimation()
})

// 组件卸载生命周期
onBeforeUnmount(() => {
  // 清理所有ScrollTrigger实例
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.airpods-container {
  width: 100%;
  background-color: #000;
}

/* Canvas样式设置 */
.scroll-canvas {
  position: sticky; /* 粘性定位实现视差效果 */
  top: 0; /* 固定顶部位置 */
  left: 0;
  width: 100%; /* 响应式宽度 */
  height: auto; /* 高度自动保持比例 */
  pointer-events: none; /* 禁用交互事件 */
}

/* 初始隐藏 h1 元素 */
.AirPodsImage h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2rem;
  opacity: 0;
  transition: all 0.5s linear;
}
.active {
  opacity: 1 !important;
  top: 48% !important;
}
</style>
