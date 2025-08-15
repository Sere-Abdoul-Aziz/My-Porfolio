export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const GTM_ID = config.public.googleTagManager?.id || 'GTM-W6X7JWVF'

  if (process.client && GTM_ID) {
    // ✅ Initialiser dataLayer
    window.dataLayer = window.dataLayer || []
    
    function gtag() {
      dataLayer.push(arguments)
    }
    window.gtag = gtag

    // ✅ Configuration initiale avec consentement refusé par défaut (RGPD)
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'functionality_storage': 'denied',
      'personalization_storage': 'denied',
      'security_storage': 'granted'
    })

    // ✅ Vérifier le consentement existant
    const consent = localStorage.getItem('analytics-consent')
    if (consent === 'accepted') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      })
    }

    console.log('🏷️ Google Tag Manager initialisé avec ID:', GTM_ID)

    return {
      provide: {
        gtag: gtag,
        gtagId: GTM_ID
      }
    }
  }

  return {
    provide: {
      gtag: () => {},
      gtagId: null
    }
  }
})