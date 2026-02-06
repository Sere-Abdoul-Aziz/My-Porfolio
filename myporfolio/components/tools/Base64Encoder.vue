<template>
  <div class="base64-encoder">
    <div class="mb-6 flex justify-center gap-4">
      <button
        @click="mode = 'encode'"
        :class="[
          'px-8 py-3 rounded-lg font-bold transition-all',
          mode === 'encode' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'
        ]"
      >
        🔐 Encoder
      </button>
      <button
        @click="mode = 'decode'"
        :class="[
          'px-8 py-3 rounded-lg font-bold transition-all',
          mode === 'decode' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'
        ]"
      >
        🔓 Décoder
      </button>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Input -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-white">📝 {{ mode === 'encode' ? 'Texte Original' : 'Base64' }}</h3>
          <button
            @click="pasteFromClipboard"
            class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Coller
          </button>
        </div>
        <textarea
          v-model="input"
          @input="process"
          :placeholder="mode === 'encode' ? 'Entrez le texte à encoder...' : 'Entrez le Base64 à décoder...'"
          class="w-full h-96 bg-gray-800 text-gray-100 p-4 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm resize-none"
        ></textarea>
      </div>

      <!-- Output -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-white">✨ {{ mode === 'encode' ? 'Base64' : 'Texte Décodé' }}</h3>
          <button
            @click="copyToClipboard"
            :disabled="!output"
            class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Copier
          </button>
        </div>
        <textarea
          v-model="output"
          readonly
          :placeholder="mode === 'encode' ? 'Le Base64 apparaîtra ici...' : 'Le texte décodé apparaîtra ici...'"
          :class="[
            'w-full h-96 p-4 rounded-lg border font-mono text-sm resize-none',
            error ? 'bg-gray-800 text-red-400 border-red-500' : 'bg-gray-800 text-green-400 border-gray-600'
          ]"
        ></textarea>
      </div>
    </div>

    <!-- File Upload for encoding -->
    <div v-if="mode === 'encode'" class="mt-6">
      <div class="bg-white/10 rounded-xl p-6">
        <h4 class="text-white font-bold mb-3">📁 Encoder un fichier</h4>
        <input
          ref="fileInput"
          type="file"
          @change="handleFileUpload"
          class="block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
        />
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex items-center justify-center gap-4">
      <button
        @click="process"
        :disabled="!input"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        {{ mode === 'encode' ? '🔐 Encoder' : '🔓 Décoder' }}
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
import { ref, watch } from 'vue'

const mode = ref('encode')
const input = ref('')
const output = ref('')
const error = ref(false)
const fileInput = ref(null)

watch(mode, () => {
  clear()
})

function process() {
  error.value = false

  if (!input.value) {
    output.value = ''
    return
  }

  try {
    if (mode.value === 'encode') {
      output.value = btoa(unescape(encodeURIComponent(input.value)))
    } else {
      output.value = decodeURIComponent(escape(atob(input.value)))
    }
  } catch (e) {
    error.value = true
    output.value = `Erreur: ${e.message}`
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = e => {
    const base64 = e.target.result.split(',')[1]
    output.value = base64
    input.value = `Fichier: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`
  }
  reader.readAsDataURL(file)
}

function clear() {
  input.value = ''
  output.value = ''
  error.value = false
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText()
    input.value = text
    process()
  } catch (err) {
    alert('Erreur lors de la lecture du presse-papiers')
  }
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(output.value)
    alert('Copié !')
  } catch (err) {
    alert('Erreur lors de la copie')
  }
}
</script>
