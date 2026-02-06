<template>
  <div class="placeholder-generator">
    <!-- Settings -->
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <!-- Dimensions -->
      <div class="bg-white/10 rounded-xl p-6">
        <h3 class="text-white font-bold mb-4">📐 Dimensions</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-white mb-2 text-sm">Largeur (px)</label>
            <input
              v-model.number="width"
              type="number"
              min="50"
              max="2000"
              class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-white mb-2 text-sm">Hauteur (px)</label>
            <input
              v-model.number="height"
              type="number"
              min="50"
              max="2000"
              class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="preset in presets"
              :key="preset.name"
              @click="applyPreset(preset)"
              class="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
            >
              {{ preset.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Customization -->
      <div class="bg-white/10 rounded-xl p-6">
        <h3 class="text-white font-bold mb-4">🎨 Personnalisation</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-white mb-2 text-sm">Couleur de fond</label>
            <div class="flex gap-2">
              <input
                v-model="backgroundColor"
                type="color"
                class="w-16 h-10 rounded-lg cursor-pointer border-2 border-white/20"
              />
              <input
                v-model="backgroundColor"
                type="text"
                class="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
              />
            </div>
          </div>
          <div>
            <label class="block text-white mb-2 text-sm">Couleur du texte</label>
            <div class="flex gap-2">
              <input
                v-model="textColor"
                type="color"
                class="w-16 h-10 rounded-lg cursor-pointer border-2 border-white/20"
              />
              <input
                v-model="textColor"
                type="text"
                class="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
              />
            </div>
          </div>
          <div>
            <label class="block text-white mb-2 text-sm">Texte personnalisé</label>
            <input
              v-model="customText"
              type="text"
              placeholder="Laisser vide pour dimensions automatiques"
              class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-white mb-2 text-sm">Format</label>
            <select
              v-model="format"
              class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="svg">SVG</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview -->
    <div class="mb-6">
      <h3 class="text-xl font-bold text-white mb-4">👁️ Aperçu</h3>
      <div class="bg-gray-900 rounded-xl p-8 flex items-center justify-center">
        <canvas
          ref="canvas"
          :width="width"
          :height="height"
          :style="{ maxWidth: '100%', height: 'auto', border: '2px solid #4B5563' }"
        ></canvas>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-center gap-4">
      <button
        @click="generatePlaceholder"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        🎨 Générer Placeholder
      </button>
      <button
        @click="downloadPlaceholder"
        class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        💾 Télécharger
      </button>
      <button
        @click="copyDataURL"
        class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        📋 Copier Data URL
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const canvas = ref(null)
const width = ref(400)
const height = ref(300)
const backgroundColor = ref('#cccccc')
const textColor = ref('#666666')
const customText = ref('')
const format = ref('png')

const presets = [
  { name: '16:9', width: 640, height: 360 },
  { name: '4:3', width: 640, height: 480 },
  { name: '1:1', width: 400, height: 400 },
  { name: 'Avatar', width: 200, height: 200 }
]

function applyPreset(preset) {
  width.value = preset.width
  height.value = preset.height
}

function generatePlaceholder() {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')

  // Background
  ctx.fillStyle = backgroundColor.value
  ctx.fillRect(0, 0, width.value, height.value)

  // Text
  ctx.fillStyle = textColor.value
  const text = customText.value || `${width.value} × ${height.value}`
  const fontSize = Math.min(width.value, height.value) / 10
  ctx.font = `${fontSize}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, width.value / 2, height.value / 2)
}

function downloadPlaceholder() {
  if (!canvas.value) return

  let mimeType = 'image/png'
  let extension = 'png'

  if (format.value === 'jpeg') {
    mimeType = 'image/jpeg'
    extension = 'jpg'
  } else if (format.value === 'svg') {
    downloadSVG()
    return
  }

  canvas.value.toBlob(blob => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `placeholder_${width.value}x${height.value}.${extension}`
    a.click()
    URL.revokeObjectURL(url)
  }, mimeType)
}

function downloadSVG() {
  const text = customText.value || `${width.value} × ${height.value}`
  const fontSize = Math.min(width.value, height.value) / 10

  const svg = `<svg width="${width.value}" height="${height.value}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${backgroundColor.value}"/>
  <text x="50%" y="50%" font-family="Arial" font-size="${fontSize}" fill="${textColor.value}" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`

  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `placeholder_${width.value}x${height.value}.svg`
  a.click()
  URL.revokeObjectURL(url)
}

async function copyDataURL() {
  if (!canvas.value) return
  const dataURL = canvas.value.toDataURL('image/png')
  try {
    await navigator.clipboard.writeText(dataURL)
    alert('Data URL copié !')
  } catch (err) {
    alert('Erreur lors de la copie')
  }
}

watch([width, height, backgroundColor, textColor, customText], () => {
  generatePlaceholder()
})

onMounted(() => {
  generatePlaceholder()
})
</script>
