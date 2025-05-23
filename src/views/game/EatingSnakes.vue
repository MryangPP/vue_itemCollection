<template>
  <div class="game-container">
    <div class="score-board">
      <div class="score">得分: {{ score }}</div>
      <div class="high-score">最高分: {{ highScore }}</div>
      <button @click="startGame" class="start-btn" v-if="!isPlaying">
        {{ gameOver ? '重新开始' : '开始游戏' }}
      </button>
      <div class="level">速度: {{ speedLevel }}</div>
    </div>

    <div class="game-board" ref="gameBoard">
      <div
        v-for="(cell, index) in grid"
        :key="index"
        class="cell"
        :class="{
          'snake-body': cell.type === 'snake',
          'snake-head': cell.type === 'head',
          food: cell.type === 'food',
          'bonus-food': cell.type === 'bonus-food'
        }"
        :style="getCellStyle(cell)"
      ></div>
    </div>

    <div class="game-over" v-if="gameOver">
      <h2>游戏结束!</h2>
      <p>你的得分: {{ score }}</p>
    </div>

    <div class="controls">
      <div class="arrow-keys">
        <button @click="changeDirection('up')" class="arrow up">↑</button>
        <div>
          <button @click="changeDirection('left')" class="arrow left">←</button>
          <button @click="changeDirection('right')" class="arrow right">→</button>
        </div>
        <button @click="changeDirection('down')" class="arrow down">↓</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// 游戏配置
const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SPEED = 150
const SPEED_INCREMENT = 5

// 游戏状态
const grid = ref([])
const snake = ref([])
const direction = ref('right')
const nextDirection = ref('right')
const food = ref(null)
const bonusFood = ref(null)
const isPlaying = ref(false)
const gameOver = ref(false)
const score = ref(0)
const highScore = ref(0)
const speed = ref(INITIAL_SPEED)
const gameLoop = ref(null)
const lastBonusFoodTime = ref(0)
const bonusFoodActive = ref(false)

// 计算属性
const speedLevel = computed(() => {
  const levels = ['慢速', '中速', '快速', '极速']
  const speedRatio = (INITIAL_SPEED - speed.value) / (INITIAL_SPEED - SPEED_INCREMENT * 10)
  const levelIndex = Math.min(Math.floor(speedRatio * levels.length), levels.length - 1)
  return levels[levelIndex]
})

// 初始化游戏网格
const initGrid = () => {
  const newGrid = []
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      newGrid.push({ x, y, type: 'empty' })
    }
  }
  grid.value = newGrid
}

// 获取单元格样式
const getCellStyle = cell => {
  if (cell.type === 'snake' || cell.type === 'head') {
    const hue = (score.value * 5) % 360
    return { backgroundColor: `hsl(${hue}, 80%, 50%)` }
  } else if (cell.type === 'food') {
    return { backgroundColor: '#ff5252' }
  } else if (cell.type === 'bonus-food') {
    return {
      backgroundColor: '#ffeb3b',
      boxShadow: '0 0 10px #ffeb3b, 0 0 20px #ffeb3b'
    }
  }
  return {}
}

// 开始游戏
const startGame = () => {
  // 重置游戏状态
  snake.value = [
    { x: 5, y: 10 },
    { x: 4, y: 10 },
    { x: 3, y: 10 }
  ]
  direction.value = 'right'
  nextDirection.value = 'right'
  score.value = 0
  speed.value = INITIAL_SPEED
  isPlaying.value = true
  gameOver.value = false
  bonusFoodActive.value = false

  // 生成食物
  generateFood()

  // 开始游戏循环
  if (gameLoop.value) clearInterval(gameLoop.value)
  gameLoop.value = setInterval(moveSnake, speed.value)
}

// 生成食物
const generateFood = () => {
  const emptyCells = grid.value.filter(
    cell =>
      !snake.value.some(segment => segment.x === cell.x && segment.y === cell.y) &&
      (!food.value || food.value.x !== cell.x || food.value.y !== cell.y) &&
      (!bonusFood.value || bonusFood.value.x !== cell.x || bonusFood.value.y !== cell.y)
  )

  if (emptyCells.length > 0) {
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    food.value = { x: randomCell.x, y: randomCell.y }

    // 10%几率生成奖励食物
    if (
      Math.random() < 0.1 &&
      !bonusFoodActive.value &&
      Date.now() - lastBonusFoodTime.value > 10000
    ) {
      const bonusCells = emptyCells.filter(
        cell => cell.x !== randomCell.x || cell.y !== randomCell.y
      )
      if (bonusCells.length > 0) {
        const randomBonusCell = bonusCells[Math.floor(Math.random() * bonusCells.length)]
        bonusFood.value = { x: randomBonusCell.x, y: randomBonusCell.y }
        bonusFoodActive.value = true
        setTimeout(() => {
          bonusFood.value = null
          bonusFoodActive.value = false
          lastBonusFoodTime.value = Date.now()
        }, 5000) // 奖励食物存在5秒
      }
    }
  }
}

// 移动蛇
const moveSnake = () => {
  if (!isPlaying.value) return

  // 更新方向
  direction.value = nextDirection.value

  // 获取蛇头
  const head = { ...snake.value[0] }

  // 根据方向移动蛇头
  switch (direction.value) {
    case 'up':
      head.y -= 1
      break
    case 'down':
      head.y += 1
      break
    case 'left':
      head.x -= 1
      break
    case 'right':
      head.x += 1
      break
  }

  // 检查碰撞
  if (
    head.x < 0 ||
    head.x >= GRID_SIZE ||
    head.y < 0 ||
    head.y >= GRID_SIZE ||
    snake.value.some((segment, index) => index > 0 && segment.x === head.x && segment.y === head.y)
  ) {
    endGame()
    return
  }

  // 添加到蛇身前面
  snake.value.unshift(head)

  // 检查是否吃到食物
  if (food.value && head.x === food.value.x && head.y === food.value.y) {
    // 增加分数
    score.value += 10
    if (score.value > highScore.value) {
      highScore.value = score.value
    }

    // 每得100分增加速度
    if (score.value % 50 === 0 && speed.value > SPEED_INCREMENT * 2) {
      speed.value -= SPEED_INCREMENT
      clearInterval(gameLoop.value)
      gameLoop.value = setInterval(moveSnake, speed.value)
    }

    // 生成新食物
    generateFood()
  } else if (bonusFood.value && head.x === bonusFood.value.x && head.y === bonusFood.value.y) {
    // 吃到奖励食物
    score.value += 50
    if (score.value > highScore.value) {
      highScore.value = score.value
    }
    bonusFood.value = null
    bonusFoodActive.value = false
    lastBonusFoodTime.value = Date.now()
  } else {
    // 移除蛇尾
    snake.value.pop()
  }

  // 更新网格
  updateGrid()
}

// 更新网格状态
const updateGrid = () => {
  // 重置所有单元格
  grid.value.forEach(cell => {
    cell.type = 'empty'
  })

  // 设置蛇身
  snake.value.forEach((segment, index) => {
    const cellIndex = segment.y * GRID_SIZE + segment.x
    if (cellIndex >= 0 && cellIndex < grid.value.length) {
      grid.value[cellIndex].type = index === 0 ? 'head' : 'snake'
    }
  })

  // 设置食物
  if (food.value) {
    const foodIndex = food.value.y * GRID_SIZE + food.value.x
    if (foodIndex >= 0 && foodIndex < grid.value.length) {
      grid.value[foodIndex].type = 'food'
    }
  }

  // 设置奖励食物
  if (bonusFood.value) {
    const bonusFoodIndex = bonusFood.value.y * GRID_SIZE + bonusFood.value.x
    if (bonusFoodIndex >= 0 && bonusFoodIndex < grid.value.length) {
      grid.value[bonusFoodIndex].type = 'bonus-food'
    }
  }
}

// 改变方向
const changeDirection = newDirection => {
  // 防止180度转向
  if (
    (direction.value === 'up' && newDirection !== 'down') ||
    (direction.value === 'down' && newDirection !== 'up') ||
    (direction.value === 'left' && newDirection !== 'right') ||
    (direction.value === 'right' && newDirection !== 'left')
  ) {
    nextDirection.value = newDirection
  }
}

// 结束游戏
const endGame = () => {
  isPlaying.value = false
  gameOver.value = true
  clearInterval(gameLoop.value)
}

// 键盘控制
const handleKeyDown = e => {
  if (!isPlaying.value) return

  switch (e.key) {
    case 'ArrowUp':
      changeDirection('up')
      break
    case 'ArrowDown':
      changeDirection('down')
      break
    case 'ArrowLeft':
      changeDirection('left')
      break
    case 'ArrowRight':
      changeDirection('right')
      break
  }
}

// 生命周期钩子
onMounted(() => {
  initGrid()
  window.addEventListener('keydown', handleKeyDown)

  // 从本地存储加载最高分
  const savedHighScore = localStorage.getItem('snakeHighScore')
  if (savedHighScore) {
    highScore.value = parseInt(savedHighScore)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (gameLoop.value) clearInterval(gameLoop.value)
})

// 观察分数变化保存最高分
watch(highScore, newValue => {
  localStorage.setItem('snakeHighScore', newValue.toString())
})
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  background-color: #121212;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

.score-board {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
  background-color: #1e1e1e;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.score,
.high-score,
.level {
  font-size: 18px;
  font-weight: bold;
}

.score {
  color: #4caf50;
}

.high-score {
  color: #ff9800;
}

.level {
  color: #2196f3;
}

.start-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.start-btn:hover {
  background-color: #388e3c;
  transform: scale(1.05);
}

.game-board {
  display: grid;
  grid-template-columns: repeat(v-bind(GRID_SIZE), 1fr);
  grid-template-rows: repeat(v-bind(GRID_SIZE), 1fr);
  gap: 1px;
  width: calc(v-bind(GRID_SIZE) * v-bind(CELL_SIZE) * 1px);
  height: calc(v-bind(GRID_SIZE) * v-bind(CELL_SIZE) * 1px);
  background-color: #333;
  border: 2px solid #444;
  border-radius: 5px;
  overflow: hidden;
}

.cell {
  width: 100%;
  height: 100%;
  background-color: #222;
  transition: all 0.2s;
}

.snake-body {
  background-color: #4caf50;
  border-radius: 2px;
}

.snake-head {
  background-color: #2196f3;
  border-radius: 4px;
}

.food {
  background-color: #ff5252;
  border-radius: 50%;
  animation: pulse 0.5s infinite alternate;
}

.bonus-food {
  background-color: #ffeb3b;
  border-radius: 50%;
  animation:
    pulse 0.3s infinite alternate,
    glow 1s infinite alternate;
}

@keyframes pulse {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1.1);
  }
}

@keyframes glow {
  from {
    box-shadow:
      0 0 5px #ffeb3b,
      0 0 10px #ffeb3b;
  }
  to {
    box-shadow:
      0 0 15px #ffeb3b,
      0 0 30px #ffeb3b;
  }
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.9);
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  z-index: 10;
  border: 2px solid #ff5252;
}

.game-over h2 {
  color: #ff5252;
  margin-bottom: 15px;
}

.controls {
  margin-top: 20px;
}

.arrow-keys {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arrow {
  background-color: #333;
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  margin: 5px;
  border-radius: 8px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
}

.arrow:hover {
  background-color: #444;
  transform: scale(1.05);
}

.arrow:active {
  background-color: #555;
  transform: scale(0.95);
}

.arrow.up {
  margin-bottom: 0;
}

.arrow.down {
  margin-top: 0;
}

.arrow.left,
.arrow.right {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
