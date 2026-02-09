<template>
  <div class="text-counter">
    <!-- Input -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-3">
          <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white">📝 Texte à Analyser</h3>
        <button
          @click="pasteFromClipboard"
          class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          📋 Coller
        </button>
      </div>
      <textarea
        v-model="text"
        @input="analyze"
        placeholder="Entrez ou collez votre texte ici pour l'analyser..."
        class="w-full h-48 sm:h-56 lg:h-64 bg-gray-800 text-gray-100 p-4 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-base resize-none"
      ></textarea>
    </div>

    <!-- Statistics Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div class="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-2 border-blue-500 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
        <div class="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-2">{{ stats.characters }}</div>
        <div class="text-gray-300 font-semibold">Caractères</div>
      </div>

      <div class="bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500 rounded-xl p-6 text-center">
        <div class="text-4xl font-bold text-green-400 mb-2">{{ stats.charactersNoSpaces }}</div>
        <div class="text-gray-300 font-semibold">Sans espaces</div>
      </div>

      <div class="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-2 border-purple-500 rounded-xl p-6 text-center">
        <div class="text-4xl font-bold text-purple-400 mb-2">{{ stats.words }}</div>
        <div class="text-gray-300 font-semibold">Mots</div>
      </div>

      <div class="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500 rounded-xl p-6 text-center">
        <div class="text-4xl font-bold text-yellow-400 mb-2">{{ stats.sentences }}</div>
        <div class="text-gray-300 font-semibold">Phrases</div>
      </div>

      <div class="bg-gradient-to-br from-pink-500/20 to-pink-600/20 border-2 border-pink-500 rounded-xl p-6 text-center">
        <div class="text-4xl font-bold text-pink-400 mb-2">{{ stats.paragraphs }}</div>
        <div class="text-gray-300 font-semibold">Paragraphes</div>
      </div>

      <div class="bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 border-2 border-indigo-500 rounded-xl p-6 text-center">
        <div class="text-4xl font-bold text-indigo-400 mb-2">{{ stats.lines }}</div>
        <div class="text-gray-300 font-semibold">Lignes</div>
      </div>

      <div class="bg-gradient-to-br from-red-500/20 to-red-600/20 border-2 border-red-500 rounded-xl p-6 text-center">
        <div class="text-4xl font-bold text-red-400 mb-2">{{ stats.avgWordLength }}</div>
        <div class="text-gray-300 font-semibold">Moy. mot (char)</div>
      </div>

      <div class="bg-gradient-to-br from-teal-500/20 to-teal-600/20 border-2 border-teal-500 rounded-xl p-6 text-center">
        <div class="text-4xl font-bold text-teal-400 mb-2">{{ stats.readingTime }}</div>
        <div class="text-gray-300 font-semibold">Temps lecture (min)</div>
      </div>
    </div>

    <!-- Detailed Analysis -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <div class="bg-white/10 rounded-xl p-6">
        <h4 class="text-white font-bold mb-4">📊 Détails Supplémentaires</h4>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-400">Espaces:</span>
            <span class="text-white font-mono">{{ stats.spaces }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Chiffres:</span>
            <span class="text-white font-mono">{{ stats.numbers }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Caractères spéciaux:</span>
            <span class="text-white font-mono">{{ stats.specialChars }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Lettres majuscules:</span>
            <span class="text-white font-mono">{{ stats.uppercase }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Lettres minuscules:</span>
            <span class="text-white font-mono">{{ stats.lowercase }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white/10 rounded-xl p-6">
        <h4 class="text-white font-bold mb-4">⏱️ Estimations</h4>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-400">Temps de lecture (200 mots/min):</span>
            <span class="text-white font-mono">{{ stats.readingTime }} min</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Temps de parole (150 mots/min):</span>
            <span class="text-white font-mono">{{ stats.speakingTime }} min</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Pages A4 (500 mots/page):</span>
            <span class="text-white font-mono">{{ stats.pages }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Tweets (280 char max):</span>
            <span class="text-white font-mono">{{ stats.tweets }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">SMS (160 char max):</span>
            <span class="text-white font-mono">{{ stats.sms }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
      <button
        @click="exportStats"
        :disabled="!text"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        📥 Exporter Statistiques
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
import { ref, reactive } from 'vue'

const text = ref('')
const stats = reactive({
  characters: 0,
  charactersNoSpaces: 0,
  words: 0,
  sentences: 0,
  paragraphs: 0,
  lines: 0,
  spaces: 0,
  numbers: 0,
  specialChars: 0,
  uppercase: 0,
  lowercase: 0,
  avgWordLength: 0,
  readingTime: 0,
  speakingTime: 0,
  pages: 0,
  tweets: 0,
  sms: 0
})

function analyze() {
  if (!text.value) {
    Object.keys(stats).forEach(key => (stats[key] = 0))
    return
  }

  const content = text.value

  // Basic counts
  stats.characters = content.length
  stats.charactersNoSpaces = content.replace(/\s/g, '').length
  stats.spaces = content.split('').filter(char => char === ' ').length
  stats.lines = content.split('\n').length

  // Words
  const words = content.trim().split(/\s+/).filter(word => word.length > 0)
  stats.words = words.length

  // Sentences
  stats.sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length

  // Paragraphs
  stats.paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0).length

  // Character types
  stats.numbers = (content.match(/\d/g) || []).length
  stats.uppercase = (content.match(/[A-Z]/g) || []).length
  stats.lowercase = (content.match(/[a-z]/g) || []).length
  stats.specialChars = content.replace(/[a-zA-Z0-9\s]/g, '').length

  // Average word length
  if (stats.words > 0) {
    const totalLength = words.reduce((sum, word) => sum + word.length, 0)
    stats.avgWordLength = Math.round(totalLength / stats.words)
  } else {
    stats.avgWordLength = 0
  }

  // Reading time (200 words per minute)
  stats.readingTime = Math.ceil(stats.words / 200)

  // Speaking time (150 words per minute)
  stats.speakingTime = Math.ceil(stats.words / 150)

  // Pages (500 words per page)
  stats.pages = Math.ceil(stats.words / 500)

  // Tweets (280 characters max)
  stats.tweets = Math.ceil(stats.characters / 280)

  // SMS (160 characters max)
  stats.sms = Math.ceil(stats.characters / 160)
}

function clear() {
  text.value = ''
  analyze()
}

async function pasteFromClipboard() {
  try {
    const clipboardText = await navigator.clipboard.readText()
    text.value = clipboardText
    analyze()
  } catch (err) {
    alert('Erreur lors de la lecture du presse-papiers')
  }
}

function exportStats() {
  const report = `RAPPORT D'ANALYSE DE TEXTE
========================

Compteurs de Base:
- Caractères: ${stats.characters}
- Caractères (sans espaces): ${stats.charactersNoSpaces}
- Mots: ${stats.words}
- Phrases: ${stats.sentences}
- Paragraphes: ${stats.paragraphs}
- Lignes: ${stats.lines}

Détails:
- Espaces: ${stats.spaces}
- Chiffres: ${stats.numbers}
- Caractères spéciaux: ${stats.specialChars}
- Lettres majuscules: ${stats.uppercase}
- Lettres minuscules: ${stats.lowercase}
- Longueur moyenne des mots: ${stats.avgWordLength} caractères

Estimations:
- Temps de lecture (200 mots/min): ${stats.readingTime} min
- Temps de parole (150 mots/min): ${stats.speakingTime} min
- Pages A4 (500 mots/page): ${stats.pages}
- Tweets (280 char max): ${stats.tweets}
- SMS (160 char max): ${stats.sms}

---
Généré par Sere Aziz - Outils pour Développeurs
https://azizsere.eveilon.com/ressources
`

  const blob = new Blob([report], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'statistiques-texte.txt'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
