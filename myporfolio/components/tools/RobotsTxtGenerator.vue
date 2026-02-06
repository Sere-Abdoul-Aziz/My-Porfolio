<template>
  <div class="robots-generator space-y-6">
    <h3 class="text-xl font-bold text-white">🤖 Générateur de Robots.txt</h3>

    <div class="grid lg:grid-cols-2 gap-6">
      <div class="space-y-6">
        <div>
          <label class="block text-white mb-2 font-semibold">Preset</label>
          <select v-model="preset" @change="applyPreset" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none">
            <option value="custom">Personnalisé</option>
            <option value="allow-all">Autoriser tous les robots</option>
            <option value="block-all">Bloquer tous les robots</option>
            <option value="production">Production (SEO optimisé)</option>
            <option value="staging">Staging (Bloquer indexation)</option>
          </select>
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold">User-agent</label>
          <input v-model="userAgent" placeholder="*" class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none" />
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold">Disallow (un par ligne)</label>
          <textarea v-model="disallow" rows="6" placeholder="/admin/\n/private/" class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none font-mono"></textarea>
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold">Allow (un par ligne)</label>
          <textarea v-model="allow" rows="4" placeholder="/public/\n/assets/" class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none font-mono"></textarea>
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold">Sitemap URL</label>
          <input v-model="sitemap" placeholder="https://example.com/sitemap.xml" class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none" />
        </div>

        <div>
          <label class="block text-white mb-2 font-semibold">Crawl-delay (secondes)</label>
          <input v-model.number="crawlDelay" type="number" min="0" max="60" class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-white font-semibold">Fichier robots.txt</h4>
          <div class="flex gap-2">
            <button @click="copyContent" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              📋 Copier
            </button>
            <button @click="downloadFile" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              💾 Télécharger
            </button>
          </div>
        </div>
        
        <div class="bg-gray-900 rounded-xl p-4 mb-4">
          <pre class="text-green-400 font-mono text-sm">{{ generatedContent }}</pre>
        </div>

        <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div class="text-blue-400 font-semibold mb-2">💡 Conseils</div>
          <ul class="text-blue-300 text-sm space-y-1">
            <li>• Placez robots.txt à la racine de votre site</li>
            <li>• Testez avec Google Search Console</li>
            <li>• N'utilisez pas robots.txt pour cacher du contenu sensible</li>
            <li>• Ajoutez toujours l'URL de votre sitemap</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const preset = ref('custom')
const userAgent = ref('*')
const disallow = ref('')
const allow = ref('')
const sitemap = ref('https://example.com/sitemap.xml')
const crawlDelay = ref(0)

const generatedContent = computed(() => {
  let content = '# robots.txt généré par Sere Aziz\n'
  content += '# https://azizsere.eveilon.com/ressources\n\n'
  content += `User-agent: ${userAgent.value}\n`

  if (disallow.value) {
    disallow.value.split('\n').filter(line => line.trim()).forEach(line => {
      content += `Disallow: ${line.trim()}\n`
    })
  }

  if (allow.value) {
    allow.value.split('\n').filter(line => line.trim()).forEach(line => {
      content += `Allow: ${line.trim()}\n`
    })
  }

  if (crawlDelay.value > 0) {
    content += `Crawl-delay: ${crawlDelay.value}\n`
  }

  if (sitemap.value) {
    content += `\nSitemap: ${sitemap.value}\n`
  }

  return content
})

function applyPreset() {
  switch (preset.value) {
    case 'allow-all':
      userAgent.value = '*'
      disallow.value = ''
      allow.value = '/'
      break
    case 'block-all':
      userAgent.value = '*'
      disallow.value = '/'
      allow.value = ''
      break
    case 'production':
      userAgent.value = '*'
      disallow.value = '/admin/\n/private/\n/api/\n*.json$'
      allow.value = '/assets/\n/public/'
      break
    case 'staging':
      userAgent.value = '*'
      disallow.value = '/'
      allow.value = ''
      break
  }
}

function copyContent() {
  navigator.clipboard.writeText(generatedContent.value)
  alert('✅ robots.txt copié!')
}

function downloadFile() {
  const blob = new Blob([generatedContent.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'robots.txt'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
