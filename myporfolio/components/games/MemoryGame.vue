<template>
  <div class="memory-game max-w-2xl mx-auto">
    <div class="mb-6 flex items-center justify-between">
      <div class="text-white">
        <div class="text-2xl font-bold">Coups: {{ moves }}</div>
        <div class="text-sm text-gray-400">Paires trouvées: {{ pairsFound }}/{{ totalPairs }}</div>
      </div>
      <button
        @click="resetGame"
        class="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold"
      >
        Nouvelle Partie
      </button>
    </div>

    <div class="grid grid-cols-4 gap-3 mb-6">
      <button
        v-for="(card, index) in cards"
        :key="index"
        @click="flipCard(index)"
        :disabled="card.flipped || card.matched"
        class="aspect-square bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-800 rounded-lg text-4xl font-bold transition-all transform hover:scale-105 disabled:cursor-not-allowed flex items-center justify-center border-2 border-purple-400 disabled:border-gray-600"
      >
        <span v-if="card.flipped || card.matched">{{ card.emoji }}</span>
        <span v-else class="text-purple-300">?</span>
      </button>
    </div>

    <div v-if="gameWon" class="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
      <p class="text-2xl font-bold text-green-400 mb-2">🎉 Bravo !</p>
      <p class="text-white">Vous avez terminé en {{ moves }} coups</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emojis = ['💻', '🚀', '⚡', '🎮', '🎯', '🔥', '✨', '🌟']
const cards = ref([])
const flippedCards = ref([])
const moves = ref(0)
const pairsFound = ref(0)

const totalPairs = computed(() => emojis.length)
const gameWon = computed(() => pairsFound.value === totalPairs.value)

function initGame() {
  const pairs = [...emojis, ...emojis]
  cards.value = pairs
    .sort(() => Math.random() - 0.5)
    .map(emoji => ({
      emoji,
      flipped: false,
      matched: false
    }))
}

function flipCard(index) {
  if (flippedCards.value.length === 2) return
  if (cards.value[index].flipped || cards.value[index].matched) return
  
  cards.value[index].flipped = true
  flippedCards.value.push(index)
  
  if (flippedCards.value.length === 2) {
    moves.value++
    checkMatch()
  }
}

function checkMatch() {
  const [first, second] = flippedCards.value
  
  if (cards.value[first].emoji === cards.value[second].emoji) {
    cards.value[first].matched = true
    cards.value[second].matched = true
    pairsFound.value++
    flippedCards.value = []
  } else {
    setTimeout(() => {
      cards.value[first].flipped = false
      cards.value[second].flipped = false
      flippedCards.value = []
    }, 1000)
  }
}

function resetGame() {
  moves.value = 0
  pairsFound.value = 0
  flippedCards.value = []
  initGame()
}

initGame()
</script>
