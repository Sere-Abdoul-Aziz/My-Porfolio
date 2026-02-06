<template>
  <div class="tictactoe-game max-w-md mx-auto">
    <div class="mb-6 text-center">
      <div class="text-2xl font-bold text-white mb-2">
        {{ gameStatus }}
      </div>
      <div class="text-gray-400">
        Joueur actuel: <span :class="currentPlayer === 'X' ? 'text-blue-400' : 'text-red-400'" class="font-bold">{{ currentPlayer }}</span>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-3 mb-6">
      <button
        v-for="(cell, index) in board"
        :key="index"
        @click="makeMove(index)"
        :disabled="cell !== '' || gameWon"
        class="aspect-square bg-gray-800 hover:bg-gray-700 disabled:hover:bg-gray-800 border-2 border-purple-500 rounded-lg text-5xl font-bold transition-all transform hover:scale-105 disabled:cursor-not-allowed"
        :class="{
          'text-blue-400': cell === 'X',
          'text-red-400': cell === 'O'
        }"
      >
        {{ cell }}
      </button>
    </div>

    <div class="flex gap-3 justify-center mb-4">
      <button
        @click="resetGame"
        class="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold"
      >
        Nouvelle Partie
      </button>
    </div>

    <div class="bg-gray-800 rounded-lg p-4">
      <div class="grid grid-cols-2 gap-4 text-center">
        <div>
          <div class="text-3xl font-bold text-blue-400">{{ scores.X }}</div>
          <div class="text-sm text-gray-400">Joueur X</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-red-400">{{ scores.O }}</div>
          <div class="text-sm text-gray-400">Joueur O</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const board = ref(['', '', '', '', '', '', '', '', ''])
const currentPlayer = ref('X')
const gameWon = ref(false)
const scores = ref({ X: 0, O: 0 })

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
  [0, 4, 8], [2, 4, 6] // Diagonales
]

const gameStatus = computed(() => {
  if (gameWon.value) {
    return `🎉 ${currentPlayer.value} a gagné !`
  }
  if (board.value.every(cell => cell !== '')) {
    return '🤝 Match nul !'
  }
  return 'En cours...'
})

function makeMove(index) {
  if (board.value[index] !== '' || gameWon.value) return
  
  board.value[index] = currentPlayer.value
  
  if (checkWin()) {
    gameWon.value = true
    scores.value[currentPlayer.value]++
  } else if (board.value.every(cell => cell !== '')) {
    // Match nul
  } else {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }
}

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern
    return board.value[a] !== '' &&
           board.value[a] === board.value[b] &&
           board.value[a] === board.value[c]
  })
}

function resetGame() {
  board.value = ['', '', '', '', '', '', '', '', '']
  currentPlayer.value = 'X'
  gameWon.value = false
}
</script>
