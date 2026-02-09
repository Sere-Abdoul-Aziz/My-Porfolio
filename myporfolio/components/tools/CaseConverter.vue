<template>
  <div class="case-converter">
    <!-- Input -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-3">
          <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white">📝 Texte à Convertir</h3>
        <button
          @click="pasteFromClipboard"
          class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          📋 Coller
        </button>
      </div>
      <textarea
        v-model="inputText"
        @input="convertAll"
        placeholder="Entrez votre texte ici..."
        class="w-full h-32 bg-gray-800 text-gray-100 p-4 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-base resize-none"
      ></textarea>
    </div>

    <!-- Conversions Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      <div
        v-for="conversion in conversions"
        :key="conversion.id"
        class="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-600 hover:border-blue-500 transition-colors"
      >
        <div class="flex items-center justify-between mb-3">
          <div>
            <h4 class="text-white font-bold">{{ conversion.name }}</h4>
            <p class="text-gray-400 text-xs">{{ conversion.description }}</p>
          </div>
          <button
            @click="copyToClipboard(conversion.result)"
            :disabled="!conversion.result"
            class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-sm transition-colors"
          >
            📋
          </button>
        </div>
        <div class="bg-gray-900 rounded-lg p-3 font-mono text-green-400 text-sm break-all">
          {{ conversion.result || 'Résultat...' }}
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
      <button
        @click="convertAll"
        :disabled="!inputText"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        🔄 Convertir
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

const inputText = ref('')

const conversions = ref([
  { id: 'camelCase', name: 'camelCase', description: 'premierMotMinuscule', result: '' },
  { id: 'PascalCase', name: 'PascalCase', description: 'PremierMotMajuscule', result: '' },
  { id: 'snake_case', name: 'snake_case', description: 'mots_separes_underscore', result: '' },
  { id: 'kebab-case', name: 'kebab-case', description: 'mots-separes-tirets', result: '' },
  { id: 'SCREAMING_SNAKE_CASE', name: 'SCREAMING_SNAKE_CASE', description: 'TOUT_EN_MAJUSCULES', result: '' },
  { id: 'Train-Case', name: 'Train-Case', description: 'Mots-Separes-Tirets-Majuscules', result: '' },
  { id: 'lowercase', name: 'lowercase', description: 'tout en minuscules', result: '' },
  { id: 'UPPERCASE', name: 'UPPERCASE', description: 'TOUT EN MAJUSCULES', result: '' },
  { id: 'Title Case', name: 'Title Case', description: 'Chaque Mot En Majuscule', result: '' },
  { id: 'Sentence case', name: 'Sentence case', description: 'Première lettre en majuscule', result: '' },
  { id: 'dot.case', name: 'dot.case', description: 'mots.separes.points', result: '' },
  { id: 'path/case', name: 'path/case', description: 'mots/separes/slashes', result: '' }
])

function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+|[-_./]/g, '')
}

function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
    .replace(/\s+|[-_./]/g, '')
}

function toSnakeCase(str) {
  return str
    .replace(/\s+|[-./]/g, '_')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toLowerCase()
}

function toKebabCase(str) {
  return str
    .replace(/\s+|[_./]/g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

function toScreamingSnakeCase(str) {
  return toSnakeCase(str).toUpperCase()
}

function toTrainCase(str) {
  return str
    .replace(/\s+|[_./]/g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('-')
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .replace(/(?:^|\s)\w/g, match => match.toUpperCase())
}

function toSentenceCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function toDotCase(str) {
  return str
    .replace(/\s+|[-_/]/g, '.')
    .replace(/([a-z])([A-Z])/g, '$1.$2')
    .toLowerCase()
}

function toPathCase(str) {
  return str
    .replace(/\s+|[-_.]/g, '/')
    .replace(/([a-z])([A-Z])/g, '$1/$2')
    .toLowerCase()
}

function convertAll() {
  if (!inputText.value) {
    conversions.value.forEach(conv => (conv.result = ''))
    return
  }

  const text = inputText.value

  conversions.value[0].result = toCamelCase(text)
  conversions.value[1].result = toPascalCase(text)
  conversions.value[2].result = toSnakeCase(text)
  conversions.value[3].result = toKebabCase(text)
  conversions.value[4].result = toScreamingSnakeCase(text)
  conversions.value[5].result = toTrainCase(text)
  conversions.value[6].result = text.toLowerCase()
  conversions.value[7].result = text.toUpperCase()
  conversions.value[8].result = toTitleCase(text)
  conversions.value[9].result = toSentenceCase(text)
  conversions.value[10].result = toDotCase(text)
  conversions.value[11].result = toPathCase(text)
}

function clear() {
  inputText.value = ''
  conversions.value.forEach(conv => (conv.result = ''))
}

async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText()
    inputText.value = text
    convertAll()
  } catch (err) {
    alert('Erreur lors de la lecture du presse-papiers')
  }
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    alert('Copié !')
  } catch (err) {
    alert('Erreur lors de la copie')
  }
}
</script>
