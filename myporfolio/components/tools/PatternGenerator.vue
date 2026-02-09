<template>
  <div class="pattern-generator">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <!-- Controls -->
      <div class="space-y-4 sm:space-y-6">
        <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white mb-4">⚙️ Paramètres</h3>

        <!-- Pattern Type -->
        <div>
          <label class="block text-white mb-3">Type de motif</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="pattern in patterns"
              :key="pattern.id"
              @click="selectedPattern = pattern.id"
              :class="[
                'px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold transition-all',
                selectedPattern === pattern.id ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'
              ]"
            >
              {{ pattern.name }}
            </button>
          </div>
        </div>

        <!-- Primary Color -->
        <div>
          <label class="block text-white mb-2">Couleur primaire</label>
          <div class="flex items-center space-x-3">
            <input
              v-model="primaryColor"
              type="color"
              class="w-16 h-12 rounded-lg cursor-pointer border-2 border-white/20"
            />
            <input
              v-model="primaryColor"
              type="text"
              class="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        <!-- Secondary Color -->
        <div>
          <label class="block text-white mb-2">Couleur secondaire</label>
          <div class="flex items-center space-x-3">
            <input
              v-model="secondaryColor"
              type="color"
              class="w-16 h-12 rounded-lg cursor-pointer border-2 border-white/20"
            />
            <input
              v-model="secondaryColor"
              type="text"
              class="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        <!-- Size -->
        <div>
          <label class="block text-white mb-2">Taille: {{ size }}px</label>
          <input v-model.number="size" type="range" min="10" max="100" class="w-full accent-blue-500" />
        </div>

        <!-- Spacing -->
        <div>
          <label class="block text-white mb-2">Espacement: {{ spacing }}px</label>
          <input v-model.number="spacing" type="range" min="0" max="50" class="w-full accent-blue-500" />
        </div>

        <!-- Stroke Width -->
        <div>
          <label class="block text-white mb-2">Épaisseur: {{ strokeWidth }}px</label>
          <input v-model.number="strokeWidth" type="range" min="1" max="10" class="w-full accent-blue-500" />
        </div>

        <!-- Download -->
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            @click="downloadSVG"
            class="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            📥 Télécharger SVG
          </button>
          <button
            @click="copyCSS"
            class="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            📋 Copier CSS
          </button>
        </div>
      </div>

      <!-- Preview -->
      <div>
        <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white mb-4">👁️ Aperçu</h3>
        <div class="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]" v-html="svgPattern"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedPattern = ref('dots')
const primaryColor = ref('#3B82F6')
const secondaryColor = ref('#ffffff')
const size = ref(20)
const spacing = ref(10)
const strokeWidth = ref(2)

const patterns = [
  { id: 'dots', name: '⚪ Points' },
  { id: 'lines', name: '📏 Lignes' },
  { id: 'grid', name: '# Grille' },
  { id: 'diagonal', name: '⟋ Diagonales' },
  { id: 'waves', name: '〰️ Vagues' },
  { id: 'zigzag', name: '⚡ Zigzag' }
]

const svgPattern = computed(() => {
  const totalSize = size.value + spacing.value

  let patternContent = ''

  switch (selectedPattern.value) {
    case 'dots':
      patternContent = `<circle cx="${size.value / 2}" cy="${size.value / 2}" r="${size.value / 4}" fill="${primaryColor.value}"/>`
      break

    case 'lines':
      patternContent = `<line x1="0" y1="${size.value / 2}" x2="${size.value}" y2="${size.value / 2}" stroke="${primaryColor.value}" stroke-width="${strokeWidth.value}"/>`
      break

    case 'grid':
      patternContent = `
        <line x1="0" y1="0" x2="${size.value}" y2="0" stroke="${primaryColor.value}" stroke-width="${strokeWidth.value}"/>
        <line x1="0" y1="0" x2="0" y2="${size.value}" stroke="${primaryColor.value}" stroke-width="${strokeWidth.value}"/>`
      break

    case 'diagonal':
      patternContent = `<line x1="0" y1="0" x2="${size.value}" y2="${size.value}" stroke="${primaryColor.value}" stroke-width="${strokeWidth.value}"/>`
      break

    case 'waves':
      patternContent = `<path d="M0,${size.value / 2} Q${size.value / 4},0 ${size.value / 2},${size.value / 2} T${size.value},${size.value / 2}" stroke="${primaryColor.value}" stroke-width="${strokeWidth.value}" fill="none"/>`
      break

    case 'zigzag':
      patternContent = `<polyline points="0,${size.value} ${size.value / 2},0 ${size.value},${size.value}" stroke="${primaryColor.value}" stroke-width="${strokeWidth.value}" fill="none"/>`
      break
  }

  return `
<svg width="100%" height="100%">
  <defs>
    <pattern id="pattern" x="0" y="0" width="${totalSize}" height="${totalSize}" patternUnits="userSpaceOnUse">
      <rect width="${totalSize}" height="${totalSize}" fill="${secondaryColor.value}"/>
      ${patternContent}
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#pattern)"/>
</svg>`
})

const cssCode = computed(() => {
  const encoded = btoa(svgPattern.value)
  return `background-image: url('data:image/svg+xml;base64,${encoded}');`
})

function downloadSVG() {
  const blob = new Blob([svgPattern.value], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pattern-${selectedPattern.value}.svg`
  a.click()
  URL.revokeObjectURL(url)
}

function copyCSS() {
  navigator.clipboard.writeText(cssCode.value)
  alert('CSS copié !')
}
</script>
