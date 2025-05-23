<template>
  <div class="minesweeper-container">
    <div class="game-header">
      <h1>Vue3 炫酷扫雷</h1>
      <div class="difficulty-selector">
        <button
          v-for="level in difficultyLevels"
          :key="level.name"
          @click="startGame(level)"
          :class="{ active: currentDifficulty.name === level.name }"
        >
          {{ level.name }}
        </button>
      </div>
      <div class="game-info">
        <div class="mines-count">💣: {{ remainingMines }}</div>
        <div class="timer">⏱️: {{ formattedTime }}</div>
        <button @click="startGame(currentDifficulty)" class="reset-btn">😊</button>
      </div>
    </div>

    <div class="game-board" :style="boardStyle">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="cell"
          :class="{
            revealed: cell.revealed,
            flagged: cell.flagged,
            mine: cell.isMine && (gameOver || cell.revealed),
            exploded: cell.isMine && cell.revealed && gameOver,
            [`value-${cell.value}`]: cell.revealed && cell.value > 0
          }"
          @click.left="revealCell(rowIndex, colIndex)"
          @click.right.prevent="toggleFlag(rowIndex, colIndex)"
          @click.middle="chordClick(rowIndex, colIndex)"
        >
          <span v-if="cell.revealed && !cell.isMine && cell.value > 0">
            {{ cell.value }}
          </span>
          <span v-if="cell.flagged">🚩</span>
          <span v-if="cell.isMine && (gameOver || cell.revealed)">💣</span>
          <span v-if="cell.isMine && cell.revealed && gameOver" class="explosion">💥</span>
        </div>
      </div>
    </div>

    <div v-if="gameOver" class="game-over-modal">
      <div class="modal-content">
        <h2>{{ gameWon ? '🎉 你赢了! 🎉' : '💥 游戏结束! 💥' }}</h2>
        <p>用时: {{ formattedTime }}</p>
        <button @click="startGame(currentDifficulty)">再玩一次</button>
      </div>
    </div>

    <audio
      ref="revealSound"
      src="https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3"
    ></audio>
    <audio
      ref="flagSound"
      src="https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3"
    ></audio>
    <audio
      ref="explosionSound"
      src="https://assets.mixkit.co/sfx/preview/mixkit-explosion-impact-1684.mp3"
    ></audio>
    <audio
      ref="winSound"
      src="https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3"
    ></audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 难度级别配置
const difficultyLevels = [
  { name: '简单', rows: 9, cols: 9, mines: 10 },
  { name: '中等', rows: 16, cols: 16, mines: 40 },
  { name: '困难', rows: 16, cols: 30, mines: 99 }
]

// 游戏状态
const currentDifficulty = ref(difficultyLevels[0])
const board = ref([])
const gameOver = ref(false)
const gameWon = ref(false)
const firstClick = ref(true)
const startTime = ref(0)
const timer = ref(0)
const timerInterval = ref(null)

// 音效引用
const revealSound = ref(null)
const flagSound = ref(null)
const explosionSound = ref(null)
const winSound = ref(null)

// 计算属性
const remainingMines = computed(() => {
  const totalFlags = board.value.flat().filter(cell => cell.flagged).length
  return currentDifficulty.value.mines - totalFlags
})

const formattedTime = computed(() => {
  const minutes = Math.floor(timer.value / 60)
  const seconds = timer.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const boardStyle = computed(() => {
  return {
    '--cols': currentDifficulty.value.cols,
    '--rows': currentDifficulty.value.rows
  }
})

// 初始化游戏
const initBoard = () => {
  const { rows, cols } = currentDifficulty.value
  board.value = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      revealed: false,
      flagged: false,
      value: 0
    }))
  )
}

// 放置地雷
const placeMines = (firstRow, firstCol) => {
  const { rows, cols, mines } = currentDifficulty.value
  let minesPlaced = 0

  // 确保第一次点击的位置周围没有地雷
  const safeZone = []
  for (let r = Math.max(0, firstRow - 1); r <= Math.min(rows - 1, firstRow + 1); r++) {
    for (let c = Math.max(0, firstCol - 1); c <= Math.min(cols - 1, firstCol + 1); c++) {
      safeZone.push(`${r},${c}`)
    }
  }

  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows)
    const col = Math.floor(Math.random() * cols)

    // 检查是否已经在安全区域或已经是地雷
    if (!safeZone.includes(`${row},${col}`) && !board.value[row][col].isMine) {
      board.value[row][col].isMine = true
      minesPlaced++
    }
  }

  // 计算每个单元格周围的地雷数
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!board.value[row][col].isMine) {
        let count = 0
        for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
          for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
            if (board.value[r][c].isMine) count++
          }
        }
        board.value[row][col].value = count
      }
    }
  }
}

// 开始游戏
const startGame = difficulty => {
  currentDifficulty.value = difficulty
  gameOver.value = false
  gameWon.value = false
  firstClick.value = true
  timer.value = 0
  clearInterval(timerInterval.value)
  initBoard()
}

// 开始计时器
const startTimer = () => {
  startTime.value = Date.now()
  timerInterval.value = setInterval(() => {
    timer.value = Math.floor((Date.now() - startTime.value) / 1000)
  }, 1000)
}

// 揭示单元格
const revealCell = (row, col) => {
  if (gameOver.value || board.value[row][col].flagged) return

  // 第一次点击时放置地雷
  if (firstClick.value) {
    placeMines(row, col)
    firstClick.value = false
    startTimer()
  }

  const cell = board.value[row][col]

  if (cell.revealed) return

  cell.revealed = true
  playSound(revealSound.value)

  if (cell.isMine) {
    gameOver.value = true
    gameWon.value = false
    revealAllMines()
    playSound(explosionSound.value)
    clearInterval(timerInterval.value)
    return
  }

  // 如果是空白单元格，递归揭示周围的单元格
  if (cell.value === 0) {
    revealAdjacentCells(row, col)
  }

  checkWinCondition()
}

// 递归揭示相邻的空白单元格
const revealAdjacentCells = (row, col) => {
  const { rows, cols } = currentDifficulty.value

  for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
    for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
      if (!board.value[r][c].revealed && !board.value[r][c].flagged) {
        board.value[r][c].revealed = true
        if (board.value[r][c].value === 0) {
          revealAdjacentCells(r, c)
        }
      }
    }
  }
}

// 切换旗帜标记
const toggleFlag = (row, col) => {
  if (gameOver.value || board.value[row][col].revealed) return

  board.value[row][col].flagged = !board.value[row][col].flagged
  playSound(flagSound.value)
  checkWinCondition()
}

// 和弦点击（同时点击左右键）
const chordClick = (row, col) => {
  if (gameOver.value || !board.value[row][col].revealed) return

  const { rows, cols } = currentDifficulty.value
  let flagCount = 0

  // 计算周围旗帜数量
  for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
    for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
      if (board.value[r][c].flagged) flagCount++
    }
  }

  // 如果旗帜数量等于当前单元格的值，揭示周围未标记的单元格
  if (flagCount === board.value[row][col].value) {
    for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++)
        if (!board.value[r][c].flagged && !board.value[r][c].revealed) {
          revealCell(r, c)
        }
    }
  }
}

// 检查胜利条件
const checkWinCondition = () => {
  const { rows, cols, mines } = currentDifficulty.value
  let unrevealedSafeCells = 0

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!board.value[row][col].isMine && !board.value[row][col].revealed) {
        unrevealedSafeCells++
      }
    }
  }

  if (unrevealedSafeCells === 0) {
    gameOver.value = true
    gameWon.value = true
    clearInterval(timerInterval.value)
    playSound(winSound.value)
    flagAllMines()
  }
}

// 揭示所有地雷
const revealAllMines = () => {
  const { rows, cols } = currentDifficulty.value

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board.value[row][col].isMine) {
        board.value[row][col].revealed = true
      }
    }
  }
}

// 标记所有地雷
const flagAllMines = () => {
  const { rows, cols } = currentDifficulty.value

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board.value[row][col].isMine) {
        board.value[row][col].flagged = true
      }
    }
  }
}

// 播放音效
const playSound = audio => {
  if (audio) {
    audio.currentTime = 0
    audio.play().catch(e => console.log('Audio play failed:', e))
  }
}

// 生命周期钩子
onMounted(() => {
  startGame(currentDifficulty.value)
})

onUnmounted(() => {
  clearInterval(timerInterval.value)
})
</script>

<style scoped>
.minesweeper-container {
  font-family: 'Arial', sans-serif;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-header {
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
}

.difficulty-selector {
  margin: 15px 0;
}

.difficulty-selector button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 15px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.difficulty-selector button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.difficulty-selector button.active {
  background: rgba(255, 255, 255, 0.4);
  font-weight: bold;
}

.game-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 15px 0;
  font-size: 1.2em;
}

.reset-btn {
  font-size: 1.5em;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;
}

.reset-btn:hover {
  transform: rotate(360deg);
}

.game-board {
  display: grid;
  grid-template-rows: repeat(var(--rows), 30px);
  grid-template-columns: repeat(var(--cols), 30px);
  gap: 2px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.2);
  padding: 5px;
  border-radius: 5px;
}

.row {
  display: contents;
}

.cell {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
  font-weight: bold;
}

.cell:hover {
  background: rgba(255, 255, 255, 0.3);
}

.cell.revealed {
  background: rgba(255, 255, 255, 0.1);
}

.cell.flagged {
  background: rgba(255, 215, 0, 0.3);
}

.cell.mine {
  background: rgba(255, 0, 0, 0.3);
}

.cell.exploded {
  background: rgba(255, 0, 0, 0.7);
  animation: explode 0.5s;
}

@keyframes explode {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.explosion {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 数字颜色 */
.cell.value-1 {
  color: blue;
}
.cell.value-2 {
  color: green;
}
.cell.value-3 {
  color: red;
}
.cell.value-4 {
  color: darkblue;
}
.cell.value-5 {
  color: brown;
}
.cell.value-6 {
  color: teal;
}
.cell.value-7 {
  color: black;
}
.cell.value-8 {
  color: gray;
}

.game-over-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: linear-gradient(135deg, #1a2a6c, #b21f1f);
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  max-width: 80%;
  animation: modalAppear 0.5s;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-content button {
  background: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.modal-content button:hover {
  background: gold;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .game-board {
    grid-template-rows: repeat(var(--rows), 25px);
    grid-template-columns: repeat(var(--cols), 25px);
  }

  .cell {
    width: 25px;
    height: 25px;
    font-size: 0.8em;
  }
}
</style>
