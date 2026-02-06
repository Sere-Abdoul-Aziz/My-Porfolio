<template>
  <div class="minesweeper-game max-w-2xl mx-auto">
    <div class="mb-6 flex items-center justify-between">
      <div class="flex gap-4">
        <div class="bg-gray-800 rounded-lg px-4 py-2">
          <span class="text-gray-400">💣 Mines: </span>
          <span class="font-bold text-red-400">{{ minesLeft }}</span>
        </div>
        <div class="bg-gray-800 rounded-lg px-4 py-2">
          <span class="text-gray-400">⏱️ Temps: </span>
          <span class="font-bold text-white">{{ time }}s</span>
        </div>
      </div>
      <div class="flex gap-2">
        <select
          v-model="difficulty"
          @change="resetGame"
          class="bg-gray-800 text-white rounded-lg px-4 py-2 border border-purple-500"
        >
          <option value="easy">Facile (8x8)</option>
          <option value="medium">Moyen (12x12)</option>
          <option value="hard">Difficile (16x16)</option>
        </select>
        <button
          @click="resetGame"
          class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>

    <div 
      class="inline-grid gap-0.5 bg-gray-700 p-1 rounded-lg"
      :style="{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }"
    >
      <button
        v-for="(cell, index) in grid"
        :key="index"
        @click="revealCell(index)"
        @contextmenu.prevent="toggleFlag(index)"
        :disabled="cell.revealed || gameOver"
        class="w-8 h-8 text-sm font-bold transition-all hover:brightness-110 disabled:cursor-not-allowed flex items-center justify-center"
        :class="{
          'bg-gray-600': !cell.revealed,
          'bg-gray-800': cell.revealed,
          'hover:bg-gray-500': !cell.revealed && !gameOver,
          'bg-red-600': cell.revealed && cell.isMine,
          'bg-green-600': gameWon && cell.isMine
        }"
      >
        <span v-if="cell.flagged && !cell.revealed">🚩</span>
        <span v-else-if="cell.revealed && cell.isMine">💣</span>
        <span v-else-if="cell.revealed && cell.adjacentMines > 0" :class="getNumberColor(cell.adjacentMines)">
          {{ cell.adjacentMines }}
        </span>
      </button>
    </div>

    <div class="mt-4 text-center text-gray-300 text-sm">
      <p>Clic gauche pour révéler • Clic droit pour marquer une mine</p>
    </div>

    <div v-if="gameOver" class="mt-4 bg-red-500/20 border border-red-500 rounded-lg p-4 text-center">
      <p class="text-2xl font-bold text-red-400">💥 Game Over !</p>
      <p class="text-white">Vous avez déclenché une mine !</p>
    </div>

    <div v-if="gameWon" class="mt-4 bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
      <p class="text-2xl font-bold text-green-400">🎉 Victoire !</p>
      <p class="text-white">Toutes les cases sont révélées en {{ time }}s !</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'

const difficulty = ref('easy')
const grid = ref([])
const gameOver = ref(false)
const gameWon = ref(false)
const time = ref(0)
const gameStarted = ref(false)
let timer = null

const difficultySettings = {
  easy: { size: 8, mines: 10 },
  medium: { size: 12, mines: 20 },
  hard: { size: 16, mines: 40 }
}

const gridSize = computed(() => difficultySettings[difficulty.value].size)
const totalMines = computed(() => difficultySettings[difficulty.value].mines)
const minesLeft = computed(() => {
  const flagged = grid.value.filter(c => c.flagged).length
  return totalMines.value - flagged
})

function initGame() {
  const size = gridSize.value
  const mines = totalMines.value
  const total = size * size
  
  grid.value = Array(total).fill(null).map(() => ({
    isMine: false,
    revealed: false,
    flagged: false,
    adjacentMines: 0
  }))
  
  // Placer les mines
  let placed = 0
  while (placed < mines) {
    const index = Math.floor(Math.random() * total)
    if (!grid.value[index].isMine) {
      grid.value[index].isMine = true
      placed++
    }
  }
  
  // Calculer les mines adjacentes
  for (let i = 0; i < total; i++) {
    if (!grid.value[i].isMine) {
      grid.value[i].adjacentMines = countAdjacentMines(i)
    }
  }
}

function countAdjacentMines(index) {
  const size = gridSize.value
  const row = Math.floor(index / size)
  const col = index % size
  let count = 0
  
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      if (r === 0 && c === 0) continue
      const newRow = row + r
      const newCol = col + c
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        const newIndex = newRow * size + newCol
        if (grid.value[newIndex].isMine) count++
      }
    }
  }
  return count
}

function revealCell(index) {
  if (grid.value[index].revealed || grid.value[index].flagged) return
  
  if (!gameStarted.value) {
    gameStarted.value = true
    timer = setInterval(() => time.value++, 1000)
  }
  
  grid.value[index].revealed = true
  
  if (grid.value[index].isMine) {
    gameOver.value = true
    clearInterval(timer)
    revealAllMines()
    return
  }
  
  if (grid.value[index].adjacentMines === 0) {
    revealAdjacent(index)
  }
  
  checkWin()
}

function revealAdjacent(index) {
  const size = gridSize.value
  const row = Math.floor(index / size)
  const col = index % size
  
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      if (r === 0 && c === 0) continue
      const newRow = row + r
      const newCol = col + c
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        const newIndex = newRow * size + newCol
        if (!grid.value[newIndex].revealed && !grid.value[newIndex].isMine) {
          grid.value[newIndex].revealed = true
          if (grid.value[newIndex].adjacentMines === 0) {
            revealAdjacent(newIndex)
          }
        }
      }
    }
  }
}

function toggleFlag(index) {
  if (grid.value[index].revealed) return
  grid.value[index].flagged = !grid.value[index].flagged
}

function revealAllMines() {
  grid.value.forEach(cell => {
    if (cell.isMine) cell.revealed = true
  })
}

function checkWin() {
  const allSafeRevealed = grid.value.every(cell => 
    cell.isMine || cell.revealed
  )
  if (allSafeRevealed) {
    gameWon.value = true
    clearInterval(timer)
  }
}

function resetGame() {
  gameOver.value = false
  gameWon.value = false
  time.value = 0
  gameStarted.value = false
  if (timer) clearInterval(timer)
  initGame()
}

function getNumberColor(num) {
  const colors = {
    1: 'text-blue-400',
    2: 'text-green-400',
    3: 'text-red-400',
    4: 'text-purple-400',
    5: 'text-yellow-400',
    6: 'text-cyan-400',
    7: 'text-orange-400',
    8: 'text-pink-400'
  }
  return colors[num] || 'text-white'
}

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

initGame()
</script>
