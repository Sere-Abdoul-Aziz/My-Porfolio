<template>
  <div class="doodle-jump">
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
          @click="resetGame"
          class="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>

    <canvas
      ref="canvas"
      width="400"
      height="600"
      class="border-4 border-purple-500 rounded-lg mx-auto bg-gradient-to-b from-sky-300 to-sky-100"
      @mousemove="handleMouseMove"
      @click="!gameStarted && startGame()"
    ></canvas>

    <div class="mt-4 text-center text-gray-300">
      <p class="mb-2">Déplacez la souris pour contrôler le personnage</p>
      <p class="text-sm text-gray-400">Sautez sur les plateformes ! ⬆️</p>
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

const player = ref({
  x: 200,
  y: 400,
  width: 50,
  height: 50,
  velocityY: 0,
  velocityX: 0,
  jumping: true
})

const platforms = ref([])
const score = ref(0)
const highScore = ref(0)
const gameStarted = ref(false)
const gameOver = ref(false)

const gravity = 0.6
const jumpStrength = -15
const platformWidth = 80
const platformHeight = 15
const platformGap = 80

let gameLoop = null
let mouseX = 200

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  highScore.value = parseInt(localStorage.getItem('doodleHighScore') || '0')
  initPlatforms()
  draw()
})

onBeforeUnmount(() => {
  if (gameLoop) cancelAnimationFrame(gameLoop)
})

function initPlatforms() {
  platforms.value = []
  
  // Plateforme de départ
  platforms.value.push({
    x: 160,
    y: 500,
    width: platformWidth,
    height: platformHeight,
    type: 'normal'
  })
  
  // Générer d'autres plateformes
  for (let i = 1; i < 10; i++) {
    platforms.value.push({
      x: Math.random() * (400 - platformWidth),
      y: 500 - i * platformGap,
      width: platformWidth,
      height: platformHeight,
      type: Math.random() > 0.8 ? 'bouncy' : 'normal'
    })
  }
}

function handleMouseMove(e) {
  if (!gameStarted.value) return
  const rect = canvas.value.getBoundingClientRect()
  mouseX = e.clientX - rect.left
}

function startGame() {
  gameStarted.value = true
  gameOver.value = false
  score.value = 0
  player.value = {
    x: 200,
    y: 400,
    width: 50,
    height: 50,
    velocityY: 0,
    velocityX: 0,
    jumping: true
  }
  initPlatforms()
  update()
}

function resetGame() {
  if (gameLoop) cancelAnimationFrame(gameLoop)
  gameStarted.value = false
  gameOver.value = false
  score.value = 0
  player.value = {
    x: 200,
    y: 400,
    width: 50,
    height: 50,
    velocityY: 0,
    velocityX: 0,
    jumping: true
  }
  initPlatforms()
  draw()
}

function update() {
  if (gameOver.value) return
  
  // Mouvement horizontal
  const targetX = mouseX - player.value.width / 2
  player.value.x += (targetX - player.value.x) * 0.15
  
  // Limites horizontales avec téléportation
  if (player.value.x < -player.value.width) {
    player.value.x = canvas.value.width
  } else if (player.value.x > canvas.value.width) {
    player.value.x = -player.value.width
  }
  
  // Gravité
  player.value.velocityY += gravity
  player.value.y += player.value.velocityY
  
  // Collision avec plateformes (seulement en descendant)
  if (player.value.velocityY > 0) {
    platforms.value.forEach(platform => {
      if (
        player.value.x + player.value.width > platform.x &&
        player.value.x < platform.x + platform.width &&
        player.value.y + player.value.height > platform.y &&
        player.value.y + player.value.height < platform.y + platform.height + 10
      ) {
        if (platform.type === 'bouncy') {
          player.value.velocityY = jumpStrength * 1.5
        } else {
          player.value.velocityY = jumpStrength
        }
        player.value.jumping = false
      }
    })
  }
  
  // Scroll vers le haut quand le joueur monte
  if (player.value.y < 300) {
    const offset = 300 - player.value.y
    player.value.y = 300
    
    platforms.value.forEach(platform => {
      platform.y += offset
    })
    
    score.value += Math.floor(offset)
    
    // Supprimer les plateformes hors écran et en ajouter de nouvelles
    platforms.value = platforms.value.filter(p => p.y < 600)
    
    while (platforms.value.length < 10) {
      const lastPlatform = platforms.value[platforms.value.length - 1]
      platforms.value.push({
        x: Math.random() * (400 - platformWidth),
        y: lastPlatform.y - platformGap - Math.random() * 50,
        width: platformWidth,
        height: platformHeight,
        type: Math.random() > 0.8 ? 'bouncy' : 'normal'
      })
    }
  }
  
  // Game Over si on tombe
  if (player.value.y > 600) {
    gameOver.value = true
    gameStarted.value = false
    
    if (score.value > highScore.value) {
      highScore.value = score.value
      localStorage.setItem('doodleHighScore', score.value.toString())
    }
    return
  }
  
  draw()
  gameLoop = requestAnimationFrame(update)
}

function draw() {
  if (!ctx) return
  
  // Fond dégradé ciel
  const gradient = ctx.createLinearGradient(0, 0, 0, 600)
  gradient.addColorStop(0, '#87CEEB')
  gradient.addColorStop(1, '#E0F6FF')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 400, 600)
  
  // Nuages décoratifs
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  drawCloud(50, 100, 40)
  drawCloud(250, 150, 35)
  drawCloud(150, 50, 45)
  drawCloud(320, 200, 38)
  
  // Plateformes
  platforms.value.forEach(platform => {
    if (platform.type === 'bouncy') {
      // Plateforme rebondissante (rouge)
      ctx.fillStyle = '#EF4444'
      ctx.strokeStyle = '#991B1B'
    } else {
      // Plateforme normale (verte)
      ctx.fillStyle = '#10B981'
      ctx.strokeStyle = '#065F46'
    }
    
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(platform.x, platform.y, platform.width, platform.height, 5)
    ctx.fill()
    ctx.stroke()
  })
  
  // Joueur (personnage mignon)
  const p = player.value
  
  // Corps
  ctx.fillStyle = '#8B5CF6'
  ctx.beginPath()
  ctx.arc(p.x + p.width / 2, p.y + p.height / 2, p.width / 2, 0, Math.PI * 2)
  ctx.fill()
  
  // Yeux
  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.arc(p.x + p.width / 2 - 10, p.y + p.height / 2 - 5, 8, 0, Math.PI * 2)
  ctx.arc(p.x + p.width / 2 + 10, p.y + p.height / 2 - 5, 8, 0, Math.PI * 2)
  ctx.fill()
  
  // Pupilles
  ctx.fillStyle = 'black'
  ctx.beginPath()
  ctx.arc(p.x + p.width / 2 - 10, p.y + p.height / 2 - 5, 4, 0, Math.PI * 2)
  ctx.arc(p.x + p.width / 2 + 10, p.y + p.height / 2 - 5, 4, 0, Math.PI * 2)
  ctx.fill()
  
  // Sourire
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(p.x + p.width / 2, p.y + p.height / 2 + 5, 15, 0.2 * Math.PI, 0.8 * Math.PI)
  ctx.stroke()
  
  // Score en haut
  ctx.fillStyle = 'black'
  ctx.font = 'bold 20px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(`Score: ${score.value}`, 200, 30)
}

function drawCloud(x, y, size) {
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.arc(x + size * 0.7, y, size * 0.8, 0, Math.PI * 2)
  ctx.arc(x + size * 1.4, y, size, 0, Math.PI * 2)
  ctx.fill()
}
</script>
