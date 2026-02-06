<template>
  <div class="url-encoder">
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

    <div class="space-y-6">
      <!-- Input -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-white">📝 {{ mode === 'encode' ? 'URL Original' : 'URL Encodé' }}</h3>
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
          :placeholder="
            mode === 'encode'
              ? 'https://example.com/search?q=développeur fullstack&location=Burkina Faso'
              : 'https://example.com/search?q=d%C3%A9veloppeur%20fullstack&location=Burkina%20Faso'
          "
          class="w-full h-32 bg-gray-800 text-gray-100 p-4 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm resize-none"
        ></textarea>
      </div>

      <!-- Output -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-white">✨ {{ mode === 'encode' ? 'URL Encodé' : 'URL Décodé' }}</h3>
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
          :placeholder="mode === 'encode' ? 'L\'URL encodé apparaîtra ici...' : 'L\'URL décodé apparaîtra ici...'"
          class="w-full h-32 bg-gray-800 text-green-400 p-4 rounded-lg border border-gray-600 font-mono text-sm resize-none"
        ></textarea>
      </div>

      <!-- Examples -->
      <div class="bg-white/10 rounded-xl p-6">
        <h4 class="text-white font-bold mb-4">💡 Exemples de caractères encodés</h4>
        <div class="grid md:grid-cols-3 gap-4 text-sm">
          <div class="bg-gray-800 rounded-lg p-3">
            <div class="text-gray-400 mb-1">Espace</div>
            <div class="text-white font-mono">%20</div>
          </div>
          <div class="bg-gray-800 rounded-lg p-3">
            <div class="text-gray-400 mb-1">É</div>
            <div class="text-white font-mono">%C3%89</div>
          </div>
          <div class="bg-gray-800 rounded-lg p-3">
            <div class="text-gray-400 mb-1">&</div>
            <div class="text-white font-mono">%26</div>
          </div>
          <div class="bg-gray-800 rounded-lg p-3">
            <div class="text-gray-400 mb-1">?</div>
            <div class="text-white font-mono">%3F</div>
          </div>
          <div class="bg-gray-800 rounded-lg p-3">
            <div class="text-gray-400 mb-1">=</div>
            <div class="text-white font-mono">%3D</div>
          </div>
          <div class="bg-gray-800 rounded-lg p-3">
            <div class="text-gray-400 mb-1">#</div>
            <div class="text-white font-mono">%23</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex items-center justify-center gap-4">
      <button
        @click="process"
        :disabled="!input"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        {{ mode === 'encode' ? '🔐 Encoder URL' : '🔓 Décoder URL' }}
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

watch(mode, () => {
  clear()
})

function process() {
  if (!input.value) {
    output.value = ''
    return
  }

  try {
    if (mode.value === 'encode') {
      output.value = encodeURIComponent(input.value)
    } else {
      output.value = decodeURIComponent(input.value)
    }
  } catch (e) {
    output.value = `Erreur: ${e.message}`
  }
}

function clear() {
  input.value = ''
  output.value = ''
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
    alert('URL copié !')
  } catch (err) {
    alert('Erreur lors de la copie')
  }
}
</script>
