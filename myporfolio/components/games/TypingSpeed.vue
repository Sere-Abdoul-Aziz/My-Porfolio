<template>
  <div class="typing-speed max-w-3xl mx-auto">
    <div class="mb-6 grid grid-cols-3 gap-4 text-center">
      <div class="bg-gray-800 rounded-lg p-4">
        <div class="text-3xl font-bold text-purple-400">{{ wpm }}</div>
        <div class="text-sm text-gray-400">Mots/min</div>
      </div>
      <div class="bg-gray-800 rounded-lg p-4">
        <div class="text-3xl font-bold text-blue-400">{{ accuracy }}%</div>
        <div class="text-sm text-gray-400">Précision</div>
      </div>
      <div class="bg-gray-800 rounded-lg p-4">
        <div class="text-3xl font-bold text-green-400">{{ timeLeft }}s</div>
        <div class="text-sm text-gray-400">Temps</div>
      </div>
    </div>

    <div class="mb-6 bg-gray-800 rounded-lg p-6 font-mono text-lg leading-relaxed">
      <span
        v-for="(char, index) in codeText"
        :key="index"
        :class="{
          'text-green-400': index < typedText.length && typedText[index] === char,
          'text-red-400': index < typedText.length && typedText[index] !== char,
          'text-gray-400': index >= typedText.length,
          'bg-purple-500': index === typedText.length
        }"
      >{{ char }}</span>
    </div>

    <div v-if="!gameStarted || gameFinished" class="text-center mb-4">
      <button
        @click="startGame"
        class="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold text-lg"
      >
        {{ gameFinished ? 'Recommencer' : 'Commencer' }}
      </button>
    </div>

    <input
      v-else
      ref="inputField"
      v-model="typedText"
      @input="handleInput"
      type="text"
      class="w-full bg-gray-800 border-2 border-purple-500 rounded-lg px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-purple-400"
      placeholder="Tapez le code ici..."
      autocomplete="off"
      spellcheck="false"
    />

    <div v-if="gameFinished" class="mt-6 bg-purple-500/20 border border-purple-500 rounded-lg p-6 text-center">
      <p class="text-2xl font-bold text-purple-400 mb-4">🎉 Terminé !</p>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="text-3xl font-bold text-white">{{ wpm }}</div>
          <div class="text-sm text-gray-400">Mots par minute</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-white">{{ accuracy }}%</div>
          <div class="text-sm text-gray-400">Précision</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const codeSnippets = [
  'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}',
  'const quickSort = (arr) => {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[0];\n  const left = arr.slice(1).filter(x => x < pivot);\n  const right = arr.slice(1).filter(x => x >= pivot);\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}',
  'async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(error);\n  }\n}',
  'class BinaryTree {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}'
]

const codeText = ref('')
const typedText = ref('')
const gameStarted = ref(false)
const gameFinished = ref(false)
const timeLeft = ref(60)
const startTime = ref(0)
const errors = ref(0)
const inputField = ref(null)
let timer = null

const wpm = computed(() => {
  if (!gameStarted.value || typedText.value.length === 0) return 0
  const minutes = (60 - timeLeft.value) / 60
  const words = typedText.value.trim().split(/\s+/).length
  return Math.round(words / minutes) || 0
})

const accuracy = computed(() => {
  if (typedText.value.length === 0) return 100
  const correct = typedText.value.split('').filter((char, i) => char === codeText.value[i]).length
  return Math.round((correct / typedText.value.length) * 100)
})

function startGame() {
  codeText.value = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
  typedText.value = ''
  gameStarted.value = true
  gameFinished.value = false
  timeLeft.value = 60
  errors.value = 0
  startTime.value = Date.now()
  
  nextTick(() => {
    inputField.value?.focus()
  })
  
  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0 || typedText.value === codeText.value) {
      endGame()
    }
  }, 1000)
}

function handleInput() {
  if (typedText.value === codeText.value) {
    endGame()
  }
}

function endGame() {
  clearInterval(timer)
  gameStarted.value = false
  gameFinished.value = true
}
</script>
