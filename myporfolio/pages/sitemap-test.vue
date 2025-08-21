<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20">
    <div class="container mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          🔍 Sitemap & SEO Validator
        </h1>
        <p class="text-xl text-blue-200">
          Vérifiez l'intégrité et les performances SEO de votre sitemap
        </p>
      </div>

      <!-- Actions principales -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <button
          @click="checkSitemap"
          :disabled="loading"
          class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          <span v-if="!loading">📊 Analyser le Sitemap</span>
          <span v-else>⏳ Analyse en cours...</span>
        </button>

        <a
          :href="`${$config.public.siteUrl}/sitemap.xml`"
          target="_blank"
          class="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-center"
        >
          🌐 Voir le Sitemap
        </a>

        <a
          :href="`${$config.public.siteUrl}/robots.txt`"
          target="_blank"
          class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-center"
        >
          🤖 Voir robots.txt
        </a>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-blue-400 mb-2">
            {{ stats.pages.total }}
          </div>
          <div class="text-white text-sm">Pages totales</div>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-green-400 mb-2">
            {{ stats.images.total }}
          </div>
          <div class="text-white text-sm">Images incluses</div>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-purple-400 mb-2">
            {{ stats.pages.base }}
          </div>
          <div class="text-white text-sm">Pages principales</div>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-yellow-400 mb-2">
            {{ stats.pages.projects }}
          </div>
          <div class="text-white text-sm">Projets</div>
        </div>
      </div>

      <!-- Détails par section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Répartition des pages -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 class="text-xl font-semibold text-white mb-4">📄 Répartition des pages</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-blue-200">Pages principales</span>
              <span class="text-white font-semibold">{{ stats.pages.base }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-200">Services</span>
              <span class="text-white font-semibold">{{ stats.pages.services }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-200">Projets</span>
              <span class="text-white font-semibold">{{ stats.pages.projects }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-200">Technologies</span>
              <span class="text-white font-semibold">{{ stats.pages.technologies }}</span>
            </div>
          </div>
        </div>

        <!-- Informations techniques -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 class="text-xl font-semibold text-white mb-4">⚙️ Informations techniques</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-blue-200">URL du sitemap</span>
              <a :href="stats.sitemapUrl" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm truncate max-w-48">
                {{ stats.sitemapUrl }}
              </a>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-200">URL robots.txt</span>
              <a :href="stats.robotsUrl" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm truncate max-w-48">
                {{ stats.robotsUrl }}
              </a>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-200">Dernière génération</span>
              <span class="text-white text-sm">{{ formatDate(stats.lastGenerated) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Résultats de validation -->
      <div v-if="validationResult" class="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
        <h3 class="text-xl font-semibold text-white mb-4">✅ Résultats de validation</h3>
        
        <div class="mb-4">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                :class="validationResult.isValid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'">
            {{ validationResult.isValid ? '✅ Sitemap valide' : '❌ Sitemap invalide' }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-white font-semibold mb-2">URLs trouvées</h4>
            <p class="text-blue-200">{{ validationResult.urls }} URLs dans le sitemap</p>
          </div>
          
          <div v-if="validationResult.errors.length > 0">
            <h4 class="text-white font-semibold mb-2">Erreurs détectées</h4>
            <ul class="text-red-300 text-sm space-y-1">
              <li v-for="error in validationResult.errors" :key="error" class="flex items-start">
                <span class="text-red-400 mr-2">•</span>
                {{ error }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Instructions de soumission -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h3 class="text-xl font-semibold text-white mb-4">📤 Soumission aux moteurs de recherche</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-white font-semibold mb-3">🔍 Google Search Console</h4>
            <p class="text-blue-200 text-sm mb-3">
              Connectez-vous à Google Search Console et soumettez votre sitemap :
            </p>
            <a 
              :href="`https://search.google.com/search-console/sitemaps?resource_id=${encodeURIComponent($config.public.siteUrl)}`"
              target="_blank"
              class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-300"
            >
              Ouvrir Google Search Console
            </a>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-3">🅱️ Bing Webmaster Tools</h4>
            <p class="text-blue-200 text-sm mb-3">
              Connectez-vous à Bing Webmaster Tools pour soumettre votre sitemap :
            </p>
            <a 
              href="https://www.bing.com/webmasters/"
              target="_blank"
              class="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-lg transition-colors duration-300"
            >
              Ouvrir Bing Webmaster
            </a>
          </div>
        </div>
      </div>

      <!-- Bouton retour -->
      <div class="text-center mt-12">
        <NuxtLink 
          to="/"
          class="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-300"
        >
          ← Retour à l'accueil
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta tags pour cette page de test
useHead({
  title: 'Sitemap Validator',
  meta: [
    { name: 'description', content: 'Outil de validation et test du sitemap pour optimiser le SEO' },
    { name: 'robots', content: 'noindex, nofollow' } // Page de test non indexée
  ]
})

// Composables
const { getSitemapStats, validateSitemap } = useSitemap()
const config = useRuntimeConfig()

// État réactif
const loading = ref(false)
const validationResult = ref(null)

// Statistiques du sitemap
const stats = computed(() => getSitemapStats())

// Fonctions
const checkSitemap = async () => {
  loading.value = true
  try {
    validationResult.value = await validateSitemap()
  } catch (error) {
    validationResult.value = {
      isValid: false,
      errors: [`Erreur lors de la validation: ${error.message}`],
      urls: 0
    }
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Validation automatique au chargement de la page
onMounted(() => {
  checkSitemap()
})
</script>

<style scoped>
/* Animations personnalisées */
@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.animate-pulse-soft {
  animation: pulse-soft 2s infinite;
}
</style>
