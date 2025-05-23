<template>
  <div>
    <div class="selectColorBox" @click="handleBoxClick">
      <div class="selectColor" :style="{ transform: `translateX(${translateX}px)` }">
        <span
          v-for="(item, index) in carouselList"
          :key="index"
          :class="{ active: activeIndex === index }"
          @click.stop="selectItem(index)"
        >
          {{ item }}
        </span>
      </div>
      <div class="click-area left" @click.stop="moveLeft"></div>
      <div class="click-area right" @click.stop="moveRight"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const carouselList = [
  '热情',
  '大师版',
  '只此青绿',
  '糖果之恋',
  '东方既白',
  '晨钟暮鼓',
  '星球',
  '火焰',
  '稻香'
]

const activeIndex = ref(0)
const translateX = ref(0)
const itemWidth = ref(0) // 每个span的宽度（包括margin）
const containerWidth = ref(0) // 容器宽度

// 计算中间位置
const centerPosition = computed(() => {
  return containerWidth.value / 2 - itemWidth.value / 2
})

// 初始化尺寸
const initSizes = () => {
  // 假设所有span宽度相同，取第一个
  const span = document.querySelector('.selectColor span')
  if (span) {
    const style = window.getComputedStyle(span)
    itemWidth.value = span.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight)
  }

  const container = document.querySelector('.selectColorBox')
  if (container) {
    containerWidth.value = container.offsetWidth
  }
}

// 选择项目
const selectItem = index => {
  activeIndex.value = index
  // 计算需要移动的位置，使选中项居中
  translateX.value = centerPosition.value - index * itemWidth.value
}

// 向左移动
const moveLeft = () => {
  if (activeIndex.value < carouselList.length - 1) {
    activeIndex.value += 1
    selectItem(activeIndex.value)
  }
}

// 向右移动
const moveRight = () => {
  if (activeIndex.value > 0) {
    activeIndex.value -= 1
    selectItem(activeIndex.value)
  }
}

// 处理容器点击（左右区域）
const handleBoxClick = event => {
  const box = event.currentTarget
  const clickX = event.clientX - box.getBoundingClientRect().left
  const boxCenter = box.offsetWidth / 2

  if (clickX < boxCenter) {
    moveRight()
  } else {
    moveLeft()
  }
}

onMounted(() => {
  initSizes()
  // 初始选中中间项
  const middleIndex = Math.floor(carouselList.length / 2)
  selectItem(middleIndex)

  // 窗口大小变化时重新计算
  window.addEventListener('resize', initSizes)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.selectColorBox {
  width: 60%;
  height: 60px;
  margin: 0 auto;
  background-color: #f60;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.selectColor {
  display: inline-block;
  white-space: nowrap;
  transition: transform 0.3s ease;
  height: 100%;
  line-height: 60px;
}

.selectColor span {
  margin: 0 20px;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.selectColor span.active {
  color: white;
  font-weight: bold;
  transform: scale(1.2);
}

.click-area {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  z-index: 1;
}

.click-area.left {
  left: 0;
}

.click-area.right {
  right: 0;
}
</style>
