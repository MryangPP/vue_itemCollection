<template>
  <div style="height: 120vh; background-color: red"></div>
  <div class="image-guide-container">
    <div class="image-guide-content">
      <div class="image-guide-layout">
        <!-- 左侧手机图片（固定位置） -->
        <div class="image-guide-phone-section">
          <div class="image-guide-phone-container">
            <div class="image-guide-phone-frame">
              <div class="image-guide-phone-screen">
                <!-- 手机屏幕图片 -->
                123
              </div>
              <!-- 手机顶部的刘海 -->
              <div class="image-guide-phone-notch"></div>
            </div>
          </div>
        </div>

        <!-- 右侧步骤说明（可滚动） -->
        <div class="image-guide-steps-section">
          <h1 class="image-guide-title">如何在钱包 App 中添加交通卡，看这里。</h1>

          <div
            v-for="(step, index) in steps"
            :key="index"
            class="image-guide-step-card"
            :id="`step-${index}`"
          >
            <div class="image-guide-step-header">
              <h3 class="image-guide-step-title">步骤 {{ step.number }}</h3>
            </div>
            <h2 class="image-guide-step-heading">{{ step.title }}</h2>
          </div>
        </div>
      </div>

      <div class="image-guide-footer">
        <a href="#" class="image-guide-link">
          查看如何在 iPhone 上添加新交通卡
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="image-guide-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
  <div style="height: 120vh; background-color: red"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let scrollTriggerInstance = null

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger)

// 手机屏幕图片数组
const phoneScreens = [
  '/placeholder.svg?height=600&width=300&text=步骤1',
  '/placeholder.svg?height=600&width=300&text=步骤2',
  '/placeholder.svg?height=600&width=300&text=步骤3'
]

// 步骤内容
const steps = [
  {
    number: 1,
    title: '打开 Apple 钱包 app，轻点' + '。'
  },
  {
    number: 2,
    title: '选择交通卡，并按照屏幕指示操作。'
  },
  {
    number: 3,
    title: '妥妥搞定。叮一声，就通行。'
  }
]
const setupAnimation = () => {
  // 清理旧的ScrollTrigger实例
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }

  scrollTriggerInstance = gsap.timeline({
    scrollTrigger: {
      trigger: '.image-guide-content',
      start: 'top', // 当 顶部到达视口中心时触发
      end: '+=200%', // 当底部到达视口中心时结束
      pin: true, // 固定容器位置
      scrub: true,
      // 滚动更新回调
      onUpdate: self => {
        // 根据滚动进度计算当前帧数
        // console.log(self.progress)
        const progress = self.progress // 0~1的进度值

        // 控制 <h1> 的显示和隐藏
        const step0 = document.getElementById('step-0')
        const step1 = document.getElementById('step-1')
        const step2 = document.getElementById('step-2')
        const phoneScreen = document.querySelector('.image-guide-phone-screen')
        if (progress < 0.3 && progress >= 0.1) {
          step0.classList.add('image-guide-step-card-active')
          phoneScreen.style.backgroundColor = 'blue'
        } else {
          step0.classList.remove('image-guide-step-card-active')
        }
        if (progress >= 0.4 && progress < 0.6) {
          step1.classList.add('image-guide-step-card-active')
          phoneScreen.style.backgroundColor = 'red'
        } else {
          step1.classList.remove('image-guide-step-card-active')
        }
        if (progress > 0.7 && progress < 0.9) {
          step2.classList.add('image-guide-step-card-active')
          phoneScreen.style.backgroundColor = 'yellow'
        } else {
          step2.classList.remove('image-guide-step-card-active')
        }
      }
    }
  })
}
onMounted(() => {
  setupAnimation()
})

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
    scrollTriggerInstance = null
  }
})
</script>

<style>
/* 重置容器本身及其所有子元素的 margin 和 padding */
.image-guide-container,
.image-guide-container * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.image-guide-container {
  background-color: #fff;
}

.image-guide-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 40px;
}

.image-guide-title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.image-guide-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

/* 手机部分 */
.image-guide-phone-section {
  position: relative;
}

.image-guide-phone-container {
  position: sticky;
  top: 100px;
  width: 300px;
  height: 600px;
  margin: 0 auto;
}

.image-guide-phone-frame {
  position: absolute;
  inset: 0;
  background-color: #000;
  border-radius: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.image-guide-phone-screen {
  position: absolute;
  inset: 8px;
  background-color: #fff;
  border-radius: 32px;
  overflow: hidden;
}

.image-guide-phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 33%;
  height: 24px;
  background-color: #000;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.image-guide-step-card {
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
.image-guide-step-card-active {
  border-left: 4px solid #3b82f6; /* 激活时的边框颜色 */
  background-color: #f0f9ff; /* 激活时的背景颜色 */
}
.image-guide-step-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.image-guide-step-title {
  font-size: 20px;
  font-weight: 600;
  color: #4b5563;
}

.image-guide-step-heading {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.image-guide-step-description {
  color: #6b7280;
  font-size: 16px;
  line-height: 1.6;
}

/* 页脚 */
.image-guide-footer {
  text-align: center;
  margin-top: 80px;
}

.image-guide-link {
  color: #3b82f6;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
}

.image-guide-link:hover {
  text-decoration: underline;
}

.image-guide-icon {
  height: 20px;
  width: 20px;
  margin-left: 6px;
}
</style>
