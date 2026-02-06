// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  ssr: false,

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Sere Aziz | Aziz Sere - Développeur Fullstack Expert',
      titleTemplate: '%s | Sere Aziz - Développeur Fullstack',

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // ✅ Meta descriptions optimisées
        {
          name: 'description',
          content:
            "Sere Aziz (Aziz Sere) - Développeur Fullstack Expert au Burkina Faso. Ingénieur en génie logiciel spécialisé en développement web, mobile et solutions SaaS. Création d'applications performantes avec Vue.js, React, Node.js et Flutter."
        },

        // ✅ Mots-clés SEO
        {
          name: 'keywords',
          content:
            'Sere Aziz, Aziz Sere, SERE Abdoul Aziz, développeur fullstack Burkina Faso, développeur Ouagadougou, ingénieur logiciel, Vue.js, Nuxt.js, React, Node.js, Flutter, applications web, développement mobile, portfolio développeur, freelance Burkina, solutions SaaS, développeur web Ouagadougou, programmeur Burkina Faso'
        },

        // ✅ Informations auteur
        { name: 'author', content: 'SERE Abdoul Aziz' },
        { name: 'creator', content: 'SERE Abdoul Aziz' },
        { name: 'publisher', content: 'SERE Abdoul Aziz' },

        // ✅ Robots et indexation
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },

        // ✅ Géolocalisation (Burkina)
        { name: 'geo.region', content: 'BF' },
        { name: 'geo.country', content: 'Burkina' },
        { name: 'geo.placename', content: 'Ouagadougou' },

        // ✅ Open Graph optimisé
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'SERE Abdoul Aziz - Portfolio' },
        { property: 'og:title', content: 'SERE Abdoul Aziz - Ingénieur Fullstack & Développeur Expert' },
        {
          property: 'og:description',
          content:
            'Portfolio professionnel de SERE Abdoul Aziz, expert en développement web et mobile. Découvrez mes projets et services de développement.'
        },
        { property: 'og:url', content: 'https://azizsere.eveilon.com' },
        { property: 'og:image', content: 'https://azizsere.eveilon.com/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'SERE Abdoul Aziz - Portfolio Développeur Fullstack' },
        { property: 'og:locale', content: 'fr_FR' },

        // ✅ Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@AzizSere' },
        { name: 'twitter:creator', content: '@AzizSere' },
        { name: 'twitter:title', content: 'Sere Aziz | Aziz Sere - Développeur Fullstack Expert Burkina Faso' },
        { name: 'twitter:description', content: 'Développeur Fullstack Expert spécialisé en Vue.js, React, Node.js et Flutter. Basé à Ouagadougou, Burkina Faso.' },
        { name: 'twitter:image', content: 'https://azizsere.eveilon.com/og-image.jpg' },
        { name: 'twitter:image:alt', content: 'Sere Aziz - Portfolio Développeur Fullstack' },

        // ✅ Couleurs / PWA
        { name: 'theme-color', content: '#3b82f6' },
        { name: 'msapplication-TileColor', content: '#3b82f6' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
      ],

      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://azizsere.eveilon.com' },

        // ✅ Preconnections pour performance
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://cdnjs.cloudflare.com' },

        // ✅ DNS Prefetch
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//cdnjs.cloudflare.com' },

        // ✅ Apple Touch Icons
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },

        // ✅ Google Fonts chargé manuellement (plus fiable)
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap'
        }
      ],

      script: [
        // ✅ MODIFICATION : Google Tag Manager avec votre vrai ID
        {
          innerHTML: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W6X7JWVF');
          `,
          type: 'text/javascript'
          // charset supprimé car non supporté
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Sere Aziz',
            alternateName: ['Aziz Sere', 'SERE Abdoul Aziz', 'Aziz SERE'],
            givenName: 'Aziz',
            familyName: 'Sere',
            jobTitle: 'Ingénieur en Génie Logiciel Fullstack',
            description:
              'Développeur Fullstack Expert basé à Ouagadougou, Burkina Faso. Spécialisé dans le développement web et mobile avec Vue.js, React, Node.js et Flutter. Création de solutions SaaS performantes et innovantes.',
            url: 'https://azizsere.eveilon.com',
            image: 'https://azizsere.eveilon.com/profile-image.jpg',
            email: 'contact@azizsere.eveilon.com',
            telephone: '+226-71-03-73-67',
            sameAs: [
              'https://www.linkedin.com/in/aziz-sere/',
              'https://github.com/Sere-Abdoul-Aziz/',
              'https://azizsere.eveilon.com'
            ],
            knowsAbout: [
              'Développement Web',
              'Vue.js',
              'Nuxt.js',
              'React',
              'Node.js',
              'Flutter',
              'Développement Mobile',
              'Solutions SaaS',
              'JavaScript',
              'TypeScript',
              'PHP',
              'Laravel',
              'Firebase',
              'Tailwind CSS',
              'GSAP',
              'Three.js'
            ],
            worksFor: { '@type': 'Organization', name: 'Freelance Developer' },
            nationality: { '@type': 'Country', name: 'Burkina Faso' },
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'BF',
              addressLocality: 'Ouagadougou',
              addressRegion: 'Centre'
            },
            hasOccupation: {
              '@type': 'Occupation',
              name: 'Développeur Fullstack',
              occupationLocation: {
                '@type': 'Country',
                name: 'Burkina Faso'
              },
              skills: 'Vue.js, React, Node.js, Flutter, JavaScript, TypeScript, Firebase'
            }
          })
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Sere Aziz - Portfolio Développeur Fullstack',
            alternateName: ['Aziz Sere Portfolio', 'SERE Abdoul Aziz Portfolio'],
            url: 'https://azizsere.eveilon.com',
            description:
              'Portfolio professionnel de Sere Aziz (Aziz Sere), développeur fullstack expert en développement web et mobile basé à Ouagadougou, Burkina Faso',
            author: { '@type': 'Person', name: 'Sere Aziz' },
            inLanguage: 'fr-FR',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://azizsere.eveilon.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          })
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Sere Aziz - Services de Développement Web & Mobile',
            alternateName: 'Aziz Sere Développeur',
            description:
              'Services professionnels de développement web et mobile par Sere Aziz. Création d\'applications sur mesure avec Vue.js, React, Node.js et Flutter.',
            url: 'https://azizsere.eveilon.com',
            logo: 'https://azizsere.eveilon.com/logo.png',
            image: 'https://azizsere.eveilon.com/og-image.jpg',
            telephone: '+226-71-03-73-67',
            email: 'contact@azizsere.eveilon.com',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'BF',
              addressLocality: 'Ouagadougou',
              addressRegion: 'Centre'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '12.3714',
              longitude: '-1.5197'
            },
            areaServed: [
              {
                '@type': 'Country',
                name: 'Burkina Faso'
              },
              {
                '@type': 'Country',
                name: 'France'
              },
              {
                '@type': 'Place',
                name: 'International'
              }
            ],
            priceRange: '$$',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Services de Développement',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Développement Web Fullstack',
                    description: 'Création d\'applications web performantes avec Vue.js, Nuxt.js, React et Node.js'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Développement Mobile',
                    description: 'Applications mobiles cross-platform avec Flutter et React Native'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Solutions SaaS',
                    description: 'Développement de plateformes SaaS sur mesure et scalables'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Consulting Technique',
                    description: 'Conseil et architecture logicielle pour vos projets'
                  }
                }
              ]
            }
          })
        },
        // ✅ AJOUT : Google Tag Manager (à ajouter avant les autres scripts)
        {
          innerHTML: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W6X7JWVF');
          `,
          type: 'text/javascript'
          // charset supprimé car non supporté
        },
        // ✅ AJOUT : Structure de données mise à jour
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'SERE Abdoul Aziz - Portfolio',
            url: 'https://azizsere.eveilon.com',
            description: 'Portfolio professionnel conforme RGPD avec Google Tag Manager',
            author: { '@type': 'Person', name: 'SERE Abdoul Aziz' },
            privacyPolicy: 'https://azizsere.eveilon.com/privacy',
            cookiePolicy: 'https://azizsere.eveilon.com/privacy#cookies'
          })
        }
      ],

      // ✅ AJOUT : Balise noscript pour GTM
      noscript: [
        {
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W6X7JWVF" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        }
      ]
    }
  },

  // ✅ Optimisations build avec sitemap
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: { 
      routes: ['/sitemap.xml', '/robots.txt'],
      crawlLinks: true
    },
    experimental: { wasm: false }
  },

  // ✅ Configuration de cache avec SEO
  routeRules: {
    // Pages principales
    '/': { prerender: true, index: true, sitemap: { priority: 1.0, changefreq: 'weekly' } },
    '/about': { prerender: true, index: true, sitemap: { priority: 0.8, changefreq: 'monthly' } },
    '/privacy': { prerender: true, index: true, sitemap: { priority: 0.3, changefreq: 'yearly' } },
    
    // API et fichiers techniques
    '/api/**': { cors: true, headers: { 'Cache-Control': 'max-age=3600' } },
    '/sitemap.xml': { headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'max-age=86400' } },
    '/robots.txt': { headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'max-age=86400' } },
    
    // Assets statiques
    '/images/**': { headers: { 'Cache-Control': 'max-age=31536000' } },
    '/_nuxt/**': { headers: { 'Cache-Control': 'max-age=31536000' } },
    '/favicon.ico': { headers: { 'Cache-Control': 'max-age=86400' } }
  },

  // ✅ MODIFICATION : Modules sans Google Analytics
  modules: [
    [
      '@nuxt/image',
      {
        format: ['webp', 'avif'],
        quality: 85,
        densities: [1, 2],
        domains: ['azizsere.eveilon.com'],
        presets: {
          avatar: { modifiers: { format: 'webp', width: 150, height: 150, quality: 90 } },
          project: { modifiers: { format: 'webp', width: 800, height: 600, quality: 85 } }
        }
      }
    ]
    // ✅ SUPPRESSION du module Google Analytics problématique
  ],

  // ✅ SUPPRESSION de la configuration googleGtag
  // googleGtag: { ... }

  // ✅ Configuration runtime mise à jour avec SEO
  runtimeConfig: {
    public: {
      siteUrl: 'https://azizsere.eveilon.com',
      siteName: 'SERE Abdoul Aziz - Portfolio',
      siteDescription: 'Portfolio professionnel conforme RGPD avec optimisations SEO',
      language: 'fr',
      // ✅ Configuration GTM
      googleTagManager: {
        id: 'GTM-W6X7JWVF' // ✅ Votre vrai ID GTM
      },
      googleAnalytics: {
        id: 'G-XXXXXXXXXX' // ← Ajoutez votre ID GA4 quand vous l'aurez
      },
      // ✅ AJOUT : Configuration SEO et sitemap
      seo: {
        sitemap: {
          enabled: true,
          hostname: 'https://azizsere.eveilon.com',
          gzip: true,
          exclude: ['/api/**', '/_nuxt/**', '/admin/**']
        },
        robots: {
          enabled: true,
          disallow: ['/api/', '/_nuxt/', '/admin/', '/*.json$']
        }
      }
    }
  },

  // ✅ Optimisations de performance
  experimental: {
    payloadExtraction: false
  },

  // ✅ Optimisations Vite
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              if (id.includes('/vue/dist/') || id.includes('/vue/')) return undefined
              if (id.includes('/vue-router/')) return undefined
              return 'vendor'
            }
            return undefined
          }
        }
      }
    },

    // ✅ Optimisations de développement
    optimizeDeps: {
      include: ['gsap', 'three']
    }
  }
})
