<template>
  <div class="image-converter">
    <!-- Upload -->
    <div
      @drop.prevent="handleDrop"
      @dragover.prevent
      class="border-2 border-dashed border-blue-400 rounded-xl p-12 text-center hover:border-blue-300 transition-colors cursor-pointer mb-6"
      @click="$refs.fileInput.click()"
    >
      <input ref="fileInput" type="file" accept="image/*" @change="handleFileSelect" class="hidden" />
      <div v-if="!originalImage" class="text-gray-300">
        <p class="text-4xl mb-4">🖼️</p>
        <p class="text-xl mb-2">Glissez une image ou cliquez pour choisir</p>
        <p class="text-sm text-gray-500">PNG, JPG, WebP, BMP, GIF acceptés</p>
      </div>
      <div v-else class="relative">
        <img :src="originalImage.preview" class="max-w-full max-h-64 mx-auto rounded-lg shadow-lg" />
        <button
          @click.stop="clear"
          class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Conversion Options -->
    <div v-if="originalImage" class="mb-6">
      <h3 class="text-xl font-bold text-white mb-4">🔄 Formats de Conversion</h3>
      <div class="grid md:grid-cols-3 gap-4">
        <button
          v-for="format in formats"
          :key="format.id"
          @click="convertTo(format.id)"
          :disabled="converting"
          :class="[
            'p-6 rounded-xl border-2 transition-all',
            converting ? 'bg-gray-700 border-gray-600 cursor-not-allowed' : 'bg-white/10 border-blue-500 hover:bg-white/20'
          ]"
        >
          <div class="text-4xl mb-2">{{ format.icon }}</div>
          <div class="text-white font-bold text-lg">{{ format.name }}</div>
          <div class="text-gray-400 text-sm">{{ format.description }}</div>
        </button>
      </div>
    </div>

    <!-- Quality Settings -->
    <div v-if="originalImage && showQualitySlider" class="mb-6 bg-white/10 rounded-lg p-4">
      <label class="block text-white mb-2 font-semibold">Qualité: {{ quality }}%</label>
      <input v-model.number="quality" type="range" min="10" max="100" class="w-full accent-blue-500" />
    </div>

    <!-- Converted Results -->
    <div v-if="convertedImages.length > 0" class="space-y-4">
      <h3 class="text-xl font-bold text-white mb-4">✅ Images Converties</h3>
      <div
        v-for="(converted, index) in convertedImages"
        :key="index"
        class="bg-white/10 rounded-xl p-4 flex items-center gap-4"
      >
        <img :src="converted.url" class="w-24 h-24 object-cover rounded-lg" />
        <div class="flex-1">
          <div class="text-white font-semibold">{{ converted.format.toUpperCase() }}</div>
          <div class="text-gray-400 text-sm">
            Taille: {{ formatFileSize(converted.size) }}
          </div>
        </div>
        <button
          @click="downloadConverted(converted)"
          class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          💾 Télécharger
        </button>
      </div>
    </div>

    <!-- Original Info -->
    <div v-if="originalImage" class="mt-6 bg-blue-500/20 border-2 border-blue-500 rounded-xl p-6">
      <h4 class="text-blue-400 font-bold mb-3">ℹ️ Image Originale</h4>
      <div class="grid md:grid-cols-2 gap-4 text-sm">
        <div class="flex justify-between text-gray-300">
          <span>Format:</span>
          <span class="text-white font-mono">{{ originalImage.type }}</span>
        </div>
        <div class="flex justify-between text-gray-300">
          <span>Taille:</span>
          <span class="text-white font-mono">{{ formatFileSize(originalImage.size) }}</span>
        </div>
        <div class="flex justify-between text-gray-300">
          <span>Dimensions:</span>
          <span class="text-white font-mono">{{ originalImage.width }} × {{ originalImage.height }}px</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const originalImage = ref(null)
const convertedImages = ref([])
const quality = ref(90)
const converting = ref(false)
const fileInput = ref(null)

const formats = [
  { id: 'jpeg', name: 'JPEG', icon: '📷', description: 'Compression avec perte, idéal web' },
  { id: 'png', name: 'PNG', icon: '🖼️', description: 'Sans perte, supporte transparence' },
  { id: 'webp', name: 'WebP', icon: '🌐', description: 'Format moderne, meilleure compression' }
]

const showQualitySlider = computed(() => {
  return originalImage.value && ['jpeg', 'webp'].includes(originalImage.value.type.split('/')[1])
})

function handleFileSelect(event) {
  const file = event.target.files[0]
  if (file) processFile(file)
}

function handleDrop(event) {
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) processFile(file)
}

function processFile(file) {
  const reader = new FileReader()
  reader.onload = e => {
    const img = new Image()
    img.onload = () => {
      originalImage.value = {
        file: file,
        preview: e.target.result,
        type: file.type.split('/')[1],
        size: file.size,
        width: img.width,
        height: img.height
      }
      convertedImages.value = []
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

function convertTo(format) {
  converting.value = true

  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height

    const ctx = canvas.getContext('2d')
    
    // Fill white background for JPEG (no transparency)
    if (format === 'jpeg') {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    
    ctx.drawImage(img, 0, 0)

    const mimeType = `image/${format}`
    const qualityValue = ['jpeg', 'webp'].includes(format) ? quality.value / 100 : 1

    canvas.toBlob(
      blob => {
        convertedImages.value.push({
          format: format,
          url: URL.createObjectURL(blob),
          size: blob.size,
          blob: blob
        })
        converting.value = false
      },
      mimeType,
      qualityValue
    )
  }
  img.src = originalImage.value.preview
}

function downloadConverted(converted) {
  const a = document.createElement('a')
  a.href = converted.url
  a.download = `converted.${converted.format}`
  a.click()
}

function clear() {
  originalImage.value = null
  convertedImages.value = []
  if (fileInput.value) fileInput.value.value = ''
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB'
  else return (bytes / 1048576).toFixed(2) + ' MB'
}
</script>
