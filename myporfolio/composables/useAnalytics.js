export function useAnalytics() {
  const { $gtag, $gtagId } = useNuxtApp()
  
  // ✅ Vérifier si GTM est actif
  const isGtagEnabled = () => {
    return process.client && $gtag && window.gtag && window.dataLayer
  }

  // ✅ Push vers dataLayer pour GTM
  const pushToDataLayer = (eventData) => {
    if (process.client && window.dataLayer) {
      window.dataLayer.push(eventData)
    }
  }

  // ✅ Tracker des événements
  const trackEvent = (eventName, parameters = {}) => {
    if (!isGtagEnabled()) {
      console.log('🔍 GTM désactivé:', { eventName, parameters })
      return
    }

    const eventData = {
      event: eventName,
      event_category: 'Portfolio',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      portfolio_section: parameters.section || 'general',
      gtm_id: $gtagId,
      ...parameters
    }

    pushToDataLayer(eventData)
    
    window.gtag('event', eventName, {
      event_category: 'Portfolio',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters
    })
  }

  // ✅ AJOUT : Fonction trackPageView manquante
  const trackPageView = (pageName, section = 'navigation') => {
    if (!isGtagEnabled()) {
      console.log('🔍 Page view désactivé:', { pageName, section })
      return
    }
    
    // ✅ Push vers dataLayer pour GTM
    pushToDataLayer({
      event: 'page_view',
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname,
      portfolio_section: section
    })
    
    trackEvent('page_view', {
      label: pageName,
      section: section
    })
  }

  // ✅ Tracking spécifique services
  const trackServiceView = (serviceName) => {
    trackEvent('service_viewed', {
      label: serviceName,
      section: 'services',
      value: 3
    })
  }

  // ✅ Tracking demandes de devis
  const trackQuoteRequest = (serviceName, budget) => {
    trackEvent('quote_requested', {
      label: serviceName,
      section: 'services',
      budget_range: budget,
      value: 10
    })
  }

  // ✅ Tracking actions de contact
  const trackContactAction = (actionType, source) => {
    trackEvent('contact_action', {
      label: `${actionType} from ${source}`,
      section: 'contact',
      action_type: actionType,
      source: source,
      value: 5
    })
  }

  // ✅ Tracking engagement
  const trackEngagement = (engagementType, duration) => {
    trackEvent('user_engagement', {
      label: engagementType,
      section: 'engagement',
      engagement_duration: duration,
      value: 1
    })
  }

  // ✅ Tracking des conversions importantes pour GTM
  const trackConversion = (conversionType, value = 0, details = {}) => {
    if (!isGtagEnabled()) return

    pushToDataLayer({
      event: 'conversion',
      conversion_type: conversionType,
      conversion_value: value,
      currency: 'XOF', // Franc CFA
      ...details
    })

    trackEvent('conversion', {
      label: conversionType,
      value: value,
      section: 'conversion',
      ...details
    })
  }

  return {
    trackEvent,
    trackPageView, // ✅ IMPORTANT : Export de la fonction
    trackServiceView,
    trackQuoteRequest,
    trackContactAction,
    trackEngagement,
    trackConversion,
    pushToDataLayer,
    isGtagEnabled
  }
}