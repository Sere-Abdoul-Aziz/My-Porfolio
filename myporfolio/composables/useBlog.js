import { ref } from 'vue'

// ✅ BLOG STATIQUE - Pas de Firebase, pas de crash loop
// Articles stockés en Markdown dans content/blog/

export const useBlog = () => {
  const articles = ref([])
  const article = ref(null)
  const comments = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ✅ Articles statiques (hardcodés pour éviter import.meta.glob en SSR)
  const staticArticles = [
    {
      id: 'pourquoi-nuxt3',
      title: "Pourquoi j'ai choisi Nuxt 3 pour mon portfolio",
      slug: 'pourquoi-nuxt3',
      category: 'tech',
      excerpt: "Découvrez les raisons techniques et stratégiques qui m'ont poussé à adopter Nuxt 3 pour la création de mon portfolio professionnel.",
      author: 'Sere Aziz',
      date: '2026-02-15',
      createdAt: new Date('2026-02-15'),
      imageUrl: '/images/blog/nuxt3.jpg',
      tags: ['Nuxt', 'Vue.js', 'Performance', 'SSR'],
      views: 245,
      commentsCount: 0,
      content: null // Chargé à la demande
    },
    {
      id: 'developpeur-burkina-faso',
      title: 'Être développeur au Burkina Faso en 2026',
      slug: 'developpeur-burkina-faso',
      category: 'reflexion',
      excerpt: "Mon expérience et mes réflexions sur l'écosystème tech burkinabé, ses défis et ses opportunités incroyables.",
      author: 'Sere Aziz',
      date: '2026-02-10',
      createdAt: new Date('2026-02-10'),
      imageUrl: '/images/blog/burkina-tech.jpg',
      tags: ['Burkina Faso', 'Carrière', 'Tech Africa', 'Développement'],
      views: 312,
      commentsCount: 0,
      content: null
    },
    {
      id: 'mes-outils-quotidiens',
      title: 'Ma stack de développeur fullstack en 2026',
      slug: 'mes-outils-quotidiens',
      category: 'pro',
      excerpt: "Découvrez les outils, frameworks et services que j'utilise quotidiennement pour développer des applications web et mobile performantes.",
      author: 'Sere Aziz',
      date: '2026-02-01',
      createdAt: new Date('2026-02-01'),
      imageUrl: '/images/blog/dev-stack.jpg',
      tags: ['Outils', 'Productivité', 'Stack', 'Workflow'],
      views: 189,
      commentsCount: 0,
      content: null
    }
  ]

  /**
   * Récupérer tous les articles
   */
  const fetchArticles = async () => {
    loading.value = true
    error.value = null
    
    try {
      // ✅ Simulation délai (optionnel, pour UX)
      await new Promise(resolve => setTimeout(resolve, 300))
      
      articles.value = staticArticles.map(a => ({
        ...a,
        createdAt: a.createdAt || new Date(a.date)
      }))
    } catch (err) {
      console.error('Error fetching articles:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Récupérer un article par catégorie et slug
   */
  const fetchArticle = async (category, slug) => {
    loading.value = true
    error.value = null
    
    try {
      // Trouver l'article
      const foundArticle = staticArticles.find(
        a => a.category === category && a.slug === slug
      )
      
      if (!foundArticle) {
        article.value = null
        comments.value = []
        return
      }

      // Charger le contenu Markdown
      let content = ''
      try {
        const response = await fetch(`/content/blog/${slug}.md`)
        if (response.ok) {
          const markdown = await response.text()
          // Extraire le contenu (après le frontmatter)
          content = markdown.split('---').slice(2).join('---').trim()
        }
      } catch (err) {
        console.warn('Contenu MD non trouvé:', err)
        content = foundArticle.excerpt || 'Contenu en cours de rédaction...'
      }
      
      article.value = {
        ...foundArticle,
        content,
        createdAt: foundArticle.createdAt || new Date(foundArticle.date)
      }
      
      // Commentaires statiques vides (pas de backend)
      comments.value = []
    } catch (err) {
      console.error('Error fetching article:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Récupérer un article par ID
   */
  const fetchArticleById = async (articleId) => {
    loading.value = true
    error.value = null
    
    try {
      const foundArticle = staticArticles.find(a => a.id === articleId)
      
      if (foundArticle) {
        article.value = {
          ...foundArticle,
          createdAt: foundArticle.createdAt || new Date(foundArticle.date)
        }
      } else {
        article.value = null
      }
    } catch (err) {
      console.error('Error fetching article:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Récupérer les commentaires d'un article (désactivé - statique)
   */
  const fetchComments = async (articleId) => {
    // ✅ Blog statique = pas de commentaires dynamiques
    comments.value = []
  }

  /**
   * Écouter les changements de commentaires (désactivé)
   */
  const listenToComments = (articleId, callback) => {
    // ✅ Pas de temps réel sans backend
    return () => {} // Fonction de nettoyage vide
  }

  /**
   * Ajouter un commentaire (désactivé - nécessite backend)
   */
  const addComment = async (articleId, commentData) => {
    // ✅ Pour activer les commentaires, il faudrait :
    // - Soit un backend (API Node.js + DB)
    // - Soit un service tiers (Disqus, Utterances, giscus)
    
    console.warn('Les commentaires nécessitent un backend. Utilisez giscus (GitHub Discussions) ou Disqus.')
    return false
  }

  /**
   * Incrémenter le nombre de vues (client-side seulement)
   */
  const incrementViews = async (articleId) => {
    // ✅ Simulation locale (pas de persistence)
    const foundArticle = staticArticles.find(a => a.id === articleId)
    if (foundArticle && article.value?.id === articleId) {
      article.value.views = (article.value.views || 0) + 1
    }
  }

  /**
   * Récupérer les articles par catégorie
   */
  const fetchArticlesByCategory = async (category) => {
    loading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      
      articles.value = staticArticles
        .filter(a => a.category === category)
        .map(a => ({
          ...a,
          createdAt: a.createdAt || new Date(a.date)
        }))
    } catch (err) {
      console.error('Error fetching articles by category:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Rechercher des articles
   */
  const searchArticles = async (searchQuery) => {
    loading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const query = searchQuery.toLowerCase()
      articles.value = staticArticles
        .filter(a =>
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query) ||
          a.tags.some(tag => tag.toLowerCase().includes(query))
        )
        .map(a => ({
          ...a,
          createdAt: a.createdAt || new Date(a.date)
        }))
    } catch (err) {
      console.error('Error searching articles:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    articles,
    article,
    comments,
    loading,
    error,
    
    // Methods
    fetchArticles,
    fetchArticle,
    fetchArticleById,
    fetchComments,
    listenToComments,
    addComment,
    incrementViews,
    fetchArticlesByCategory,
    searchArticles
  }
}
