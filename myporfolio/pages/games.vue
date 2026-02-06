<template>
  <div class="games-page min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-16">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
          Mini-Jeux pour <span class="text-purple-400">Développeurs</span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Des jeux rapides pour faire une pause productive. Définissez un minuteur pour ne pas perdre trop de temps !
        </p>
      </header>

      <!-- Timer Global -->
      <div class="mb-12 bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-2xl mx-auto border border-white/20">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-white flex items-center gap-2">
            <ClockIcon class="w-6 h-6 text-purple-400" />
            Minuteur de Pause
          </h3>
          <div class="text-2xl font-mono font-bold text-purple-400">
            {{ formatTime(timeRemaining) }}
          </div>
        </div>
        
        <div class="flex gap-3 flex-wrap">
          <button
            v-for="preset in timePresets"
            :key="preset.value"
            @click="setTimer(preset.value)"
            class="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors"
          >
            {{ preset.label }}
          </button>
          <button
            @click="stopTimer"
            v-if="timerActive"
            class="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
          >
            Arrêter
          </button>
        </div>
        
        <div v-if="timerActive" class="mt-4">
          <div class="w-full bg-gray-700 rounded-full h-2">
            <div 
              class="bg-purple-500 h-2 rounded-full transition-all duration-1000"
              :style="{ width: `${(timeRemaining / timerDuration) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Navigation par catégories -->
      <div class="mb-12">
        <div class="flex flex-wrap gap-3 justify-center">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectedCategory = cat.id"
            :class="[
              'px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2',
              selectedCategory === cat.id
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            ]"
          >
            <component :is="cat.icon" class="w-5 h-5" />
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Grille de jeux -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="game in filteredGames"
          :key="game.id"
          @click="openGame(game)"
          class="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all transform hover:scale-105 hover:shadow-2xl border border-white/10"
        >
          <div class="mb-4">
            <component :is="game.icon" class="w-12 h-12 text-purple-400" />
          </div>
          <h3 class="text-xl font-bold text-white mb-2">{{ game.name }}</h3>
          <p class="text-gray-300 text-sm mb-4">{{ game.description }}</p>
          <div class="flex items-center justify-between">
            <span class="text-purple-400 text-sm font-semibold">{{ game.category }}</span>
            <span class="text-gray-400 text-xs">Cliquez pour jouer →</span>
          </div>
        </div>
      </div>

      <!-- Modal pour afficher le jeu -->
      <Teleport to="body">
        <div
          v-if="activeGame"
          class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          @click.self="closeGame"
        >
          <div class="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-500/30">
            <!-- Header du modal -->
            <div class="sticky top-0 bg-gray-900 border-b border-white/10 p-6 flex items-center justify-between z-10">
              <div class="flex items-center space-x-4">
                <component :is="activeGame.icon" class="w-10 h-10 text-purple-400" />
                <div>
                  <h2 class="text-2xl font-bold text-white">{{ activeGame.name }}</h2>
                  <p class="text-gray-400 text-sm">{{ activeGame.description }}</p>
                </div>
              </div>
              <button
                @click="closeGame"
                class="text-gray-400 hover:text-white transition-colors text-3xl leading-none"
              >
                ×
              </button>
            </div>

            <!-- Contenu du jeu -->
            <div class="p-6">
              <component :is="activeGame.component" />
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Modal de fin de temps -->
      <Teleport to="body">
        <div
          v-if="showTimeUpModal"
          class="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
        >
          <div class="bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center border-2 border-purple-500">
            <ClockIcon class="w-20 h-20 text-purple-400 mx-auto mb-4" />
            <h2 class="text-3xl font-bold text-white mb-4">Temps écoulé ! ⏰</h2>
            <p class="text-gray-300 mb-6">
              Votre pause est terminée. Il est temps de retourner coder ! 💻
            </p>
            <div class="flex gap-3 justify-center">
              <button
                @click="continueAnyway"
                class="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
              >
                Continuer à jouer
              </button>
              <button
                @click="closeGame"
                class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
              >
                Retour au travail
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import {
  PuzzlePieceIcon,
  CpuChipIcon,
  BeakerIcon,
  AcademicCapIcon,
  ClockIcon,
  CubeIcon,
  RocketLaunchIcon,
  CommandLineIcon
} from '@heroicons/vue/24/outline'

import SnakeGame from '@/components/games/SnakeGame.vue'
import TetrisGame from '@/components/games/TetrisGame.vue'
import Memory from '@/components/games/MemoryGame.vue'
import TicTacToe from '@/components/games/TicTacToe.vue'
import Minesweeper from '@/components/games/Minesweeper.vue'
import TypingSpeed from '@/components/games/TypingSpeed.vue'
import CodeQuiz from '@/components/games/CodeQuiz.vue'
import Breakout from '@/components/games/Breakout.vue'

// SEO Meta tags
useHead({
  title: 'Mini-Jeux pour Développeurs | Sere Aziz',
  meta: [
    {
      name: 'description',
      content: 'Collection de mini-jeux pour développeurs. Prenez une pause productive avec Snake, Tetris, Memory et plus encore !'
    },
    { property: 'og:title', content: 'Mini-Jeux pour Développeurs - Sere Aziz' },
    { property: 'og:url', content: 'https://azizsere.eveilon.com/games' }
  ]
})

const selectedCategory = ref('all')
const activeGame = ref(null)
const timerActive = ref(false)
const timerDuration = ref(0)
const timeRemaining = ref(0)
const showTimeUpModal = ref(false)
let timerInterval = null

const timePresets = [
  { label: '5 min', value: 5 * 60 },
  { label: '10 min', value: 10 * 60 },
  { label: '15 min', value: 15 * 60 },
  { label: '30 min', value: 30 * 60 }
]

const categories = [
  { id: 'all', name: 'Tous', icon: CubeIcon },
  { id: 'classic', name: 'Classiques', icon: PuzzlePieceIcon },
  { id: 'brain', name: 'Réflexion', icon: AcademicCapIcon },
  { id: 'skill', name: 'Adresse', icon: RocketLaunchIcon }
]

const games = [
  {
    id: 'snake',
    name: 'Snake',
    description: 'Le classique Snake. Mangez les pommes sans vous mordre !',
    icon: CommandLineIcon,
    category: 'Classiques',
    categoryId: 'classic',
    component: SnakeGame
  },
  {
    id: 'tetris',
    name: 'Tetris',
    description: 'Empilez les blocs pour faire des lignes complètes',
    icon: CubeIcon,
    category: 'Classiques',
    categoryId: 'classic',
    component: TetrisGame
  },
  {
    id: 'memory',
    name: 'Memory',
    description: 'Trouvez les paires de cartes identiques',
    icon: AcademicCapIcon,
    category: 'Réflexion',
    categoryId: 'brain',
    component: Memory
  },
  {
    id: 'tictactoe',
    name: 'Tic-Tac-Toe',
    description: 'Alignez 3 symboles pour gagner',
    icon: PuzzlePieceIcon,
    category: 'Réflexion',
    categoryId: 'brain',
    component: TicTacToe
  },
  {
    id: 'minesweeper',
    name: 'Démineur',
    description: 'Trouvez toutes les mines sans en déclencher une',
    icon: BeakerIcon,
    category: 'Réflexion',
    categoryId: 'brain',
    component: Minesweeper
  },
  {
    id: 'typing',
    name: 'Test de Frappe',
    description: 'Testez votre vitesse de frappe en code',
    icon: CpuChipIcon,
    category: 'Adresse',
    categoryId: 'skill',
    component: TypingSpeed
  },
  {
    id: 'codequiz',
    name: 'Quiz Code',
    description: 'Devinez le langage de programmation',
    icon: AcademicCapIcon,
    category: 'Réflexion',
    categoryId: 'brain',
    component: CodeQuiz
  },
  {
    id: 'breakout',
    name: 'Breakout',
    description: 'Cassez les briques avec la balle',
    icon: RocketLaunchIcon,
    category: 'Adresse',
    categoryId: 'skill',
    component: Breakout
  }
]

const filteredGames = computed(() => {
  if (selectedCategory.value === 'all') {
    return games
  }
  return games.filter(game => game.categoryId === selectedCategory.value)
})

function openGame(game) {
  activeGame.value = game
  document.body.style.overflow = 'hidden'
}

function closeGame() {
  activeGame.value = null
  showTimeUpModal.value = false
  document.body.style.overflow = 'auto'
}

function setTimer(seconds) {
  timerDuration.value = seconds
  timeRemaining.value = seconds
  timerActive.value = true
  
  if (timerInterval) clearInterval(timerInterval)
  
  timerInterval = setInterval(() => {
    timeRemaining.value--
    
    if (timeRemaining.value <= 0) {
      clearInterval(timerInterval)
      timerActive.value = false
      showTimeUpModal.value = true
    }
  }, 1000)
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval)
  timerActive.value = false
  timeRemaining.value = 0
}

function continueAnyway() {
  showTimeUpModal.value = false
  stopTimer()
}

function formatTime(seconds) {
  if (seconds <= 0) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

onBeforeUnmount(() => {
  if (timerInterval) clearInterval(timerInterval)
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
.games-page {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
