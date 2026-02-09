<template>
  <div class="css-minifier">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <!-- Input -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white">📝 CSS Original</h3>
          <button
            @click="pasteFromClipboard('input')"
            class="bg-gray-700 hover:bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors"
          >
            📋 Coller
          </button>
        </div>
        <textarea
          v-model="inputCSS"
          placeholder="Collez votre CSS ici..."
          class="w-full h-64 sm:h-80 lg:h-96 bg-gray-800 text-gray-100 p-3 sm:p-4 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-xs sm:text-sm resize-none"
        ></textarea>
        <div class="mt-2 sm:mt-3 text-gray-400 text-xs sm:text-sm">
          Taille: {{ inputSize }} caractères ({{ (inputSize / 1024).toFixed(2) }} KB)
        </div>
      </div>

      <!-- Output -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white">✨ CSS Minifié</h3>
          <button
            @click="copyToClipboard"
            :disabled="!minifiedCSS"
            class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors"
          >
            📋 Copier
          </button>
        </div>
        <textarea
          v-model="minifiedCSS"
          readonly
          placeholder="Le CSS minifié apparaîtra ici..."
          class="w-full h-64 sm:h-80 lg:h-96 bg-gray-800 text-green-400 p-3 sm:p-4 rounded-lg border border-gray-600 font-mono text-xs sm:text-sm resize-none"
        ></textarea>
        <div class="mt-2 sm:mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div class="text-gray-400 text-xs sm:text-sm">
            Taille: {{ outputSize }} caractères ({{ (outputSize / 1024).toFixed(2) }} KB)
          </div>
          <div v-if="reduction > 0" class="text-green-400 text-sm font-semibold">
            ⚡ Réduction: {{ reduction }}%
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex items-center justify-center gap-4">
      <button
        @click="minify"
        :disabled="!inputCSS"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        🚀 Minifier CSS
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

const inputCSS = ref('')
const minifiedCSS = ref('')

const inputSize = computed(() => inputCSS.value.length)
const outputSize = computed(() => minifiedCSS.value.length)
const reduction = computed(() => {
  if (inputSize.value === 0) return 0
  return Math.round(((inputSize.value - outputSize.value) / inputSize.value) * 100)
})

function minify() {
  let css = inputCSS.value

  // Remove comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, '')

  // Remove whitespace
  css = css.replace(/\s+/g, ' ')

  // Remove spaces around special characters
  css = css.replace(/\s*{\s*/g, '{')
  css = css.replace(/\s*}\s*/g, '}')
  css = css.replace(/\s*:\s*/g, ':')
  css = css.replace(/\s*;\s*/g, ';')
  css = css.replace(/\s*,\s*/g, ',')
  css = css.replace(/\s*>\s*/g, '>')
  css = css.replace(/\s*\+\s*/g, '+')
  css = css.replace(/\s*~\s*/g, '~')

  // Remove last semicolon in blocks
  css = css.replace(/;}/g, '}')

  // Remove unnecessary zeros
  css = css.replace(/(:|\s)0+\.(\d+)/g, '$1.$2')

  minifiedCSS.value = css.trim()
}

function clear() {
  inputCSS.value = ''
  minifiedCSS.value = ''
}

async function pasteFromClipboard(target) {
  try {
    const text = await navigator.clipboard.readText()
    if (target === 'input') {
      inputCSS.value = text
    }
  } catch (err) {
    alert('Erreur lors de la lecture du presse-papiers')
  }
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(minifiedCSS.value)
    alert('CSS minifié copié !')
  } catch (err) {
    alert('Erreur lors de la copie')
  }
}
</script>
