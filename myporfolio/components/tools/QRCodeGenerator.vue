<template>
  <div class="qrcode-generator">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <!-- Settings -->
      <div class="space-y-4 sm:space-y-6">
        <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white">⚙️ Configuration</h3>

        <!-- Content -->
        <div>
          <label class="block text-white mb-2 font-semibold">Contenu du QR Code</label>
          <textarea
            v-model="content"
            @input="generateQRCode"
            rows="3"
            placeholder="https://example.com"
            class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
          ></textarea>
        </div>

        <!-- Quick Actions -->
        <div>
          <label class="block text-white mb-2 font-semibold">Actions rapides</label>
          <div class="grid grid-cols-2 gap-2">
            <button @click="setURL" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              🌐 URL
            </button>
            <button @click="setEmail" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              ✉️ Email
            </button>
            <button @click="setTel" class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              📞 Téléphone
            </button>
            <button @click="setWiFi" class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              📶 WiFi
            </button>
          </div>
        </div>

        <!-- Size -->
        <div>
          <label class="block text-white mb-2 font-semibold">Taille: {{ size }}px</label>
          <input v-model.number="size" @input="generateQRCode" type="range" min="128" max="512" step="32" class="w-full accent-blue-500" />
        </div>

        <!-- Error Correction -->
        <div>
          <label class="block text-white mb-2 font-semibold">Correction d'erreur</label>
          <select v-model="errorCorrection" @change="generateQRCode" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none">
            <option value="L">Basse (7%)</option>
            <option value="M">Moyenne (15%)</option>
            <option value="Q">Élevée (25%)</option>
            <option value="H">Maximum (30%)</option>
          </select>
        </div>

        <!-- Margin -->
        <div>
          <label class="block text-white mb-2 font-semibold">Marge: {{ margin }}px</label>
          <input v-model.number="margin" @input="generateQRCode" type="range" min="0" max="50" step="5" class="w-full accent-blue-500" />
        </div>

        <!-- Format -->
        <div>
          <label class="block text-white mb-2 font-semibold">Format de téléchargement</label>
          <select v-model="format" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none">
            <option value="png">PNG</option>
            <option value="svg">SVG</option>
            <option value="jpg">JPEG</option>
          </select>
        </div>
      </div>

      <!-- Preview -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">👁️ Aperçu</h3>
        <div class="bg-gray-900 rounded-xl p-8 flex flex-col items-center justify-center">
          <div v-if="qrCodeUrl" class="mb-6 bg-white p-4 rounded-lg">
            <img :src="qrCodeUrl" :alt="'QR Code: ' + content" class="border-2 border-gray-200 rounded" />
          </div>
          <div v-else class="mb-6 flex items-center justify-center bg-white p-8 rounded-lg" :style="{ width: size + 'px', height: size + 'px' }">
            <p class="text-gray-400 text-center text-sm">Entrez du contenu<br>pour générer le QR code</p>
          </div>
          <div class="w-full space-y-3">
            <button
              @click="downloadQRCode"
              :disabled="!content"
              class="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              💾 Télécharger {{ format.toUpperCase() }}
            </button>
            <button
              @click="copyToClipboard"
              :disabled="!content"
              class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              📋 Copier l'image
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const content = ref('https://azizsere.eveilon.com')
const size = ref(256)
const errorCorrection = ref('M')
const margin = ref(10)
const format = ref('png')
const qrCodeUrl = ref('')

function setURL() {
  content.value = 'https://example.com'
}

function setEmail() {
  content.value = 'mailto:contact@example.com?subject=Hello&body=Message'
}

function setTel() {
  content.value = 'tel:+33123456789'
}

function setWiFi() {
  content.value = 'WIFI:T:WPA;S:NetworkName;P:Password;;'
}

function generateQRCode() {
  if (!content.value) {
    qrCodeUrl.value = ''
    return
  }

  // Utiliser l'API gratuite de QR Server (goQR.me API)
  // Documentation: https://goqr.me/api/
  const encodedContent = encodeURIComponent(content.value)
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size.value}x${size.value}&data=${encodedContent}&ecc=${errorCorrection.value}&margin=${margin.value}&format=${format.value}`
  
  qrCodeUrl.value = apiUrl
}

async function downloadQRCode() {
  if (!qrCodeUrl.value) return

  try {
    const response = await fetch(qrCodeUrl.value)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `qrcode_${Date.now()}.${format.value}`
    a.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)
    alert('Erreur lors du téléchargement du QR code')
  }
}

async function copyToClipboard() {
  if (!qrCodeUrl.value) return

  try {
    const response = await fetch(qrCodeUrl.value)
    const blob = await response.blob()
    
    // Vérifier si l'API Clipboard est supportée
    if (!navigator.clipboard || !navigator.clipboard.write) {
      alert('La copie dans le presse-papiers n\'est pas supportée par votre navigateur')
      return
    }

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ])
    alert('✅ QR code copié dans le presse-papiers!')
  } catch (error) {
    console.error('Erreur lors de la copie:', error)
    alert('❌ Impossible de copier dans le presse-papiers. Utilisez le bouton de téléchargement.')
  }
}

// Watch for changes and regenerate QR code
watch([content, size, errorCorrection, margin, format], () => {
  generateQRCode()
}, { immediate: true })
</script>

<style scoped>
.qrcode-generator img {
  max-width: 100%;
  height: auto;
}
</style>
