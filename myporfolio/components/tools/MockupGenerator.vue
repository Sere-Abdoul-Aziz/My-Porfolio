<template>
  <div class="mockup-generator">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <!-- Controls -->
      <div class="space-y-4 sm:space-y-6">
        <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white mb-4">⚙️ Configuration</h3>

        <!-- Device Selection -->
        <div>
          <label class="block text-white mb-3">📱 Appareil</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="device in devices"
              :key="device.id"
              @click="selectedDevice = device.id"
              :class="[
                'px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold transition-all',
                selectedDevice === device.id ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'
              ]"
            >
              {{ device.icon }} {{ device.name }}
            </button>
          </div>
        </div>

        <!-- Screenshot Upload -->
        <div>
          <label class="block text-white mb-3">🖼️ Capture d'écran</label>
          <div
            @drop.prevent="handleDrop"
            @dragover.prevent
            class="border-2 border-dashed border-blue-400 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 text-center hover:border-blue-300 transition-colors cursor-pointer"
            @click="$refs.fileInput.click()"
          >
            <input ref="fileInput" type="file" accept="image/*" @change="handleFileSelect" class="hidden" />
            <div v-if="!screenshot" class="text-gray-300">
              <p class="text-xl mb-2">📁</p>
              <p>Glissez une capture ou cliquez</p>
            </div>
            <div v-else class="relative">
              <img :src="screenshot" class="max-w-full max-h-32 mx-auto rounded" />
              <button
                @click.stop="clearScreenshot"
                class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 text-sm"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <!-- Background Selection -->
        <div>
          <label class="block text-white mb-3">🎨 Fond</label>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="bg in backgrounds"
              :key="bg.id"
              @click="selectedBackground = bg.id"
              :class="[
                'px-4 py-3 rounded-lg font-semibold transition-all border-2',
                selectedBackground === bg.id ? 'border-blue-500' : 'border-transparent'
              ]"
              :style="{ background: bg.value }"
            >
              <span class="text-xs" :style="{ color: bg.textColor }">{{ bg.name }}</span>
            </button>
          </div>
        </div>

        <!-- Shadow Toggle -->
        <div class="flex items-center justify-between bg-white/10 rounded-lg p-4">
          <span class="text-white font-semibold">💫 Ombre portée</span>
          <button
            @click="showShadow = !showShadow"
            :class="[
              'w-12 h-6 rounded-full transition-colors',
              showShadow ? 'bg-blue-500' : 'bg-gray-600'
            ]"
          >
            <div
              :class="['w-5 h-5 bg-white rounded-full transform transition-transform', showShadow ? 'translate-x-6' : 'translate-x-1']"
            ></div>
          </button>
        </div>

        <!-- Download -->
        <button
          @click="downloadMockup"
          :disabled="!screenshot"
          class="w-full bg-gradient-to-r from-green-500 to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:shadow-lg transition-all"
        >
          📥 Télécharger le Mockup
        </button>
      </div>

      <!-- Preview -->
      <div>
        <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white mb-4">👁️ Aperçu</h3>
        <div
          :style="{ background: currentBackground }"
          class="w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] rounded-lg sm:rounded-xl flex items-center justify-center p-6 sm:p-8 lg:p-12"
        >
          <div ref="mockupContainer" class="relative" :style="deviceStyle">
            <!-- Device Frame -->
            <div class="relative bg-gray-900 rounded-[2rem] p-3" :style="{ boxShadow: shadowStyle }">
              <!-- Notch (for phones) -->
              <div
                v-if="currentDevice.hasNotch"
                class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-900 rounded-b-3xl w-40 h-6 z-10"
              ></div>

              <!-- Screen -->
              <div class="bg-white rounded-[1.5rem] overflow-hidden relative">
                <img v-if="screenshot" :src="screenshot" class="w-full h-full object-cover" />
                <div v-else class="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                  <div class="text-center">
                    <p class="text-4xl mb-2">🖼️</p>
                    <p>Ajoutez une capture</p>
                  </div>
                </div>
              </div>

              <!-- Home Button (for some devices) -->
              <div
                v-if="currentDevice.hasHomeButton"
                class="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 border-2 border-gray-700 rounded-full"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const screenshot = ref('')
const selectedDevice = ref('iphone')
const selectedBackground = ref('gradient1')
const showShadow = ref(true)
const fileInput = ref(null)
const mockupContainer = ref(null)

const devices = [
  {
    id: 'iphone',
    name: 'iPhone',
    icon: '📱',
    width: 320,
    height: 640,
    hasNotch: true,
    hasHomeButton: false
  },
  {
    id: 'ipad',
    name: 'iPad',
    icon: '📟',
    width: 500,
    height: 700,
    hasNotch: false,
    hasHomeButton: true
  },
  {
    id: 'macbook',
    name: 'MacBook',
    icon: '💻',
    width: 600,
    height: 400,
    hasNotch: false,
    hasHomeButton: false
  },
  {
    id: 'android',
    name: 'Android',
    icon: '📲',
    width: 320,
    height: 640,
    hasNotch: false,
    hasHomeButton: false
  }
]

const backgrounds = [
  { id: 'gradient1', name: 'Bleu', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', textColor: '#fff' },
  { id: 'gradient2', name: 'Rose', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', textColor: '#fff' },
  { id: 'gradient3', name: 'Vert', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', textColor: '#fff' },
  { id: 'solid1', name: 'Blanc', value: '#ffffff', textColor: '#000' },
  { id: 'solid2', name: 'Gris', value: '#f3f4f6', textColor: '#000' },
  { id: 'solid3', name: 'Noir', value: '#111827', textColor: '#fff' }
]

const currentDevice = computed(() => {
  return devices.find(d => d.id === selectedDevice.value) || devices[0]
})

const currentBackground = computed(() => {
  return backgrounds.find(b => b.id === selectedBackground.value)?.value || backgrounds[0].value
})

const deviceStyle = computed(() => ({
  width: `${currentDevice.value.width}px`,
  height: `${currentDevice.value.height}px`
}))

const shadowStyle = computed(() => {
  return showShadow.value ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : 'none'
})

function handleFileSelect(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      screenshot.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function handleDrop(event) {
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = e => {
      screenshot.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function clearScreenshot() {
  screenshot.value = ''
}

async function downloadMockup() {
  if (!screenshot.value || !mockupContainer.value) return

  // Create a canvas with the mockup
  const canvas = document.createElement('canvas')
  const container = mockupContainer.value.parentElement
  const rect = container.getBoundingClientRect()
  
  canvas.width = rect.width * 2 // High resolution
  canvas.height = rect.height * 2
  
  const ctx = canvas.getContext('2d')
  ctx.scale(2, 2)
  
  // Draw background
  const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height)
  if (selectedBackground.value.startsWith('gradient')) {
    // Parse gradient colors from currentBackground
    ctx.fillStyle = currentBackground.value.includes('667eea') ? '#667eea' : 
                    currentBackground.value.includes('f093fb') ? '#f093fb' : '#4facfe'
  } else {
    ctx.fillStyle = currentBackground.value
  }
  ctx.fillRect(0, 0, rect.width, rect.height)
  
  // Load and draw device mockup with screenshot
  const img = new Image()
  img.onload = () => {
    const deviceWidth = currentDevice.value.width
    const deviceHeight = currentDevice.value.height
    const x = (rect.width - deviceWidth) / 2
    const y = (rect.height - deviceHeight) / 2
    
    // Draw device frame
    ctx.fillStyle = '#111827'
    ctx.shadowBlur = showShadow.value ? 50 : 0
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    roundRect(ctx, x, y, deviceWidth, deviceHeight, 32)
    ctx.fill()
    ctx.shadowBlur = 0
    
    // Draw screenshot inside device
    const padding = 12
    const screenWidth = deviceWidth - padding * 2
    const screenHeight = deviceHeight - padding * 2
    ctx.save()
    ctx.beginPath()
    roundRect(ctx, x + padding, y + padding, screenWidth, screenHeight, 24)
    ctx.clip()
    ctx.drawImage(img, x + padding, y + padding, screenWidth, screenHeight)
    ctx.restore()
    
    // Download
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `mockup-${selectedDevice.value}-${Date.now()}.png`
      a.click()
      URL.revokeObjectURL(url)
    })
  }
  img.src = screenshot.value
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}
</script>
