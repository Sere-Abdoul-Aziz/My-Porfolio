<template>
  <div class="neumorphism-generator">
    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Controls -->
      <div class="space-y-6">
        <h3 class="text-xl font-bold text-white mb-4">⚙️ Paramètres</h3>

        <!-- Background Color -->
        <div>
          <label class="block text-white mb-2">Couleur de fond</label>
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
          </div>
        </div>

        <!-- Shape Type -->
        <div>
          <label class="block text-white mb-2">Type de forme</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="shapeType = 'flat'"
              :class="[
                'px-4 py-3 rounded-lg font-semibold transition-all',
                shapeType === 'flat' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'
              ]"
            >
              Plat
            </button>
            <button
              @click="shapeType = 'concave'"
              :class="[
                'px-4 py-3 rounded-lg font-semibold transition-all',
                shapeType === 'concave' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'
              ]"
            >
              Concave
            </button>
            <button
              @click="shapeType = 'convex'"
              :class="[
                'px-4 py-3 rounded-lg font-semibold transition-all',
                shapeType === 'convex' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'
              ]"
            >
              Convexe
            </button>
            <button
              @click="shapeType = 'pressed'"
              :class="[
                'px-4 py-3 rounded-lg font-semibold transition-all',
                shapeType === 'pressed' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'
              ]"
            >
              Pressé
            </button>
          </div>
        </div>

        <!-- Blur -->
        <div>
          <label class="block text-white mb-2">Intensité de l'ombre: {{ blur }}px</label>
          <input v-model.number="blur" type="range" min="5" max="60" class="w-full accent-blue-500" />
        </div>

        <!-- Distance -->
        <div>
          <label class="block text-white mb-2">Distance: {{ distance }}px</label>
          <input v-model.number="distance" type="range" min="5" max="50" class="w-full accent-blue-500" />
        </div>

        <!-- Intensity -->
        <div>
          <label class="block text-white mb-2">Intensité: {{ intensity }}%</label>
          <input v-model.number="intensity" type="range" min="0" max="100" class="w-full accent-blue-500" />
        </div>

        <!-- Border Radius -->
        <div>
          <label class="block text-white mb-2">Arrondi: {{ borderRadius }}px</label>
          <input v-model.number="borderRadius" type="range" min="0" max="100" class="w-full accent-blue-500" />
        </div>

        <!-- Size -->
        <div>
          <label class="block text-white mb-2">Taille: {{ size }}px</label>
          <input v-model.number="size" type="range" min="100" max="400" step="10" class="w-full accent-blue-500" />
        </div>

        <!-- Code CSS -->
        <div class="bg-gray-800 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-white font-semibold">Code CSS</h4>
            <button
              @click="copyCSS"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              📋 Copier
            </button>
          </div>
          <pre class="text-gray-300 text-sm overflow-x-auto"><code>{{ cssCode }}</code></pre>
        </div>
      </div>

      <!-- Preview -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">👁️ Aperçu</h3>
        <div
          class="w-full h-[600px] rounded-xl flex items-center justify-center p-8"
          :style="{ backgroundColor: bgColor }"
        >
          <div :style="neuStyle" class="flex items-center justify-center">
            <div class="text-center">
              <div class="text-6xl mb-4">🎨</div>
              <p class="text-lg font-semibold" :style="{ color: textColor }">Neumorphism</p>
            </div>
          </div>
        </div>

        <!-- Templates -->
        <div class="mt-6">
          <h4 class="text-white font-semibold mb-3">📦 Templates prédéfinis</h4>
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="applyTemplate('soft')"
              class="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-colors text-sm"
            >
              🌤️ Doux
            </button>
            <button
              @click="applyTemplate('hard')"
              class="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-colors text-sm"
            >
              💎 Dur
            </button>
            <button
              @click="applyTemplate('minimal')"
              class="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-colors text-sm"
            >
              ✨ Minimal
            </button>
            <button
              @click="applyTemplate('bold')"
              class="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-colors text-sm"
            >
              💪 Bold
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const bgColor = ref('#e0e5ec')
const shapeType = ref('flat')
const blur = ref(30)
const distance = ref(15)
const intensity = ref(15)
const borderRadius = ref(50)
const size = ref(200)

function lightenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = ((num >> 8) & 0x00ff) + amt
  const B = (num & 0x0000ff) + amt
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

function darkenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) - amt
  const G = ((num >> 8) & 0x00ff) - amt
  const B = (num & 0x0000ff) - amt
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

const neuStyle = computed(() => {
  const lightShadow = lightenColor(bgColor.value, intensity.value)
  const darkShadow = darkenColor(bgColor.value, intensity.value * 0.8)

  let boxShadow = ''

  switch (shapeType.value) {
    case 'flat':
      boxShadow = `${distance.value}px ${distance.value}px ${blur.value}px ${darkShadow}, -${distance.value}px -${distance.value}px ${blur.value}px ${lightShadow}`
      break
    case 'concave':
      boxShadow = `inset ${distance.value}px ${distance.value}px ${blur.value}px ${darkShadow}, inset -${distance.value}px -${distance.value}px ${blur.value}px ${lightShadow}`
      break
    case 'convex':
      boxShadow = `${distance.value}px ${distance.value}px ${blur.value}px ${darkShadow}, -${distance.value}px -${distance.value}px ${blur.value}px ${lightShadow}, inset -2px -2px 4px ${darkShadow}, inset 2px 2px 4px ${lightShadow}`
      break
    case 'pressed':
      boxShadow = `inset ${distance.value}px ${distance.value}px ${blur.value}px ${darkShadow}, inset -${distance.value}px -${distance.value}px ${blur.value}px ${lightShadow}`
      break
  }

  return {
    width: `${size.value}px`,
    height: `${size.value}px`,
    backgroundColor: bgColor.value,
    borderRadius: `${borderRadius.value}px`,
    boxShadow
  }
})

const textColor = computed(() => {
  const num = parseInt(bgColor.value.replace('#', ''), 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#333333' : '#FFFFFF'
})

const cssCode = computed(() => {
  const lightShadow = lightenColor(bgColor.value, intensity.value)
  const darkShadow = darkenColor(bgColor.value, intensity.value * 0.8)

  let boxShadow = ''
  switch (shapeType.value) {
    case 'flat':
      boxShadow = `${distance.value}px ${distance.value}px ${blur.value}px ${darkShadow},\n  -${distance.value}px -${distance.value}px ${blur.value}px ${lightShadow}`
      break
    case 'concave':
      boxShadow = `inset ${distance.value}px ${distance.value}px ${blur.value}px ${darkShadow},\n  inset -${distance.value}px -${distance.value}px ${blur.value}px ${lightShadow}`
      break
    case 'convex':
      boxShadow = `${distance.value}px ${distance.value}px ${blur.value}px ${darkShadow},\n  -${distance.value}px -${distance.value}px ${blur.value}px ${lightShadow},\n  inset -2px -2px 4px ${darkShadow},\n  inset 2px 2px 4px ${lightShadow}`
      break
    case 'pressed':
      boxShadow = `inset ${distance.value}px ${distance.value}px ${blur.value}px ${darkShadow},\n  inset -${distance.value}px -${distance.value}px ${blur.value}px ${lightShadow}`
      break
  }

  return `.neumorphism {
  background: ${bgColor.value};
  border-radius: ${borderRadius.value}px;
  box-shadow: ${boxShadow};
}`
})

function applyTemplate(template) {
  const templates = {
    soft: { blur: 20, distance: 10, intensity: 10, borderRadius: 50 },
    hard: { blur: 40, distance: 20, intensity: 20, borderRadius: 30 },
    minimal: { blur: 15, distance: 8, intensity: 8, borderRadius: 20 },
    bold: { blur: 50, distance: 25, intensity: 25, borderRadius: 60 }
  }

  const selected = templates[template]
  blur.value = selected.blur
  distance.value = selected.distance
  intensity.value = selected.intensity
  borderRadius.value = selected.borderRadius
}

function copyCSS() {
  navigator.clipboard.writeText(cssCode.value)
  alert('Code CSS copié !')
}
</script>
