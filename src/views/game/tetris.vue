<template>
  <div class="tetris-container" :class="{ 'game-over': gameOver }">
    <div class="game-board" ref="gameBoard">
      <div v-for="(row, y) in board" :key="y" class="row">
        <div
          v-for="(cell, x) in row"
          :key="x"
          class="cell"
          :class="{
            filled: cell,
            [`color-${cell}`]: cell,
            'current-piece': isCurrentPiece(x, y),
            'ghost-piece': isGhostPiece(x, y)
          }"
        ></div>
      </div>

      <div class="overlay" v-if="gameOver || paused">
        <div class="overlay-content">
          <h2 v-if="gameOver">游戏结束!</h2>
          <h2 v-else>游戏暂停</h2>
          <p>得分: {{ score }}</p>
          <p>等级: {{ level }}</p>
          <p>行数: {{ lines }}</p>
          <button @click="startGame">开始游戏</button>
        </div>
      </div>
    </div>

    <div class="side-panel">
      <div class="next-piece">
        <h3>下一个方块</h3>
        <div class="next-piece-grid">
          <div v-for="(row, y) in nextPieceGrid" :key="'next' + y" class="row">
            <div
              v-for="(cell, x) in row"
              :key="'next' + x"
              class="cell"
              :class="{
                filled: cell,
                [`color-${cell}`]: cell
              }"
            ></div>
          </div>
        </div>
      </div>

      <div class="score-board">
        <div class="score-item">
          <span>得分:</span>
          <span>{{ score }}</span>
        </div>
        <div class="score-item">
          <span>等级:</span>
          <span>{{ level }}</span>
        </div>
        <div class="score-item">
          <span>行数:</span>
          <span>{{ lines }}</span>
        </div>
      </div>

      <div class="controls">
        <h3>操作说明</h3>
        <p>← → : 左右移动</p>
        <p>↑ : 旋转</p>
        <p>↓ : 加速下落</p>
        <p>空格 : 直接落下</p>
        <p>P : 暂停</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 游戏常量
const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const EMPTY_CELL = 0

// 方块形状和颜色
const SHAPES = [
  { shape: [[1, 1, 1, 1]], color: 1 }, // I
  {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 2
  }, // O
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: 3
  }, // T
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 4
  }, // S
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: 5
  }, // Z
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: 6
  }, // L
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: 7
  } // J
]

// 游戏状态
const board = ref(createEmptyBoard())
const currentPiece = ref(null)
const currentPosition = ref({ x: 0, y: 0 })
const nextPiece = ref(null)
const gameOver = ref(false)
const paused = ref(false)
const score = ref(0)
const level = ref(1)
const lines = ref(0)
const dropStart = ref(Date.now())
const gameSpeed = ref(1000)
const gameLoopId = ref(null)

// 创建空棋盘
function createEmptyBoard() {
  return Array(BOARD_HEIGHT)
    .fill()
    .map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL))
}

// 初始化游戏
function initGame() {
  board.value = createEmptyBoard()
  score.value = 0
  level.value = 1
  lines.value = 0
  gameSpeed.value = 1000
  gameOver.value = false
  paused.value = false
  nextPiece.value = getRandomPiece()
  spawnNewPiece()
}

// 开始游戏
function startGame() {
  if (gameLoopId.value) {
    cancelAnimationFrame(gameLoopId.value)
  }
  initGame()
  gameLoop()
}

// 生成新方块
function spawnNewPiece() {
  currentPiece.value = nextPiece.value
  nextPiece.value = getRandomPiece()
  currentPosition.value = {
    x: Math.floor(BOARD_WIDTH / 2) - Math.floor(currentPiece.value.shape[0].length / 2),
    y: 0
  }

  // 检查游戏是否结束
  if (checkCollision()) {
    gameOver.value = true
  }
}

// 获取随机方块
function getRandomPiece() {
  const randomIndex = Math.floor(Math.random() * SHAPES.length)
  return SHAPES[randomIndex]
}

// 检查碰撞
function checkCollision(offsetX = 0, offsetY = 0, piece = currentPiece.value) {
  const { x, y } = currentPosition.value

  for (let row = 0; row < piece.shape.length; row++) {
    for (let col = 0; col < piece.shape[row].length; col++) {
      if (piece.shape[row][col] !== 0) {
        const newX = x + col + offsetX
        const newY = y + row + offsetY

        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board.value[newY][newX] !== EMPTY_CELL)
        ) {
          return true
        }
      }
    }
  }
  return false
}

// 锁定方块到棋盘
function lockPiece() {
  const { x, y } = currentPosition.value

  currentPiece.value.shape.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell) {
        const boardY = y + rowIndex
        const boardX = x + colIndex
        if (boardY >= 0) {
          board.value[boardY][boardX] = currentPiece.value.color
        }
      }
    })
  })

  // 检查并清除完整的行
  checkLines()
  spawnNewPiece()
}

// 检查并清除完整的行
function checkLines() {
  let linesCleared = 0

  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (board.value[y].every(cell => cell !== EMPTY_CELL)) {
      // 移除该行
      board.value.splice(y, 1)
      // 在顶部添加新行
      board.value.unshift(Array(BOARD_WIDTH).fill(EMPTY_CELL))
      linesCleared++
      y++ // 重新检查当前行，因为上面的行下移了
    }
  }

  if (linesCleared > 0) {
    updateScore(linesCleared)
  }
}

// 更新分数
function updateScore(linesCleared) {
  const points = [0, 40, 100, 300, 1200] // 0, 1, 2, 3, 4 lines
  score.value += points[linesCleared] * level.value
  lines.value += linesCleared

  // 每清除10行升一级
  const newLevel = Math.floor(lines.value / 10) + 1
  if (newLevel > level.value) {
    level.value = newLevel
    // 提高游戏速度
    gameSpeed.value = Math.max(100, 1000 - (level.value - 1) * 100)
  }
}

// 旋转方块
function rotatePiece() {
  if (!currentPiece.value) return

  const newShape = currentPiece.value.shape[0].map((_, i) =>
    currentPiece.value.shape.map(row => row[i]).reverse()
  )

  const originalShape = currentPiece.value.shape
  currentPiece.value.shape = newShape

  // 检查旋转后是否碰撞，如果是则恢复
  if (checkCollision()) {
    currentPiece.value.shape = originalShape
  }
}

// 移动方块
function movePiece(direction) {
  if (gameOver.value || paused.value) return

  switch (direction) {
    case 'left':
      if (!checkCollision(-1, 0)) {
        currentPosition.value.x--
      }
      break
    case 'right':
      if (!checkCollision(1, 0)) {
        currentPosition.value.x++
      }
      break
    case 'down':
      if (!checkCollision(0, 1)) {
        currentPosition.value.y++
      } else {
        lockPiece()
      }
      dropStart.value = Date.now()
      break
    case 'drop':
      while (!checkCollision(0, 1)) {
        currentPosition.value.y++
      }
      lockPiece()
      dropStart.value = Date.now()
      break
  }
}

// 游戏主循环
function gameLoop() {
  const now = Date.now()
  const delta = now - dropStart.value

  if (delta > gameSpeed.value) {
    movePiece('down')
  }

  gameLoopId.value = requestAnimationFrame(gameLoop)
}

// 键盘控制
function handleKeyDown(e) {
  if (gameOver.value) {
    if (e.key === ' ') {
      startGame()
    }
    return
  }

  switch (e.key) {
    case 'ArrowLeft':
      movePiece('left')
      break
    case 'ArrowRight':
      movePiece('right')
      break
    case 'ArrowDown':
      movePiece('down')
      break
    case 'ArrowUp':
      rotatePiece()
      break
    case ' ':
      movePiece('drop')
      break
    case 'p':
    case 'P':
      paused.value = !paused.value
      if (paused.value) {
        cancelAnimationFrame(gameLoopId.value)
      } else {
        dropStart.value = Date.now()
        gameLoop()
      }
      break
  }
}

// 计算下一个方块的预览网格
const nextPieceGrid = computed(() => {
  const grid = Array(4)
    .fill()
    .map(() => Array(4).fill(0))
  if (!nextPiece.value) return grid

  const piece = nextPiece.value
  const offsetX = Math.floor((4 - piece.shape[0].length) / 2)
  const offsetY = Math.floor((4 - piece.shape.length) / 2)

  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        grid[y + offsetY][x + offsetX] = piece.color
      }
    })
  })

  return grid
})

// 检查是否是当前方块的一部分
function isCurrentPiece(x, y) {
  if (!currentPiece.value) return false

  const { shape } = currentPiece.value
  const pos = currentPosition.value

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] && pos.x + col === x && pos.y + row === y) {
        return true
      }
    }
  }
  return false
}

// 检查是否是幽灵方块（预测位置）
function isGhostPiece(x, y) {
  if (!currentPiece.value) return false

  // 计算方块能下落的最低位置
  let ghostY = currentPosition.value.y
  while (!checkCollision(0, ghostY - currentPosition.value.y + 1)) {
    ghostY++
  }

  const { shape } = currentPiece.value
  const posX = currentPosition.value.x

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (
        shape[row][col] &&
        posX + col === x &&
        ghostY + row === y &&
        ghostY !== currentPosition.value.y
      ) {
        return true
      }
    }
  }
  return false
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  // Initialize game but don't start automatically
  initGame()
  paused.value = true // Show start screen
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (gameLoopId.value) {
    cancelAnimationFrame(gameLoopId.value)
  }
})
</script>

<style scoped>
.tetris-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: white;
  font-family: 'Arial', sans-serif;
}

.game-board {
  position: relative;
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.5);
  border: 4px solid #333;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.row {
  display: flex;
}

.cell {
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.filled {
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2);
}

.current-piece {
  animation: pulse 0.5s infinite alternate;
  border: 2px solid white;
  box-sizing: border-box;
}

.ghost-piece {
  opacity: 0.3;
}

@keyframes pulse {
  from {
    opacity: 0.8;
  }
  to {
    opacity: 1;
  }
}

.color-1 {
  background-color: #00f0f0;
} /* I - 青色 */
.color-2 {
  background-color: #f0f000;
} /* O - 黄色 */
.color-3 {
  background-color: #a000f0;
} /* T - 紫色 */
.color-4 {
  background-color: #00f000;
} /* S - 绿色 */
.color-5 {
  background-color: #f00000;
} /* Z - 红色 */
.color-6 {
  background-color: #f0a000;
} /* L - 橙色 */
.color-7 {
  background-color: #0000f0;
} /* J - 蓝色 */

.side-panel {
  margin-left: 30px;
  width: 200px;
}

.next-piece {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.next-piece-grid {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.next-piece-grid .row {
  display: flex;
}

.next-piece-grid .cell {
  width: 25px;
  height: 25px;
}

.score-board {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.score-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 18px;
}

.controls {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 15px;
  border-radius: 8px;
}

.controls h3 {
  margin-top: 0;
}

.controls p {
  margin: 5px 0;
  font-size: 14px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.overlay-content {
  text-align: center;
}

.overlay-content button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.overlay-content button:hover {
  background-color: #45a049;
}

.game-over .cell {
  opacity: 0.5;
}
</style>
