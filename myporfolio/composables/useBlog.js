import { ref } from 'vue'

// ✅ BLOG STATIQUE - Pas de Firebase, pas de crash loop
// Articles hardcodés avec contenu HTML inline

export const useBlog = () => {
  const articles = ref([])
  const article = ref(null)
  const comments = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ✅ Articles statiques avec contenu HTML complet
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
      content: `
        <h1>Pourquoi j'ai choisi Nuxt 3 pour mon portfolio</h1>
        <p>Après plusieurs années d'expérience en développement web, j'ai décidé de reconstruire mon portfolio avec <strong>Nuxt 3</strong>. Voici pourquoi.</p>
        
        <h2>🚀 Performance native</h2>
        <p>Nuxt 3 apporte des améliorations significatives :</p>
        <ul>
          <li><strong>Vite</strong> comme bundler (démarrage ultra-rapide)</li>
          <li><strong>Tree-shaking</strong> automatique</li>
          <li><strong>Code splitting</strong> intelligent</li>
        </ul>

        <h3>Résultats concrets</h3>
        <p>Mon ancien portfolio (React) : temps de chargement <strong>3.2s</strong>, score Lighthouse 78/100.</p>
        <p>Avec Nuxt 3 : temps de chargement <strong>0.9s</strong> ⚡, score <strong>98/100</strong> 🎯</p>

        <h2>💡 Composition API native</h2>
        <p>La <strong>Composition API</strong> de Vue 3 rend le code plus maintenable. Plus besoin de séparer <code>data()</code>, <code>methods</code>, <code>computed</code>.</p>

        <h2>🎨 Modules puissants</h2>
        <ol>
          <li><strong>@nuxt/image</strong> - Optimisation automatique</li>
          <li><strong>@nuxtjs/tailwindcss</strong> - CSS instantané</li>
          <li><strong>@nuxtjs/sitemap</strong> - SEO automatisé</li>
        </ol>

        <h2>📈 Conclusion</h2>
        <p>Nuxt 3 m'a permis de créer un portfolio rapide, maintenable, SEO optimisé et évolutif.</p>
        <blockquote>"Nuxt 3 n'est pas qu'un framework, c'est une expérience développeur exceptionnelle." - Sere Aziz</blockquote>
      `
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
      tags: ['Burkina Faso', 'Carrière', 'Tech Africa'],
      views: 312,
      commentsCount: 0,
      content: `
        <h1>Être développeur au Burkina Faso en 2026</h1>
        <p>Développer au <strong>Burkina Faso</strong> en 2026, c'est naviguer entre défis infrastructurels et opportunités mondiales.</p>

        <h2>🌍 Le contexte burkinabé</h2>
        <ul>
          <li><strong>+45%</strong> de développeurs entre 2023-2026</li>
          <li><strong>15 startups</strong> levées de fonds en 2025</li>
          <li><strong>3 incubateurs</strong> actifs à Ouagadougou</li>
        </ul>

        <h3>Les défis quotidiens</h3>
        <p><strong>1. Connectivité internet</strong> - Coupures fréquentes, débit limité (2-5 Mbps), coût élevé (40 000 FCFA/mois)</p>
        <p><strong>2. Électricité</strong> - Délestages fréquents. Solution : batterie externe + générateur solaire</p>
        <p><strong>3. Paiements internationaux</strong> - Difficile d'acheter des outils (pas de PayPal actif)</p>

        <h2>💪 Les opportunités</h2>
        <p><strong>Travail à distance</strong> : Le Burkina = hub freelance avec fuseau GMT pratique pour l'Europe.</p>
        <p><strong>Communauté tech</strong> : DevFest Ouaga (500+ participants), hackathons mensuels, meetups Vue.js</p>

        <h2>🚀 Mes conseils</h2>
        <ol>
          <li>Maîtriser l'anglais technique</li>
          <li>Construire en public (GitHub, Twitter)</li>
          <li>Apprendre en continu (freeCodeCamp, Vue Mastery)</li>
          <li>Créer un portfolio solide</li>
        </ol>

        <blockquote>"Notre défi n'est pas le manque de talent, mais le manque de visibilité." - Sere Aziz</blockquote>
        <p><strong>Faso tech yéléma !</strong> 🇧🇫💻</p>
      `
    },
    {
      id: 'mes-outils-quotidiens',
      title: 'Ma stack de développeur fullstack en 2026',
      slug: 'mes-outils-quotidiens',
      category: 'pro',
      excerpt: "Découvrez les outils, frameworks et services que j'utilise quotidiennement pour développer des applications performantes.",
      author: 'Sere Aziz',
      date: '2026-02-01',
      createdAt: new Date('2026-02-01'),
      imageUrl: '/images/blog/dev-stack.jpg',
      tags: ['Outils', 'Productivité', 'Stack'],
      views: 189,
      commentsCount: 0,
      content: `
        <h1>Ma stack de développeur fullstack en 2026</h1>
        <p>Après 5 ans d'expérience, voici l'écosystème d'outils que j'utilise quotidiennement.</p>

        <h2>💻 Développement Frontend</h2>
        <p><strong>Vue.js / Nuxt 3</strong> - Mon framework principal pour 80% des projets</p>
        <p><strong>Tailwind CSS</strong> - Fini le CSS custom ! Productivité x10</p>
        <p><strong>GSAP / Three.js</strong> - Animations fluides et effets 3D</p>

        <h2>⚙️ Backend & API</h2>
        <p><strong>Node.js / Express</strong> - Stack backend lightweight</p>
        <p><strong>Supabase</strong> - Alternative à Firebase (open source, SQL, pricing transparent)</p>

        <h2>📱 Mobile</h2>
        <p><strong>Flutter</strong> - Un code = iOS + Android</p>

        <h2>🛠️ Outils quotidiens</h2>
        <p><strong>VS Code</strong> avec extensions :</p>
        <ul>
          <li>Volar (Vue IntelliSense)</li>
          <li>Tailwind CSS IntelliSense</li>
          <li>GitHub Copilot (+40% productivité)</li>
          <li>ESLint</li>
        </ul>

        <h2>☁️ Hébergement</h2>
        <p><strong>Vercel</strong> - Déploiement automatique en 30s</p>
        <p><strong>Cloudflare</strong> - CDN + DNS + SSL gratuit</p>

        <h2>💰 Coût total</h2>
        <table>
          <tr><td>GitHub Copilot</td><td>$10/mois</td></tr>
          <tr><td>Vercel Pro</td><td>$20/mois</td></tr>
          <tr><td>Supabase Pro</td><td>$25/mois</td></tr>
          <tr><td><strong>TOTAL</strong></td><td><strong>$55/mois</strong></td></tr>
        </table>

        <p><strong>ROI</strong> : Ces outils me font gagner 20h/mois = $1000+ économisés 📈</p>

        <blockquote>"Les meilleurs outils sont ceux qu'on utilise réellement, pas ceux qu'on admire." - Sere Aziz</blockquote>
      `
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

      article.value = {
        ...foundArticle,
        createdAt: foundArticle.createdAt || new Date(foundArticle.date)
      }
      
      // Commentaires statiques vides
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
