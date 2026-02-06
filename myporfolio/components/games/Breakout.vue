<template>
  <div class="breakout-game">
    <div class="mb-4 flex items-center justify-between">
      <div class="text-white">
        <div class="text-2xl font-bold">Score: {{ score }}</div>
        <div class="text-sm text-gray-400">Vies: {{ lives }} ❤️</div>
        <div class="text-sm text-gray-400">Niveau: {{ level }}</div>
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
      height="500"
      class="border-4 border-purple-500 rounded-lg mx-auto bg-gray-800 cursor-none"
      @mousemove="handleMouseMove"
      @click="!gameStarted && startGame()"
    ></canvas>

    <div class="mt-4 text-center text-gray-300">
      <p>Déplacez la souris pour contrôler la raquette</p>
      <p class="text-sm text-gray-400">Cassez toutes les briques pour passer au niveau suivant !</p>
    </div>

    <div v-if="gameOver" class="mt-4 text-center">
      <div class="bg-red-500/20 border border-red-500 rounded-lg p-4">
        <p class="text-xl font-bold text-red-400">Game Over !</p>
        <p class="text-white">Score final: {{ score }}</p>
      </div>
    </div>

    <div v-if="levelComplete" class="mt-4 text-center">
      <div class="bg-green-500/20 border border-green-500 rounded-lg p-4">
        <p class="text-xl font-bold text-green-400">Niveau terminé ! 🎉</p>
        <button
          @click="nextLevel"
          class="mt-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
        >
          Niveau suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref(null)
let ctx = null

const paddle = ref({ x: 250, y: 450, width: 100, height: 10, speed: 8 })
const ball = ref({ x: 300, y: 300, dx: 3, dy: -3, radius: 8 })
const bricks = ref([])
const score = ref(0)
const lives = ref(3)
const level = ref(1)
const gameStarted = ref(false)
const gameOver = ref(false)
const paused = ref(false)
const levelComplete = ref(false)

const brickRowCount = 5
const brickColumnCount = 8
const brickWidth = 70
const brickHeight = 20
const brickPadding = 5
const brickOffsetTop = 30
const brickOffsetLeft = 15

let gameLoop = null

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  initBricks()
  draw()
})

onBeforeUnmount(() => {
  if (gameLoop) cancelAnimationFrame(gameLoop)
})

function initBricks() {
  bricks.value = []
  const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6']
  
  for (let c = 0; c < brickColumnCount; c++) {
    bricks.value[c] = []
    for (let r = 0; r < brickRowCount; r++) {
      bricks.value[c][r] = {
        x: c * (brickWidth + brickPadding) + brickOffsetLeft,
        y: r * (brickHeight + brickPadding) + brickOffsetTop,
        status: 1,
        color: colors[r]
      }
    }
  }
}

function handleMouseMove(e) {
  if (!gameStarted.value || paused.value) return
  
  const rect = canvas.value.getBoundingClientRect()
  const mouseX = e.clientX - rect.left
  paddle.value.x = mouseX - paddle.value.width / 2
  
  if (paddle.value.x < 0) paddle.value.x = 0
  if (paddle.value.x + paddle.value.width > canvas.value.width) {
    paddle.value.x = canvas.value.width - paddle.value.width
  }
}

function startGame() {
  gameStarted.value = true
  gameOver.value = false
  paused.value = false
  levelComplete.value = false
  update()
}

function pauseGame() {
  paused.value = !paused.value
  if (!paused.value) update()
}

function resetGame() {
  if (gameLoop) cancelAnimationFrame(gameLoop)
  gameStarted.value = false
  gameOver.value = false
  paused.value = false
  levelComplete.value = false
  score.value = 0
  lives.value = 3
  level.value = 1
  ball.value = { x: 300, y: 300, dx: 3, dy: -3, radius: 8 }
  paddle.value.x = 250
  initBricks()
  draw()
}

function nextLevel() {
  level.value++
  levelComplete.value = false
  ball.value = { 
    x: 300, 
    y: 300, 
    dx: 3 + level.value * 0.5, 
    dy: -(3 + level.value * 0.5), 
    radius: 8 
  }
  paddle.value.x = 250
  initBricks()
  update()
}

function update() {
  if (paused.value || gameOver.value || levelComplete.value) return
  
  // Move ball
  ball.value.x += ball.value.dx
  ball.value.y += ball.value.dy
  
  // Wall collision
  if (ball.value.x + ball.value.dx > canvas.value.width - ball.value.radius || 
      ball.value.x + ball.value.dx < ball.value.radius) {
    ball.value.dx = -ball.value.dx
  }
  
  if (ball.value.y + ball.value.dy < ball.value.radius) {
    ball.value.dy = -ball.value.dy
  }
  
  // Paddle collision
  if (ball.value.y + ball.value.dy > paddle.value.y - ball.value.radius) {
    if (ball.value.x > paddle.value.x && ball.value.x < paddle.value.x + paddle.value.width) {
      ball.value.dy = -ball.value.dy
      // Angle de rebond basé sur la position sur la raquette
      const hitPos = (ball.value.x - paddle.value.x) / paddle.value.width
      ball.value.dx = (hitPos - 0.5) * 8
    } else if (ball.value.y > canvas.value.height) {
      lives.value--
      if (lives.value === 0) {
        gameOver.value = true
        gameStarted.value = false
      } else {
        ball.value.x = 300
        ball.value.y = 300
        ball.value.dx = 3 + level.value * 0.5
        ball.value.dy = -(3 + level.value * 0.5)
      }
    }
  }
  
  // Brick collision
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks.value[c][r]
      if (b.status === 1) {
        if (ball.value.x > b.x && ball.value.x < b.x + brickWidth &&
            ball.value.y > b.y && ball.value.y < b.y + brickHeight) {
          ball.value.dy = -ball.value.dy
          b.status = 0
          score.value += 10 * level.value
          
          // Check win
          if (bricks.value.every(col => col.every(brick => brick.status === 0))) {
            levelComplete.value = true
            gameStarted.value = false
          }
        }
      }
    }
  }
  
  draw()
  gameLoop = requestAnimationFrame(update)
}

function draw() {
  if (!ctx) return
  
  // Clear
  ctx.fillStyle = '#1F2937'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  
  // Draw bricks
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks.value[c][r]
      if (b.status === 1) {
        ctx.fillStyle = b.color
        ctx.fillRect(b.x, b.y, brickWidth, brickHeight)
        ctx.strokeStyle = '#1F2937'
        ctx.strokeRect(b.x, b.y, brickWidth, brickHeight)
      }
    }
  }
  
  // Draw paddle
  ctx.fillStyle = '#10B981'
  ctx.fillRect(paddle.value.x, paddle.value.y, paddle.value.width, paddle.value.height)
  
  // Draw ball
  ctx.beginPath()
  ctx.arc(ball.value.x, ball.value.y, ball.value.radius, 0, Math.PI * 2)
  ctx.fillStyle = '#F59E0B'
  ctx.fill()
  ctx.closePath()
}
</script>
