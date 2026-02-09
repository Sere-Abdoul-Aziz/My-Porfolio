<template>
  <div class="password-generator">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <!-- Settings -->
      <div class="space-y-4 sm:space-y-6">
        <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white">⚙️ Configuration</h3>

        <!-- Length -->
        <div>
          <label class="block text-white mb-2 font-semibold">Longueur: {{ length }} caractères</label>
          <input v-model.number="length" @input="generatePassword" type="range" min="8" max="64" step="1" class="w-full accent-blue-500" />
        </div>

        <!-- Options -->
        <div class="space-y-3">
          <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
            <span class="text-white font-semibold">Majuscules (A-Z)</span>
            <input v-model="includeUppercase" @change="generatePassword" type="checkbox" class="w-5 h-5 accent-blue-500" />
          </label>
          <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
            <span class="text-white font-semibold">Minuscules (a-z)</span>
            <input v-model="includeLowercase" @change="generatePassword" type="checkbox" class="w-5 h-5 accent-blue-500" />
          </label>
          <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
            <span class="text-white font-semibold">Chiffres (0-9)</span>
            <input v-model="includeNumbers" @change="generatePassword" type="checkbox" class="w-5 h-5 accent-blue-500" />
          </label>
          <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
            <span class="text-white font-semibold">Symboles (!@#$%^&*)</span>
            <input v-model="includeSymbols" @change="generatePassword" type="checkbox" class="w-5 h-5 accent-blue-500" />
          </label>
          <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
            <span class="text-white font-semibold">Exclure caractères ambigus (0,O,l,1)</span>
            <input v-model="excludeAmbiguous" @change="generatePassword" type="checkbox" class="w-5 h-5 accent-blue-500" />
          </label>
        </div>

        <!-- Quantity -->
        <div>
          <label class="block text-white mb-2 font-semibold">Générer {{ quantity }} mot(s) de passe</label>
          <input v-model.number="quantity" @input="generatePasswords" type="range" min="1" max="10" step="1" class="w-full accent-blue-500" />
        </div>
      </div>

      <!-- Results -->
      <div>
        <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white mb-4">🔑 Résultats</h3>
        <div class="space-y-4">
          <div v-for="(pwd, index) in passwords" :key="index" class="bg-gray-900 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-white font-mono text-lg break-all">{{ pwd }}</span>
              <button @click="copyPassword(pwd)" class="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap">
                📋 Copier
              </button>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                <div :class="getStrengthColor(pwd)" :style="{ width: getStrength(pwd) + '%' }" class="h-full transition-all"></div>
              </div>
              <span :class="getStrengthTextColor(pwd)" class="text-sm font-semibold whitespace-nowrap">{{ getStrengthText(pwd) }}</span>
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="generatePasswords" class="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors">
              🔄 Régénérer
            </button>
            <button @click="copyAll" class="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-bold transition-colors">
              📋 Copier tout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const length = ref(16)
const includeUppercase = ref(true)
const includeLowercase = ref(true)
const includeNumbers = ref(true)
const includeSymbols = ref(true)
const excludeAmbiguous = ref(false)
const quantity = ref(3)
const passwords = ref([])

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
const ambiguous = '0O1lI'

function generatePassword() {
  let charset = ''
  if (includeUppercase.value) charset += uppercase
  if (includeLowercase.value) charset += lowercase
  if (includeNumbers.value) charset += numbers
  if (includeSymbols.value) charset += symbols

  if (excludeAmbiguous.value) {
    charset = charset.split('').filter(char => !ambiguous.includes(char)).join('')
  }

  if (!charset) {
    return 'Sélectionnez au moins une option'
  }

  let password = ''
  const crypto = window.crypto || window.msCrypto
  const array = new Uint32Array(length.value)
  crypto.getRandomValues(array)

  for (let i = 0; i < length.value; i++) {
    password += charset[array[i] % charset.length]
  }

  return password
}

function generatePasswords() {
  passwords.value = []
  for (let i = 0; i < quantity.value; i++) {
    passwords.value.push(generatePassword())
  }
}

function getStrength(password) {
  let strength = 0
  if (password.length >= 8) strength += 20
  if (password.length >= 12) strength += 20
  if (password.length >= 16) strength += 20
  if (/[a-z]/.test(password)) strength += 10
  if (/[A-Z]/.test(password)) strength += 10
  if (/[0-9]/.test(password)) strength += 10
  if (/[^a-zA-Z0-9]/.test(password)) strength += 10
  return Math.min(strength, 100)
}

function getStrengthText(password) {
  const strength = getStrength(password)
  if (strength < 40) return 'Faible'
  if (strength < 70) return 'Moyen'
  if (strength < 90) return 'Fort'
  return 'Très Fort'
}

function getStrengthColor(password) {
  const strength = getStrength(password)
  if (strength < 40) return 'bg-red-500'
  if (strength < 70) return 'bg-orange-500'
  if (strength < 90) return 'bg-yellow-500'
  return 'bg-green-500'
}

function getStrengthTextColor(password) {
  const strength = getStrength(password)
  if (strength < 40) return 'text-red-400'
  if (strength < 70) return 'text-orange-400'
  if (strength < 90) return 'text-yellow-400'
  return 'text-green-400'
}

function copyPassword(password) {
  navigator.clipboard.writeText(password)
  alert('✅ Mot de passe copié!')
}

function copyAll() {
  const allPasswords = passwords.value.join('\n')
  navigator.clipboard.writeText(allPasswords)
  alert('✅ Tous les mots de passe copiés!')
}

onMounted(() => {
  generatePasswords()
})
</script>
