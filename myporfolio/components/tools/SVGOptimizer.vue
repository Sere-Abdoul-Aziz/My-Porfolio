<template>
  <div class="svg-optimizer">
    <!-- Upload Area -->
    <div
      @drop.prevent="handleDrop"
      @dragover.prevent
      class="border-2 border-dashed border-blue-400 rounded-lg sm:rounded-xl p-6 sm:p-8 lg:p-12 text-center hover:border-blue-300 transition-colors cursor-pointer mb-6"
      @click="$refs.fileInput.click()"
    >
      <input ref="fileInput" type="file" accept=".svg,image/svg+xml" @change="handleFileSelect" class="hidden" />
      <div v-if="!originalSVG" class="text-gray-300">
        <p class="text-2xl sm:text-3xl lg:text-4xl mb-4">🎨</p>
        <p class="text-base sm:text-lg lg:text-xl mb-2">Glissez un fichier SVG ou cliquez pour choisir</p>
        <p class="text-sm text-gray-500">Optimisation et nettoyage de SVG</p>
      </div>
      <div v-else class="text-gray-300">
        <p class="text-2xl mb-2">✅ {{ fileName }}</p>
        <p class="text-sm text-gray-500">Cliquez pour charger un autre fichier</p>
      </div>
    </div>

    <!-- Optimization Options -->
    <div v-if="originalSVG" class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
      <div class="bg-white/10 rounded-lg p-4 flex items-center justify-between">
        <span class="text-white font-semibold">Supprimer les commentaires</span>
        <button
          @click="options.removeComments = !options.removeComments"
          :class="['w-12 h-6 rounded-full transition-colors', options.removeComments ? 'bg-blue-500' : 'bg-gray-600']"
        >
          <div
            :class="[
              'w-5 h-5 bg-white rounded-full transform transition-transform',
              options.removeComments ? 'translate-x-6' : 'translate-x-1'
            ]"
          ></div>
        </button>
      </div>

      <div class="bg-white/10 rounded-lg p-4 flex items-center justify-between">
        <span class="text-white font-semibold">Supprimer les métadonnées</span>
        <button
          @click="options.removeMetadata = !options.removeMetadata"
          :class="['w-12 h-6 rounded-full transition-colors', options.removeMetadata ? 'bg-blue-500' : 'bg-gray-600']"
        >
          <div
            :class="[
              'w-5 h-5 bg-white rounded-full transform transition-transform',
              options.removeMetadata ? 'translate-x-6' : 'translate-x-1'
            ]"
          ></div>
        </button>
      </div>

      <div class="bg-white/10 rounded-lg p-4 flex items-center justify-between">
        <span class="text-white font-semibold">Optimiser les paths</span>
        <button
          @click="options.optimizePaths = !options.optimizePaths"
          :class="['w-12 h-6 rounded-full transition-colors', options.optimizePaths ? 'bg-blue-500' : 'bg-gray-600']"
        >
          <div
            :class="[
              'w-5 h-5 bg-white rounded-full transform transition-transform',
              options.optimizePaths ? 'translate-x-6' : 'translate-x-1'
            ]"
          ></div>
        </button>
      </div>

      <div class="bg-white/10 rounded-lg p-4 flex items-center justify-between">
        <span class="text-white font-semibold">Supprimer les espaces</span>
        <button
          @click="options.removeWhitespace = !options.removeWhitespace"
          :class="['w-12 h-6 rounded-full transition-colors', options.removeWhitespace ? 'bg-blue-500' : 'bg-gray-600']"
        >
          <div
            :class="[
              'w-5 h-5 bg-white rounded-full transform transition-transform',
              options.removeWhitespace ? 'translate-x-6' : 'translate-x-1'
            ]"
          ></div>
        </button>
      </div>
    </div>

    <!-- Comparison -->
    <div v-if="originalSVG && optimizedSVG" class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
      <!-- Original -->
      <div>
        <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white mb-3">📄 Original</h3>
        <div class="bg-white/10 rounded-xl p-6">
          <div class="bg-white rounded-lg p-4 mb-4 flex items-center justify-center min-h-[200px]" v-html="originalSVG"></div>
          <div class="text-gray-300 text-sm space-y-2">
            <div class="flex justify-between">
              <span>Taille:</span>
              <span class="text-white font-mono">{{ formatFileSize(originalSize) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Caractères:</span>
              <span class="text-white font-mono">{{ originalSVG.length }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Optimized -->
      <div>
        <h3 class="text-xl font-bold text-white mb-3">✨ Optimisé</h3>
        <div class="bg-white/10 rounded-xl p-6">
          <div class="bg-white rounded-lg p-4 mb-4 flex items-center justify-center min-h-[200px]" v-html="optimizedSVG"></div>
          <div class="text-gray-300 text-sm space-y-2">
            <div class="flex justify-between">
              <span>Taille:</span>
              <span class="text-green-400 font-mono">{{ formatFileSize(optimizedSize) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Caractères:</span>
              <span class="text-green-400 font-mono">{{ optimizedSVG.length }}</span>
            </div>
            <div class="flex justify-between">
              <span>Réduction:</span>
              <span class="text-green-400 font-bold">{{ reduction }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div v-if="originalSVG" class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
      <button
        @click="optimize"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        ✨ Optimiser SVG
      </button>
      <button
        @click="downloadOptimized"
        :disabled="!optimizedSVG"
        class="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        💾 Télécharger
      </button>
      <button
        @click="copyOptimized"
        :disabled="!optimizedSVG"
        class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        📋 Copier Code
      </button>
      <button @click="clear" class="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
        🗑️ Effacer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const originalSVG = ref('')
const optimizedSVG = ref('')
const fileName = ref('')
const fileInput = ref(null)

const options = ref({
  removeComments: true,
  removeMetadata: true,
  optimizePaths: true,
  removeWhitespace: true
})

const originalSize = computed(() => new Blob([originalSVG.value]).size)
const optimizedSize = computed(() => new Blob([optimizedSVG.value || '']).size)
const reduction = computed(() => {
  if (!optimizedSVG.value) return 0
  return Math.round(((originalSize.value - optimizedSize.value) / originalSize.value) * 100)
})

function handleFileSelect(event) {
  const file = event.target.files[0]
  if (file) processFile(file)
}

function handleDrop(event) {
  const file = event.dataTransfer.files[0]
  if (file && file.type === 'image/svg+xml') processFile(file)
}

function processFile(file) {
  fileName.value = file.name
  const reader = new FileReader()
  reader.onload = e => {
    originalSVG.value = e.target.result
    optimize()
  }
  reader.readAsText(file)
}

function optimize() {
  let svg = originalSVG.value

  if (options.value.removeComments) {
    svg = svg.replace(/<!--[\s\S]*?-->/g, '')
  }

  if (options.value.removeMetadata) {
    svg = svg.replace(/<metadata[\s\S]*?<\/metadata>/gi, '')
    svg = svg.replace(/<title[\s\S]*?<\/title>/gi, '')
    svg = svg.replace(/<desc[\s\S]*?<\/desc>/gi, '')
  }

  if (options.value.optimizePaths) {
    // Remove unnecessary decimals
    svg = svg.replace(/(\d+\.\d{3,})/g, match => parseFloat(match).toFixed(2))
  }

  if (options.value.removeWhitespace) {
    svg = svg.replace(/>\s+</g, '><')
    svg = svg.replace(/\s{2,}/g, ' ')
    svg = svg.trim()
  }

  optimizedSVG.value = svg
}

function downloadOptimized() {
  const blob = new Blob([optimizedSVG.value], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `optimized_${fileName.value}`
  a.click()
  URL.revokeObjectURL(url)
}

async function copyOptimized() {
  try {
    await navigator.clipboard.writeText(optimizedSVG.value)
    alert('Code SVG copié !')
  } catch (err) {
    alert('Erreur lors de la copie')
  }
}

function clear() {
  originalSVG.value = ''
  optimizedSVG.value = ''
  fileName.value = ''
  if (fileInput.value) fileInput.value.value = ''
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB'
  else return (bytes / 1048576).toFixed(2) + ' MB'
}
</script>
