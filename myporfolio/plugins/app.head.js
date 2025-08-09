export default defineNuxtPlugin(() => {
  useHead({
    title: 'SERE - Ingénieur en Génie Logiciel Fullstack | Développeur Web & Mobile',
    meta: [
      { name: 'description', content: 'Portfolio de SERE, ingénieur en génie logiciel spécialisé dans le développement Fullstack, la création de solutions SaaS, d\'applications mobiles et web innovantes.' },
      { name: 'keywords', content: 'développeur fullstack, ingénieur logiciel, applications web, applications mobiles, solutions SaaS, Vue.js, React, Flutter, Node.js' },
      { name: 'author', content: 'SERE' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'SERE - Ingénieur en Génie Logiciel Fullstack' },
      { property: 'og:description', content: 'Portfolio de SERE, expert en développement d\'applications web, mobile et solutions SaaS innovantes.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://votredomaine.com' },
      { property: 'og:image', content: 'https://votredomaine.com/preview.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'SERE - Ingénieur en Génie Logiciel Fullstack' },
      { name: 'twitter:description', content: 'Portfolio de SERE, expert en développement d\'applications web, mobile et solutions SaaS innovantes.' },
      { name: 'twitter:image', content: 'https://votredomaine.com/preview.jpg' }
    ],
    link: [
      { rel: 'canonical', href: 'https://votredomaine.com' }
    ]
  })
})