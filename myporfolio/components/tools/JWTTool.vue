<template>
  <div class="jwt-tools">
    <div class="mb-6">
      <div class="flex flex-col sm:flex-row gap-2">
        <button
          @click="mode = 'encode'"
          :class="['flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors', mode === 'encode' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20']"
        >
          🔐 Encoder JWT
        </button>
        <button
          @click="mode = 'decode'"
          :class="['flex-1 px-6 py-3 rounded-lg font-semibold transition-colors', mode === 'decode' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20']"
        >
          🔓 Décoder JWT
        </button>
      </div>
    </div>

    <!-- Encode Mode -->
    <div v-if="mode === 'encode'" class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <div class="space-y-6">
        <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white">📝 Données du Token</h3>

        <div>
          <label class="block text-white mb-2 font-semibold">Header (JSON)</label>
          <textarea
            v-model="header"
            rows="4"
            class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm resize-none"
          ></textarea>
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold">Payload (JSON)</label>
          <textarea
            v-model="payload"
            rows="8"
            class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm resize-none"
          ></textarea>
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold">Secret Key</label>
          <input
            v-model="secret"
            type="text"
            placeholder="your-256-bit-secret"
            class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
          />
        </div>

        <button @click="encodeJWT" class="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors">
          🔐 Générer JWT
        </button>
      </div>

      <div class="space-y-6">
        <h3 class="text-xl font-bold text-white">🎯 Token JWT</h3>
        
        <div v-if="encodedToken" class="bg-gray-900 rounded-xl p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm font-semibold">Token généré</span>
            <button @click="copyToken(encodedToken)" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
              📋 Copier
            </button>
          </div>
          <div class="bg-gray-800 rounded p-3 text-green-400 font-mono text-xs break-all">{{ encodedToken }}</div>
        </div>

        <div v-if="encodedToken" class="bg-gray-900 rounded-xl p-4">
          <div class="text-white font-semibold mb-3">🔍 Détails du Token</div>
          <div class="space-y-2 text-sm">
            <div>
              <span class="text-blue-400">Header:</span>
              <span class="text-gray-300 ml-2 font-mono">{{ encodedToken.split('.')[0] }}</span>
            </div>
            <div>
              <span class="text-green-400">Payload:</span>
              <span class="text-gray-300 ml-2 font-mono">{{ encodedToken.split('.')[1] }}</span>
            </div>
            <div>
              <span class="text-purple-400">Signature:</span>
              <span class="text-gray-300 ml-2 font-mono">{{ encodedToken.split('.')[2] }}</span>
            </div>
          </div>
        </div>

        <div v-else class="bg-gray-900 rounded-xl p-8 text-center text-gray-400">
          Configurez les données et cliquez sur "Générer JWT"
        </div>
      </div>
    </div>

    <!-- Decode Mode -->
    <div v-if="mode === 'decode'" class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <div class="space-y-6">
        <h3 class="text-xl font-bold text-white">🔓 Token à Décoder</h3>

        <div>
          <label class="block text-white mb-2 font-semibold">Token JWT</label>
          <textarea
            v-model="tokenToDecode"
            @input="decodeJWT"
            rows="6"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm resize-none"
          ></textarea>
        </div>

        <div v-if="decodedError" class="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div class="text-red-400 font-semibold">❌ Erreur</div>
          <p class="text-red-300 text-sm mt-1">{{ decodedError }}</p>
        </div>
      </div>

      <div class="space-y-6">
        <h3 class="text-xl font-bold text-white">📋 Données Décodées</h3>

        <div v-if="decodedHeader" class="bg-gray-900 rounded-xl p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-blue-400 font-semibold">Header</span>
            <button @click="copyToken(JSON.stringify(decodedHeader, null, 2))" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
              📋 Copier
            </button>
          </div>
          <pre class="bg-gray-800 rounded p-3 text-green-400 font-mono text-xs overflow-x-auto">{{ JSON.stringify(decodedHeader, null, 2) }}</pre>
        </div>

        <div v-if="decodedPayload" class="bg-gray-900 rounded-xl p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-green-400 font-semibold">Payload</span>
            <button @click="copyToken(JSON.stringify(decodedPayload, null, 2))" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
              📋 Copier
            </button>
          </div>
          <pre class="bg-gray-800 rounded p-3 text-green-400 font-mono text-xs overflow-x-auto">{{ JSON.stringify(decodedPayload, null, 2) }}</pre>
        </div>

        <div v-if="!decodedHeader && !decodedError" class="bg-gray-900 rounded-xl p-8 text-center text-gray-400">
          Collez un token JWT pour le décoder
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('encode')

// Encode mode
const header = ref('{\n  "alg": "HS256",\n  "typ": "JWT"\n}')
const payload = ref('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}')
const secret = ref('your-256-bit-secret')
const encodedToken = ref('')

// Decode mode
const tokenToDecode = ref('')
const decodedHeader = ref(null)
const decodedPayload = ref(null)
const decodedError = ref('')

function base64UrlEncode(str) {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) str += '='
  return atob(str)
}

function encodeJWT() {
  try {
    const headerObj = JSON.parse(header.value)
    const payloadObj = JSON.parse(payload.value)
    
    const headerEncoded = base64UrlEncode(JSON.stringify(headerObj))
    const payloadEncoded = base64UrlEncode(JSON.stringify(payloadObj))
    
    // Simplified signature (in production, use proper HMAC-SHA256)
    const signature = base64UrlEncode(secret.value + headerEncoded + payloadEncoded)
    
    encodedToken.value = `${headerEncoded}.${payloadEncoded}.${signature}`
  } catch (error) {
    alert('❌ Erreur: Vérifiez que le Header et le Payload sont en JSON valide')
  }
}

function decodeJWT() {
  decodedError.value = ''
  decodedHeader.value = null
  decodedPayload.value = null
  
  if (!tokenToDecode.value) return
  
  try {
    const parts = tokenToDecode.value.split('.')
    if (parts.length !== 3) {
      throw new Error('Format JWT invalide (doit avoir 3 parties séparées par des points)')
    }
    
    decodedHeader.value = JSON.parse(base64UrlDecode(parts[0]))
    decodedPayload.value = JSON.parse(base64UrlDecode(parts[1]))
  } catch (error) {
    decodedError.value = error.message
  }
}

function copyToken(text) {
  navigator.clipboard.writeText(text)
  alert('✅ Copié dans le presse-papiers!')
}
</script>
