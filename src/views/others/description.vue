<template>
  <div class="desktop">
    <div class="display">
      <div class="carouselContent">
        <el-carousel :autoplay="false" indicator-position="outside" arrow="never" trigger="click">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
  <div class="mobile" ref="hammerElement">
    <el-carousel
      ref="carouselRef_center"
      :autoplay="false"
      arrow="never"
      indicator-position="outside"
      trigger="click"
    >
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Hammer from 'hammerjs'
const carouselRef_center = ref(null)
const hammerElement = ref(null)
let hammerInstance = null

// 初始化Hammer实例
const initHammer = () => {
  hammerInstance = new Hammer(hammerElement.value)
  hammerInstance.on('swipeleft', () => {
    console.log('左滑动')
    // 执行左滑动后的操作
    carouselRef_center.value.next()
  })

  hammerInstance.on('swiperight', () => {
    console.log('右滑动')
    // 执行右滑动后的操作
    carouselRef_center.value.prev()
  })
}

// 当组件挂载时
onMounted(() => {
  if (hammerElement.value) {
    initHammer()
  }
})

// 当组件卸载前
onBeforeUnmount(() => {
  // 销毁Hammer实例
  if (hammerInstance) {
    hammerInstance.destroy()
  }
})
</script>
<style scoped>
* {
  box-sizing: border-box;
}

img {
  width: 100%;
  height: auto;
  vertical-align: top; /* 添加这一行 */
}
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.carouselContent {
  width: 1350px;
}
/* 走马灯下面的指示器样式 */
:deep(.el-carousel__indicator.is-active button) {
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  background-color: #1a2e3e;
  border-radius: 50%;
}
:deep(.el-carousel__button) {
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  background-color: transparent;
  border: 1px solid #1a2e3e;
  border-radius: 50%;
  opacity: 1;
}
:deep(.el-carousel__indicators--outside .el-carousel__indicator:hover button) {
  opacity: 1;
}
@media (max-width: 768px) {
  /* 手机端 */
  .desktop {
    display: none;
  }
}

@media (min-width: 769px) {
  /* 电脑端 */
  .mobile {
    display: none;
  }
}
</style>
