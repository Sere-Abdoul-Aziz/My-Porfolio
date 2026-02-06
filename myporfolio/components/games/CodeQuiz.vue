<template>
  <div class="code-quiz max-w-2xl mx-auto">
    <div class="mb-6 text-center">
      <div class="text-2xl font-bold text-white mb-2">
        Question {{ currentQuestion + 1 }}/{{ questions.length }}
      </div>
      <div class="text-gray-400">Score: {{ score }}/{{ questions.length }}</div>
    </div>

    <div v-if="!quizFinished" class="space-y-6">
      <div class="bg-gray-800 rounded-xl p-6">
        <p class="text-white text-lg mb-4">{{ questions[currentQuestion].question }}</p>
        
        <div v-if="questions[currentQuestion].code" class="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
          <pre class="text-sm text-green-400 font-mono">{{ questions[currentQuestion].code }}</pre>
        </div>

        <div class="space-y-3">
          <button
            v-for="(option, index) in questions[currentQuestion].options"
            :key="index"
            @click="selectAnswer(index)"
            :disabled="answered"
            :class="[
              'w-full p-4 rounded-lg text-left transition-all font-semibold',
              answered && index === questions[currentQuestion].correct
                ? 'bg-green-500 text-white'
                : answered && index === selectedAnswer && index !== questions[currentQuestion].correct
                ? 'bg-red-500 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            ]"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <div class="flex justify-between">
        <button
          v-if="currentQuestion > 0"
          @click="previousQuestion"
          :disabled="!answered"
          class="px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white rounded-lg"
        >
          Précédent
        </button>
        <button
          v-if="answered"
          @click="nextQuestion"
          class="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg ml-auto"
        >
          {{ currentQuestion < questions.length - 1 ? 'Suivant' : 'Terminer' }}
        </button>
      </div>
    </div>

    <div v-else class="bg-purple-500/20 border border-purple-500 rounded-xl p-8 text-center">
      <p class="text-3xl font-bold text-purple-400 mb-4">🎉 Quiz terminé !</p>
      <div class="text-5xl font-bold text-white mb-4">
        {{ score }}/{{ questions.length }}
      </div>
      <p class="text-gray-300 mb-6">
        {{ getScoreMessage() }}
      </p>
      <button
        @click="resetQuiz"
        class="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold"
      >
        Recommencer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const questions = [
  {
    question: "Quel langage est utilisé pour ce code ?",
    code: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello");
  }
}`,
    options: ["JavaScript", "Java", "C#", "Python"],
    correct: 1
  },
  {
    question: "Quel langage utilise cette syntaxe ?",
    code: `def factorial(n):
  return 1 if n <= 1 else n * factorial(n-1)`,
    options: ["Ruby", "JavaScript", "Python", "Go"],
    correct: 2
  },
  {
    question: "Dans quel langage cette boucle est-elle écrite ?",
    code: `for (let i = 0; i < 10; i++) {
  console.log(i);
}`,
    options: ["JavaScript", "TypeScript", "Java", "C++"],
    correct: 0
  },
  {
    question: "Quel framework utilise cette syntaxe de composant ?",
    code: `<template>
  <div>{{ message }}</div>
</template>

<script setup>
const message = 'Hello'
<\/script>`,
    options: ["React", "Angular", "Vue.js", "Svelte"],
    correct: 2
  },
  {
    question: "Quel langage utilise cette déclaration de fonction ?",
    code: `fn add(a: i32, b: i32) -> i32 {
  a + b
}`,
    options: ["Go", "Rust", "Swift", "Kotlin"],
    correct: 1
  },
  {
    question: "Dans quel langage ce code est-il valide ?",
    code: `const greet = (name: string): string => {
  return \`Hello, \${name}\`;
}`,
    options: ["JavaScript", "TypeScript", "Dart", "Kotlin"],
    correct: 1
  },
  {
    question: "Quel langage utilise cette syntaxe de classe ?",
    code: `class Person:
  def __init__(self, name):
    self.name = name`,
    options: ["Ruby", "Python", "PHP", "Perl"],
    correct: 1
  },
  {
    question: "Quel framework CSS utilise cette classe ?",
    code: '<div class="flex items-center justify-between p-4 bg-blue-500">',
    options: ["Bootstrap", "Tailwind CSS", "Bulma", "Foundation"],
    correct: 1
  }
]

const currentQuestion = ref(0)
const selectedAnswer = ref(null)
const answered = ref(false)
const score = ref(0)
const quizFinished = ref(false)

function selectAnswer(index) {
  if (answered.value) return
  
  selectedAnswer.value = index
  answered.value = true
  
  if (index === questions[currentQuestion.value].correct) {
    score.value++
  }
}

function nextQuestion() {
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++
    selectedAnswer.value = null
    answered.value = false
  } else {
    quizFinished.value = true
  }
}

function previousQuestion() {
  if (currentQuestion.value > 0) {
    currentQuestion.value--
    selectedAnswer.value = null
    answered.value = false
  }
}

function resetQuiz() {
  currentQuestion.value = 0
  selectedAnswer.value = null
  answered.value = false
  score.value = 0
  quizFinished.value = false
}

function getScoreMessage() {
  const percentage = (score.value / questions.length) * 100
  if (percentage === 100) return "Parfait ! Vous êtes un expert ! 🏆"
  if (percentage >= 75) return "Excellent travail ! 🌟"
  if (percentage >= 50) return "Pas mal ! Continuez comme ça ! 👍"
  return "Il faut réviser un peu ! 📚"
}
</script>
