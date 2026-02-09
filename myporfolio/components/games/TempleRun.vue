<template>
  <div class="temple-run-3d">
    <!-- HUD Overlay -->
    <div class="absolute top-4 left-4 z-10 text-white font-bold">
      <div class="bg-black/50 backdrop-blur-sm rounded-lg p-4 space-y-2">
        <div class="text-3xl font-mono">{{ distance }}m</div>
        <div class="text-sm text-gray-300">Record: {{ highScore }}m</div>
        <div class="flex items-center gap-2 text-yellow-400">
          <span class="text-xl">💰</span>
          <span class="text-lg">{{ coins }}</span>
        </div>
        <div class="text-xs text-green-400" v-if="gameStarted">Vitesse: {{ speed.toFixed(1) }}</div>
      </div>
    </div>

    <!-- Controls Info -->
    <div class="absolute top-4 right-4 z-10 text-white text-sm">
      <div class="bg-black/50 backdrop-blur-sm rounded-lg p-3 space-y-1">
        <div>← → : Changer de couloir</div>
        <div>↑ : Sauter</div>
        <div>↓ : Glisser</div>
      </div>
    </div>

    <!-- Start/Game Over Overlay -->
    <div 
      v-if="!gameStarted || gameOver" 
      class="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      @click="startGame"
    >
      <div class="text-center">
        <h1 class="text-6xl font-bold text-yellow-400 mb-4 animate-pulse">Temple Run 3D</h1>
        <div v-if="gameOver" class="mb-6">
          <p class="text-3xl font-bold text-red-400 mb-2">Game Over!</p>
          <p class="text-xl text-white">Distance: {{ distance }}m</p>
          <p class="text-lg text-yellow-400">Pièces: {{ coins }}</p>
          <p v-if="distance > highScore" class="text-green-400 text-sm mt-2">🎉 Nouveau Record! 🎉</p>
        </div>
        <button
          @click="startGame"
          class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white text-xl font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all"
        >
          {{ gameOver ? 'Rejouer' : 'Démarrer' }}
        </button>
      </div>
    </div>

    <!-- 3D Canvas -->
    <div ref="gameContainer" class="w-full h-[600px] relative overflow-hidden rounded-lg border-4 border-yellow-600 shadow-2xl"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const gameContainer = ref(null)

// Three.js variables
let scene, camera, renderer
let player, ground, path
let obstacles = []
let coinsArray = []
let lights = []

// Game state
const gameStarted = ref(false)
const gameOver = ref(false)
const distance = ref(0)
const coins = ref(0)
const highScore = ref(0)
const speed = ref(0.15)

// Player state
let playerLane = 1 // 0 = left, 1 = center, 2 = right
let playerY = 0
let playerVelocityY = 0
let isJumping = false
let isSliding = false
let slideTimer = null

// Constants
const LANE_WIDTH = 3
const LANES = [-LANE_WIDTH, 0, LANE_WIDTH]
const JUMP_FORCE = 0.35
const GRAVITY = 0.02
const SLIDE_DURATION = 600

// Input handling
const keys = {}

onMounted(() => {
  initThreeJS()
  createWorld()
  highScore.value = parseInt(localStorage.getItem('templeRunHighScore3D') || '0')
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  animate()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
  if (renderer) {
    renderer.dispose()
  }
})

function initThreeJS() {
  // Scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x87CEEB) // Sky blue
  scene.fog = new THREE.Fog(0x87CEEB, 10, 100)

  // Camera with cinematic angle
  camera = new THREE.PerspectiveCamera(
    75,
    gameContainer.value.clientWidth / gameContainer.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 4, 8)
  camera.lookAt(0, 0, -10)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(gameContainer.value.clientWidth, gameContainer.value.clientHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  gameContainer.value.appendChild(renderer.domElement)

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const sunLight = new THREE.DirectionalLight(0xffd700, 0.8)
  sunLight.position.set(10, 20, 10)
  sunLight.castShadow = true
  sunLight.shadow.camera.left = -50
  sunLight.shadow.camera.right = 50
  sunLight.shadow.camera.top = 50
  sunLight.shadow.camera.bottom = -50
  sunLight.shadow.mapSize.width = 2048
  sunLight.shadow.mapSize.height = 2048
  scene.add(sunLight)

  // Point lights for ambiance
  const pointLight1 = new THREE.PointLight(0xff9500, 0.5, 50)
  pointLight1.position.set(-10, 5, -20)
  scene.add(pointLight1)

  const pointLight2 = new THREE.PointLight(0xff9500, 0.5, 50)
  pointLight2.position.set(10, 5, -20)
  scene.add(pointLight2)
}

function createWorld() {
  // Create player (humanoid shape)
  createPlayer()
  
  // Create ground path
  createPath()
  
  // Create initial temple walls
  createTempleWalls()
}

function createPlayer() {
  const playerGroup = new THREE.Group()
  
  // Body
  const bodyGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.6)
  const bodyMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x3B82F6,
    shininess: 30
  })
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
  body.castShadow = true
  body.position.y = 0.6
  playerGroup.add(body)
  
  // Head
  const headGeometry = new THREE.SphereGeometry(0.4, 16, 16)
  const headMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xFFDBAC,
    shininess: 50
  })
  const head = new THREE.Mesh(headGeometry, headMaterial)
  head.castShadow = true
  head.position.y = 1.6
  playerGroup.add(head)
  
  // Eyes
  const eyeGeometry = new THREE.SphereGeometry(0.08, 8, 8)
  const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 })
  
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
  leftEye.position.set(-0.15, 1.65, 0.35)
  playerGroup.add(leftEye)
  
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
  rightEye.position.set(0.15, 1.65, 0.35)
  playerGroup.add(rightEye)
  
  // Arms
  const armGeometry = new THREE.BoxGeometry(0.25, 0.8, 0.25)
  const armMaterial = new THREE.MeshPhongMaterial({ color: 0x3B82F6 })
  
  const leftArm = new THREE.Mesh(armGeometry, armMaterial)
  leftArm.castShadow = true
  leftArm.position.set(-0.6, 0.6, 0)
  playerGroup.add(leftArm)
  
  const rightArm = new THREE.Mesh(armGeometry, armMaterial)
  rightArm.castShadow = true
  rightArm.position.set(0.6, 0.6, 0)
  playerGroup.add(rightArm)
  
  // Legs
  const legGeometry = new THREE.BoxGeometry(0.3, 0.8, 0.3)
  const legMaterial = new THREE.MeshPhongMaterial({ color: 0x1E3A8A })
  
  const leftLeg = new THREE.Mesh(legGeometry, legMaterial)
  leftLeg.castShadow = true
  leftLeg.position.set(-0.25, -0.2, 0)
  playerGroup.add(leftLeg)
  
  const rightLeg = new THREE.Mesh(legGeometry, legMaterial)
  rightLeg.castShadow = true
  rightLeg.position.set(0.25, -0.2, 0)
  playerGroup.add(rightLeg)
  
  playerGroup.position.set(LANES[1], 0, 0)
  player = playerGroup
  scene.add(player)
}

function createPath() {
  // Main ground path
  const pathGeometry = new THREE.PlaneGeometry(10, 200)
  const pathMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x8B4513,
    side: THREE.DoubleSide
  })
  path = new THREE.Mesh(pathGeometry, pathMaterial)
  path.rotation.x = -Math.PI / 2
  path.position.z = -100
  path.receiveShadow = true
  scene.add(path)
  
  // Lane markers
  for (let i = -90; i < 10; i += 5) {
    const markerGeometry = new THREE.BoxGeometry(0.1, 0.05, 2)
    const markerMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 })
    
    const leftMarker = new THREE.Mesh(markerGeometry, markerMaterial)
    leftMarker.position.set(-LANE_WIDTH * 1.5, 0.025, i)
    scene.add(leftMarker)
    
    const rightMarker = new THREE.Mesh(markerGeometry, markerMaterial)
    rightMarker.position.set(LANE_WIDTH * 1.5, 0.025, i)
    scene.add(rightMarker)
  }
}

function createTempleWalls() {
  // Left wall
  for (let i = -90; i < 10; i += 15) {
    const pillarGeometry = new THREE.BoxGeometry(1.5, 5, 1.5)
    const pillarMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8B7355,
      shininess: 10
    })
    const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial)
    pillar.position.set(-6, 2.5, i)
    pillar.castShadow = true
    pillar.receiveShadow = true
    scene.add(pillar)
  }
  
  // Right wall
  for (let i = -90; i < 10; i += 15) {
    const pillarGeometry = new THREE.BoxGeometry(1.5, 5, 1.5)
    const pillarMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8B7355,
      shininess: 10
    })
    const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial)
    pillar.position.set(6, 2.5, i)
    pillar.castShadow = true
    pillar.receiveShadow = true
    scene.add(pillar)
  }
}

function spawnObstacle() {
  if (!gameStarted.value || Math.random() > 0.3) return
  
  const lane = Math.floor(Math.random() * 3)
  const type = Math.random()
  
  if (type < 0.4) {
    // Low obstacle (rock)
    const geometry = new THREE.BoxGeometry(1.2, 0.8, 1.2)
    const material = new THREE.MeshPhongMaterial({ color: 0x696969 })
    const obstacle = new THREE.Mesh(geometry, material)
    obstacle.position.set(LANES[lane], 0.4, -50)
    obstacle.castShadow = true
    obstacle.userData = { type: 'low', lane }
    scene.add(obstacle)
    obstacles.push(obstacle)
  } else if (type < 0.7) {
    // High obstacle (beam)
    const geometry = new THREE.BoxGeometry(1.2, 2, 1.2)
    const material = new THREE.MeshPhongMaterial({ color: 0x654321 })
    const obstacle = new THREE.Mesh(geometry, material)
    obstacle.position.set(LANES[lane], 1, -50)
    obstacle.castShadow = true
    obstacle.userData = { type: 'high', lane }
    scene.add(obstacle)
    obstacles.push(obstacle)
  }
}

function spawnCoin() {
  if (!gameStarted.value || Math.random() > 0.5) return
  
  const lane = Math.floor(Math.random() * 3)
  
  // Coin (torus for 3D effect)
  const geometry = new THREE.TorusGeometry(0.3, 0.1, 16, 32)
  const material = new THREE.MeshPhongMaterial({ 
    color: 0xFFD700,
    emissive: 0xFFAA00,
    shininess: 100
  })
  const coin = new THREE.Mesh(geometry, material)
  coin.position.set(LANES[lane], 1.2, -50)
  coin.rotation.x = Math.PI / 2
  coin.userData = { lane, rotation: 0 }
  scene.add(coin)
  coinsArray.push(coin)
}

function handleKeyDown(e) {
  if (!gameStarted.value && e.key !== 'Enter') return
  
  keys[e.key] = true
  
  if (e.key === 'ArrowLeft' && playerLane > 0) {
    playerLane--
    animateLaneChange()
  }
  
  if (e.key === 'ArrowRight' && playerLane < 2) {
    playerLane++
    animateLaneChange()
  }
  
  if (e.key === 'ArrowUp' && !isJumping && !isSliding) {
    isJumping = true
    playerVelocityY = JUMP_FORCE
  }
  
  if (e.key === 'ArrowDown' && !isJumping && !isSliding) {
    isSliding = true
    player.scale.y = 0.5
    if (slideTimer) clearTimeout(slideTimer)
    slideTimer = setTimeout(() => {
      isSliding = false
      player.scale.y = 1
    }, SLIDE_DURATION)
  }
  
  e.preventDefault()
}

function handleKeyUp(e) {
  keys[e.key] = false
}

function animateLaneChange() {
  // Smooth lane transition
  const targetX = LANES[playerLane]
  const currentX = player.position.x
  const steps = 10
  let step = 0
  
  const interval = setInterval(() => {
    step++
    player.position.x = currentX + (targetX - currentX) * (step / steps)
    
    // Camera shake effect
    camera.position.x = Math.sin(step * 0.5) * 0.1
    
    if (step >= steps) {
      clearInterval(interval)
      camera.position.x = 0
    }
  }, 16)
}

function startGame() {
  gameStarted.value = true
  gameOver.value = false
  distance.value = 0
  coins.value = 0
  speed.value = 0.15
  playerLane = 1
  playerY = 0
  playerVelocityY = 0
  isJumping = false
  isSliding = false
  
  // Clear old obstacles and coins
  obstacles.forEach(obs => scene.remove(obs))
  coinsArray.forEach(coin => scene.remove(coin))
  obstacles = []
  coinsArray = []
  
  // Reset player position
  player.position.set(LANES[1], 0, 0)
  player.scale.y = 1
  
  // Reset camera
  camera.position.set(0, 4, 8)
}

function checkCollisions() {
  const playerBox = new THREE.Box3().setFromObject(player)
  
  // Check obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obstacle = obstacles[i]
    const obstacleBox = new THREE.Box3().setFromObject(obstacle)
    
    if (playerBox.intersectsBox(obstacleBox) && obstacle.userData.lane === playerLane) {
      // Game Over
      gameOver.value = true
      gameStarted.value = false
      
      if (distance.value > highScore.value) {
        highScore.value = distance.value
        localStorage.setItem('templeRunHighScore3D', distance.value.toString())
      }
      
      return
    }
    
    // Remove obstacles that passed
    if (obstacle.position.z > 10) {
      scene.remove(obstacle)
      obstacles.splice(i, 1)
    }
  }
  
  // Check coins
  for (let i = coinsArray.length - 1; i >= 0; i--) {
    const coin = coinsArray[i]
    const coinBox = new THREE.Box3().setFromObject(coin)
    
    if (playerBox.intersectsBox(coinBox) && coin.userData.lane === playerLane) {
      coins.value++
      scene.remove(coin)
      coinsArray.splice(i, 1)
    }
    
    // Remove coins that passed
    if (coin.position.z > 10) {
      scene.remove(coin)
      coinsArray.splice(i, 1)
    }
  }
}

function updateGame() {
  if (!gameStarted.value || gameOver.value) return
  
  // Update distance
  distance.value += Math.floor(speed.value * 10)
  
  // Increase speed gradually
  speed.value += 0.0001
  
  // Move world forward (player stays stationary relative to camera)
  obstacles.forEach(obstacle => {
    obstacle.position.z += speed.value
  })
  
  coinsArray.forEach(coin => {
    coin.position.z += speed.value
    coin.userData.rotation += 0.05
    coin.rotation.z = coin.userData.rotation
  })
  
  // Move ground
  path.position.z += speed.value
  if (path.position.z > 0) {
    path.position.z = -100
  }
  
  // Jumping physics
  if (isJumping) {
    playerVelocityY -= GRAVITY
    playerY += playerVelocityY
    
    if (playerY <= 0) {
      playerY = 0
      playerVelocityY = 0
      isJumping = false
    }
    
    player.position.y = playerY
  }
  
  // Running animation (leg movement)
  if (!isJumping && !isSliding) {
    const time = Date.now() * 0.01
    player.rotation.x = Math.sin(time * speed.value * 10) * 0.05
  }
  
  // Camera follow with slight bobbing
  const time = Date.now() * 0.001
  camera.position.y = 4 + Math.sin(time * 2) * 0.1
  
  // Camera shake when sliding
  if (isSliding) {
    camera.position.y = 3
  }
  
  // Spawn obstacles and coins
  if (Math.random() < 0.02) spawnObstacle()
  if (Math.random() < 0.03) spawnCoin()
  
  checkCollisions()
}

function animate() {
  requestAnimationFrame(animate)
  updateGame()
  renderer.render(scene, camera)
}
</script>

<style scoped>
.temple-run-3d {
  position: relative;
}
</style>
