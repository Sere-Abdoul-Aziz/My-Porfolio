<template>
  <div class="htaccess-generator space-y-6">
    <h3 class="text-xl font-bold text-white">⚙️ Générateur de .htaccess</h3>

    <div class="grid lg:grid-cols-2 gap-6">
      <div class="space-y-4">
        <h4 class="text-white font-semibold">Options</h4>
        
        <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
          <span class="text-white">Redirection HTTPS</span>
          <input v-model="options.https" type="checkbox" class="w-5 h-5 accent-blue-500" />
        </label>

        <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
          <span class="text-white">Redirection WWW</span>
          <input v-model="options.www" type="checkbox" class="w-5 h-5 accent-blue-500" />
        </label>

        <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
          <span class="text-white">Compression GZIP</span>
          <input v-model="options.gzip" type="checkbox" class="w-5 h-5 accent-blue-500" />
        </label>

        <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
          <span class="text-white">Cache Browser</span>
          <input v-model="options.cache" type="checkbox" class="w-5 h-5 accent-blue-500" />
        </label>

        <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
          <span class="text-white">Protection .env</span>
          <input v-model="options.envProtection" type="checkbox" class="w-5 h-5 accent-blue-500" />
        </label>

        <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
          <span class="text-white">Bloquer listage répertoires</span>
          <input v-model="options.noIndex" type="checkbox" class="w-5 h-5 accent-blue-500" />
        </label>

        <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
          <span class="text-white">Protection hotlinking</span>
          <input v-model="options.hotlink" type="checkbox" class="w-5 h-5 accent-blue-500" />
        </label>

        <label class="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors">
          <span class="text-white">Sécurité Headers</span>
          <input v-model="options.security" type="checkbox" class="w-5 h-5 accent-blue-500" />
        </label>
      </div>

      <div>
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-white font-semibold">Fichier .htaccess</h4>
          <div class="flex gap-2">
            <button @click="copyContent" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              📋 Copier
            </button>
            <button @click="downloadFile" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              💾 Télécharger
            </button>
          </div>
        </div>
        
        <div class="bg-gray-900 rounded-xl p-4">
          <pre class="text-green-400 font-mono text-sm overflow-x-auto max-h-[600px]">{{ generatedContent }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const options = ref({
  https: true,
  www: false,
  gzip: true,
  cache: true,
  envProtection: true,
  noIndex: true,
  hotlink: false,
  security: true
})

const generatedContent = computed(() => {
  let content = '# .htaccess généré par Sere Aziz\n# https://azizsere.eveilon.com/ressources\n\n'

  if (options.value.https) {
    content += '# Redirection HTTPS\n'
    content += 'RewriteEngine On\n'
    content += 'RewriteCond %{HTTPS} off\n'
    content += 'RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n'
  }

  if (options.value.www) {
    content += '# Redirection WWW\n'
    content += 'RewriteEngine On\n'
    content += 'RewriteCond %{HTTP_HOST} !^www\\.\n'
    content += 'RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n'
  }

  if (options.value.gzip) {
    content += '# Compression GZIP\n'
    content += '<IfModule mod_deflate.c>\n'
    content += '  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json\n'
    content += '</IfModule>\n\n'
  }

  if (options.value.cache) {
    content += '# Cache Browser\n'
    content += '<IfModule mod_expires.c>\n'
    content += '  ExpiresActive On\n'
    content += '  ExpiresByType image/jpg "access plus 1 year"\n'
    content += '  ExpiresByType image/jpeg "access plus 1 year"\n'
    content += '  ExpiresByType image/gif "access plus 1 year"\n'
    content += '  ExpiresByType image/png "access plus 1 year"\n'
    content += '  ExpiresByType image/webp "access plus 1 year"\n'
    content += '  ExpiresByType text/css "access plus 1 month"\n'
    content += '  ExpiresByType application/javascript "access plus 1 month"\n'
    content += '  ExpiresByType application/pdf "access plus 1 month"\n'
    content += '  ExpiresByType image/x-icon "access plus 1 year"\n'
    content += '</IfModule>\n\n'
  }

  if (options.value.envProtection) {
    content += '# Protection fichiers sensibles\n'
    content += '<FilesMatch "^\\.(env|htaccess|htpasswd|ini|log|sh|sql)$">\n'
    content += '  Order Allow,Deny\n'
    content += '  Deny from all\n'
    content += '</FilesMatch>\n\n'
  }

  if (options.value.noIndex) {
    content += '# Désactiver listage répertoires\n'
    content += 'Options -Indexes\n\n'
  }

  if (options.value.hotlink) {
    content += '# Protection anti-hotlinking\n'
    content += 'RewriteEngine On\n'
    content += 'RewriteCond %{HTTP_REFERER} !^$\n'
    content += 'RewriteCond %{HTTP_REFERER} !^https?://(www\\.)?votredomaine\\.com [NC]\n'
    content += 'RewriteRule \\.(jpg|jpeg|png|gif|webp)$ - [F]\n\n'
  }

  if (options.value.security) {
    content += '# En-têtes de sécurité\n'
    content += '<IfModule mod_headers.c>\n'
    content += '  Header set X-XSS-Protection "1; mode=block"\n'
    content += '  Header set X-Frame-Options "SAMEORIGIN"\n'
    content += '  Header set X-Content-Type-Options "nosniff"\n'
    content += '  Header set Referrer-Policy "strict-origin-when-cross-origin"\n'
    content += '</IfModule>\n\n'
  }

  return content
})

function copyContent() {
  navigator.clipboard.writeText(generatedContent.value)
  alert('✅ .htaccess copié dans le presse-papiers!')
}

function downloadFile() {
  const blob = new Blob([generatedContent.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = '.htaccess'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
