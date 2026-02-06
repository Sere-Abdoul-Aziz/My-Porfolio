<template>
  <div class="image-resizer">
    <!-- Upload -->
    <div
      @drop.prevent="handleDrop"
      @dragover.prevent
      class="border-2 border-dashed border-blue-400 rounded-xl p-12 text-center hover:border-blue-300 transition-colors cursor-pointer mb-6"
      @click="$refs.fileInput.click()"
    >
      <input ref="fileInput" type="file" accept="image/*" multiple @change="handleFileSelect" class="hidden" />
      <div v-if="images.length === 0" class="text-gray-300">
        <p class="text-4xl mb-4">📐</p>
        <p class="text-xl mb-2">Glissez des images ou cliquez pour choisir</p>
        <p class="text-sm text-gray-500">Redimensionnement en lot • Max 20 images</p>
      </div>
      <div v-else class="text-gray-300">
        <p class="text-2xl mb-2">✅ {{ images.length }} image(s) chargée(s)</p>
      </div>
    </div>

    <!-- Resize Options -->
    <div v-if="images.length > 0" class="grid md:grid-cols-2 gap-6 mb-6">
      <!-- Preset Sizes -->
      <div class="bg-white/10 rounded-xl p-6">
        <h3 class="text-white font-bold mb-4">📏 Tailles Prédéfinies</h3>
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="preset in presets"
            :key="preset.name"
            @click="applyPreset(preset)"
            class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg text-sm transition-colors text-left"
          >
            <div class="font-semibold">{{ preset.name }}</div>
            <div class="text-gray-400 text-xs">{{ preset.width }} × {{ preset.height }}</div>
          </button>
        </div>
      </div>

      <!-- Custom Dimensions -->
      <div class="bg-white/10 rounded-xl p-6">
        <h3 class="text-white font-bold mb-4">✏️ Dimensions Personnalisées</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-white mb-2 text-sm">Largeur (px)</label>
            <input
              v-model.number="customWidth"
              type="number"
              min="1"
              max="5000"
              class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-white mb-2 text-sm">Hauteur (px)</label>
            <input
              v-model.number="customHeight"
              type="number"
              min="1"
              max="5000"
              class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div class="flex items-center justify-between bg-gray-800 rounded-lg p-3">
            <span class="text-white text-sm">Garder proportions</span>
            <button
              @click="keepAspectRatio = !keepAspectRatio"
              :class="['w-12 h-6 rounded-full transition-colors', keepAspectRatio ? 'bg-blue-500' : 'bg-gray-600']"
            >
              <div
                :class="[
                  'w-5 h-5 bg-white rounded-full transform transition-transform',
                  keepAspectRatio ? 'translate-x-6' : 'translate-x-1'
                ]"
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Images Preview -->
    <div v-if="images.length > 0" class="space-y-3 mb-6 max-h-96 overflow-y-auto">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="bg-white/10 rounded-lg p-3 flex items-center gap-4"
      >
        <img :src="image.preview" class="w-16 h-16 object-cover rounded" />
        <div class="flex-1 text-sm">
          <div class="text-white font-semibold">{{ image.name }}</div>
          <div class="text-gray-400">{{ image.width }} × {{ image.height }}px</div>
        </div>
        <button
          @click="removeImage(index)"
          class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
        >
          🗑️
        </button>
      </div>
    </div>

    <!-- Actions -->
    <div v-if="images.length > 0" class="flex items-center justify-center gap-4">
      <button
        @click="resizeAll"
        :disabled="processing || (!customWidth && !customHeight)"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        {{ processing ? '⏳ Redimensionnement...' : '🚀 Redimensionner Tout' }}
      </button>
      <button
        @click="downloadAll"
        :disabled="resizedImages.length === 0"
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
import { ref } from 'vue'

const images = ref([])
const resizedImages = ref([])
const customWidth = ref(null)
const customHeight = ref(null)
const keepAspectRatio = ref(true)
const processing = ref(false)
const fileInput = ref(null)

const presets = [
  { name: 'Instagram Post', width: 1080, height: 1080 },
  { name: 'Instagram Story', width: 1080, height: 1920 },
  { name: 'Facebook Cover', width: 820, height: 312 },
  { name: 'Twitter Header', width: 1500, height: 500 },
  { name: 'YouTube Thumbnail', width: 1280, height: 720 },
  { name: 'HD 720p', width: 1280, height: 720 },
  { name: 'Full HD 1080p', width: 1920, height: 1080 },
  { name: 'Avatar', width: 400, height: 400 }
]

function handleFileSelect(event) {
  const files = Array.from(event.target.files)
  processFiles(files)
}

function handleDrop(event) {
  const files = Array.from(event.dataTransfer.files).filter(f => f.type.startsWith('image/'))
  processFiles(files)
}

function processFiles(files) {
  if (images.value.length + files.length > 20) {
    alert('Maximum 20 images')
    return
  }

  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = e => {
      const img = new Image()
      img.onload = () => {
        images.value.push({
          name: file.name,
          file: file,
          preview: e.target.result,
          width: img.width,
          height: img.height
        })
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

function applyPreset(preset) {
  customWidth.value = preset.width
  customHeight.value = preset.height
}

async function resizeAll() {
  processing.value = true
  resizedImages.value = []

  for (const image of images.value) {
    const resized = await resizeImage(image)
    resizedImages.value.push(resized)
  }

  processing.value = false
}

function resizeImage(image) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      let targetWidth = customWidth.value || img.width
      let targetHeight = customHeight.value || img.height

      if (keepAspectRatio.value) {
        if (customWidth.value && !customHeight.value) {
          const ratio = customWidth.value / img.width
          targetHeight = img.height * ratio
        } else if (customHeight.value && !customWidth.value) {
          const ratio = customHeight.value / img.height
          targetWidth = img.width * ratio
        } else if (customWidth.value && customHeight.value) {
          const ratio = Math.min(customWidth.value / img.width, customHeight.value / img.height)
          targetWidth = img.width * ratio
          targetHeight = img.height * ratio
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = targetWidth
      canvas.height = targetHeight

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      canvas.toBlob(blob => {
        resolve({
          name: image.name,
          url: URL.createObjectURL(blob),
          blob: blob,
          width: targetWidth,
          height: targetHeight
        })
      }, 'image/png')
    }
    img.src = image.preview
  })
}

function downloadAll() {
  resizedImages.value.forEach((image, index) => {
    setTimeout(() => {
      const a = document.createElement('a')
      a.href = image.url
      a.download = `resized_${image.name}`
      a.click()
    }, index * 100)
  })
}

function removeImage(index) {
  images.value.splice(index, 1)
}

function clear() {
  images.value = []
  resizedImages.value = []
  customWidth.value = null
  customHeight.value = null
  if (fileInput.value) fileInput.value.value = ''
}
</script>
