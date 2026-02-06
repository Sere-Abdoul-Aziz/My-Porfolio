<template>
  <div class="diff-checker">
    <div class="grid lg:grid-cols-2 gap-6 mb-6">
      <!-- Text 1 -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-white">📝 Texte Original</h3>
          <button
            @click="pasteFromClipboard('text1')"
            class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Coller
          </button>
        </div>
        <textarea
          v-model="text1"
          @input="compareDiff"
          placeholder="Collez le premier texte ici..."
          class="w-full h-64 bg-gray-800 text-gray-100 p-4 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm resize-none"
        ></textarea>
      </div>

      <!-- Text 2 -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-white">📝 Texte Modifié</h3>
          <button
            @click="pasteFromClipboard('text2')"
            class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Coller
          </button>
        </div>
        <textarea
          v-model="text2"
          @input="compareDiff"
          placeholder="Collez le second texte ici..."
          class="w-full h-64 bg-gray-800 text-gray-100 p-4 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm resize-none"
        ></textarea>
      </div>
    </div>

    <!-- Statistics -->
    <div v-if="stats" class="grid md:grid-cols-4 gap-4 mb-6">
      <div class="bg-green-500/20 border-2 border-green-500 rounded-lg p-4 text-center">
        <div class="text-3xl font-bold text-green-400">{{ stats.additions }}</div>
        <div class="text-gray-300 text-sm">Ajouts</div>
      </div>
      <div class="bg-red-500/20 border-2 border-red-500 rounded-lg p-4 text-center">
        <div class="text-3xl font-bold text-red-400">{{ stats.deletions }}</div>
        <div class="text-gray-300 text-sm">Suppressions</div>
      </div>
      <div class="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-4 text-center">
        <div class="text-3xl font-bold text-blue-400">{{ stats.unchanged }}</div>
        <div class="text-gray-300 text-sm">Inchangés</div>
      </div>
      <div class="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-4 text-center">
        <div class="text-3xl font-bold text-purple-400">{{ stats.similarity }}%</div>
        <div class="text-gray-300 text-sm">Similarité</div>
      </div>
    </div>

    <!-- Diff View -->
    <div v-if="diffLines.length > 0">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-xl font-bold text-white">🔍 Différences</h3>
        <div class="flex gap-2">
          <button
            @click="viewMode = 'side-by-side'"
            :class="[
              'px-4 py-2 rounded-lg text-sm transition-colors',
              viewMode === 'side-by-side' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
            ]"
          >
            Côte à côte
          </button>
          <button
            @click="viewMode = 'unified'"
            :class="[
              'px-4 py-2 rounded-lg text-sm transition-colors',
              viewMode === 'unified' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
            ]"
          >
            Unifié
          </button>
        </div>
      </div>

      <div
        v-if="viewMode === 'unified'"
        class="bg-gray-900 rounded-lg p-4 border border-gray-600 max-h-96 overflow-y-auto font-mono text-sm"
      >
        <div
          v-for="(line, index) in diffLines"
          :key="index"
          :class="[
            'px-2 py-1',
            line.type === 'addition' && 'bg-green-500/20 text-green-400',
            line.type === 'deletion' && 'bg-red-500/20 text-red-400',
            line.type === 'unchanged' && 'text-gray-400'
          ]"
        >
          <span class="mr-4 text-gray-600">{{ line.lineNum }}</span>
          <span v-if="line.type === 'addition'">+ </span>
          <span v-if="line.type === 'deletion'">- </span>
          <span v-if="line.type === 'unchanged'">  </span>
          {{ line.content }}
        </div>
      </div>

      <div v-else class="grid grid-cols-2 gap-4">
        <div class="bg-gray-900 rounded-lg p-4 border border-gray-600 max-h-96 overflow-y-auto font-mono text-sm">
          <div class="text-gray-400 mb-2 font-bold">Original</div>
          <div
            v-for="(line, index) in diffLines.filter(l => l.type !== 'addition')"
            :key="index"
            :class="['px-2 py-1', line.type === 'deletion' && 'bg-red-500/20 text-red-400', line.type === 'unchanged' && 'text-gray-400']"
          >
            {{ line.content }}
          </div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4 border border-gray-600 max-h-96 overflow-y-auto font-mono text-sm">
          <div class="text-gray-400 mb-2 font-bold">Modifié</div>
          <div
            v-for="(line, index) in diffLines.filter(l => l.type !== 'deletion')"
            :key="index"
            :class="['px-2 py-1', line.type === 'addition' && 'bg-green-500/20 text-green-400', line.type === 'unchanged' && 'text-gray-400']"
          >
            {{ line.content }}
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex items-center justify-center gap-4">
      <button
        @click="compareDiff"
        :disabled="!text1 || !text2"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        🔍 Comparer
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

const text1 = ref('')
const text2 = ref('')
const diffLines = ref([])
const stats = ref(null)
const viewMode = ref('unified')

function compareDiff() {
  if (!text1.value || !text2.value) {
    diffLines.value = []
    stats.value = null
    return
  }

  const lines1 = text1.value.split('\n')
  const lines2 = text2.value.split('\n')
  const result = []

  let additions = 0
  let deletions = 0
  let unchanged = 0

  const maxLines = Math.max(lines1.length, lines2.length)

  for (let i = 0; i < maxLines; i++) {
    const line1 = lines1[i] || ''
    const line2 = lines2[i] || ''

    if (line1 === line2) {
      result.push({ type: 'unchanged', content: line1, lineNum: i + 1 })
      unchanged++
    } else {
      if (line1 && !line2) {
        result.push({ type: 'deletion', content: line1, lineNum: i + 1 })
        deletions++
      } else if (!line1 && line2) {
        result.push({ type: 'addition', content: line2, lineNum: i + 1 })
        additions++
      } else {
        result.push({ type: 'deletion', content: line1, lineNum: i + 1 })
        result.push({ type: 'addition', content: line2, lineNum: i + 1 })
        deletions++
        additions++
      }
    }
  }

  diffLines.value = result

  // Calculate similarity
  const totalLines = additions + deletions + unchanged
  const similarity = totalLines > 0 ? Math.round((unchanged / totalLines) * 100) : 0

  stats.value = { additions, deletions, unchanged, similarity }
}

function clear() {
  text1.value = ''
  text2.value = ''
  diffLines.value = []
  stats.value = null
}

async function pasteFromClipboard(target) {
  try {
    const text = await navigator.clipboard.readText()
    if (target === 'text1') {
      text1.value = text
    } else {
      text2.value = text
    }
    compareDiff()
  } catch (err) {
    alert('Erreur lors de la lecture du presse-papiers')
  }
}
</script>
