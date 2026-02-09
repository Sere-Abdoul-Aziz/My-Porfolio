<template>
  <div class="color-palette-generator">
    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Section Upload -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">📤 Charger une image</h3>
        <div class="space-y-4">
          <div
            @drop.prevent="handleDrop"
            @dragover.prevent
            class="border-2 border-dashed border-blue-400 rounded-xl p-8 text-center hover:border-blue-300 transition-colors cursor-pointer"
            @click="$refs.fileInput.click()"
          >
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleFileSelect"
              class="hidden"
            />
            <p class="text-gray-300 mb-2">📁 Glissez une image ou cliquez pour choisir</p>
            <p class="text-gray-500 text-sm">PNG, JPG, WebP acceptés</p>
          </div>

          <!-- Preview Image -->
          <div v-if="imageUrl" class="relative">
            <img :src="imageUrl" alt="Image chargée" class="w-full rounded-xl shadow-lg" />
            <button
              @click="clearImage"
              class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>

          <!-- Options -->
          <div v-if="imageUrl">
            <label class="block text-white mb-2">Nombre de couleurs</label>
            <input
              v-model.number="colorCount"
              type="range"
              min="3"
              max="10"
              class="w-full"
              @input="extractColors"
            />
            <div class="text-gray-300 text-sm mt-1">{{ colorCount }} couleurs</div>
          </div>
        </div>
      </div>

      <!-- Section Palette Extraite -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">🎨 Palette extraite</h3>
        <div v-if="extractedColors.length > 0" class="space-y-4">
          <div
            v-for="(color, index) in extractedColors"
            :key="index"
            class="flex items-center space-x-4 bg-white/10 rounded-lg p-3"
          >
            <div
              :style="{ backgroundColor: color }"
              class="w-16 h-16 rounded-lg shadow-lg border-2 border-white/20"
            ></div>
            <div class="flex-1">
              <div class="text-white font-mono font-bold">{{ color }}</div>
              <div class="text-gray-400 text-sm">{{ rgbToHsl(color) }}</div>
            </div>
            <button
              @click="copyColor(color)"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              📋 Copier
            </button>
          </div>
        </div>
        <div v-else class="text-gray-400 text-center py-12">
          <p>Aucune couleur extraite</p>
          <p class="text-sm mt-2">Chargez une image pour commencer</p>
        </div>
      </div>
    </div>

    <!-- Harmonies de couleurs -->
    <div v-if="extractedColors.length > 0" class="mt-8">
      <h3 class="text-xl font-bold text-white mb-4">🌈 Harmonies de couleurs</h3>
      <div class="space-y-4">
        <div v-for="harmony in harmonies" :key="harmony.name">
          <h4 class="text-white font-semibold mb-2">{{ harmony.name }}</h4>
          <div class="flex space-x-2">
            <div
              v-for="(color, idx) in harmony.colors"
              :key="idx"
              :style="{ backgroundColor: color }"
              class="flex-1 h-20 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
              @click="copyColor(color)"
              :title="`Cliquez pour copier ${color}`"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Export -->
    <div v-if="extractedColors.length > 0" class="mt-8">
      <h3 class="text-xl font-bold text-white mb-4">💾 Export</h3>
      <div class="grid md:grid-cols-3 gap-4">
        <button
          @click="exportAsCSS"
          class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          📄 Export CSS
        </button>
        <button
          @click="exportAsTailwind"
          class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          🎨 Export Tailwind
        </button>
        <button
          @click="exportAsJSON"
          class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          📦 Export JSON
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const imageUrl = ref('')
const extractedColors = ref([])
const colorCount = ref(5)
const fileInput = ref(null)

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
    extractColors()
  }
  reader.readAsDataURL(file)
}

function extractColors() {
  if (!imageUrl.value) return

  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    const colors = []
    const step = Math.floor(imageData.length / (colorCount.value * 1000))

    for (let i = 0; i < imageData.length; i += step * 4) {
      const r = imageData[i]
      const g = imageData[i + 1]
      const b = imageData[i + 2]
      const a = imageData[i + 3]
      if (a > 200) {
        colors.push({ r, g, b })
      }
    }

    // Algorithme de clustering simple (k-means simplifié)
    const clustered = kMeansClustering(colors, colorCount.value)
    extractedColors.value = clustered.map(c => `rgb(${c.r}, ${c.g}, ${c.b})`)
  }
  img.src = imageUrl.value
}

function kMeansClustering(colors, k) {
  // Initialiser k centres aléatoires
  let centers = colors.sort(() => Math.random() - 0.5).slice(0, k)

  for (let iteration = 0; iteration < 10; iteration++) {
    const clusters = Array.from({ length: k }, () => [])

    // Assigner chaque couleur au centre le plus proche
    colors.forEach(color => {
      let minDist = Infinity
      let closestCenter = 0

      centers.forEach((center, idx) => {
        const dist = Math.sqrt(
          Math.pow(color.r - center.r, 2) +
            Math.pow(color.g - center.g, 2) +
            Math.pow(color.b - center.b, 2)
        )
        if (dist < minDist) {
          minDist = dist
          closestCenter = idx
        }
      })

      clusters[closestCenter].push(color)
    })

    // Recalculer les centres
    centers = clusters.map(cluster => {
      if (cluster.length === 0) return { r: 0, g: 0, b: 0 }
      const sum = cluster.reduce(
        (acc, c) => ({
          r: acc.r + c.r,
          g: acc.g + c.g,
          b: acc.b + c.b
        }),
        { r: 0, g: 0, b: 0 }
      )
      return {
        r: Math.round(sum.r / cluster.length),
        g: Math.round(sum.g / cluster.length),
        b: Math.round(sum.b / cluster.length)
      }
    })
  }

  return centers
}

function rgbToHex(rgb) {
  const match = rgb.match(/\d+/g)
  if (!match) return rgb
  const [r, g, b] = match.map(Number)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}

function rgbToHsl(rgb) {
  const match = rgb.match(/\d+/g)
  if (!match) return rgb
  let [r, g, b] = match.map(Number)
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

const harmonies = computed(() => {
  if (extractedColors.value.length === 0) return []

  const baseColor = extractedColors.value[0]
  const match = baseColor.match(/\d+/g)
  if (!match) return []

  const [r, g, b] = match.map(Number)
  const hsl = rgbToHsl(baseColor)
  const hueMatch = hsl.match(/\d+/)
  const baseHue = hueMatch ? parseInt(hueMatch[0]) : 0

  return [
    {
      name: '🔄 Complémentaire',
      colors: [baseColor, hslToRgb((baseHue + 180) % 360, 70, 50)]
    },
    {
      name: '🔺 Triadique',
      colors: [
        baseColor,
        hslToRgb((baseHue + 120) % 360, 70, 50),
        hslToRgb((baseHue + 240) % 360, 70, 50)
      ]
    },
    {
      name: '◾ Tétradique',
      colors: [
        baseColor,
        hslToRgb((baseHue + 90) % 360, 70, 50),
        hslToRgb((baseHue + 180) % 360, 70, 50),
        hslToRgb((baseHue + 270) % 360, 70, 50)
      ]
    },
    {
      name: '📊 Analogues',
      colors: [
        hslToRgb((baseHue - 30) % 360, 70, 50),
        baseColor,
        hslToRgb((baseHue + 30) % 360, 70, 50)
      ]
    }
  ]
})

function hslToRgb(h, s, l) {
  s /= 100
  l /= 100
  const k = n => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return `rgb(${Math.round(255 * f(0))}, ${Math.round(255 * f(8))}, ${Math.round(255 * f(4))})`
}

function copyColor(color) {
  const hex = rgbToHex(color)
  navigator.clipboard.writeText(hex)
  alert(`Couleur ${hex} copiée !`)
}

function clearImage() {
  imageUrl.value = ''
  extractedColors.value = []
}

function exportAsCSS() {
  let css = ':root {\n'
  extractedColors.value.forEach((color, index) => {
    css += `  --color-${index + 1}: ${rgbToHex(color)};\n`
  })
  css += '}'
  downloadFile('palette.css', css)
}

function exportAsTailwind() {
  let config = 'module.exports = {\n  theme: {\n    extend: {\n      colors: {\n'
  extractedColors.value.forEach((color, index) => {
    config += `        'palette-${index + 1}': '${rgbToHex(color)}',\n`
  })
  config += '      }\n    }\n  }\n}'
  downloadFile('tailwind.config.js', config)
}

function exportAsJSON() {
  const json = extractedColors.value.map((color, index) => ({
    name: `color-${index + 1}`,
    hex: rgbToHex(color),
    rgb: color,
    hsl: rgbToHsl(color)
  }))
  downloadFile('palette.json', JSON.stringify(json, null, 2))
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
input[type='range'] {
  accent-color: #3b82f6;
}
</style>
