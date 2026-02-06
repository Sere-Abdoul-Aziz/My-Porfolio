<template>
  <div class="json-validator">
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Input -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-white">📝 JSON à Valider</h3>
          <button
            @click="pasteFromClipboard"
            class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Coller
          </button>
        </div>
        <textarea
          v-model="inputJSON"
          @input="validate"
          placeholder='{"nom": "Sere Aziz", "métier": "Développeur Fullstack"}'
          class="w-full h-96 bg-gray-800 text-gray-100 p-4 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm resize-none"
        ></textarea>
      </div>

      <!-- Output -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-white">✨ JSON Formaté</h3>
          <button
            @click="copyToClipboard"
            :disabled="!isValid"
            class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Copier
          </button>
        </div>
        <textarea
          v-model="formattedJSON"
          readonly
          placeholder="Le JSON formaté et validé apparaîtra ici..."
          :class="[
            'w-full h-96 p-4 rounded-lg border font-mono text-sm resize-none',
            isValid ? 'bg-gray-800 text-green-400 border-green-500' : 'bg-gray-800 text-red-400 border-red-500'
          ]"
        ></textarea>
      </div>
    </div>

    <!-- Validation Status -->
    <div class="mt-6">
      <div
        v-if="validationMessage"
        :class="[
          'p-6 rounded-xl font-semibold text-lg',
          isValid ? 'bg-green-500/20 text-green-400 border-2 border-green-500' : 'bg-red-500/20 text-red-400 border-2 border-red-500'
        ]"
      >
        <div class="flex items-center gap-3">
          <span class="text-3xl">{{ isValid ? '✅' : '❌' }}</span>
          <div>
            <div>{{ validationMessage }}</div>
            <div v-if="jsonStats && isValid" class="text-sm mt-2 opacity-80">
              {{ jsonStats.keys }} clés • {{ jsonStats.depth }} niveaux de profondeur • {{ jsonStats.size }} caractères
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex items-center justify-center gap-4">
      <button
        @click="validate"
        :disabled="!inputJSON"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        🔍 Valider JSON
      </button>
      <button
        @click="minify"
        :disabled="!isValid"
        class="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        📦 Minifier
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

const inputJSON = ref('')
const formattedJSON = ref('')
const isValid = ref(false)
const validationMessage = ref('')
const jsonStats = ref(null)

function validate() {
  if (!inputJSON.value.trim()) {
    formattedJSON.value = ''
    validationMessage.value = ''
    isValid.value = false
    return
  }

  try {
    const parsed = JSON.parse(inputJSON.value)
    formattedJSON.value = JSON.stringify(parsed, null, 2)
    isValid.value = true
    validationMessage.value = '✅ JSON valide !'

    // Calculate stats
    const keys = countKeys(parsed)
    const depth = getDepth(parsed)
    const size = JSON.stringify(parsed).length

    jsonStats.value = { keys, depth, size }
  } catch (error) {
    isValid.value = false
    formattedJSON.value = error.message
    validationMessage.value = `❌ Erreur de syntaxe: ${error.message}`
    jsonStats.value = null
  }
}

function countKeys(obj, count = 0) {
  if (typeof obj !== 'object' || obj === null) return count
  
  for (const key in obj) {
    count++
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      count = countKeys(obj[key], count)
    }
  }
  return count
}

function getDepth(obj, depth = 1) {
  if (typeof obj !== 'object' || obj === null) return depth
  
  let maxDepth = depth
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const currentDepth = getDepth(obj[key], depth + 1)
      maxDepth = Math.max(maxDepth, currentDepth)
    }
  }
  return maxDepth
}

function minify() {
  if (!isValid.value) return
  try {
    const parsed = JSON.parse(inputJSON.value)
    formattedJSON.value = JSON.stringify(parsed)
  } catch (error) {
    // Already validated, shouldn't happen
  }
}

function clear() {
  inputJSON.value = ''
  formattedJSON.value = ''
  validationMessage.value = ''
  isValid.value = false
  jsonStats.value = null
}

async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText()
    inputJSON.value = text
    validate()
  } catch (err) {
    alert('Erreur lors de la lecture du presse-papiers')
  }
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(formattedJSON.value)
    alert('JSON copié !')
  } catch (err) {
    alert('Erreur lors de la copie')
  }
}
</script>
