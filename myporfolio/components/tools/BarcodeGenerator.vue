<template>
  <div class="barcode-generator">
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Settings -->
      <div class="space-y-6">
        <h3 class="text-xl font-bold text-white">⚙️ Configuration</h3>

        <!-- Barcode Type -->
        <div>
          <label class="block text-white mb-2 font-semibold">Type de code-barres</label>
          <select
            v-model="barcodeType"
            @change="generateBarcode"
            class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="CODE128">Code 128 (Alphanumérique)</option>
            <option value="EAN13">EAN-13 (Produits)</option>
            <option value="UPC">UPC (Produits US)</option>
            <option value="CODE39">Code 39 (Logistique)</option>
          </select>
        </div>

        <!-- Content -->
        <div>
          <label class="block text-white mb-2 font-semibold">Contenu</label>
          <input
            v-model="content"
            @input="generateBarcode"
            :placeholder="getPlaceholder()"
            class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
          />
          <p class="text-gray-400 text-xs mt-2">{{ getHint() }}</p>
        </div>

        <!-- Display Text -->
        <div class="flex items-center justify-between bg-white/10 rounded-lg p-4">
          <span class="text-white font-semibold">Afficher le texte</span>
          <button
            @click="displayValue = !displayValue; generateBarcode()"
            :class="['w-12 h-6 rounded-full transition-colors', displayValue ? 'bg-blue-500' : 'bg-gray-600']"
          >
            <div
              :class="[
                'w-5 h-5 bg-white rounded-full transform transition-transform',
                displayValue ? 'translate-x-6' : 'translate-x-1'
              ]"
            ></div>
          </button>
        </div>

        <!-- Dimensions -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-white mb-2 font-semibold">Largeur: {{ width }}</label>
            <input v-model.number="width" @input="generateBarcode" type="range" min="1" max="4" step="0.5" class="w-full accent-blue-500" />
          </div>
          <div>
            <label class="block text-white mb-2 font-semibold">Hauteur: {{ height }}px</label>
            <input v-model.number="height" @input="generateBarcode" type="range" min="50" max="200" step="10" class="w-full accent-blue-500" />
          </div>
        </div>

        <!-- Colors -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-white mb-2 font-semibold">Couleur des barres</label>
            <input
              v-model="lineColor"
              @input="generateBarcode"
              type="color"
              class="w-full h-10 rounded-lg cursor-pointer border-2 border-white/20"
            />
          </div>
          <div>
            <label class="block text-white mb-2 font-semibold">Couleur du fond</label>
            <input
              v-model="backgroundColor"
              @input="generateBarcode"
              type="color"
              class="w-full h-10 rounded-lg cursor-pointer border-2 border-white/20"
            />
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">👁️ Aperçu</h3>
        <div class="bg-gray-900 rounded-xl p-8 flex flex-col items-center justify-center">
          <div v-if="error" class="text-red-400 mb-4">{{ error }}</div>
          <canvas ref="barcodeCanvas" class="border-2 border-white/20 rounded-lg mb-6"></canvas>
          <div class="w-full space-y-3">
            <button
              @click="downloadBarcode"
              :disabled="!!error"
              class="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              💾 Télécharger PNG
            </button>
            <button
              @click="downloadSVG"
              :disabled="!!error"
              class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              📄 Télécharger SVG
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const barcodeCanvas = ref(null)
const content = ref('123456789012')
const barcodeType = ref('CODE128')
const displayValue = ref(true)
const width = ref(2)
const height = ref(100)
const lineColor = ref('#000000')
const backgroundColor = ref('#ffffff')
const error = ref('')

function getPlaceholder() {
  const placeholders = {
    CODE128: 'ABC123',
    EAN13: '5901234123457',
    UPC: '012345678905',
    CODE39: 'ABC-123'
  }
  return placeholders[barcodeType.value]
}

function getHint() {
  const hints = {
    CODE128: 'Alphanumérique, longueur variable',
    EAN13: 'Exactement 13 chiffres',
    UPC: 'Exactement 12 chiffres',
    CODE39: 'Majuscules, chiffres, - . $ / + % et espace'
  }
  return hints[barcodeType.value]
}

function generateBarcode() {
  if (!content.value || !barcodeCanvas.value) {
    error.value = 'Veuillez entrer un contenu'
    return
  }

  error.value = ''

  // Validation
  if (barcodeType.value === 'EAN13' && content.value.length !== 13) {
    error.value = 'EAN-13 doit contenir exactement 13 chiffres'
    return
  }
  if (barcodeType.value === 'UPC' && content.value.length !== 12) {
    error.value = 'UPC doit contenir exactement 12 chiffres'
    return
  }

  const canvas = barcodeCanvas.value
  const ctx = canvas.getContext('2d')

  // Canvas dimensions
  const barWidth = width.value
  const totalWidth = content.value.length * 12 * barWidth
  const textHeight = displayValue.value ? 30 : 0

  canvas.width = totalWidth + 40
  canvas.height = height.value + textHeight + 20

  // Background
  ctx.fillStyle = backgroundColor.value
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw bars (simplified barcode pattern)
  ctx.fillStyle = lineColor.value
  let x = 20

  for (let i = 0; i < content.value.length; i++) {
    const charCode = content.value.charCodeAt(i)
    const pattern = charCode % 2 === 0 ? [1, 0, 1, 0, 1] : [0, 1, 0, 1, 0]

    for (let j = 0; j < pattern.length; j++) {
      if (pattern[j] === 1) {
        ctx.fillRect(x, 10, barWidth * 2, height.value)
      }
      x += barWidth * 2
    }
  }

  // Display text
  if (displayValue.value) {
    ctx.fillStyle = lineColor.value
    ctx.font = '16px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(content.value, canvas.width / 2, canvas.height - 8)
  }
}

function downloadBarcode() {
  if (!barcodeCanvas.value || error.value) return
  barcodeCanvas.value.toBlob(blob => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `barcode_${content.value}.png`
    a.click()
    URL.revokeObjectURL(url)
  })
}

function downloadSVG() {
  const svg = `<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${backgroundColor.value}"/>
    <text x="50%" y="50%" font-size="14" text-anchor="middle" fill="${lineColor.value}">${content.value}</text>
  </svg>`

  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `barcode_${content.value}.svg`
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(() => {
  generateBarcode()
})
</script>
