<template>
  <div class="animation-container">
    <img
      v-for="(img, index) in images"
      :key="index"
      :src="img"
      class="animated-logo"
      :style="{
        'animation-delay': `${index * 1.5}s`
      }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
const isAnimating = ref(true)
const container = ref(null)
// 图片数据（示例）
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
onMounted(async () => {
  await loadImages()
  await nextTick()
})
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
  animation: logoScroll 3s linear infinite;
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
</style>
