<template>
  <div style="height: 120vh; background-color: red"></div>
  <div class="container">
    <div class="content">
      <h1 class="title">如何在钱包 App 中添加交通卡，看这里。</h1>

      <div class="layout">
        <!-- 左侧手机图片（固定位置） -->
        <div class="phone-section">
          <div class="phone-container">
            <div class="phone-frame">
              <div class="phone-screen">
                <!-- 手机屏幕图片 -->
                <div
                  v-for="(screen, index) in phoneScreens"
                  :key="index"
                  class="phone-screen-image"
                  :id="`screen-${index}`"
                >
                  <img :src="screen" :alt="`步骤 ${index + 1} 屏幕`" />
                </div>
              </div>
              <!-- 手机顶部的刘海 -->
              <div class="phone-notch"></div>
            </div>
          </div>
        </div>

        <!-- 右侧步骤说明（可滚动） -->
        <div class="steps-section">
          <div class="spacer"></div>
          <!-- 顶部空间，用于滚动 -->

          <div v-for="(step, index) in steps" :key="index" class="step-card" :id="`step-${index}`">
            <div class="step-header">
              <div class="step-number">{{ step.number }}</div>
              <h3 class="step-title">步骤 {{ step.number }}</h3>
            </div>
            <h2 class="step-heading">{{ step.title }}</h2>
            <p class="step-description">{{ step.description }}</p>
          </div>

          <div class="spacer"></div>
          <!-- 底部空间，用于滚动 -->
        </div>
      </div>

      <div class="footer">
        <a href="#" class="link">
          查看如何在 iPhone 上添加新交通卡
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
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
    title: '打开 Apple 钱包 app，轻点' + '。',
    description: '在您的 iPhone 上找到并打开钱包应用程序，然后点击右上角的加号按钮。'
  },
  {
    number: 2,
    title: '选择交通卡，并按照屏幕指示操作。',
    description: '从可添加的卡片类型中，选择"交通卡"选项，然后按照屏幕上的指引继续。'
  },
  {
    number: 3,
    title: '妥妥搞定。叮一声，就通行。',
    description: '完成设置后，您可以在支持的交通系统中使用手机进行非接触式支付。'
  }
]

// 初始化GSAP动画
onMounted(() => {
  // 设置初始状态
  gsap.set('.phone-screen-image', { autoAlpha: 0, scale: 0.9 })
  gsap.set('#screen-0', { autoAlpha: 1, scale: 1 }) // 第一个屏幕默认显示

  // 为每个步骤创建ScrollTrigger
  steps.forEach((_, index) => {
    // 跳过第一个步骤的进入动画（因为它默认显示）
    if (index > 0) {
      // 当滚动到当前步骤时，显示对应的手机屏幕
      ScrollTrigger.create({
        trigger: `#step-${index}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => activateStep(index),
        onEnterBack: () => activateStep(index - 1),
        markers: false // 设置为true可以显示调试标记
      })
    }

    // 为每个步骤添加动画效果
    gsap
      .timeline({
        scrollTrigger: {
          trigger: `#step-${index}`,
          start: 'top bottom',
          end: 'center center',
          scrub: 0.5 // 平滑滚动效果
        }
      })
      .fromTo(`#step-${index}`, { y: 50, opacity: 0.5 }, { y: 0, opacity: 1, duration: 1 })
  })
})

// 激活特定步骤
function activateStep(index) {
  // 隐藏所有屏幕
  gsap.to('.phone-screen-image', {
    autoAlpha: 0,
    scale: 0.9,
    duration: 0.5,
    ease: 'power2.out'
  })

  // 显示当前步骤的屏幕
  gsap.to(`#screen-${index}`, {
    autoAlpha: 1,
    scale: 1,
    duration: 0.7,
    ease: 'power2.out'
  })

  // 更新步骤卡片样式
  gsap.to('.step-card', {
    backgroundColor: '#ffffff',
    borderLeftWidth: '0px',
    x: 0,
    duration: 0.3
  })

  gsap.to(`#step-${index}`, {
    backgroundColor: '#f5f5f5',
    borderLeftWidth: '4px',
    borderLeftColor: '#3b82f6',
    x: 8,
    duration: 0.3
  })

  // 更新步骤数字样式
  gsap.to('.step-number', {
    backgroundColor: '#9ca3af',
    duration: 0.3
  })

  gsap.to(`#step-${index} .step-number`, {
    backgroundColor: '#3b82f6',
    duration: 0.3
  })

  // 更新步骤标题样式
  gsap.to('.step-title', {
    color: '#4b5563',
    duration: 0.3
  })

  gsap.to(`#step-${index} .step-title`, {
    color: '#3b82f6',
    duration: 0.3
  })
}

// 清理函数
onUnmounted(() => {
  // 销毁所有ScrollTrigger实例
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style>
/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  color: #333;
  line-height: 1.5;
  overflow-x: hidden;
}

/* 容器和布局 */
.container {
  background-color: #fff;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 40px;
}

.title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 80px;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

/* 手机部分 */
.phone-section {
  position: relative;
}

.phone-container {
  position: sticky;
  top: 100px;
  width: 300px;
  height: 600px;
  margin: 0 auto;
}

.phone-frame {
  position: absolute;
  inset: 0;
  background-color: #000;
  border-radius: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.phone-screen {
  position: absolute;
  inset: 8px;
  background-color: #fff;
  border-radius: 32px;
  overflow: hidden;
}

.phone-screen-image {
  position: absolute;
  inset: 0;
  visibility: hidden; /* 由GSAP控制 */
  opacity: 0; /* 由GSAP控制 */
}

.phone-screen-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.phone-notch {
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

/* 步骤部分 */
.steps-section {
  padding: 20px 0;
}

.step-card {
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 10px; /* 增加步骤之间的间距，提供更多滚动空间 */
  background-color: #fff;
  border-left: 0px solid #3b82f6; /* 初始无边框，由GSAP控制 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.step-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  margin-right: 15px;
  background-color: #9ca3af;
}

.step-title {
  font-size: 20px;
  font-weight: 600;
  color: #4b5563;
}

.step-heading {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.step-description {
  color: #6b7280;
  font-size: 16px;
  line-height: 1.6;
}

/* 页脚 */
.footer {
  text-align: center;
  margin-top: 80px;
}

.link {
  color: #3b82f6;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

.icon {
  height: 20px;
  width: 20px;
  margin-left: 6px;
}
</style>
