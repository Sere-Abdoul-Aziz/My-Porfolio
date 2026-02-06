<template>
  <div class="csp-generator space-y-6">
    <h3 class="text-xl font-bold text-white">🛡️ Générateur Content Security Policy</h3>

    <div class="grid lg:grid-cols-2 gap-6">
      <div class="space-y-6">
        <div>
          <label class="block text-white mb-2 font-semibold">Preset</label>
          <select v-model="preset" @change="applyPreset" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none">
            <option value="custom">Personnalisé</option>
            <option value="strict">Strict (Maximum sécurité)</option>
            <option value="moderate">Modéré (Équilibré)</option>
            <option value="basic">Basique (Flexible)</option>
          </select>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block text-white mb-2 font-semibold">default-src</label>
            <input v-model="directives.defaultSrc" placeholder="'self'" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm" />
          </div>

          <div>
            <label class="block text-white mb-2 font-semibold">script-src</label>
            <input v-model="directives.scriptSrc" placeholder="'self'" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm" />
          </div>

          <div>
            <label class="block text-white mb-2 font-semibold">style-src</label>
            <input v-model="directives.styleSrc" placeholder="'self' 'unsafe-inline'" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm" />
          </div>

          <div>
            <label class="block text-white mb-2 font-semibold">img-src</label>
            <input v-model="directives.imgSrc" placeholder="'self' data: https:" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm" />
          </div>

          <div>
            <label class="block text-white mb-2 font-semibold">font-src</label>
            <input v-model="directives.fontSrc" placeholder="'self'" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm" />
          </div>

          <div>
            <label class="block text-white mb-2 font-semibold">connect-src</label>
            <input v-model="directives.connectSrc" placeholder="'self'" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm" />
          </div>

          <div>
            <label class="block text-white mb-2 font-semibold">frame-ancestors</label>
            <input v-model="directives.frameAncestors" placeholder="'none'" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm" />
          </div>

          <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
            <span class="text-white">upgrade-insecure-requests</span>
            <input v-model="directives.upgradeInsecure" type="checkbox" class="w-5 h-5 accent-blue-500" />
          </label>

          <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
            <span class="text-white">block-all-mixed-content</span>
            <input v-model="directives.blockMixed" type="checkbox" class="w-5 h-5 accent-blue-500" />
          </label>
        </div>
      </div>

      <div class="space-y-6">
        <div>
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-white font-semibold">En-tête CSP</h4>
            <button @click="copyContent" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              📋 Copier
            </button>
          </div>
          
          <div class="bg-gray-900 rounded-xl p-4">
            <pre class="text-green-400 font-mono text-xs break-all whitespace-pre-wrap">{{ generatedCSP }}</pre>
          </div>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-3">📝 Implémentation</h4>
          
          <div class="space-y-3">
            <div class="bg-gray-900 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-2">Apache (.htaccess)</div>
              <pre class="bg-gray-800 rounded p-3 text-green-400 font-mono text-xs overflow-x-auto">Header set Content-Security-Policy "{{ generatedCSP }}"</pre>
            </div>

            <div class="bg-gray-900 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-2">Nginx</div>
              <pre class="bg-gray-800 rounded p-3 text-green-400 font-mono text-xs overflow-x-auto">add_header Content-Security-Policy "{{ generatedCSP }}";</pre>
            </div>

            <div class="bg-gray-900 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-2">HTML Meta Tag</div>
              <pre class="bg-gray-800 rounded p-3 text-green-400 font-mono text-xs overflow-x-auto">&lt;meta http-equiv="Content-Security-Policy" content="{{ generatedCSP }}"&gt;</pre>
            </div>
          </div>
        </div>

        <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div class="text-blue-400 font-semibold mb-2">💡 Conseils</div>
          <ul class="text-blue-300 text-sm space-y-1">
            <li>• Testez en mode Report-Only d'abord</li>
            <li>• Utilisez 'nonce-' ou 'sha256-' pour les scripts inline</li>
            <li>• Évitez 'unsafe-inline' et 'unsafe-eval'</li>
            <li>• Surveillez les rapports CSP</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const preset = ref('custom')
const directives = ref({
  defaultSrc: "'self'",
  scriptSrc: "'self'",
  styleSrc: "'self' 'unsafe-inline'",
  imgSrc: "'self' data: https:",
  fontSrc: "'self'",
  connectSrc: "'self'",
  frameAncestors: "'none'",
  upgradeInsecure: true,
  blockMixed: false
})

const generatedCSP = computed(() => {
  let csp = []
  
  if (directives.value.defaultSrc) csp.push(`default-src ${directives.value.defaultSrc}`)
  if (directives.value.scriptSrc) csp.push(`script-src ${directives.value.scriptSrc}`)
  if (directives.value.styleSrc) csp.push(`style-src ${directives.value.styleSrc}`)
  if (directives.value.imgSrc) csp.push(`img-src ${directives.value.imgSrc}`)
  if (directives.value.fontSrc) csp.push(`font-src ${directives.value.fontSrc}`)
  if (directives.value.connectSrc) csp.push(`connect-src ${directives.value.connectSrc}`)
  if (directives.value.frameAncestors) csp.push(`frame-ancestors ${directives.value.frameAncestors}`)
  if (directives.value.upgradeInsecure) csp.push('upgrade-insecure-requests')
  if (directives.value.blockMixed) csp.push('block-all-mixed-content')
  
  return csp.join('; ')
})

function applyPreset() {
  switch (preset.value) {
    case 'strict':
      directives.value = {
        defaultSrc: "'self'",
        scriptSrc: "'self'",
        styleSrc: "'self'",
        imgSrc: "'self'",
        fontSrc: "'self'",
        connectSrc: "'self'",
        frameAncestors: "'none'",
        upgradeInsecure: true,
        blockMixed: true
      }
      break
    case 'moderate':
      directives.value = {
        defaultSrc: "'self'",
        scriptSrc: "'self' 'unsafe-inline'",
        styleSrc: "'self' 'unsafe-inline'",
        imgSrc: "'self' data: https:",
        fontSrc: "'self' data:",
        connectSrc: "'self'",
        frameAncestors: "'self'",
        upgradeInsecure: true,
        blockMixed: false
      }
      break
    case 'basic':
      directives.value = {
        defaultSrc: "'self'",
        scriptSrc: "'self' 'unsafe-inline' 'unsafe-eval'",
        styleSrc: "'self' 'unsafe-inline'",
        imgSrc: "'self' data: https: http:",
        fontSrc: "'self' data:",
        connectSrc: "'self' https:",
        frameAncestors: "'self'",
        upgradeInsecure: false,
        blockMixed: false
      }
      break
  }
}

function copyContent() {
  navigator.clipboard.writeText(generatedCSP.value)
  alert('✅ CSP copié!')
}
</script>
