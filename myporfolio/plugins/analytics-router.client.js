import { nextTick } from 'vue'

export default defineNuxtPlugin(() => {
  const { $router } = useNuxtApp()
  const { trackPageView, isGtagEnabled } = useAnalytics()

  // ✅ Vérifier que gtag est disponible avant de configurer le tracking
  if (!isGtagEnabled()) {
    console.warn('Google Analytics non disponible - tracking désactivé')
    return
  }

  // ✅ Tracker automatiquement les changements de page
  $router.afterEach((to, from) => {
    nextTick(() => {
      const pageName = to.name || to.path
      const section = getPageSection(to.path)
      
      trackPageView(pageName, section)
    })
  })
})

// ✅ Fonction helper pour déterminer la section
function getPageSection(path) {
  if (path.includes('projects')) return 'projects'
  if (path.includes('services')) return 'services'
  if (path.includes('about')) return 'about'
  if (path.includes('contact')) return 'contact'
  if (path === '/') return 'home'
  return 'other'
}