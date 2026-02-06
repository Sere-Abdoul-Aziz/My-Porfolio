<template>
  <div class="tetris-game">
    <div class="mb-4 flex items-center justify-between">
      <div class="text-white">
        <div class="text-2xl font-bold">Score: {{ score }}</div>
        <div class="text-sm text-gray-400">Niveau: {{ level }}</div>
        <div class="text-sm text-gray-400">Lignes: {{ lines }}</div>
      </div>
      <div class="flex gap-2">
        <button
          v-if="!gameStarted"
          @click="startGame"
          class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
        >
          Démarrer
        </button>
        <button
          v-else
          @click="pauseGame"
          class="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold"
        >
          {{ paused ? 'Reprendre' : 'Pause' }}
        </button>
        <button
          @click="resetGame"
          class="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>

    <div class="flex gap-4 justify-center">
      <canvas
        ref="canvas"
        width="300"
        height="600"
        class="border-4 border-purple-500 rounded-lg bg-gray-800"
      ></canvas>

      <div class="bg-gray-800 border-2 border-purple-500 rounded-lg p-4">
        <div class="text-white font-bold mb-2 text-center">Suivant</div>
        <canvas ref="nextCanvas" width="120" height="120" class="bg-gray-900 rounded"></canvas>
        
        <div class="mt-6 text-gray-300 text-sm">
          <p class="font-bold mb-2">Contrôles:</p>
          <p>← → : Déplacer</p>
          <p>↓ : Descendre</p>
          <p>↑ : Rotation</p>
          <p>Espace : Drop</p>
        </div>
      </div>
    </div>

    <div v-if="gameOver" class="mt-4 text-center">
      <div class="bg-red-500/20 border border-red-500 rounded-lg p-4">
        <p class="text-xl font-bold text-red-400">Game Over !</p>
        <p class="text-white">Score: {{ score }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref(null)
const nextCanvas = ref(null)
let ctx = null
let nextCtx = null

const COLS = 10
const ROWS = 20
const BLOCK_SIZE = 30
const COLORS = ['#00F0F0', '#F0F000', '#A000F0', '#00F000', '#F00000', '#0000F0', '#F0A000']

const SHAPES = [
  [[1,1,1,1]], // I
  [[1,1],[1,1]], // O
  [[0,1,0],[1,1,1]], // T
  [[1,0,0],[1,1,1]], // L
  [[0,0,1],[1,1,1]], // J
  [[0,1,1],[1,1,0]], // S
  [[1,1,0],[0,1,1]] // Z
]

const board = ref([])
const currentPiece = ref(null)
const nextPiece = ref(null)
const score = ref(0)
const level = ref(1)
const lines = ref(0)
const gameStarted = ref(false)
const gameOver = ref(false)
const paused = ref(false)

let gameLoop = null
let dropCounter = 0
let lastTime = 0

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  nextCtx = nextCanvas.value.getContext('2d')
  initBoard()
})

onBeforeUnmount(() => {
  if (gameLoop) cancelAnimationFrame(gameLoop)
  window.removeEventListener('keydown', handleKeyPress)
})

function initBoard() {
  board.value = Array(ROWS).fill(null).map(() => Array(COLS).fill(0))
}

function createPiece() {
  const shapeIndex = Math.floor(Math.random() * SHAPES.length)
  return {
    shape: SHAPES[shapeIndex],
    color: shapeIndex,
    x: Math.floor(COLS / 2) - 1,
    y: 0
  }
}

function startGame() {
  gameStarted.value = true
  gameOver.value = false
  paused.value = false
  score.value = 0
  level.value = 1
  lines.value = 0
  initBoard()
  currentPiece.value = createPiece()
  nextPiece.value = createPiece()
  
  window.addEventListener('keydown', handleKeyPress)
  lastTime = performance.now()
  update()
}

function handleKeyPress(e) {
  if (!gameStarted.value || paused.value || gameOver.value) return
  
  if (e.key === 'ArrowLeft') movePiece(-1)
  if (e.key === 'ArrowRight') movePiece(1)
  if (e.key === 'ArrowDown') dropPiece()
  if (e.key === 'ArrowUp') rotatePiece()
  if (e.key === ' ') hardDrop()
  
  e.preventDefault()
}

function movePiece(dir) {
  currentPiece.value.x += dir
  if (collision()) {
    currentPiece.value.x -= dir
  }
}

function dropPiece() {
  currentPiece.value.y++
  if (collision()) {
    currentPiece.value.y--
    merge()
    clearLines()
    currentPiece.value = nextPiece.value
    nextPiece.value = createPiece()
    
    if (collision()) {
      gameOver.value = true
      gameStarted.value = false
    }
  }
  dropCounter = 0
}

function hardDrop() {
  while (!collision()) {
    currentPiece.value.y++
  }
  currentPiece.value.y--
  dropPiece()
}

function rotatePiece() {
  const rotated = currentPiece.value.shape[0].map((_, i) =>
    currentPiece.value.shape.map(row => row[i]).reverse()
  )
  const prev = currentPiece.value.shape
  currentPiece.value.shape = rotated
  if (collision()) {
    currentPiece.value.shape = prev
  }
}

function collision() {
  for (let y = 0; y < currentPiece.value.shape.length; y++) {
    for (let x = 0; x < currentPiece.value.shape[y].length; x++) {
      if (currentPiece.value.shape[y][x]) {
        const newX = currentPiece.value.x + x
        const newY = currentPiece.value.y + y
        
        if (newX < 0 || newX >= COLS || newY >= ROWS) return true
        if (newY >= 0 && board.value[newY][newX]) return true
      }
    }
  }
  return false
}

function merge() {
  currentPiece.value.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        const newY = currentPiece.value.y + y
        const newX = currentPiece.value.x + x
        if (newY >= 0) {
          board.value[newY][newX] = currentPiece.value.color + 1
        }
      }
    })
  })
}

function clearLines() {
  let linesCleared = 0
  for (let y = ROWS - 1; y >= 0; y--) {
    if (board.value[y].every(cell => cell !== 0)) {
      board.value.splice(y, 1)
      board.value.unshift(Array(COLS).fill(0))
      linesCleared++
      y++
    }
  }
  
  if (linesCleared > 0) {
    lines.value += linesCleared
    score.value += [0, 100, 300, 500, 800][linesCleared] * level.value
    level.value = Math.floor(lines.value / 10) + 1
  }
}

function pauseGame() {
  paused.value = !paused.value
}

function resetGame() {
  if (gameLoop) cancelAnimationFrame(gameLoop)
  window.removeEventListener('keydown', handleKeyPress)
  gameStarted.value = false
  gameOver.value = false
  paused.value = false
  initBoard()
  draw()
}

function update(time = 0) {
  if (paused.value) {
    gameLoop = requestAnimationFrame(update)
    return
  }
  
  const deltaTime = time - lastTime
  lastTime = time
  dropCounter += deltaTime
  
  if (dropCounter > 1000 / level.value) {
    dropPiece()
  }
  
  draw()
  drawNext()
  gameLoop = requestAnimationFrame(update)
}

function draw() {
  if (!ctx) return
  
  ctx.fillStyle = '#1F2937'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  
  // Draw board
  board.value.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        ctx.fillStyle = COLORS[value - 1]
        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1)
      }
    })
  })
  
  // Draw current piece
  if (currentPiece.value) {
    ctx.fillStyle = COLORS[currentPiece.value.color]
    currentPiece.value.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          ctx.fillRect(
            (currentPiece.value.x + x) * BLOCK_SIZE,
            (currentPiece.value.y + y) * BLOCK_SIZE,
            BLOCK_SIZE - 1,
            BLOCK_SIZE - 1
          )
        }
      })
    })
  }
}

function drawNext() {
  if (!nextCtx || !nextPiece.value) return
  
  nextCtx.fillStyle = '#111827'
  nextCtx.fillRect(0, 0, 120, 120)
  
  const offsetX = (120 - nextPiece.value.shape[0].length * 25) / 2
  const offsetY = (120 - nextPiece.value.shape.length * 25) / 2
  
  nextCtx.fillStyle = COLORS[nextPiece.value.color]
  nextPiece.value.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        nextCtx.fillRect(
          offsetX + x * 25,
          offsetY + y * 25,
          24, 24
        )
      }
    })
  })
}
</script>
