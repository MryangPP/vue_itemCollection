<template>
  <div class="container-a">
    <!-- 左侧按钮：点击后小盒子向右移动 -->
    <button class="btn left" @click="moveRight">
      <el-icon><ArrowLeft /></el-icon>
    </button>

    <!-- 小盒子B -->
    <div class="container-b" :style="containerBStyle">
      <div v-for="(item, index) in boxes" :key="index" class="box-c">
        <div class="boxInfo_left">
          <img loading="lazy" :src="images[index]" alt="" />
        </div>
        <div class="boxInfo_right">
          <h1>{{ movies[index].title }}</h1>
          <p>{{ movies[index].editor }}</p>
          <p>{{ movies[index].description }}</p>
        </div>
      </div>
    </div>

    <!-- 右侧按钮：点击后小盒子向左移动 -->
    <button class="btn right" @click="moveLeft">
      <el-icon><ArrowRight /></el-icon>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
const isMobile = ref(false)
let screenWidth =
  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
console.log('Current screen width:', screenWidth)
if (screenWidth < 768) {
  console.log('Mobile')
  isMobile.value = true
} else {
  console.log('Desktop')
}
const images = ref([]) // 用于存储图片路径
// 动态加载图片路径
const imageModules = import.meta.glob('@/assets/Page-image/img_*.jpg')

async function loadImages() {
  // 获取所有图片路径的键
  const keys = Object.keys(imageModules)

  // 使用 Promise.all 来等待所有图片路径加载完成
  const imagePaths = await Promise.all(
    keys.map(async (key) => {
      const module = await imageModules[key]()
      return module.default
    })
  )
  // 赋值给 images
  images.value = imagePaths
}

onMounted(() => {
  loadImages()
})

// 模拟 7 个盒子 C
const boxes = Array.from({ length: 7 })

// 可视区域宽度：大盒子 A 的宽度
// 使用 80vw 转换成像素值（注意：此值在组件加载时计算一次）
// const containerWidth = document.documentElement.clientWidth * 0.8
let containerWidth = 1380
if (isMobile.value) {
  containerWidth = document.documentElement.clientWidth
}
// 每个盒子 C 的宽度在 CSS 中定义为：calc(100% / 3 - 5px)
// 在 containerWidth 内，每个盒子的实际宽度 = containerWidth/3 - 5
let boxWidth = containerWidth / 3 - 20
if (isMobile.value) {
  boxWidth = containerWidth
}
// 每个盒子右侧的外边距
let margin = 20
if (isMobile.value) {
  margin = 0
}
// 每个盒子占用的总宽度 = boxWidth + margin
let step = boxWidth + margin
if (isMobile.value) {
  step = boxWidth
}

// 小盒子 B 的总宽度：所有盒子占用的宽度之和，最后一个盒子不加右侧外边距
const totalWidth = boxes.length * step - margin

// 最大负偏移量 = -(总宽度 - 容器宽度)
const maxNegativeOffset = -(totalWidth - containerWidth)

const offset = ref(0)

// 点击右侧按钮：小盒子向左移动（offset 减少）
function moveLeft() {
  if (offset.value > maxNegativeOffset) {
    offset.value = Math.max(offset.value - step, maxNegativeOffset)
  }
}

// 点击左侧按钮：小盒子向右移动（offset 增加，最多到 0）
function moveRight() {
  if (offset.value < 0) {
    offset.value = Math.min(offset.value + step, 0)
  }
}

// 绑定小盒子B的内联样式，使用 transform 平移
const containerBStyle = computed(() => ({
  transform: `translateX(${offset.value}px)`,
  transition: 'transform 0.3s ease'
}))
const movies = ref([
  {
    title: 'Audio Science Review',
    editor: 'Amir',
    image: '@/assets/DMP-A6_image/prizeImg/prizeImg_1.png',
    description:
      'The DMP-A6 gives you a ton of functionality from streaming to gorgeous display. Performance is still provably transparent so I am not worried. Build quality seems excellent and would be fitting in products costing thousands of dollars...I am happy to add the Eversolo DMP-A6 to my recommended list.'
  },
  {
    title: 'AVForums',
    editor: 'Ed Selley',
    image: '@/assets/DMP-A6_image/prizeImg/prizeImg_2.png',
    description:
      "By any objective standard, the DMP-A6 is a formidable new arrival. It has excellent functionality, superb usability and it's extremely well made. It combines this with a sound quality that pretty much untouchable for under a grand to produce a truly outstanding all rounder."
  },
  {
    title: 'Darko Audio',
    editor: 'John Grandberg',
    image: '@/assets/DMP-A6_image/prizeImg/prizeImg_3.png',
    description:
      'In my view, the success lies not with its D/A conversion abilities (though that aspect certainly is formidable) but rather in the unique software experience, combined with the highly capable hardware platform and comparably reasonable price. While there are plenty of devices out there which accomplish (most of) the same tasks (on paper) I have yet to experience one that nails everything quite like Eversolo does.'
  },
  {
    title: 'Headfonia',
    editor: 'Felix',
    image: '@/assets/DMP-A6_image/prizeImg/prizeImg_4.png',
    description:
      'To me, the Eversolo is a unit that grabs your attention from start. It is like being at a concert in the first rows, where you can see your favorite band up close and in detail. The Eversolo is quite alluring in its entirety. It sounds lively and energetic, while engaging with you and keeping you at the tip of your feet.'
  },
  {
    title: 'Stereonet',
    editor: 'Craig Joyce',
    image: '@/assets/DMP-A6_image/prizeImg/prizeImg_5.png',
    description:
      "With the DMP-A6, Eversolo has created an amazing value product that's a great entry point into streamed, networked, hi-res digital audio."
  },
  {
    title: 'HiFi Pig',
    editor: 'Oscar Stewart',
    image: '@/assets/DMP-A6_image/prizeImg/prizeImg_6.png',
    description:
      'The DMP-A6 is simply superb value for money! Taking into account all the features, build quality, and sound it will be the perfect digital front-end for many people’s systems.'
  },
  {
    title: 'Steve Huff Photo & HiFi',
    editor: 'Amir',
    image: '@/assets/DMP-A6_image/prizeImg/prizeImg_7.png',
    description: 'Absolutely the BEST music streamer for the money! The sound quality blew my mind.'
  },
  {
    title: 'A British Audiophile',
    editor: 'Ed Selley',
    image: '@/assets/DMP-A6_image/prizeImg/prizeImg_7.png',
    description:
      "Eversolo DMP-A6 has been selling out like hotcakes I'm not surprised given the way that it is built and is reputed to sound. It is my Best Source Components of 2023!"
  }
])
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
img {
  width: 100%;
  height: auto;
  vertical-align: top; /* 添加这一行 */
}
.container-a {
  position: relative;
  width: 1380px; /* 改为80vw */
  overflow: hidden; /* 隐藏超出部分 */
  margin: 0px auto;
}

/* 小盒子B使用 flex 布局横向排列所有盒子C */
.container-b {
  display: flex;
}

/* 盒子C样式 */
.box-c {
  display: flex;
  width: calc(100% / 3 - 20px); /* 每个盒子的宽度 */
  flex-shrink: 0;
  margin-right: 20px; /* 右侧外边距 */
  background-color: #f0f0f0;
  border-radius: 20px;
  overflow: hidden;
}
.box-c:first-child {
  margin-left: 1px;
}
.boxInfo_left {
  width: 50%;
}
.boxInfo_right {
  width: 50%;
  padding: 0px 15px;
  padding-top: 15px;
}
.boxInfo_right h1 {
  margin-bottom: 5px;
  font-size: 18px;
}
.boxInfo_right p:nth-child(2) {
  color: #777;
  padding-bottom: 40px;
}
.boxInfo_right p:nth-child(3) {
  /* 多行文本溢出省略 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 8;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 按钮样式 */
.btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

/* 左侧按钮 */
.left {
  left: 15px;
}

/* 右侧按钮 */
.right {
  right: 35px;
}
@media (max-width: 768px) {
  /* 手机端 */
  .desktop {
    display: none;
  }
  .container-a {
    width: 100%;
  }
  .box-c {
    width: calc(100%); /* 每个盒子的宽度 */
    flex-shrink: 0;
    margin-right: 0px; /* 右侧外边距 */
  }
  .box-c:first-child {
    margin-left: 0px;
  }
}

@media (min-width: 769px) {
  /* 电脑端 */
  .mobile {
    display: none;
  }
}
</style>
