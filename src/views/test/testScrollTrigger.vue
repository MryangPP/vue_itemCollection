<template>
  <div>
    <div style="height: 100vh; background-color: red"></div>
    <div class="bigBox">
      <div class="box1"></div>
      <div class="box2"></div>
    </div>
    <div style="height: 100vh; background-color: red"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // 确保动画在 DOM 渲染完成后执行
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.bigBox',
      start: 'top center', // 当 .bigBox 顶部到达视口中心时触发
      end: 'bottom center', // 当 .bigBox 底部到达视口中心时结束
      pin: true, // 固定容器位置
      scrub: true
    }
  })

  tl.to('.box1', {
    x: 200,
    duration: 1 // 增加动画持续时间
  })
  tl.to('.box2', {
    x: 400,
    duration: 1 // 增加动画持续时间
  })
})
</script>

<style scoped>
.bigBox {
  width: 100%;
  height: 60vh;
  /* background-color: blue; */
}
.box1 {
  width: 100px;
  height: 100px;
  background-color: red;
}
.box2 {
  width: 100px;
  height: 100px;
  background-color: yellow;
}
</style>
