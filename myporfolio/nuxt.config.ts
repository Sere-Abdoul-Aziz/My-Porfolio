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
      title: 'SERE',
      titleTemplate: '%s | Aziz SERE - Développeur Expert',

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // ✅ Meta descriptions optimisées
        {
          name: 'description',
          content:
            "SERE Abdoul Aziz, ingénieur en génie logiciel fullstack spécialisé dans le développement web, mobile et solutions SaaS. Création d'applications performantes et innovantes."
        },

        // ✅ Mots-clés SEO
        {
          name: 'keywords',
          content:
            'SERE Abdoul Aziz, développeur fullstack, ingénieur logiciel, Vue.js, React, Node.js, applications web, développement mobile, portfolio développeur, freelance Mali, solutions SaaS'
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
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'SERE Abdoul Aziz',
            alternateName: 'Aziz SERE',
            jobTitle: 'Ingénieur en Génie Logiciel Fullstack',
            description:
              'Expert en développement web et mobile, spécialisé dans les solutions SaaS et applications performantes',
            url: 'https://azizsere.eveilon.com',
            image: 'https://azizsere.eveilon.com/profile-image.jpg',
            sameAs: ['https://www.linkedin.com/in/aziz-sere/', 'https://github.com/Sere-Abdoul-Aziz/'],
            knowsAbout: [
              'Développement Web',
              'Vue.js',
              'React',
              'Node.js',
              'Flutter',
              'Développement Mobile',
              'Solutions SaaS',
              'JavaScript',
              'TypeScript',
              'PHP',
              'Laravel'
            ],
            worksFor: { '@type': 'Organization', name: 'Freelance' },
            nationality: { '@type': 'Country', name: 'Burkina' },
            address: { '@type': 'PostalAddress', addressCountry: 'BF', addressLocality: 'Ouagadougou' }
          })
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'SERE Abdoul Aziz - Portfolio',
            alternateName: 'Aziz SERE Portfolio',
            url: 'https://azizsere.eveilon.com',
            description:
              'Portfolio professionnel de SERE Abdoul Aziz, ingénieur fullstack expert en développement web et mobile',
            author: { '@type': 'Person', name: 'SERE Abdoul Aziz' },
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://azizsere.eveilon.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          })
        }
      ]
    }
  },

  // ✅ Optimisations build
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: { routes: ['/sitemap.xml'] },
    // ✅ Ajout de la compression gzip
    experimental: { wasm: false }
  },

  // ✅ Configuration de cache
  routeRules: {
    '/': { prerender: true },
    '/api/**': { cors: true },
    '/images/**': { headers: { 'Cache-Control': 'max-age=31536000' } }
  },

  // ✅ Modules (sans Google Fonts pour éviter les conflits)
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
  ],

  // ✅ Configuration runtime
  runtimeConfig: {
    public: {
      siteUrl: 'https://azizsere.eveilon.com',
      siteName: 'SERE Abdoul Aziz - Portfolio',
      siteDescription: 'Portfolio professionnel de SERE Abdoul Aziz, ingénieur fullstack',
      language: 'fr'
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
            // ne JAMAIS mettre 'vue' (ou 'vue-router') dans un chunk manuel
            if (id.includes('node_modules')) {
              if (id.includes('/vue/dist/') || id.includes('/vue/')) return undefined
              if (id.includes('/vue-router/')) return undefined
              return 'vendor'
            }
            // hors node_modules, on laisse Rollup décider
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
      title: 'SERE',
      titleTemplate: '%s | Aziz SERE - Développeur Expert',

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // ✅ Meta descriptions optimisées
        {
          name: 'description',
          content:
            "SERE Abdoul Aziz, ingénieur en génie logiciel fullstack spécialisé dans le développement web, mobile et solutions SaaS. Création d'applications performantes et innovantes."
        },

        // ✅ Mots-clés SEO
        {
          name: 'keywords',
          content:
            'SERE Abdoul Aziz, développeur fullstack, ingénieur logiciel, Vue.js, React, Node.js, applications web, développement mobile, portfolio développeur, freelance Mali, solutions SaaS'
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
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'SERE Abdoul Aziz',
            alternateName: 'Aziz SERE',
            jobTitle: 'Ingénieur en Génie Logiciel Fullstack',
            description:
              'Expert en développement web et mobile, spécialisé dans les solutions SaaS et applications performantes',
            url: 'https://azizsere.eveilon.com',
            image: 'https://azizsere.eveilon.com/profile-image.jpg',
            sameAs: ['https://www.linkedin.com/in/aziz-sere/', 'https://github.com/Sere-Abdoul-Aziz/'],
            knowsAbout: [
              'Développement Web',
              'Vue.js',
              'React',
              'Node.js',
              'Flutter',
              'Développement Mobile',
              'Solutions SaaS',
              'JavaScript',
              'TypeScript',
              'PHP',
              'Laravel'
            ],
            worksFor: { '@type': 'Organization', name: 'Freelance' },
            nationality: { '@type': 'Country', name: 'Burkina' },
            address: { '@type': 'PostalAddress', addressCountry: 'BF', addressLocality: 'Ouagadougou' }
          })
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'SERE Abdoul Aziz - Portfolio',
            alternateName: 'Aziz SERE Portfolio',
            url: 'https://azizsere.eveilon.com',
            description:
              'Portfolio professionnel de SERE Abdoul Aziz, ingénieur fullstack expert en développement web et mobile',
            author: { '@type': 'Person', name: 'SERE Abdoul Aziz' },
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://azizsere.eveilon.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          })
        }
      ]
    }
  },

  // ✅ Optimisations build
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: { routes: ['/sitemap.xml'] },
    // ✅ Ajout de la compression gzip
    experimental: { wasm: false }
  },

  // ✅ Configuration de cache
  routeRules: {
    '/': { prerender: true },
    '/api/**': { cors: true },
    '/images/**': { headers: { 'Cache-Control': 'max-age=31536000' } }
  },

  // ✅ Modules (sans Google Fonts pour éviter les conflits)
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
  ],

  // ✅ Configuration runtime
  runtimeConfig: {
    public: {
      siteUrl: 'https://azizsere.eveilon.com',
      siteName: 'SERE Abdoul Aziz - Portfolio',
      siteDescription: 'Portfolio professionnel de SERE Abdoul Aziz, ingénieur fullstack',
      language: 'fr'
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
            // ne JAMAIS mettre 'vue' (ou 'vue-router') dans un chunk manuel
            if (id.includes('node_modules')) {
              if (id.includes('/vue/dist/') || id.includes('/vue/')) return undefined
              if (id.includes('/vue-router/')) return undefined
              return 'vendor'
            }
            // hors node_modules, on laisse Rollup décider
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
