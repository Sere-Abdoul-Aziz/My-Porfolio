<template>
  <div class="code-beautifier">
    <!-- Language Selection -->
    <div class="mb-6">
      <label class="block text-white mb-3 font-semibold">Langage</label>
      <div class="flex gap-3">
        <button
          v-for="lang in languages"
          :key="lang.id"
          @click="selectedLanguage = lang.id"
          :class="[
            'px-6 py-3 rounded-lg font-semibold transition-all',
            selectedLanguage === lang.id ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'
          ]"
        >
          {{ lang.icon }} {{ lang.name }}
        </button>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Input -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-white">📝 Code Non Formaté</h3>
          <button
            @click="pasteFromClipboard"
            class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Coller
          </button>
        </div>
        <textarea
          v-model="inputCode"
          placeholder="Collez votre code ici..."
          class="w-full h-96 bg-gray-800 text-gray-100 p-4 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm resize-none"
        ></textarea>
      </div>

      <!-- Output -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-white">✨ Code Formaté</h3>
          <button
            @click="copyToClipboard"
            :disabled="!beautifiedCode"
            class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Copier
          </button>
        </div>
        <textarea
          v-model="beautifiedCode"
          readonly
          placeholder="Le code formaté apparaîtra ici..."
          class="w-full h-96 bg-gray-800 text-green-400 p-4 rounded-lg border border-gray-600 font-mono text-sm resize-none"
        ></textarea>
      </div>
    </div>

    <!-- Settings -->
    <div class="mt-6 grid md:grid-cols-2 gap-4">
      <div class="bg-white/10 rounded-lg p-4">
        <label class="block text-white mb-2">Indentation</label>
        <select
          v-model="indentSize"
          class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="2">2 espaces</option>
          <option value="4">4 espaces</option>
          <option value="tab">Tabulation</option>
        </select>
      </div>

      <div class="bg-white/10 rounded-lg p-4 flex items-center justify-between">
        <span class="text-white font-semibold">Saut de ligne après {</span>
        <button
          @click="newlineAfterBrace = !newlineAfterBrace"
          :class="['w-12 h-6 rounded-full transition-colors', newlineAfterBrace ? 'bg-blue-500' : 'bg-gray-600']"
        >
          <div
            :class="[
              'w-5 h-5 bg-white rounded-full transform transition-transform',
              newlineAfterBrace ? 'translate-x-6' : 'translate-x-1'
            ]"
          ></div>
        </button>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex items-center justify-center gap-4">
      <button
        @click="beautify"
        :disabled="!inputCode"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        ✨ Formater le Code
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

const inputCode = ref('')
const beautifiedCode = ref('')
const selectedLanguage = ref('javascript')
const indentSize = ref('2')
const newlineAfterBrace = ref(true)

const languages = [
  { id: 'javascript', name: 'JavaScript', icon: '📜' },
  { id: 'css', name: 'CSS', icon: '🎨' },
  { id: 'html', name: 'HTML', icon: '🌐' },
  { id: 'json', name: 'JSON', icon: '📋' }
]

function beautify() {
  const indent = indentSize.value === 'tab' ? '\t' : ' '.repeat(parseInt(indentSize.value))
  let code = inputCode.value

  if (selectedLanguage.value === 'json') {
    try {
      const parsed = JSON.parse(code)
      beautifiedCode.value = JSON.stringify(parsed, null, indent)
    } catch (e) {
      beautifiedCode.value = 'Erreur: JSON invalide'
    }
    return
  }

  // Basic beautification for JS/CSS/HTML
  let level = 0
  let result = ''
  let inString = false
  let stringChar = ''

  for (let i = 0; i < code.length; i++) {
    const char = code[i]
    const nextChar = code[i + 1]

    // Handle strings
    if ((char === '"' || char === "'" || char === '`') && code[i - 1] !== '\\') {
      if (!inString) {
        inString = true
        stringChar = char
      } else if (char === stringChar) {
        inString = false
      }
    }

    if (!inString) {
      if (char === '{' || char === '[') {
        result += char
        if (newlineAfterBrace.value) {
          level++
          result += '\n' + indent.repeat(level)
        }
      } else if (char === '}' || char === ']') {
        level--
        result += '\n' + indent.repeat(level) + char
      } else if (char === ';' && selectedLanguage.value === 'javascript') {
        result += char + '\n' + indent.repeat(level)
      } else if (char === ',' && nextChar !== ' ') {
        result += char + ' '
      } else if (char === '\n' || char === '\r') {
        // Skip extra newlines
      } else if (char === ' ' && code[i - 1] === ' ') {
        // Skip multiple spaces
      } else {
        result += char
      }
    } else {
      result += char
    }
  }

  beautifiedCode.value = result.trim()
}

function clear() {
  inputCode.value = ''
  beautifiedCode.value = ''
}

async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText()
    inputCode.value = text
  } catch (err) {
    alert('Erreur lors de la lecture du presse-papiers')
  }
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(beautifiedCode.value)
    alert('Code formaté copié !')
  } catch (err) {
    alert('Erreur lors de la copie')
  }
}
</script>
