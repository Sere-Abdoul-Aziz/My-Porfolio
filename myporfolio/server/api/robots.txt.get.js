export default defineEventHandler(async (event) => {
  const siteUrl = 'https://azizsere.eveilon.com'
  
  const robotsTxt = `# Robots.txt pour SERE Abdoul Aziz Portfolio
# Dernière mise à jour: ${new Date().toISOString().split('T')[0]}

# Règles générales pour tous les robots
User-agent: *
Allow: /

# Sitemap principal
Sitemap: ${siteUrl}/sitemap.xml

# Interdictions spécifiques
Disallow: /api/
Disallow: /_nuxt/
Disallow: /admin/
Disallow: /test/
Disallow: /.git/
Disallow: /node_modules/
Disallow: /config/
Disallow: /plugins/private/
Disallow: /*.json$
Disallow: /*?*debug*
Disallow: /*?*test*

# Délai d'exploration (optionnel - 1 seconde)
Crawl-delay: 1

# Directives spécifiques pour Googlebot
User-agent: Googlebot
Allow: /
Crawl-delay: 0
# Permettre l'accès aux ressources statiques
Allow: /images/
Allow: /css/
Allow: /js/
Allow: /_nuxt/*.css
Allow: /_nuxt/*.js

# Directives pour Bingbot
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Bots de réseaux sociaux - accès complet
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: TelegramBot
Allow: /

# Bot SEO spécialisés avec limitations
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: MJ12bot
Crawl-delay: 10

# Interdiction pour certains bots agressifs
User-agent: DotBot
Disallow: /

User-agent: BLEXBot
Disallow: /

User-agent: MegaIndex
Disallow: /

# Host (optionnel)
Host: ${siteUrl}`

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=86400')
  
  return robotsTxt
})
