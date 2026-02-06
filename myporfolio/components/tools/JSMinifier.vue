<template>
  <div class="js-minifier">
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Input -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-white">📝 JavaScript Original</h3>
          <button
            @click="pasteFromClipboard"
            class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Coller
          </button>
        </div>
        <textarea
          v-model="inputJS"
          placeholder="Collez votre JavaScript ici..."
          class="w-full h-96 bg-gray-800 text-gray-100 p-4 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm resize-none"
        ></textarea>
        <div class="mt-3 text-gray-400 text-sm">
          Taille: {{ inputSize }} caractères ({{ (inputSize / 1024).toFixed(2) }} KB)
        </div>
      </div>

      <!-- Output -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-white">✨ JavaScript Minifié</h3>
          <button
            @click="copyToClipboard"
            :disabled="!minifiedJS"
            class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Copier
          </button>
        </div>
        <textarea
          v-model="minifiedJS"
          readonly
          placeholder="Le JavaScript minifié apparaîtra ici..."
          class="w-full h-96 bg-gray-800 text-green-400 p-4 rounded-lg border border-gray-600 font-mono text-sm resize-none"
        ></textarea>
        <div class="mt-3 flex items-center justify-between">
          <div class="text-gray-400 text-sm">
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
        :disabled="!inputJS"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        🚀 Minifier JavaScript
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

const inputJS = ref('')
const minifiedJS = ref('')

const inputSize = computed(() => inputJS.value.length)
const outputSize = computed(() => minifiedJS.value.length)
const reduction = computed(() => {
  if (inputSize.value === 0) return 0
  return Math.round(((inputSize.value - outputSize.value) / inputSize.value) * 100)
})

function minify() {
  let js = inputJS.value

  // Remove single-line comments (but preserve URLs)
  js = js.replace(/([^:]|^)\/\/.*$/gm, '$1')

  // Remove multi-line comments
  js = js.replace(/\/\*[\s\S]*?\*\//g, '')

  // Remove extra whitespace
  js = js.replace(/\s+/g, ' ')

  // Remove spaces around operators and punctuation
  js = js.replace(/\s*([{};:,=<>!+\-*\/&|?()[\]])\s*/g, '$1')

  // Remove unnecessary semicolons before closing braces
  js = js.replace(/;}/g, '}')

  minifiedJS.value = js.trim()
}

function clear() {
  inputJS.value = ''
  minifiedJS.value = ''
}

async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText()
    inputJS.value = text
  } catch (err) {
    alert('Erreur lors de la lecture du presse-papiers')
  }
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(minifiedJS.value)
    alert('JavaScript minifié copié !')
  } catch (err) {
    alert('Erreur lors de la copie')
  }
}
</script>
