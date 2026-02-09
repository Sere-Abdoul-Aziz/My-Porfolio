<template>
  <div class="password-strength-tester">
    <div class="space-y-4 sm:space-y-6">
      <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white">🔐 Testeur de Force de Mot de Passe</h3>

      <!-- Input -->
      <div>
        <label class="block text-white mb-2 font-semibold">Entrez votre mot de passe</label>
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Tapez votre mot de passe..."
            class="w-full bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-3 pr-12 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
          />
          <button @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
        </div>
      </div>

      <!-- Strength Meter -->
      <div v-if="password" class="bg-gray-900 rounded-xl p-6">
        <div class="mb-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-white font-semibold">Force du mot de passe</span>
            <span :class="strengthTextColor" class="font-bold text-lg">{{ strengthText }}</span>
          </div>
          <div class="bg-gray-800 rounded-full h-4 overflow-hidden">
            <div :class="strengthColor" :style="{ width: strength + '%' }" class="h-full transition-all duration-300"></div>
          </div>
        </div>

        <!-- Score Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div class="bg-gray-800 rounded-lg p-4">
            <div class="text-gray-400 text-sm mb-1">Score global</div>
            <div class="text-white text-2xl font-bold">{{ strength }}/100</div>
          </div>
          <div class="bg-gray-800 rounded-lg p-4">
            <div class="text-gray-400 text-sm mb-1">Temps de craquage estimé</div>
            <div class="text-white text-xl font-bold">{{ crackTime }}</div>
          </div>
        </div>

        <!-- Criteria -->
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span :class="criteria.length >= 8 ? 'text-green-400' : 'text-red-400'">{{ criteria.length >= 8 ? '✅' : '❌' }}</span>
            <span class="text-white">Au moins 8 caractères ({{ password.length }})</span>
          </div>
          <div class="flex items-center gap-2">
            <span :class="criteria.hasLowercase ? 'text-green-400' : 'text-red-400'">{{ criteria.hasLowercase ? '✅' : '❌' }}</span>
            <span class="text-white">Lettres minuscules (a-z)</span>
          </div>
          <div class="flex items-center gap-2">
            <span :class="criteria.hasUppercase ? 'text-green-400' : 'text-red-400'">{{ criteria.hasUppercase ? '✅' : '❌' }}</span>
            <span class="text-white">Lettres majuscules (A-Z)</span>
          </div>
          <div class="flex items-center gap-2">
            <span :class="criteria.hasNumbers ? 'text-green-400' : 'text-red-400'">{{ criteria.hasNumbers ? '✅' : '❌' }}</span>
            <span class="text-white">Chiffres (0-9)</span>
          </div>
          <div class="flex items-center gap-2">
            <span :class="criteria.hasSymbols ? 'text-green-400' : 'text-red-400'">{{ criteria.hasSymbols ? '✅' : '❌' }}</span>
            <span class="text-white">Symboles (!@#$%...)</span>
          </div>
          <div class="flex items-center gap-2">
            <span :class="!criteria.hasCommon ? 'text-green-400' : 'text-red-400'">{{ !criteria.hasCommon ? '✅' : '❌' }}</span>
            <span class="text-white">N'est pas un mot de passe commun</span>
          </div>
        </div>

        <!-- Recommendations -->
        <div v-if="recommendations.length > 0" class="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <div class="text-yellow-400 font-semibold mb-2">💡 Recommandations:</div>
          <ul class="space-y-1">
            <li v-for="(rec, index) in recommendations" :key="index" class="text-yellow-300 text-sm">• {{ rec }}</li>
          </ul>
        </div>
      </div>

      <div v-else class="bg-gray-900 rounded-xl p-8 text-center text-gray-400">
        Entrez un mot de passe pour analyser sa force
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const password = ref('')
const showPassword = ref(false)

const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein', 'welcome', 'monkey', '1234567890']

const criteria = computed(() => ({
  length: password.value.length,
  hasLowercase: /[a-z]/.test(password.value),
  hasUppercase: /[A-Z]/.test(password.value),
  hasNumbers: /[0-9]/.test(password.value),
  hasSymbols: /[^a-zA-Z0-9]/.test(password.value),
  hasCommon: commonPasswords.some(common => password.value.toLowerCase().includes(common))
}))

const strength = computed(() => {
  if (!password.value) return 0
  
  let score = 0
  const len = password.value.length
  
  // Length scoring
  if (len >= 8) score += 20
  if (len >= 12) score += 15
  if (len >= 16) score += 15
  if (len >= 20) score += 10
  
  // Character variety
  if (criteria.value.hasLowercase) score += 10
  if (criteria.value.hasUppercase) score += 10
  if (criteria.value.hasNumbers) score += 10
  if (criteria.value.hasSymbols) score += 15
  
  // Penalize common passwords
  if (criteria.value.hasCommon) score -= 30
  
  // Check for patterns
  if (/(.)\1{2,}/.test(password.value)) score -= 10 // Repeated characters
  if (/^[0-9]+$/.test(password.value)) score -= 20 // Only numbers
  if (/^[a-zA-Z]+$/.test(password.value)) score -= 10 // Only letters
  
  return Math.max(0, Math.min(100, score))
})

const strengthText = computed(() => {
  if (strength.value < 30) return 'Très Faible'
  if (strength.value < 50) return 'Faible'
  if (strength.value < 70) return 'Moyen'
  if (strength.value < 90) return 'Fort'
  return 'Très Fort'
})

const strengthColor = computed(() => {
  if (strength.value < 30) return 'bg-red-500'
  if (strength.value < 50) return 'bg-orange-500'
  if (strength.value < 70) return 'bg-yellow-500'
  if (strength.value < 90) return 'bg-blue-500'
  return 'bg-green-500'
})

const strengthTextColor = computed(() => {
  if (strength.value < 30) return 'text-red-400'
  if (strength.value < 50) return 'text-orange-400'
  if (strength.value < 70) return 'text-yellow-400'
  if (strength.value < 90) return 'text-blue-400'
  return 'text-green-400'
})

const crackTime = computed(() => {
  const len = password.value.length
  let charset = 0
  if (criteria.value.hasLowercase) charset += 26
  if (criteria.value.hasUppercase) charset += 26
  if (criteria.value.hasNumbers) charset += 10
  if (criteria.value.hasSymbols) charset += 32
  
  const combinations = Math.pow(charset, len)
  const secondsToHackAt1B = combinations / 1000000000
  
  if (secondsToHackAt1B < 1) return 'Instantané'
  if (secondsToHackAt1B < 60) return `${Math.round(secondsToHackAt1B)} secondes`
  if (secondsToHackAt1B < 3600) return `${Math.round(secondsToHackAt1B / 60)} minutes`
  if (secondsToHackAt1B < 86400) return `${Math.round(secondsToHackAt1B / 3600)} heures`
  if (secondsToHackAt1B < 31536000) return `${Math.round(secondsToHackAt1B / 86400)} jours`
  if (secondsToHackAt1B < 31536000000) return `${Math.round(secondsToHackAt1B / 31536000)} ans`
  return 'Des siècles'
})

const recommendations = computed(() => {
  const recs = []
  if (password.value.length < 12) recs.push('Utilisez au moins 12 caractères')
  if (!criteria.value.hasUppercase) recs.push('Ajoutez des lettres majuscules')
  if (!criteria.value.hasLowercase) recs.push('Ajoutez des lettres minuscules')
  if (!criteria.value.hasNumbers) recs.push('Ajoutez des chiffres')
  if (!criteria.value.hasSymbols) recs.push('Ajoutez des symboles (!@#$%...)')
  if (criteria.value.hasCommon) recs.push('Évitez les mots de passe courants')
  if (/(.)\1{2,}/.test(password.value)) recs.push('Évitez les caractères répétés')
  return recs
})
</script>
