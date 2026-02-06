<template>
  <div class="sha-generator">
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Input -->
      <div class="space-y-6">
        <h3 class="text-xl font-bold text-white">⚙️ Texte à hacher</h3>

        <div>
          <label class="block text-white mb-2 font-semibold">Texte d'entrée</label>
          <textarea
            v-model="inputText"
            @input="generateHashes"
            rows="8"
            placeholder="Entrez votre texte ici..."
            class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
          ></textarea>
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold">Ou télécharger un fichier</label>
          <input
            @change="handleFileUpload"
            type="file"
            class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white file:cursor-pointer hover:file:bg-blue-600"
          />
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold">Algorithme</label>
          <select v-model="algorithm" @change="generateHashes" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none">
            <option value="SHA256">SHA-256</option>
            <option value="SHA224">SHA-224</option>
            <option value="SHA512">SHA-512</option>
            <option value="SHA384">SHA-384</option>
            <option value="SHA1">SHA-1 (obsolète)</option>
          </select>
        </div>
      </div>

      <!-- Results -->
      <div class="space-y-6">
        <h3 class="text-xl font-bold text-white">🔐 Hachage {{ algorithm }}</h3>

        <div v-if="currentHash" class="space-y-4">
          <div class="bg-gray-900 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-400 text-sm font-semibold">{{ algorithm }} (lowercase)</span>
              <button @click="copyHash(currentHash)" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                📋 Copier
              </button>
            </div>
            <div class="bg-gray-800 rounded p-3 text-green-400 font-mono text-xs break-all">{{ currentHash }}</div>
          </div>

          <div class="bg-gray-900 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-400 text-sm font-semibold">{{ algorithm }} (UPPERCASE)</span>
              <button @click="copyHash(currentHash.toUpperCase())" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                📋 Copier
              </button>
            </div>
            <div class="bg-gray-800 rounded p-3 text-green-400 font-mono text-xs break-all">{{ currentHash.toUpperCase() }}</div>
          </div>

          <div v-if="algorithm === 'SHA1'" class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div class="text-yellow-400 font-semibold mb-2">⚠️ Avertissement</div>
            <p class="text-yellow-300 text-sm">
              SHA-1 est considéré comme obsolète et vulnérable. Utilisez SHA-256 ou supérieur pour les applications sécurisées.
            </p>
          </div>

          <div class="bg-gray-900 rounded-xl p-4">
            <div class="text-white font-semibold mb-3">📊 Statistiques</div>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div class="text-gray-400">Longueur entrée</div>
                <div class="text-white font-semibold">{{ inputText.length }} caractères</div>
              </div>
              <div>
                <div class="text-gray-400">Longueur hash</div>
                <div class="text-white font-semibold">{{ getHashLength() }}</div>
              </div>
              <div>
                <div class="text-gray-400">Taille</div>
                <div class="text-white font-semibold">{{ (inputText.length / 1024).toFixed(2) }} KB</div>
              </div>
              <div>
                <div class="text-gray-400">Sécurité</div>
                <div class="text-white font-semibold">{{ getSecurityLevel() }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="bg-gray-900 rounded-xl p-8 text-center text-gray-400">
          Entrez du texte ou téléchargez un fichier pour générer le hash SHA
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputText = ref('')
const algorithm = ref('SHA256')

const currentHash = computed(async () => {
  if (!inputText.value) return ''
  return await generateHash(inputText.value, algorithm.value)
})

async function generateHash(text, algo) {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  
  let hashAlgo = 'SHA-256'
  switch (algo) {
    case 'SHA224': hashAlgo = 'SHA-224'; break // Not supported in Web Crypto
    case 'SHA256': hashAlgo = 'SHA-256'; break
    case 'SHA384': hashAlgo = 'SHA-384'; break
    case 'SHA512': hashAlgo = 'SHA-512'; break
    case 'SHA1': hashAlgo = 'SHA-1'; break
  }
  
  try {
    const hashBuffer = await crypto.subtle.digest(hashAlgo, data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
  } catch (e) {
    return 'Algorithm not supported by browser'
  }
}

function generateHashes() {
  // Trigger computed property recalculation
}

async function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    inputText.value = e.target.result
  }
  reader.readAsText(file)
}

function copyHash(hash) {
  navigator.clipboard.writeText(hash)
  alert('✅ Hash copié dans le presse-papiers!')
}

function getHashLength() {
  const lengths = {
    SHA224: '224 bits (56 hex)',
    SHA256: '256 bits (64 hex)',
    SHA384: '384 bits (96 hex)',
    SHA512: '512 bits (128 hex)',
    SHA1: '160 bits (40 hex)'
  }
  return lengths[algorithm.value] || ''
}

function getSecurityLevel() {
  const levels = {
    SHA224: 'Élevée',
    SHA256: 'Très Élevée',
    SHA384: 'Très Élevée',
    SHA512: 'Maximale',
    SHA1: 'Faible (obsolète)'
  }
  return levels[algorithm.value] || ''
}
</script>
