<template>
  <div class="blog-page min-h-screen relative overflow-hidden">
    <!-- Animated Neon Grid Background -->
    <div class="fixed inset-0 -z-10">
      <!-- Base gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black"></div>
      
      <!-- Neon grid pattern -->
      <div class="absolute inset-0 neon-grid opacity-30"></div>
      
      <!-- Animated neon orbs -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
      
      <!-- Noise texture -->
      <div class="absolute inset-0 bg-noise opacity-5"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
      <!-- Header -->
      <header class="text-center mb-12 sm:mb-16 relative">
        <div class="inline-block mb-6">
          <div class="relative">
            <div class="absolute -inset-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-2xl blur opacity-75 animate-gradient-shift"></div>
            <h1 class="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white px-8 py-4 bg-black/50 backdrop-blur-xl rounded-2xl border-2 border-blue-500/50">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-gradient">
                📝 Blog
              </span>
            </h1>
          </div>
        </div>
        
        <p class="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Mes réflexions, articles techniques et découvertes professionnelles
        </p>
      </header>

      <!-- Search & Filters -->
      <div class="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
        <!-- Search bar -->
        <div class="relative max-w-2xl mx-auto">
          <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-30"></div>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="🔍 Rechercher un article..."
              class="w-full bg-gray-900/90 backdrop-blur-xl text-white px-6 py-4 pl-14 rounded-xl border-2 border-blue-500/50 focus:border-cyan-500 focus:outline-none text-lg transition-all"
            />
            <svg class="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <!-- Category filters -->
        <div class="flex flex-wrap gap-3 justify-center">
          <button
            @click="selectedCategory = 'all'"
            :class="[
              'px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105',
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50 border-2 border-blue-400'
                : 'bg-gray-900/80 backdrop-blur-xl text-gray-300 border-2 border-blue-500/30 hover:border-blue-500/60'
            ]"
          >
            Tous les articles ({{ articles.length }})
          </button>
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="[
              'px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-2',
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50 border-2 border-blue-400'
                : 'bg-gray-900/80 backdrop-blur-xl text-gray-300 border-2 border-blue-500/30 hover:border-blue-500/60'
            ]"
          >
            {{ category.icon }} {{ category.name }}
            <span class="text-xs bg-white/20 px-2 py-1 rounded-full">
              {{ getArticleCountByCategory(category.id) }}
            </span>
          </button>
        </div>
      </div>

      <!-- Articles Grid -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block">
          <div class="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p class="text-white mt-4 text-lg">Chargement des articles...</p>
        </div>
      </div>

      <div v-else-if="filteredArticles.length > 0" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="article in paginatedArticles"
            :key="article.id"
            @click="navigateToArticle(article)"
            class="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-2 border-blue-500/30 hover:border-cyan-500/80 hover:shadow-2xl hover:shadow-blue-500/50"
          >
            <!-- Image -->
            <div class="relative h-48 overflow-hidden">
              <img
                :src="article.imageUrl || '/placeholder-blog.jpg'"
                :alt="article.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
              
              <!-- Category badge -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-sm font-bold rounded-full border border-blue-400/50">
                  {{ getCategoryName(article.category) }}
                </span>
              </div>

              <!-- Date badge -->
              <div class="absolute top-4 right-4">
                <span class="px-3 py-1 bg-black/60 backdrop-blur-sm text-gray-300 text-xs font-semibold rounded-full border border-white/20">
                  📅 {{ formatDate(article.createdAt) }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                {{ article.title }}
              </h3>
              
              <p class="text-gray-400 text-sm mb-4 line-clamp-3">
                {{ article.excerpt || getExcerpt(article.content) }}
              </p>

              <!-- Meta info -->
              <div class="flex items-center justify-between text-sm text-gray-500">
                <div class="flex items-center gap-4">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    {{ article.views || 0 }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                    </svg>
                    {{ article.commentsCount || 0 }}
                  </span>
                </div>

                <div class="flex items-center gap-2 text-cyan-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Lire l'article
                  <svg class="w-4 h-4 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Neon glow effect on hover -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-shimmer"></div>
              <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer animation-delay-1000"></div>
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-4 mt-12">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-6 py-3 bg-gray-900/80 backdrop-blur-xl text-white rounded-xl border-2 border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-all"
          >
            ← Précédent
          </button>
          
          <div class="flex gap-2">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'w-12 h-12 rounded-xl font-bold transition-all',
                currentPage === page
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-2 border-blue-400'
                  : 'bg-gray-900/80 backdrop-blur-xl text-gray-300 border-2 border-blue-500/30 hover:border-blue-500/60'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-6 py-3 bg-gray-900/80 backdrop-blur-xl text-white rounded-xl border-2 border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-all"
          >
            Suivant →
          </button>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-20">
        <div class="inline-block p-8 bg-gray-900/80 backdrop-blur-xl rounded-3xl border-2 border-blue-500/30">
          <div class="text-6xl mb-4">📭</div>
          <h3 class="text-2xl font-bold text-white mb-2">Aucun article trouvé</h3>
          <p class="text-gray-400">{{ searchQuery ? 'Essayez une autre recherche' : 'Aucun article dans cette catégorie' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlog } from '@/composables/useBlog'

const router = useRouter()
const { articles, loading, fetchArticles } = useBlog()

const searchQuery = ref('')
const selectedCategory = ref('all')
const currentPage = ref(1)
const articlesPerPage = 6

const categories = [
  { id: 'reflexion', name: 'Réflexion Perso', icon: '💭' },
  { id: 'tech', name: 'Tech', icon: '💻' },
  { id: 'pro', name: 'Professionnel', icon: '💼' }
]

// SEO Meta tags
useHead({
  title: 'Blog - Sere Aziz | Articles Tech & Réflexions',
  meta: [
    {
      name: 'description',
      content: 'Découvrez mes articles sur le développement web, la technologie et mes réflexions professionnelles.'
    },
    { property: 'og:title', content: 'Blog - Sere Aziz' },
    { property: 'og:description', content: 'Articles tech, réflexions et découvertes professionnelles' },
    { property: 'og:url', content: 'https://azizsere.eveilon.com/blog' }
  ]
})

onMounted(() => {
  fetchArticles()
})

const filteredArticles = computed(() => {
  let filtered = articles.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(a => a.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(query) ||
      (a.content && a.content.toLowerCase().includes(query)) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(query))
    )
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredArticles.value.length / articlesPerPage))

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * articlesPerPage
  const end = start + articlesPerPage
  return filteredArticles.value.slice(start, end)
})

function getCategoryName(categoryId) {
  const category = categories.find(c => c.id === categoryId)
  return category ? `${category.icon} ${category.name}` : categoryId
}

function getArticleCountByCategory(categoryId) {
  return articles.value.filter(a => a.category === categoryId).length
}

function formatDate(timestamp) {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getExcerpt(content) {
  if (!content) return ''
  const text = content.replace(/[#*\->`]/g, '').substring(0, 150)
  return text + '...'
}

function navigateToArticle(article) {
  router.push(`/blog/${article.category}/${article.slug}`)
}
</script>

<style scoped>
.neon-grid {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.3) 2px, transparent 2px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.3) 2px, transparent 2px);
  background-size: 50px 50px;
  animation: grid-pulse 4s ease-in-out infinite;
}

@keyframes grid-pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-shift {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes bounce-x {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(4px);
  }
}

.animate-bounce-x {
  animation: bounce-x 1s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s ease-in-out infinite;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
</style>
