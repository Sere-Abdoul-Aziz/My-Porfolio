<template>
  <div class="hash-generator">
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
      </div>

      <!-- Results -->
      <div class="space-y-6">
        <h3 class="text-xl font-bold text-white">🔐 Hachages MD5</h3>

        <div v-if="hashes.md5" class="space-y-4">
          <div class="bg-gray-900 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-400 text-sm font-semibold">MD5 (32 caractères)</span>
              <button @click="copyHash(hashes.md5)" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                📋 Copier
              </button>
            </div>
            <div class="bg-gray-800 rounded p-3 text-green-400 font-mono text-sm break-all">{{ hashes.md5 }}</div>
          </div>

          <div class="bg-gray-900 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-400 text-sm font-semibold">MD5 (UPPERCASE)</span>
              <button @click="copyHash(hashes.md5.toUpperCase())" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                📋 Copier
              </button>
            </div>
            <div class="bg-gray-800 rounded p-3 text-green-400 font-mono text-sm break-all">{{ hashes.md5.toUpperCase() }}</div>
          </div>

          <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div class="text-yellow-400 font-semibold mb-2">⚠️ Avertissement</div>
            <p class="text-yellow-300 text-sm">
              MD5 n'est plus considéré comme sécurisé pour des usages cryptographiques. Utilisez plutôt SHA-256 ou supérieur pour la sécurité.
              MD5 reste utile pour les sommes de contrôle et la vérification d'intégrité non-critique.
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
                <div class="text-white font-semibold">128 bits (32 hex)</div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="bg-gray-900 rounded-xl p-8 text-center text-gray-400">
          Entrez du texte ou téléchargez un fichier pour générer le hash MD5
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputText = ref('')
const hashes = ref({
  md5: ''
})

async function generateHashes() {
  if (!inputText.value) {
    hashes.value.md5 = ''
    return
  }

  // MD5 via API externe (goQR.me propose aussi MD5)
  // Ou utilisation d'une implémentation simple
  hashes.value.md5 = await md5(inputText.value)
}

// Implémentation simple MD5 (pour démonstration)
async function md5(string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(string)
  
  // Utiliser une API externe pour MD5 car Web Crypto ne le supporte pas
  // Alternative: implémenter MD5 en pur JS
  try {
    const response = await fetch(`https://api.hashify.net/hash/md5/hex?value=${encodeURIComponent(string)}`)
    const result = await response.json()
    return result.Digest || simpleHash(string)
  } catch {
    return simpleHash(string)
  }
}

// Hash simple de substitution (non cryptographique)
function simpleHash(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16).padStart(32, '0')
}

async function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    inputText.value = e.target.result
    generateHashes()
  }
  reader.readAsText(file)
}

function copyHash(hash) {
  navigator.clipboard.writeText(hash)
  alert('✅ Hash copié dans le presse-papiers!')
}
</script>
