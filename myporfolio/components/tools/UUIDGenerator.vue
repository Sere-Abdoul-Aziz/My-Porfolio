<template>
  <div class="uuid-generator">
    <!-- Generated UUIDs Display -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-xl font-bold text-white">🎲 UUID/GUID Générés</h3>
        <div class="flex gap-2">
          <button
            @click="generateBatch"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            🔄 Régénérer
          </button>
          <button
            @click="copyAll"
            :disabled="uuids.length === 0"
            class="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Copier Tous
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <div
          v-for="(uuid, index) in uuids"
          :key="index"
          class="bg-gray-800 rounded-lg p-4 flex items-center justify-between border border-gray-600 hover:border-blue-500 transition-colors group"
        >
          <code class="text-green-400 font-mono text-lg">{{ uuid }}</code>
          <button
            @click="copyUUID(uuid)"
            class="opacity-0 group-hover:opacity-100 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-all"
          >
            📋 Copier
          </button>
        </div>
      </div>
    </div>

    <!-- Settings -->
    <div class="grid md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white/10 rounded-lg p-4">
        <label class="block text-white mb-2 font-semibold">Version</label>
        <select
          v-model="version"
          class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="v4">UUID v4 (Aléatoire)</option>
          <option value="v1">UUID v1 (Temporel)</option>
        </select>
      </div>

      <div class="bg-white/10 rounded-lg p-4">
        <label class="block text-white mb-2 font-semibold">Quantité</label>
        <input
          v-model.number="quantity"
          type="number"
          min="1"
          max="50"
          class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div class="bg-white/10 rounded-lg p-4">
        <label class="block text-white mb-2 font-semibold">Format</label>
        <select
          v-model="format"
          @change="updateFormat"
          class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="lowercase">Minuscules</option>
          <option value="uppercase">MAJUSCULES</option>
          <option value="no-hyphens">Sans tirets</option>
        </select>
      </div>
    </div>

    <!-- Info Box -->
    <div class="bg-blue-500/20 border-2 border-blue-500 rounded-xl p-6">
      <h4 class="text-blue-400 font-bold mb-3">ℹ️ À propos des UUID</h4>
      <div class="text-gray-300 text-sm space-y-2">
        <p>
          <strong class="text-white">UUID v4:</strong> Génération aléatoire, idéal pour les identifiants d'objets,
          sessions, etc.
        </p>
        <p>
          <strong class="text-white">UUID v1:</strong> Basé sur l'horodatage et l'adresse MAC (simulée ici), utile pour
          le tri chronologique.
        </p>
        <p><strong class="text-white">Format:</strong> 8-4-4-4-12 caractères hexadécimaux (ex: 550e8400-e29b-41d4-a716-446655440000)</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex items-center justify-center gap-4">
      <button
        @click="generateBatch"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        🎲 Générer {{ quantity }} UUID
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

const uuids = ref([])
const version = ref('v4')
const quantity = ref(5)
const format = ref('lowercase')

function generateUUIDv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function generateUUIDv1() {
  const now = Date.now()
  const timeHex = now.toString(16).padStart(12, '0')
  const randomHex = Math.random().toString(16).substr(2, 16)
  return `${timeHex.substr(0, 8)}-${timeHex.substr(8, 4)}-1${randomHex.substr(0, 3)}-${randomHex.substr(3, 4)}-${randomHex.substr(7, 12)}`
}

function formatUUID(uuid) {
  if (format.value === 'uppercase') {
    return uuid.toUpperCase()
  } else if (format.value === 'no-hyphens') {
    return uuid.replace(/-/g, '')
  }
  return uuid
}

function generateBatch() {
  uuids.value = []
  for (let i = 0; i < quantity.value; i++) {
    const uuid = version.value === 'v4' ? generateUUIDv4() : generateUUIDv1()
    uuids.value.push(formatUUID(uuid))
  }
}

function updateFormat() {
  uuids.value = uuids.value.map(uuid => {
    // Revert to standard format first
    const standard = uuid.replace(/-/g, '').toLowerCase()
    const formatted = `${standard.substr(0, 8)}-${standard.substr(8, 4)}-${standard.substr(12, 4)}-${standard.substr(16, 4)}-${standard.substr(20, 12)}`
    return formatUUID(formatted)
  })
}

function clear() {
  uuids.value = []
}

async function copyUUID(uuid) {
  try {
    await navigator.clipboard.writeText(uuid)
    alert('UUID copié !')
  } catch (err) {
    alert('Erreur lors de la copie')
  }
}

async function copyAll() {
  try {
    await navigator.clipboard.writeText(uuids.value.join('\n'))
    alert(`${uuids.value.length} UUIDs copiés !`)
  } catch (err) {
    alert('Erreur lors de la copie')
  }
}

// Generate initial batch
generateBatch()
</script>
