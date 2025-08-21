/**
 * Composable pour la validation et gestion du sitemap
 * Optimise le SEO et vérifie l'intégrité des URLs
 */
export const useSitemap = () => {
  const { $fetch } = useNuxtApp()
  const config = useRuntimeConfig()

  /**
   * Valide une URL pour inclusion dans le sitemap
   */
  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'https:' && urlObj.hostname === new URL(config.public.siteUrl).hostname
    } catch {
      return false
    }
  }

  /**
   * Génère les URLs de base du site
   */
  const getBaseUrls = (): Array<{
    url: string
    lastmod: string
    changefreq: string
    priority: number
    images?: Array<{ loc: string; caption?: string }>
  }> => {
    const baseUrl = config.public.siteUrl
    const now = new Date().toISOString()

    return [
      {
        url: baseUrl,
        lastmod: now,
        changefreq: 'weekly',
        priority: 1.0,
        images: [
          { loc: `${baseUrl}/images/profil.png`, caption: 'SERE Abdoul Aziz - Photo de profil' },
          { loc: `${baseUrl}/images/projet1.jpg`, caption: 'Projet de développement web' }
        ]
      },
      {
        url: `${baseUrl}/about`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.8,
        images: [
          { loc: `${baseUrl}/images/Baccalauréat.jpeg`, caption: 'Diplôme Baccalauréat' },
          { loc: `${baseUrl}/images/Ingenieur.png`, caption: 'Diplôme Ingénieur' }
        ]
      },
      {
        url: `${baseUrl}/privacy`,
        lastmod: now,
        changefreq: 'yearly',
        priority: 0.3
      }
    ]
  }

  /**
   * Génère les URLs des services
   */
  const getServiceUrls = (): Array<{
    url: string
    lastmod: string
    changefreq: string
    priority: number
  }> => {
    const baseUrl = config.public.siteUrl
    const now = new Date().toISOString()
    
    const services = [
      'developpement-web',
      'developpement-mobile',
      'solutions-saas',
      'consulting-technique',
      'audit-code',
      'formation-developpement'
    ]

    return services.map(service => ({
      url: `${baseUrl}/services/${service}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.7
    }))
  }

  /**
   * Génère les URLs des projets
   */
  const getProjectUrls = (): Array<{
    url: string
    lastmod: string
    changefreq: string
    priority: number
    images?: Array<{ loc: string; caption?: string }>
  }> => {
    const baseUrl = config.public.siteUrl
    const now = new Date().toISOString()
    
    const projects = [
      { 
        slug: 'myteach-app',
        images: [
          'connexionmyteach.jpg',
          'homemyteach.jpg',
          'profilmyteach.jpg'
        ]
      },
      { 
        slug: 'miss-beauty-app',
        images: [
          'misshome.jpg',
          'missarticle.jpg',
          'misscompetence.jpg'
        ]
      },
      { 
        slug: 'ecommerce-platform',
        images: ['E-commerce.png']
      },
      { 
        slug: 'event-calendar',
        images: [
          'eventcalendar.png',
          'eventhome.png',
          'eventlist.png'
        ]
      }
    ]

    return projects.map(project => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.6,
      images: project.images?.map(img => ({
        loc: `${baseUrl}/images/${img}`,
        caption: `Capture d'écran du projet ${project.slug}`
      }))
    }))
  }

  /**
   * Génère les URLs des technologies
   */
  const getTechnologyUrls = (): Array<{
    url: string
    lastmod: string
    changefreq: string
    priority: number
  }> => {
    const baseUrl = config.public.siteUrl
    const now = new Date().toISOString()
    
    const technologies = [
      'vue-js',
      'react',
      'node-js',
      'flutter',
      'laravel',
      'docker',
      'firebase'
    ]

    return technologies.map(tech => ({
      url: `${baseUrl}/technologies/${tech}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.5
    }))
  }

  /**
   * Teste la validité du sitemap généré
   */
  const validateSitemap = async (): Promise<{
    isValid: boolean
    errors: string[]
    urls: number
  }> => {
    try {
      const response = await $fetch('/sitemap.xml') as string
      
      const errors: string[] = []
      let urlCount = 0

      // Vérification basique du XML
      if (!response.includes('<?xml') || !response.includes('<urlset')) {
        errors.push('Format XML invalide')
      }

      // Compte les URLs
      const urlMatches = response.match(/<url>/g)
      urlCount = urlMatches ? urlMatches.length : 0

      if (urlCount === 0) {
        errors.push('Aucune URL trouvée dans le sitemap')
      }

      // Vérification des URLs requises
      const requiredUrls = [
        config.public.siteUrl,
        `${config.public.siteUrl}/about`,
        `${config.public.siteUrl}/privacy`
      ]

      for (const url of requiredUrls) {
        if (!response.includes(url)) {
          errors.push(`URL manquante: ${url}`)
        }
      }

      return {
        isValid: errors.length === 0,
        errors,
        urls: urlCount
      }
    } catch (error) {
      return {
        isValid: false,
        errors: [`Erreur lors de la validation: ${error}`],
        urls: 0
      }
    }
  }

  /**
   * Soumet le sitemap aux moteurs de recherche
   */
  const submitSitemap = async (): Promise<{
    google: boolean
    bing: boolean
    errors: string[]
  }> => {
    const sitemapUrl = `${config.public.siteUrl}/sitemap.xml`
    const errors: string[] = []
    let google = false
    let bing = false

    try {
      // Google Search Console (nécessite une authentification)
      console.info('Sitemap URL pour Google:', `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`)
      
      // Bing Webmaster Tools (nécessite une authentification)
      console.info('Sitemap URL pour Bing:', `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`)
      
      // Note: La soumission automatique nécessite des clés API
      errors.push('Soumission manuelle requise - consultez les URLs dans la console')
      
    } catch (error) {
      errors.push(`Erreur lors de la soumission: ${error}`)
    }

    return { google, bing, errors }
  }

  /**
   * Génère les statistiques du sitemap
   */
  const getSitemapStats = () => {
    const baseUrls = getBaseUrls()
    const serviceUrls = getServiceUrls()
    const projectUrls = getProjectUrls()
    const technologyUrls = getTechnologyUrls()

    const totalImages = [
      ...baseUrls.filter(url => url.images),
      ...projectUrls.filter(url => url.images)
    ].reduce((total, url) => total + (url.images?.length || 0), 0)

    return {
      pages: {
        base: baseUrls.length,
        services: serviceUrls.length,
        projects: projectUrls.length,
        technologies: technologyUrls.length,
        total: baseUrls.length + serviceUrls.length + projectUrls.length + technologyUrls.length
      },
      images: {
        total: totalImages
      },
      lastGenerated: new Date().toISOString(),
      sitemapUrl: `${config.public.siteUrl}/sitemap.xml`,
      robotsUrl: `${config.public.siteUrl}/robots.txt`
    }
  }

  return {
    validateUrl,
    getBaseUrls,
    getServiceUrls,
    getProjectUrls,
    getTechnologyUrls,
    validateSitemap,
    submitSitemap,
    getSitemapStats
  }
}
