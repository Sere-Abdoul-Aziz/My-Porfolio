<template>
  <div class="lorem-ipsum-generator">
    <!-- Settings -->
    <div class="grid md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white/10 rounded-lg p-4">
        <label class="block text-white mb-2 font-semibold">Type</label>
        <select
          v-model="type"
          class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="paragraphs">Paragraphes</option>
          <option value="sentences">Phrases</option>
          <option value="words">Mots</option>
        </select>
      </div>

      <div class="bg-white/10 rounded-lg p-4">
        <label class="block text-white mb-2 font-semibold">Quantité</label>
        <input
          v-model.number="quantity"
          type="number"
          min="1"
          max="100"
          class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div class="bg-white/10 rounded-lg p-4 flex items-center justify-between">
        <span class="text-white font-semibold">Commencer par "Lorem ipsum"</span>
        <button
          @click="startWithLorem = !startWithLorem"
          :class="['w-12 h-6 rounded-full transition-colors', startWithLorem ? 'bg-blue-500' : 'bg-gray-600']"
        >
          <div
            :class="[
              'w-5 h-5 bg-white rounded-full transform transition-transform',
              startWithLorem ? 'translate-x-6' : 'translate-x-1'
            ]"
          ></div>
        </button>
      </div>
    </div>

    <!-- Output -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-xl font-bold text-white">📝 Texte Généré</h3>
        <div class="flex gap-2">
          <button
            @click="copyToClipboard"
            :disabled="!generatedText"
            class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Copier
          </button>
          <button
            @click="downloadAsText"
            :disabled="!generatedText"
            class="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            💾 Télécharger
          </button>
        </div>
      </div>
      <textarea
        v-model="generatedText"
        readonly
        placeholder="Cliquez sur 'Générer' pour créer du texte..."
        class="w-full h-96 bg-gray-800 text-gray-100 p-4 rounded-lg border border-gray-600 font-serif text-base resize-none"
      ></textarea>
      <div class="mt-3 text-gray-400 text-sm">
        {{ wordCount }} mots • {{ charCount }} caractères
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex items-center justify-center gap-4">
      <button
        @click="generate"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        🎲 Générer du Texte
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

const type = ref('paragraphs')
const quantity = ref(3)
const startWithLorem = ref(true)
const generatedText = ref('')

const wordCount = computed(() => {
  return generatedText.value.split(/\s+/).filter(w => w.length > 0).length
})

const charCount = computed(() => generatedText.value.length)

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
]

function getRandomWord() {
  return loremWords[Math.floor(Math.random() * loremWords.length)]
}

function generateSentence() {
  const wordCount = Math.floor(Math.random() * 10) + 5 // 5-15 words
  const words = []
  for (let i = 0; i < wordCount; i++) {
    words.push(getRandomWord())
  }
  return words.join(' ').charAt(0).toUpperCase() + words.join(' ').slice(1) + '.'
}

function generateParagraph() {
  const sentenceCount = Math.floor(Math.random() * 5) + 3 // 3-8 sentences
  const sentences = []
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence())
  }
  return sentences.join(' ')
}

function generate() {
  let result = []

  if (type.value === 'words') {
    for (let i = 0; i < quantity.value; i++) {
      result.push(getRandomWord())
    }
    generatedText.value = result.join(' ')
  } else if (type.value === 'sentences') {
    for (let i = 0; i < quantity.value; i++) {
      result.push(generateSentence())
    }
    generatedText.value = result.join(' ')
  } else {
    // paragraphs
    for (let i = 0; i < quantity.value; i++) {
      result.push(generateParagraph())
    }
    generatedText.value = result.join('\n\n')
  }

  if (startWithLorem.value && !generatedText.value.toLowerCase().startsWith('lorem ipsum')) {
    generatedText.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + generatedText.value
  }
}

function clear() {
  generatedText.value = ''
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(generatedText.value)
    alert('Texte copié !')
  } catch (err) {
    alert('Erreur lors de la copie')
  }
}

function downloadAsText() {
  const blob = new Blob([generatedText.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'lorem-ipsum.txt'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
