export default defineEventHandler(async (event) => {
  const siteUrl = 'https://azizsere.eveilon.com'
  const currentDate = new Date().toISOString().split('T')[0]

  // ✅ Routes principales - pages réelles du site
  const routes = [
    // ✅ Page d'accueil - Priorité maximale
    {
      url: '/',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },

    // ✅ Pages principales existantes
    {
      url: '/about',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.9'
    },
    {
      url: '/ressources',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: '/games',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      url: '/privacy',
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: '0.3'
    },
    {
      url: '/privacy',
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: '0.3'
    }
  ]

  // ✅ Générer le XML simplifié
  const generateUrlEntry = (route) => {
    return `  <url>
    <loc>${siteUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(generateUrlEntry).join('\n')}
</urlset>`

  // ✅ Headers optimisés
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')

  return sitemap
})
