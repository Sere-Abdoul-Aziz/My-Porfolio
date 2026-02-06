<template>
  <div class="image-compressor">
    <!-- Upload Area -->
    <div
      @drop.prevent="handleDrop"
      @dragover.prevent
      class="border-2 border-dashed border-blue-400 rounded-xl p-12 text-center hover:border-blue-300 transition-colors cursor-pointer mb-6"
      @click="$refs.fileInput.click()"
    >
      <input ref="fileInput" type="file" accept="image/*" multiple @change="handleFileSelect" class="hidden" />
      <div v-if="images.length === 0" class="text-gray-300">
        <p class="text-4xl mb-4">🖼️</p>
        <p class="text-xl mb-2">Glissez des images ou cliquez pour choisir</p>
        <p class="text-sm text-gray-500">PNG, JPG, WebP acceptés • Max 10 images</p>
      </div>
      <div v-else class="text-gray-300">
        <p class="text-2xl mb-2">✅ {{ images.length }} image(s) chargée(s)</p>
        <p class="text-sm text-gray-500">Cliquez pour ajouter plus d'images</p>
      </div>
    </div>

    <!-- Settings -->
    <div v-if="images.length > 0" class="grid md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white/10 rounded-lg p-4">
        <label class="block text-white mb-2 font-semibold">Qualité: {{ quality }}%</label>
        <input v-model.number="quality" type="range" min="10" max="100" class="w-full accent-blue-500" />
      </div>

      <div class="bg-white/10 rounded-lg p-4">
        <label class="block text-white mb-2 font-semibold">Format de sortie</label>
        <select
          v-model="outputFormat"
          class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="original">Format original</option>
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WebP</option>
        </select>
      </div>

      <div class="bg-white/10 rounded-lg p-4 flex items-center justify-between">
        <span class="text-white font-semibold">Redimensionner</span>
        <button
          @click="enableResize = !enableResize"
          :class="['w-12 h-6 rounded-full transition-colors', enableResize ? 'bg-blue-500' : 'bg-gray-600']"
        >
          <div
            :class="[
              'w-5 h-5 bg-white rounded-full transform transition-transform',
              enableResize ? 'translate-x-6' : 'translate-x-1'
            ]"
          ></div>
        </button>
      </div>

      <div v-if="enableResize" class="bg-white/10 rounded-lg p-4">
        <label class="block text-white mb-2 font-semibold">Largeur max (px)</label>
        <input
          v-model.number="maxWidth"
          type="number"
          min="100"
          max="4000"
          class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div v-if="enableResize" class="bg-white/10 rounded-lg p-4">
        <label class="block text-white mb-2 font-semibold">Hauteur max (px)</label>
        <input
          v-model.number="maxHeight"
          type="number"
          min="100"
          max="4000"
          class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>

    <!-- Images List -->
    <div v-if="images.length > 0" class="space-y-4 mb-6">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="bg-white/10 rounded-xl p-4 flex items-center gap-4"
      >
        <img :src="image.preview" class="w-20 h-20 object-cover rounded-lg" />
        <div class="flex-1">
          <div class="text-white font-semibold">{{ image.name }}</div>
          <div class="text-gray-400 text-sm">
            Original: {{ formatFileSize(image.originalSize) }}
            <span v-if="image.compressedSize" class="text-green-400">
              → Compressé: {{ formatFileSize(image.compressedSize) }} ({{ image.reduction }}%)
            </span>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            v-if="image.compressedUrl"
            @click="downloadImage(image)"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            💾 Télécharger
          </button>
          <button
            @click="removeImage(index)"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div v-if="images.length > 0" class="flex items-center justify-center gap-4">
      <button
        @click="compressAll"
        :disabled="processing"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        {{ processing ? '⏳ Compression...' : '🚀 Compresser Tout' }}
      </button>
      <button
        @click="downloadAll"
        :disabled="!allCompressed"
        class="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        📥 Télécharger Tout
      </button>
      <button
        @click="clear"
        class="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        🗑️ Effacer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const images = ref([])
const quality = ref(80)
const outputFormat = ref('original')
const enableResize = ref(false)
const maxWidth = ref(1920)
const maxHeight = ref(1080)
const processing = ref(false)
const fileInput = ref(null)

const allCompressed = computed(() => {
  return images.value.length > 0 && images.value.every(img => img.compressedUrl)
})

function handleFileSelect(event) {
  const files = Array.from(event.target.files)
  processFiles(files)
}

function handleDrop(event) {
  const files = Array.from(event.dataTransfer.files).filter(f => f.type.startsWith('image/'))
  processFiles(files)
}

function processFiles(files) {
  if (images.value.length + files.length > 10) {
    alert('Maximum 10 images')
    return
  }

  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = e => {
      images.value.push({
        name: file.name,
        file: file,
        preview: e.target.result,
        originalSize: file.size,
        compressedSize: null,
        compressedUrl: null,
        reduction: 0
      })
    }
    reader.readAsDataURL(file)
  })
}

async function compressAll() {
  processing.value = true

  for (const image of images.value) {
    await compressImage(image)
  }

  processing.value = false
}

function compressImage(image) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let width = img.width
      let height = img.height

      // Resize if enabled
      if (enableResize.value) {
        if (width > maxWidth.value || height > maxHeight.value) {
          const ratio = Math.min(maxWidth.value / width, maxHeight.value / height)
          width = width * ratio
          height = height * ratio
        }
      }

      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      // Determine output format
      let mimeType = image.file.type
      if (outputFormat.value === 'jpeg') mimeType = 'image/jpeg'
      else if (outputFormat.value === 'png') mimeType = 'image/png'
      else if (outputFormat.value === 'webp') mimeType = 'image/webp'

      canvas.toBlob(
        blob => {
          image.compressedSize = blob.size
          image.compressedUrl = URL.createObjectURL(blob)
          image.reduction = Math.round(((image.originalSize - blob.size) / image.originalSize) * 100)
          resolve()
        },
        mimeType,
        quality.value / 100
      )
    }
    img.src = image.preview
  })
}

function downloadImage(image) {
  const a = document.createElement('a')
  a.href = image.compressedUrl
  const extension = outputFormat.value === 'original' ? image.name.split('.').pop() : outputFormat.value
  a.download = `compressed_${image.name.split('.')[0]}.${extension}`
  a.click()
}

function downloadAll() {
  images.value.forEach(image => {
    if (image.compressedUrl) {
      setTimeout(() => downloadImage(image), 100)
    }
  })
}

function removeImage(index) {
  images.value.splice(index, 1)
}

function clear() {
  images.value = []
  if (fileInput.value) fileInput.value.value = ''
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB'
  else return (bytes / 1048576).toFixed(2) + ' MB'
}
</script>
