export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const enableAnalytics = () => {
    if (window.gtag) {
      // ✅ Mise à jour conforme GTM
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      })
      
      // ✅ Configuration GA4 si disponible
      if (config.public.googleAnalytics?.id && config.public.googleAnalytics.id !== 'G-XXXXXXXXXX') {
        window.gtag('config', config.public.googleAnalytics.id, {
          'anonymize_ip': true,
          'allow_google_signals': false,
          'allow_ad_personalization_signals': false,
          'cookie_expires': 63072000, // 2 ans
          'cookie_update': true,
          'cookie_flags': 'SameSite=Strict;Secure'
        })
      }
      
      console.log('✅ Analytics activé avec consentement')
    }
  }
  
  const disableAnalytics = () => {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      })
      console.log('❌ Analytics désactivé')
    }
  }

  // ✅ Vérifier le consentement existant au démarrage
  if (process.client) {
    setTimeout(() => {
      const consent = localStorage.getItem('analytics-consent')
      if (consent === 'accepted') {
        enableAnalytics()
      } else if (consent === 'declined') {
        disableAnalytics()
      }
    }, 1000) // Attendre que GTM soit chargé
  }
  
  return {
    provide: {
      analyticsConsent: {
        accept: () => {
          localStorage.setItem('analytics-consent', 'accepted')
          enableAnalytics()
        },
        decline: () => {
          localStorage.setItem('analytics-consent', 'declined')
          disableAnalytics()
        },
        // ✅ AJOUT : Fonction pour vérifier le statut
        getStatus: () => {
          return localStorage.getItem('analytics-consent')
        }
      }
    }
  }
})