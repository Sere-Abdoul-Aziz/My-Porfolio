<template>
  <div class="gitignore-generator">
    <!-- Template Selection -->
    <div class="mb-6">
      <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white mb-4">🎯 Sélectionnez des templates</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        <button
          v-for="template in templates"
          :key="template.id"
          @click="toggleTemplate(template.id)"
          :class="[
            'px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold transition-all border-2',
            selectedTemplates.includes(template.id)
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white/10 text-gray-300 border-transparent hover:border-blue-500'
          ]"
        >
          {{ template.icon }} {{ template.name }}
        </button>
      </div>
    </div>

    <!-- Custom Rules -->
    <div class="mb-6">
      <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white mb-3">➕ Règles Personnalisées</h3>
      <div class="flex gap-2">
        <input
          v-model="customRule"
          @keyup.enter="addCustomRule"
          placeholder="Ex: .env, *.log, node_modules/"
          class="flex-1 bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
        <button
          @click="addCustomRule"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors"
        >
          Ajouter
        </button>
      </div>
      <div v-if="customRules.length > 0" class="mt-3 flex flex-wrap gap-2">
        <span
          v-for="(rule, index) in customRules"
          :key="index"
          class="bg-purple-500/20 border border-purple-500 text-purple-300 px-3 py-1 rounded-lg text-sm flex items-center gap-2"
        >
          {{ rule }}
          <button @click="removeCustomRule(index)" class="text-purple-400 hover:text-white">×</button>
        </span>
      </div>
    </div>

    <!-- Generated .gitignore -->
    <div>
      <div class="flex items-center justify-between mb-3">
          <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white">📄 .gitignore Généré</h3>
        <div class="flex gap-2">
          <button
            @click="copyToClipboard"
            :disabled="!generatedContent"
            class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Copier
          </button>
          <button
            @click="downloadFile"
            :disabled="!generatedContent"
            class="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            💾 Télécharger
          </button>
        </div>
      </div>
      <textarea
        v-model="generatedContent"
        readonly
        placeholder="Sélectionnez des templates pour générer le fichier .gitignore..."
        class="w-full h-64 sm:h-80 lg:h-96 bg-gray-800 text-green-400 p-4 rounded-lg border border-gray-600 font-mono text-sm resize-none"
      ></textarea>
      <div class="mt-3 text-gray-400 text-sm">{{ lineCount }} lignes</div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
      <button
        @click="generateGitignore"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg text-white px-8 py-3 rounded-lg font-bold transition-all"
      >
        🚀 Générer .gitignore
      </button>
      <button @click="clear" class="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
        🗑️ Effacer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedTemplates = ref([])
const customRule = ref('')
const customRules = ref([])
const generatedContent = ref('')

const lineCount = computed(() => {
  return generatedContent.value.split('\n').filter(line => line.trim().length > 0).length
})

const templates = [
  {
    id: 'node',
    name: 'Node.js',
    icon: '📦',
    content: `# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
.npm
.yarn
.pnp.*
dist/
build/
*.tsbuildinfo`
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    content: `# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
*.egg-info/
.pytest_cache/
.coverage
htmlcov/`
  },
  {
    id: 'vue',
    name: 'Vue/Nuxt',
    icon: '💚',
    content: `# Vue/Nuxt
.nuxt/
.output/
.env
.env.*
!.env.example
dist/
node_modules/
*.log`
  },
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    content: `# React
build/
.cache/
.parcel-cache/
.next/
out/
.DS_Store
*.log
node_modules/`
  },
  {
    id: 'vscode',
    name: 'VS Code',
    icon: '💻',
    content: `# VS Code
.vscode/
*.code-workspace
.history/`
  },
  {
    id: 'jetbrains',
    name: 'JetBrains',
    icon: '🧠',
    content: `# JetBrains IDEs
.idea/
*.iml
*.iws
*.ipr
out/`
  },
  {
    id: 'macos',
    name: 'macOS',
    icon: '🍎',
    content: `# macOS
.DS_Store
.AppleDouble
.LSOverride
._*
.Spotlight-V100
.Trashes`
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: '🪟',
    content: `# Windows
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/
*.lnk`
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: '🐧',
    content: `# Linux
*~
.fuse_hidden*
.directory
.Trash-*
.nfs*`
  },
  {
    id: 'logs',
    name: 'Logs',
    icon: '📋',
    content: `# Logs
*.log
logs/
*.log.*
npm-debug.log*
yarn-debug.log*`
  },
  {
    id: 'env',
    name: 'Environment',
    icon: '🔐',
    content: `# Environment
.env
.env.local
.env.*.local
.env.production
.env.development
secrets.yml`
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: '🐳',
    content: `# Docker
.dockerignore
docker-compose.override.yml`
  }
]

function toggleTemplate(id) {
  const index = selectedTemplates.value.indexOf(id)
  if (index > -1) {
    selectedTemplates.value.splice(index, 1)
  } else {
    selectedTemplates.value.push(id)
  }
  generateGitignore()
}

function addCustomRule() {
  if (customRule.value.trim()) {
    customRules.value.push(customRule.value.trim())
    customRule.value = ''
    generateGitignore()
  }
}

function removeCustomRule(index) {
  customRules.value.splice(index, 1)
  generateGitignore()
}

function generateGitignore() {
  const sections = []

  // Add header
  sections.push('# Généré par Sere Aziz - Outils pour Développeurs')
  sections.push('# https://azizsere.eveilon.com/ressources\n')

  // Add selected templates
  selectedTemplates.value.forEach(id => {
    const template = templates.find(t => t.id === id)
    if (template) {
      sections.push(template.content)
    }
  })

  // Add custom rules
  if (customRules.value.length > 0) {
    sections.push('# Règles Personnalisées')
    sections.push(customRules.value.join('\n'))
  }

  generatedContent.value = sections.join('\n\n')
}

function clear() {
  selectedTemplates.value = []
  customRules.value = []
  generatedContent.value = ''
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(generatedContent.value)
    alert('.gitignore copié !')
  } catch (err) {
    alert('Erreur lors de la copie')
  }
}

function downloadFile() {
  const blob = new Blob([generatedContent.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = '.gitignore'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
