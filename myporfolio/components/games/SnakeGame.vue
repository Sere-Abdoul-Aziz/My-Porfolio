<template>
  <div class="snake-game">
    <div class="mb-4 flex items-center justify-between">
      <div class="text-white">
        <div class="text-2xl font-bold">Score: {{ score }}</div>
        <div class="text-sm text-gray-400">Meilleur: {{ highScore }}</div>
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

    <canvas
      ref="canvas"
      width="600"
      height="600"
      class="border-4 border-purple-500 rounded-lg mx-auto bg-gray-800"
      @click="!gameStarted && startGame()"
    ></canvas>

    <div class="mt-4 text-center text-gray-300">
      <p class="mb-2">Utilisez les flèches ⬆️ ⬇️ ⬅️ ➡️ pour contrôler le serpent</p>
      <p class="text-sm text-gray-400">Mangez les pommes 🍎 sans vous mordre la queue !</p>
    </div>

    <div v-if="gameOver" class="mt-4 text-center">
      <div class="bg-red-500/20 border border-red-500 rounded-lg p-4">
        <p class="text-xl font-bold text-red-400">Game Over !</p>
        <p class="text-white">Score final: {{ score }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref(null)
let ctx = null
const gridSize = 20
const tileCount = 30

const snake = ref([{ x: 15, y: 15 }])
const direction = ref({ x: 0, y: 0 })
const food = ref({ x: 10, y: 10 })
const score = ref(0)
const highScore = ref(0)
const gameStarted = ref(false)
const gameOver = ref(false)
const paused = ref(false)

let gameLoop = null

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  highScore.value = parseInt(localStorage.getItem('snakeHighScore') || '0')
  drawGame()
  window.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
  if (gameLoop) clearInterval(gameLoop)
  window.removeEventListener('keydown', handleKeyPress)
})

function handleKeyPress(e) {
  if (!gameStarted.value || paused.value) return
  
  const key = e.key
  const currentDir = direction.value
  
  // Empêcher les demi-tours
  if (key === 'ArrowUp' && currentDir.y === 0) direction.value = { x: 0, y: -1 }
  if (key === 'ArrowDown' && currentDir.y === 0) direction.value = { x: 0, y: 1 }
  if (key === 'ArrowLeft' && currentDir.x === 0) direction.value = { x: -1, y: 0 }
  if (key === 'ArrowRight' && currentDir.x === 0) direction.value = { x: 1, y: 0 }
  
  e.preventDefault()
}

function startGame() {
  gameStarted.value = true
  gameOver.value = false
  paused.value = false
  snake.value = [{ x: 15, y: 15 }]
  direction.value = { x: 1, y: 0 }
  score.value = 0
  placeFood()
  
  if (gameLoop) clearInterval(gameLoop)
  gameLoop = setInterval(updateGame, 100)
}

function pauseGame() {
  paused.value = !paused.value
}

function resetGame() {
  if (gameLoop) clearInterval(gameLoop)
  gameStarted.value = false
  gameOver.value = false
  paused.value = false
  snake.value = [{ x: 15, y: 15 }]
  direction.value = { x: 0, y: 0 }
  score.value = 0
  drawGame()
}

function updateGame() {
  if (paused.value) return
  
  const head = { ...snake.value[0] }
  head.x += direction.value.x
  head.y += direction.value.y
  
  // Vérifier collision avec les murs
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    endGame()
    return
  }
  
  // Vérifier collision avec le corps
  if (snake.value.some(segment => segment.x === head.x && segment.y === head.y)) {
    endGame()
    return
  }
  
  snake.value.unshift(head)
  
  // Vérifier si on mange la nourriture
  if (head.x === food.value.x && head.y === food.value.y) {
    score.value += 10
    placeFood()
  } else {
    snake.value.pop()
  }
  
  drawGame()
}

function endGame() {
  gameOver.value = true
  gameStarted.value = false
  if (gameLoop) clearInterval(gameLoop)
  
  if (score.value > highScore.value) {
    highScore.value = score.value
    localStorage.setItem('snakeHighScore', score.value.toString())
  }
}

function placeFood() {
  let newFood
  do {
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    }
  } while (snake.value.some(segment => segment.x === newFood.x && segment.y === newFood.y))
  
  food.value = newFood
}

function drawGame() {
  if (!ctx) return
  
  // Fond
  ctx.fillStyle = '#1F2937'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  
  // Grille
  ctx.strokeStyle = '#374151'
  for (let i = 0; i <= tileCount; i++) {
    ctx.beginPath()
    ctx.moveTo(i * gridSize, 0)
    ctx.lineTo(i * gridSize, canvas.value.height)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(0, i * gridSize)
    ctx.lineTo(canvas.value.width, i * gridSize)
    ctx.stroke()
  }
  
  // Serpent
  snake.value.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? '#10B981' : '#34D399'
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2)
  })
  
  // Nourriture
  ctx.fillStyle = '#EF4444'
  ctx.beginPath()
  ctx.arc(
    food.value.x * gridSize + gridSize / 2,
    food.value.y * gridSize + gridSize / 2,
    gridSize / 2 - 2,
    0,
    Math.PI * 2
  )
  ctx.fill()
}
</script>
