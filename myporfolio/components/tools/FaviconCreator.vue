<template>
  <div class="favicon-creator">
    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Upload Section -->
      <div class="space-y-6">
        <h3 class="text-xl font-bold text-white mb-4">📤 Charger une image</h3>

        <div
          @drop.prevent="handleDrop"
          @dragover.prevent
          class="border-2 border-dashed border-blue-400 rounded-xl p-12 text-center hover:border-blue-300 transition-colors cursor-pointer"
          @click="$refs.fileInput.click()"
        >
          <input ref="fileInput" type="file" accept="image/*" @change="handleFileSelect" class="hidden" />
          <div v-if="!imageUrl" class="text-gray-300">
            <p class="text-2xl mb-4">🖼️</p>
            <p class="mb-2">Glissez une image ou cliquez pour choisir</p>
            <p class="text-sm text-gray-500">PNG, JPG, SVG acceptés</p>
            <p class="text-xs text-gray-600 mt-4">Recommandé: Image carrée, min 512x512px</p>
          </div>
          <div v-else class="relative">
            <img :src="imageUrl" alt="Image chargée" class="max-w-full max-h-64 mx-auto rounded-lg shadow-lg" />
            <button
              @click.stop="clearImage"
              class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        </div>

        <div v-if="imageUrl" class="space-y-4">
          <!-- Background Color -->
          <div>
            <label class="block text-white mb-2">Couleur de fond (optionnel)</label>
            <div class="flex items-center space-x-3">
              <input
                v-model="bgColor"
                type="color"
                class="w-16 h-12 rounded-lg cursor-pointer border-2 border-white/20"
              />
              <input
                v-model="bgColor"
                type="text"
                class="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
              />
              <button
                @click="bgColor = 'transparent'"
                class="bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-600"
              >
                Transparent
              </button>
            </div>
          </div>

          <!-- Border Radius -->
          <div>
            <label class="block text-white mb-2">Arrondi: {{ borderRadius }}%</label>
            <input v-model.number="borderRadius" type="range" min="0" max="50" class="w-full accent-blue-500" />
          </div>

          <!-- Download All -->
          <button
            @click="downloadAll"
            class="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all"
          >
            📥 Télécharger tous les formats
          </button>
        </div>
      </div>

      <!-- Preview Section -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">👁️ Aperçus</h3>

        <div v-if="imageUrl" class="space-y-6">
          <div v-for="format in faviconFormats" :key="format.size" class="bg-white/10 rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="text-white font-semibold">{{ format.name }}</h4>
                <p class="text-gray-400 text-sm">{{ format.size }}x{{ format.size }}px</p>
              </div>
              <button
                @click="downloadFavicon(format.size)"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                📥 Télécharger
              </button>
            </div>
            <div class="flex items-center justify-center bg-gray-800 rounded-lg p-4">
              <canvas
                :ref="el => (canvasRefs[format.size] = el)"
                :width="format.size"
                :height="format.size"
                :style="{
                  width: `${format.displaySize}px`,
                  height: `${format.displaySize}px`,
                  imageRendering: 'pixelated'
                }"
                class="border-2 border-white/20 rounded"
              ></canvas>
            </div>
          </div>

          <!-- HTML Code -->
          <div class="bg-gray-800 rounded-xl p-6">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-white font-semibold">📝 Code HTML</h4>
              <button
                @click="copyHTMLCode"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                📋 Copier
              </button>
            </div>
            <pre
              class="text-gray-300 text-xs overflow-x-auto"
            ><code>{{ htmlCode }}</code></pre>
          </div>
        </div>

        <div v-else class="text-gray-400 text-center py-12">
          <p class="text-2xl mb-2">🎨</p>
          <p>Chargez une image pour générer les favicons</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const imageUrl = ref('')
const bgColor = ref('#ffffff')
const borderRadius = ref(0)
const fileInput = ref(null)
const canvasRefs = reactive({})

const faviconFormats = [
  { name: 'Favicon standard', size: 16, displaySize: 64 },
  { name: 'Favicon haute résolution', size: 32, displaySize: 64 },
  { name: 'Apple Touch Icon', size: 180, displaySize: 128 },
  { name: 'Android Chrome', size: 192, displaySize: 128 },
  { name: 'Android Chrome HD', size: 512, displaySize: 128 }
]

const htmlCode = `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">`

function handleFileSelect(event) {
  const file = event.target.files[0]
  if (file) {
    processImage(file)
  }
}

function handleDrop(event) {
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    processImage(file)
  }
}

function processImage(file) {
  const reader = new FileReader()
  reader.onload = e => {
    imageUrl.value = e.target.result
  }
  reader.readAsDataURL(file)
}

watch(
  [imageUrl, bgColor, borderRadius],
  () => {
    if (imageUrl.value) {
      setTimeout(() => generateFavicons(), 100)
    }
  },
  { immediate: true }
)

function generateFavicons() {
  const img = new Image()
  img.onload = () => {
    faviconFormats.forEach(format => {
      const canvas = canvasRefs[format.size]
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, format.size, format.size)

      // Background
      if (bgColor.value !== 'transparent') {
        ctx.fillStyle = bgColor.value
        if (borderRadius.value > 0) {
          const radius = (format.size * borderRadius.value) / 100
          ctx.beginPath()
          ctx.roundRect(0, 0, format.size, format.size, radius)
          ctx.fill()
        } else {
          ctx.fillRect(0, 0, format.size, format.size)
        }
      }

      // Draw image
      ctx.save()
      if (borderRadius.value > 0) {
        const radius = (format.size * borderRadius.value) / 100
        ctx.beginPath()
        ctx.roundRect(0, 0, format.size, format.size, radius)
        ctx.clip()
      }
      ctx.drawImage(img, 0, 0, format.size, format.size)
      ctx.restore()
    })
  }
  img.src = imageUrl.value
}

function downloadFavicon(size) {
  const canvas = canvasRefs[size]
  if (!canvas) return

  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `favicon-${size}x${size}.png`
    a.click()
    URL.revokeObjectURL(url)
  })
}

function downloadAll() {
  faviconFormats.forEach(format => {
    setTimeout(() => downloadFavicon(format.size), 100 * format.size)
  })
}

function clearImage() {
  imageUrl.value = ''
}

function copyHTMLCode() {
  navigator.clipboard.writeText(htmlCode)
  alert('Code HTML copié !')
}
</script>
