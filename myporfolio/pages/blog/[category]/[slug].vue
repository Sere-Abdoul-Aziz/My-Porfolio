<template>
  <div class="article-page min-h-screen relative overflow-hidden">
    <!-- Animated Neon Grid Background -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black"></div>
      <div class="absolute inset-0 neon-grid opacity-20"></div>
      <div class="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div class="absolute inset-0 bg-noise opacity-5"></div>
    </div>

    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
        <p class="text-white mt-4 text-lg">Chargement de l'article...</p>
      </div>
    </div>

    <div v-else-if="article" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <!-- Back button -->
      <button
        @click="$router.push('/blog')"
        class="mb-8 flex items-center gap-2 px-6 py-3 bg-gray-900/80 backdrop-blur-xl text-white rounded-xl border-2 border-blue-500/50 hover:bg-blue-600 transition-all"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Retour au blog
      </button>

      <!-- Article Header -->
      <article class="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-3xl border-2 border-blue-500/30 overflow-hidden shadow-2xl shadow-blue-500/20">
        <!-- Featured Image -->
        <div class="relative h-64 sm:h-96 overflow-hidden">
          <img
            :src="article.imageUrl || '/placeholder-blog.jpg'"
            :alt="article.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
          
          <!-- Category badge -->
          <div class="absolute top-6 left-6">
            <span class="px-4 py-2 bg-blue-600/90 backdrop-blur-sm text-white font-bold rounded-full border border-blue-400/50 text-lg">
              {{ getCategoryIcon(article.category) }} {{ getCategoryName(article.category) }}
            </span>
          </div>
        </div>

        <!-- Article Content -->
        <div class="p-6 sm:p-10">
          <!-- Title -->
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            {{ article.title }}
          </h1>

          <!-- Meta info -->
          <div class="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400 text-sm sm:text-base mb-8 pb-8 border-b-2 border-blue-500/30">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span class="font-semibold">{{ article.author || 'Sere Aziz' }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>{{ formatDate(article.createdAt) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <span>{{ article.views || 0 }} vues</span>
            </div>
          </div>

          <!-- Article Content (Markdown) -->
          <div class="prose prose-invert prose-lg max-w-none mb-12">
            <div v-html="renderedContent" class="article-content"></div>
          </div>

          <!-- Share buttons -->
          <div class="mb-12 pb-8 border-b-2 border-blue-500/30">
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
              </svg>
              Partager cet article
            </h3>
            <div class="flex flex-wrap gap-4">
              <button
                @click="shareOnWhatsApp"
                class="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </button>

              <button
                @click="shareOnFacebook"
                class="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>

              <button
                @click="shareOnLinkedIn"
                class="flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>

              <button
                @click="copyLink"
                class="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                Copier le lien
              </button>
            </div>
          </div>

          <!-- Comments Section -->
          <div class="space-y-6">
            <h3 class="text-2xl font-bold text-white flex items-center gap-2">
              <svg class="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
              </svg>
              Commentaires
            </h3>

            <!-- ✅ INFO : Commentaires désactivés (blog statique) -->
            <div class="bg-blue-900/30 backdrop-blur-xl rounded-2xl p-6 border-2 border-blue-500/30">
              <div class="flex items-start gap-4">
                <div class="text-4xl">💬</div>
                <div>
                  <h4 class="text-lg font-bold text-white mb-2">Commentaires temporairement désactivés</h4>
                  <p class="text-gray-300 mb-4">
                    Le système de commentaires est en cours de migration. Pour discuter de cet article, contactez-moi via :
                  </p>
                  <div class="flex flex-wrap gap-3">
                    <a
                      href="https://www.linkedin.com/in/aziz-sere/"
                      target="_blank"
                      class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all text-sm"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://twitter.com/AzizSere"
                      target="_blank"
                      class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all text-sm"
                    >
                      Twitter/X
                    </a>
                    <a
                      href="mailto:contact@azizsere.eveilon.com"
                      class="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-all text-sm"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="text-6xl mb-4">📭</div>
        <h2 class="text-2xl font-bold text-white mb-2">Article introuvable</h2>
        <p class="text-gray-400 mb-6">Cet article n'existe pas ou a été supprimé.</p>
        <button
          @click="$router.push('/blog')"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
        >
          Retour au blog
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlog } from '@/composables/useBlog'

const route = useRoute()
const { article, loading, fetchArticle, incrementViews } = useBlog()

// ✅ Supprimé : comments, addComment (blog statique)

const categories = {
  reflexion: { name: 'Réflexion Perso', icon: '💭' },
  tech: { name: 'Tech', icon: '💻' },
  pro: { name: 'Professionnel', icon: '💼' }
}

onMounted(async () => {
  const { category, slug } = route.params
  await fetchArticle(category, slug)
  if (article.value) {
    incrementViews(article.value.id)
  }
})

const renderedContent = computed(() => {
  if (!article.value?.content) return ''
  // ✅ Contenu déjà en HTML (converti dans useBlog)
  return article.value.content
})

function getCategoryName(categoryId) {
  return categories[categoryId]?.name || categoryId
}

function getCategoryIcon(categoryId) {
  return categories[categoryId]?.icon || '📄'
}

function formatDate(timestamp) {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric'
  })
}

function shareOnWhatsApp() {
  const url = window.location.href
  const text = `${article.value.title} - ${url}`
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
}

function shareOnFacebook() {
  const url = window.location.href
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
}

function shareOnLinkedIn() {
  const url = window.location.href
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href)
  alert('✅ Lien copié dans le presse-papier !')
}

// SEO Meta tags
useHead({
  title: computed(() => article.value ? `${article.value.title} - Blog Sere Aziz` : 'Article - Blog'),
  meta: computed(() => [
    {
      name: 'description',
      content: article.value?.excerpt || article.value?.content?.substring(0, 160) || ''
    },
    { property: 'og:title', content: article.value?.title || 'Article' },
    { property: 'og:description', content: article.value?.excerpt || '' },
    { property: 'og:image', content: article.value?.imageUrl || '' },
    { property: 'og:url', content: window.location.href }
  ])
})
</script>

<style scoped>
.neon-grid {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.2) 2px, transparent 2px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.2) 2px, transparent 2px);
  background-size: 50px 50px;
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

.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* Markdown styling */
.article-content :deep(h1) {
  @apply text-3xl font-bold text-white mt-8 mb-4;
}

.article-content :deep(h2) {
  @apply text-2xl font-bold text-white mt-6 mb-3;
}

.article-content :deep(h3) {
  @apply text-xl font-bold text-white mt-4 mb-2;
}

.article-content :deep(p) {
  @apply text-gray-300 mb-4 leading-relaxed;
}

.article-content :deep(a) {
  @apply text-blue-400 hover:text-cyan-400 underline transition-colors;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  @apply text-gray-300 mb-4 pl-6;
}

.article-content :deep(li) {
  @apply mb-2;
}

.article-content :deep(code) {
  @apply bg-gray-800 text-cyan-400 px-2 py-1 rounded text-sm;
}

.article-content :deep(pre) {
  @apply bg-gray-800 p-4 rounded-xl overflow-x-auto mb-4;
}

.article-content :deep(pre code) {
  @apply bg-transparent p-0;
}

.article-content :deep(blockquote) {
  @apply border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4;
}

.article-content :deep(img) {
  @apply rounded-xl my-6 max-w-full;
}
</style>
