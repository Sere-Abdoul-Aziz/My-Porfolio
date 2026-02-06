export default defineEventHandler(async (event) => {
  const siteUrl = 'https://azizsere.eveilon.com'
  const currentDate = new Date().toISOString()

  // ✅ Routes principales avec métadonnées SEO optimisées pour "Sere Aziz" et "Aziz Sere"
  const routes = [
    // ✅ Page d'accueil - Priorité maximale
    {
      url: '/',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0',
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          caption: 'Sere Aziz (Aziz Sere) - Portfolio Développeur Fullstack Burkina Faso',
          title: 'Portfolio professionnel - Ingénieur en génie logiciel - Ouagadougou'
        },
        {
          url: `${siteUrl}/images/profil.png`,
          caption: 'Photo professionnelle de Sere Aziz, développeur fullstack',
          title: 'Sere Aziz - Développeur Expert Vue.js, React, Node.js'
        }
      ]
    },

    // ✅ Pages principales
    {
      url: '/about',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.9',
      images: [
        {
          url: `${siteUrl}/images/about-profile.webp`,
          caption: 'À propos de Sere Aziz - Parcours et compétences en développement',
          title: 'À propos - Sere Aziz développeur fullstack Burkina Faso'
        }
      ]
    },
    {
      url: '/contact',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.9'
    },
    {
      url: '/privacy',
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: '0.3'
    },

    // ✅ Services - Basés sur votre ServiceSection.vue
    {
      url: '/services',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9',
      images: [
        {
          url: `${siteUrl}/images/services-overview.webp`,
          caption: 'Services de développement web et mobile proposés',
          title: 'Services - Développement sur mesure'
        }
      ]
    },
    // Services individuels
    {
      url: '/services/site-web',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/services/applications-web',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/services/applications-mobiles',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/services/portfolio-personnalise',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: '/services/backend-development',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: '/services/solutions-saas',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: '/services/ecommerce',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/services/devops-cicd',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      url: '/services/uiux-design',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },

    // ✅ Projets - Portfolio showcase
    {
      url: '/projects',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9',
      images: [
        {
          url: `${siteUrl}/images/projects-showcase.webp`,
          caption: 'Portfolio de projets réalisés par SERE Abdoul Aziz',
          title: 'Projets - Réalisations techniques'
        }
      ]
    },
    {
      url: '/projects/plateforme-ecommerce',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8',
      images: [
        {
          url: `${siteUrl}/images/E-commerce.png`,
          caption: 'Plateforme e-commerce développée avec Vue.js et Laravel',
          title: 'Projet E-commerce - Solution complète'
        }
      ]
    },
    {
      url: '/projects/plateforme-formation',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8',
      images: [
        {
          url: `${siteUrl}/images/homemyteach.jpg`,
          caption: 'Plateforme de formation en ligne avec système LMS',
          title: 'Projet Formation - LMS sur mesure'
        }
      ]
    },
    {
      url: '/projects/agregateur-paiement',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8',
      images: [
        {
          url: `${siteUrl}/images/gold.png`,
          caption: 'Agrégateur de paiement pour l\'Afrique de l\'Ouest',
          title: 'Projet Paiement - FinTech solution'
        }
      ]
    },
    {
      url: '/projects/plateforme-ong',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7',
      images: [
        {
          url: `${siteUrl}/images/misshome.jpg`,
          caption: 'Plateforme de gestion pour ONG avec dashboard analytique',
          title: 'Projet ONG - Gestion et analytics'
        }
      ]
    },

    // ✅ Technologies et compétences
    {
      url: '/technologies',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: '/technologies/vue-js',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      url: '/technologies/react',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      url: '/technologies/nodejs',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      url: '/technologies/laravel',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      url: '/technologies/flutter',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    },

    // ✅ Blog et ressources (futures sections)
    {
      url: '/blog',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      url: '/certifications',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      url: '/testimonials',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    },

    // ✅ Pages SEO pour le Burkina Faso
    {
      url: '/developpeur-burkina-faso',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: '/developpeur-ouagadougou',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: '/freelance-mali',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    }
  ]

  // ✅ Générer le XML avec images et métadonnées complètes
  const generateUrlEntry = (route) => {
    let entry = `  <url>
    <loc>${siteUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>`

    // Ajouter les images si présentes
    if (route.images && route.images.length > 0) {
      route.images.forEach(image => {
        entry += `
    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:caption><![CDATA[${image.caption}]]></image:caption>
      <image:title><![CDATA[${image.title}]]></image:title>
    </image:image>`
      })
    }

    entry += `
  </url>`
    return entry
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${routes.map(generateUrlEntry).join('\n')}
</urlset>`

  // ✅ Headers optimisés pour le SEO
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=86400') // 24h cache
  setHeader(event, 'X-Robots-Tag', 'noindex') // Pas d'indexation du sitemap
  setHeader(event, 'ETag', `"sitemap-${Date.now()}"`)

  return sitemap
})
