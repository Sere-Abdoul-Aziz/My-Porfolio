<template>
  <div class="privacy-policy">
    <!-- ✅ Hero Section avec animation -->
    <section class="privacy-hero">
      <div class="hero-background">
        <div class="animated-particles"></div>
      </div>
      <div class="container">
        <div class="hero-content" ref="heroContent">
          <div class="hero-icon">
            <i class="fas fa-shield-alt"></i>
          </div>
          <h1 class="hero-title">Politique de Confidentialité</h1>
          <p class="hero-subtitle">
            Transparence totale sur la protection de vos données
          </p>
          <div class="last-updated-badge">
            <i class="fas fa-calendar-alt"></i>
            <span>Dernière mise à jour : {{ lastUpdated }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ✅ Résumé rapide -->
    <section class="privacy-summary">
      <div class="container">
        <h2 class="section-title">
          <i class="fas fa-info-circle"></i>
          En résumé
        </h2>
        <div class="summary-grid">
          <div class="summary-card" v-for="(item, index) in summaryItems" :key="index">
            <div class="card-icon">
              <i :class="item.icon"></i>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ✅ Sections détaillées avec accordéon -->
    <section class="privacy-details">
      <div class="container">
        <div class="details-sidebar">
          <div class="sidebar-sticky">
            <h3>Navigation rapide</h3>
            <nav class="privacy-nav">
              <a 
                v-for="(section, index) in privacySections" 
                :key="index"
                :href="`#section-${index + 1}`"
                @click="scrollToSection(index + 1)"
                :class="{ active: activeSection === index + 1 }"
              >
                <i :class="section.icon"></i>
                {{ section.title }}
              </a>
            </nav>

            <!-- ✅ Widget de contrôle des cookies -->
            <div class="cookie-control-widget">
              <h4>
                <i class="fas fa-cookie-bite"></i>
                Contrôle des cookies
              </h4>
              <div class="cookie-status">
                <span class="status-indicator" :class="cookieStatus.class"></span>
                <span>{{ cookieStatus.text }}</span>
              </div>
              <div class="cookie-actions">
                <button 
                  @click="acceptCookies" 
                  class="cookie-btn accept-btn"
                  :disabled="cookieStatus.accepted"
                >
                  <i class="fas fa-check"></i>
                  Accepter
                </button>
                <button 
                  @click="declineCookies" 
                  class="cookie-btn decline-btn"
                  :disabled="!cookieStatus.accepted"
                >
                  <i class="fas fa-times"></i>
                  Refuser
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="details-content">
          <!-- Section 1: Collecte de données -->
          <section :id="`section-1`" class="policy-section" ref="section1">
            <div class="section-header">
              <div class="section-icon">
                <i class="fas fa-database"></i>
              </div>
              <div>
                <h2>1. Collecte de données</h2>
                <p class="section-subtitle">
                  Quelles informations nous collectons et pourquoi
                </p>
              </div>
            </div>

            <div class="content-tabs">
              <div class="tab-buttons">
                <button 
                  @click="activeTab = 'collected'" 
                  :class="{ active: activeTab === 'collected' }"
                >
                  Données collectées
                </button>
                <button 
                  @click="activeTab = 'not-collected'" 
                  :class="{ active: activeTab === 'not-collected' }"
                >
                  Données NON collectées
                </button>
                <button 
                  @click="activeTab = 'tools'" 
                  :class="{ active: activeTab === 'tools' }"
                >
                  Outils utilisés
                </button>
              </div>

              <div class="tab-content">
                <div v-if="activeTab === 'collected'" class="data-list">
                  <div class="data-item" v-for="item in collectedData" :key="item.name">
                    <div class="item-icon">
                      <i :class="item.icon"></i>
                    </div>
                    <div class="item-content">
                      <h4>{{ item.name }}</h4>
                      <p>{{ item.description }}</p>
                      <span class="item-purpose">{{ item.purpose }}</span>
                    </div>
                  </div>
                </div>

                <div v-if="activeTab === 'not-collected'" class="data-list">
                  <div class="data-item safe" v-for="item in notCollectedData" :key="item.name">
                    <div class="item-icon">
                      <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="item-content">
                      <h4>{{ item.name }}</h4>
                      <p>{{ item.description }}</p>
                    </div>
                  </div>
                </div>

                <div v-if="activeTab === 'tools'" class="tools-grid">
                  <div class="tool-card" v-for="tool in analyticsTools" :key="tool.name">
                    <div class="tool-icon">
                      <i :class="tool.icon"></i>
                    </div>
                    <h4>{{ tool.name }}</h4>
                    <p>{{ tool.description }}</p>
                    <a :href="tool.link" target="_blank" class="tool-link">
                      En savoir plus
                      <i class="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 2: Consentement et contrôle -->
          <section :id="`section-2`" class="policy-section" ref="section2">
            <div class="section-header">
              <div class="section-icon">
                <i class="fas fa-user-shield"></i>
              </div>
              <div>
                <h2>2. Vos droits et contrôles</h2>
                <p class="section-subtitle">
                  Conformité RGPD et contrôle total de vos données
                </p>
              </div>
            </div>

            <div class="rights-grid">
              <div class="right-card" v-for="right in userRights" :key="right.title">
                <div class="right-icon">
                  <i :class="right.icon"></i>
                </div>
                <h3>{{ right.title }}</h3>
                <p>{{ right.description }}</p>
                <button 
                  v-if="right.action" 
                  @click="executeRight(right.action)"
                  class="right-action-btn"
                >
                  {{ right.actionText }}
                </button>
              </div>
            </div>
          </section>

          <!-- Section 3: Utilisation des données -->
          <section :id="`section-3`" class="policy-section" ref="section3">
            <div class="section-header">
              <div class="section-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <div>
                <h2>3. Utilisation des données</h2>
                <p class="section-subtitle">
                  Comment nous utilisons vos informations
                </p>
              </div>
            </div>

            <div class="usage-timeline">
              <div class="timeline-item" v-for="(usage, index) in dataUsage" :key="index">
                <div class="timeline-icon">
                  <i :class="usage.icon"></i>
                </div>
                <div class="timeline-content">
                  <h3>{{ usage.title }}</h3>
                  <p>{{ usage.description }}</p>
                  <div class="usage-details">
                    <span class="usage-frequency">{{ usage.frequency }}</span>
                    <span class="usage-purpose">{{ usage.purpose }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 4: Sécurité et partage -->
          <section :id="`section-4`" class="policy-section" ref="section4">
            <div class="section-header">
              <div class="section-icon">
                <i class="fas fa-lock"></i>
              </div>
              <div>
                <h2>4. Sécurité et partage</h2>
                <p class="section-subtitle">
                  Protection et confidentialité de vos données
                </p>
              </div>
            </div>

            <div class="security-features">
              <div class="feature-card" v-for="feature in securityFeatures" :key="feature.title">
                <div class="feature-icon">
                  <i :class="feature.icon"></i>
                </div>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
                <div class="feature-status">
                  <span class="status-badge active">
                    <i class="fas fa-check"></i>
                    Actif
                  </span>
                </div>
              </div>
            </div>

            <div class="third-party-info">
              <h3>
                <i class="fas fa-external-link-alt"></i>
                Services tiers
              </h3>
              <div class="third-party-grid">
                <div class="third-party-card">
                  <div class="provider-logo">
                    <i class="fab fa-google"></i>
                  </div>
                  <h4>Google Analytics & Tag Manager</h4>
                  <p>Analyse anonymisée du trafic et des performances</p>
                  <a href="https://policies.google.com/privacy" target="_blank" class="provider-policy">
                    Politique de confidentialité Google
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 5: Contact et réclamations -->
          <section :id="`section-5`" class="policy-section" ref="section5">
            <div class="section-header">
              <div class="section-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div>
                <h2>5. Contact et réclamations</h2>
                <p class="section-subtitle">
                  Nous sommes à votre disposition
                </p>
              </div>
            </div>

            <div class="contact-options">
              <div class="contact-card primary">
                <div class="contact-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <h3>Contact direct</h3>
                <p>Pour toute question sur cette politique de confidentialité</p>
                <a href="mailto:aziz@eveilon.com" class="contact-btn">
                  aziz@eveilon.com
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </div>

              <div class="contact-card">
                <div class="contact-icon">
                  <i class="fas fa-balance-scale"></i>
                </div>
                <h3>Autorité de contrôle</h3>
                <p>En cas de réclamation concernant le traitement de vos données</p>
                <a href="https://www.cnil.fr/" target="_blank" class="contact-btn">
                  CNIL - France
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>

    <!-- ✅ Footer de confiance -->
    <section class="privacy-footer">
      <div class="container">
        <div class="footer-content">
          <div class="trust-badges">
            <div class="badge">
              <i class="fas fa-shield-alt"></i>
              <span>RGPD Conforme</span>
            </div>
            <div class="badge">
              <i class="fas fa-lock"></i>
              <span>Données Sécurisées</span>
            </div>
            <div class="badge">
              <i class="fas fa-eye-slash"></i>
              <span>IP Anonymisée</span>
            </div>
            <div class="badge">
              <i class="fas fa-user-shield"></i>
              <span>Zéro Partage</span>
            </div>
          </div>
          
          <div class="footer-actions">
            <button @click="resetCookieConsent" class="footer-btn">
              <i class="fas fa-cookie-bite"></i>
              Modifier mes préférences
            </button>
            <button @click="downloadPolicy" class="footer-btn secondary">
              <i class="fas fa-download"></i>
              Télécharger en PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ✅ Import avec fallback pour éviter les erreurs
let useAnalytics
try {
  const analyticsModule = await import('~/composables/useAnalytics')
  useAnalytics = analyticsModule.useAnalytics || (() => ({
    trackEvent: () => {},
    trackPageView: () => {},
    isGtagEnabled: () => false
  }))
} catch (error) {
  console.warn('Analytics composable non disponible:', error)
  // ✅ Fallback si le composable n'existe pas
  useAnalytics = () => ({
    trackEvent: () => {},
    trackPageView: () => {},
    isGtagEnabled: () => false
  })
}

// ✅ Configuration SEO
useHead({
  title: 'Politique de Confidentialité - RGPD Conforme',
  meta: [
    {
      name: 'description',
      content: 'Politique de confidentialité transparente et conforme RGPD. Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée.'
    },
    {
      name: 'keywords',
      content: 'politique confidentialité, RGPD, protection données, vie privée, cookies, analytics, consentement'
    },
    { property: 'og:title', content: 'Politique de Confidentialité RGPD - SERE Abdoul Aziz' },
    { property: 'og:description', content: 'Transparence totale sur la protection de vos données personnelles' },
    { name: 'robots', content: 'index, follow' }
  ]
})

gsap.registerPlugin(ScrollTrigger)

// ✅ Analytics avec gestion d'erreur
const { trackEvent, trackPageView } = useAnalytics()

// ✅ Refs et données réactives
const heroContent = ref(null)
const activeSection = ref(1)
const activeTab = ref('collected')

// ✅ Date de mise à jour
const lastUpdated = computed(() => {
  return new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// ✅ Statut des cookies
const cookieStatus = computed(() => {
  if (process.client) {
    const consent = localStorage.getItem('analytics-consent')
    if (consent === 'accepted') {
      return {
        text: 'Cookies analytiques acceptés',
        class: 'accepted',
        accepted: true
      }
    } else if (consent === 'declined') {
      return {
        text: 'Cookies analytiques refusés',
        class: 'declined',
        accepted: false
      }
    }
  }
  return {
    text: 'Consentement non défini',
    class: 'pending',
    accepted: false
  }
})

// ✅ Données structurées
const summaryItems = ref([
  {
    icon: 'fas fa-shield-alt',
    title: 'Protection maximale',
    description: 'Vos données sont anonymisées et sécurisées selon les standards RGPD'
  },
  {
    icon: 'fas fa-eye-slash',
    title: 'Aucun tracking personnel',
    description: 'Nous ne collectons aucune information personnelle identifiable'
  },
  {
    icon: 'fas fa-hand-paper',
    title: 'Contrôle total',
    description: 'Acceptez ou refusez les cookies analytiques à tout moment'
  },
  {
    icon: 'fas fa-trash-alt',
    title: 'Suppression facile',
    description: 'Demandez la suppression de vos données en un clic'
  }
])

const privacySections = ref([
  { title: 'Collecte de données', icon: 'fas fa-database' },
  { title: 'Vos droits', icon: 'fas fa-user-shield' },
  { title: 'Utilisation', icon: 'fas fa-chart-line' },
  { title: 'Sécurité', icon: 'fas fa-lock' },
  { title: 'Contact', icon: 'fas fa-envelope' }
])

const collectedData = ref([
  {
    name: 'Pages visitées',
    description: 'URLs des pages que vous consultez sur le site',
    purpose: 'Comprendre les contenus les plus appréciés',
    icon: 'fas fa-file-alt'
  },
  {
    name: 'Temps de session',
    description: 'Durée de votre visite et temps passé sur chaque page',
    purpose: 'Améliorer l\'expérience utilisateur',
    icon: 'fas fa-clock'
  },
  {
    name: 'Interactions',
    description: 'Clics sur les boutons, liens et éléments interactifs',
    purpose: 'Optimiser l\'interface et la navigation',
    icon: 'fas fa-mouse-pointer'
  },
  {
    name: 'Données techniques',
    description: 'Type de navigateur, résolution d\'écran, système d\'exploitation',
    purpose: 'Assurer la compatibilité technique',
    icon: 'fas fa-desktop'
  },
  {
    name: 'Adresse IP anonymisée',
    description: 'Localisation approximative (ville/région) sans identification',
    purpose: 'Statistiques de trafic géographique',
    icon: 'fas fa-map-marker-alt'
  }
])

const notCollectedData = ref([
  {
    name: 'Informations personnelles',
    description: 'Nom, prénom, adresse, numéro de téléphone'
  },
  {
    name: 'Adresses email',
    description: 'Sauf si vous nous contactez volontairement'
  },
  {
    name: 'Données bancaires',
    description: 'Aucune information financière ou bancaire'
  },
  {
    name: 'Mots de passe',
    description: 'Aucun système de connexion ou d\'authentification'
  },
  {
    name: 'Historique de navigation',
    description: 'Sites visités avant ou après le nôtre'
  }
])

const analyticsTools = ref([
  {
    name: 'Google Tag Manager',
    description: 'Gestionnaire de balises pour le suivi des performances',
    icon: 'fas fa-tag',
    link: 'https://marketingplatform.google.com/about/tag-manager/'
  },
  {
    name: 'Google Analytics 4',
    description: 'Analyse du trafic et du comportement des visiteurs',
    icon: 'fas fa-chart-bar',
    link: 'https://analytics.google.com/'
  }
])

const userRights = ref([
  {
    title: 'Droit d\'accès',
    description: 'Savoir quelles données nous avons sur vous',
    icon: 'fas fa-eye',
    action: 'access',
    actionText: 'Demander l\'accès'
  },
  {
    title: 'Droit de rectification',
    description: 'Corriger des informations inexactes',
    icon: 'fas fa-edit',
    action: 'rectify',
    actionText: 'Demander une correction'
  },
  {
    title: 'Droit à l\'effacement',
    description: 'Supprimer vos données personnelles',
    icon: 'fas fa-trash-alt',
    action: 'delete',
    actionText: 'Demander la suppression'
  },
  {
    title: 'Droit d\'opposition',
    description: 'Refuser le traitement de vos données',
    icon: 'fas fa-hand-paper',
    action: 'oppose',
    actionText: 'Faire opposition'
  },
  {
    title: 'Droit à la portabilité',
    description: 'Récupérer vos données dans un format lisible',
    icon: 'fas fa-download',
    action: 'export',
    actionText: 'Exporter mes données'
  },
  {
    title: 'Droit de limitation',
    description: 'Limiter le traitement de vos données',
    icon: 'fas fa-pause',
    action: 'limit',
    actionText: 'Limiter le traitement'
  }
])

const dataUsage = ref([
  {
    title: 'Analyse de performance',
    description: 'Mesurer les temps de chargement et optimiser la vitesse du site',
    frequency: 'En temps réel',
    purpose: 'Optimisation technique',
    icon: 'fas fa-tachometer-alt'
  },
  {
    title: 'Amélioration UX/UI',
    description: 'Comprendre comment les utilisateurs naviguent pour améliorer l\'interface',
    frequency: 'Quotidienne',
    purpose: 'Expérience utilisateur',
    icon: 'fas fa-paint-brush'
  },
  {
    title: 'Analyse de contenu',
    description: 'Identifier les contenus les plus populaires et pertinents',
    frequency: 'Hebdomadaire',
    purpose: 'Stratégie de contenu',
    icon: 'fas fa-file-alt'
  },
  {
    title: 'Statistiques générales',
    description: 'Rapports anonymisés sur la fréquentation et l\'engagement',
    frequency: 'Mensuelle',
    purpose: 'Reporting et évolution',
    icon: 'fas fa-chart-pie'
  }
])

const securityFeatures = ref([
  {
    title: 'Chiffrement HTTPS',
    description: 'Toutes les communications sont chiffrées en transit',
    icon: 'fas fa-shield-alt'
  },
  {
    title: 'Anonymisation IP',
    description: 'Les adresses IP sont automatiquement anonymisées',
    icon: 'fas fa-user-secret'
  },
  {
    title: 'Stockage sécurisé',
    description: 'Données hébergées sur des serveurs Google sécurisés',
    icon: 'fas fa-server'
  },
  {
    title: 'Accès restreint',
    description: 'Seuls les administrateurs autorisés accèdent aux données',
    icon: 'fas fa-key'
  }
])

// ✅ Méthodes
const scrollToSection = (sectionNumber) => {
  const element = document.querySelector(`#section-${sectionNumber}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    
    // Track navigation
    trackEvent('privacy_section_navigated', {
      label: `Section ${sectionNumber}`,
      section: 'privacy_policy',
      value: 1
    })
  }
}

const acceptCookies = () => {
  const { $analyticsConsent } = useNuxtApp()
  if ($analyticsConsent) {
    $analyticsConsent.accept()
    
    trackEvent('privacy_cookies_accepted', {
      label: 'Privacy Page Action',
      section: 'privacy_policy',
      source: 'privacy_widget',
      value: 5
    })
    
    // Notification
    showNotification('Cookies analytiques acceptés', 'success')
  }
}

const declineCookies = () => {
  const { $analyticsConsent } = useNuxtApp()
  if ($analyticsConsent) {
    $analyticsConsent.decline()
    
    trackEvent('privacy_cookies_declined', {
      label: 'Privacy Page Action',
      section: 'privacy_policy',
      source: 'privacy_widget',
      value: 2
    })
    
    showNotification('Cookies analytiques refusés', 'info')
  }
}

const resetCookieConsent = () => {
  if (process.client) {
    localStorage.removeItem('analytics-consent')
    
    trackEvent('privacy_cookies_reset', {
      label: 'Reset Cookie Consent',
      section: 'privacy_policy',
      value: 3
    })
    
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }
}

const executeRight = (rightType) => {
  const emails = {
    access: `mailto:aziz@eveilon.com?subject=Demande d'accès aux données - RGPD&body=Bonjour,%0D%0A%0D%0AJe souhaite exercer mon droit d'accès aux données personnelles conformément au RGPD.%0D%0A%0D%0ACordialement`,
    rectify: `mailto:aziz@eveilon.com?subject=Demande de rectification - RGPD&body=Bonjour,%0D%0A%0D%0AJe souhaite exercer mon droit de rectification conformément au RGPD.%0D%0A%0D%0ACordialement`,
    delete: `mailto:aziz@eveilon.com?subject=Demande de suppression - RGPD&body=Bonjour,%0D%0A%0D%0AJe souhaite exercer mon droit à l'effacement conformément au RGPD.%0D%0A%0D%0ACordialement`,
    oppose: `mailto:aziz@eveilon.com?subject=Droit d'opposition - RGPD&body=Bonjour,%0D%0A%0D%0AJe souhaite exercer mon droit d'opposition conformément au RGPD.%0D%0A%0D%0ACordialement`,
    export: `mailto:aziz@eveilon.com?subject=Demande de portabilité - RGPD&body=Bonjour,%0D%0A%0D%0AJe souhaite exercer mon droit à la portabilité des données conformément au RGPD.%0D%0A%0D%0ACordialement`,
    limit: `mailto:aziz@eveilon.com?subject=Demande de limitation - RGPD&body=Bonjour,%0D%0A%0D%0AJe souhaite exercer mon droit de limitation du traitement conformément au RGPD.%0D%0A%0D%0ACordialement`
  }
  
  window.location.href = emails[rightType]
  
  trackEvent('privacy_right_exercised', {
    label: `GDPR Right: ${rightType}`,
    section: 'privacy_policy',
    right_type: rightType,
    value: 8
  })
}

const downloadPolicy = () => {
  // Simuler le téléchargement PDF
  trackEvent('privacy_policy_downloaded', {
    label: 'PDF Download',
    section: 'privacy_policy',
    value: 3
  })
  
  showNotification('Fonctionnalité de téléchargement PDF bientôt disponible', 'info')
}

const showNotification = (message, type = 'info') => {
  // Créer une notification temporaire
  const notification = document.createElement('div')
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check' : 'info-circle'}"></i>
    <span>${message}</span>
  `
  
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.classList.add('show')
  }, 100)
  
  setTimeout(() => {
    notification.classList.remove('show')
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// ✅ Intersection Observer pour navigation active
const setupScrollSpy = () => {
  const sections = document.querySelectorAll('.policy-section')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id
        const sectionNumber = parseInt(sectionId.split('-')[1])
        activeSection.value = sectionNumber
      }
    })
  }, { threshold: 0.3 })
  
  sections.forEach(section => observer.observe(section))
  
  return observer
}

// ✅ Lifecycle avec gestion d'erreur
onMounted(() => {
  try {
    // Track page view avec fallback
    if (trackPageView && typeof trackPageView === 'function') {
      trackPageView('Privacy Policy', 'legal')
    } else {
      console.log('📊 TrackPageView non disponible')
    }
  } catch (error) {
    console.warn('Erreur lors du tracking:', error)
  }
  
  // Animations GSAP
  const ctx = gsap.context(() => {
    gsap.from(heroContent.value, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out'
    })
    
    gsap.from('.summary-card', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.privacy-summary',
        start: 'top 80%'
      }
    })
    
    gsap.from('.policy-section', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.privacy-details',
        start: 'top 70%'
      }
    })
  })
  
  // Setup scroll spy
  const observer = setupScrollSpy()
  
  // Cleanup
  onBeforeUnmount(() => {
    ctx.revert()
    observer.disconnect()
  })
})
</script>

<style scoped>
/* ✅ Variables CSS pour cohérence */
.privacy-policy {
  --primary-color: #3b82f6;
  --secondary-color: #1e40af;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-accent: #f1f5f9;
  --border-color: #e5e7eb;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ✅ Hero Section */
.privacy-hero {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 0;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.animated-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.1"><circle cx="30" cy="30" r="2"/></g></svg>');
  animation: particleFloat 20s linear infinite;
}

@keyframes particleFloat {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-100vh) rotate(360deg); }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
  animation: heroIconPulse 2s ease-in-out infinite;
}

@keyframes heroIconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.last-updated-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  backdrop-filter: blur(10px);
}

/* ✅ Summary Section */
.privacy-summary {
  padding: 4rem 0;
  background: var(--bg-secondary);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 3rem;
  text-align: center;
  justify-content: center;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.summary-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: var(--transition);
  border: 1px solid var(--border-color);
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.card-icon {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.summary-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.summary-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ✅ Details Section */
.privacy-details {
  padding: 4rem 0;
}

.privacy-details .container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 4rem;
  max-width: 1400px;
}

.details-sidebar {
  position: relative;
}

.sidebar-sticky {
  position: sticky;
  top: 2rem;
}

.sidebar-sticky h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.privacy-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.privacy-nav a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 8px;
  transition: var(--transition);
  border-left: 3px solid transparent;
}

.privacy-nav a:hover,
.privacy-nav a.active {
  background: var(--bg-accent);
  color: var(--primary-color);
  border-left-color: var(--primary-color);
}

/* ✅ Cookie Control Widget */
.cookie-control-widget {
  background: var(--bg-primary);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.cookie-control-widget h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.cookie-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-indicator.accepted {
  background: var(--success-color);
}

.status-indicator.declined {
  background: var(--danger-color);
}

.status-indicator.pending {
  background: var(--warning-color);
}

.cookie-actions {
  display: flex;
  gap: 0.5rem;
}

.cookie-btn {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.accept-btn {
  background: var(--success-color);
  color: white;
}

.decline-btn {
  background: var(--danger-color);
  color: white;
}

.cookie-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ✅ Policy Sections */
.policy-section {
  margin-bottom: 4rem;
  padding: 3rem;
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
}

.section-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.section-icon {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

/* ✅ Content Tabs */
.content-tabs {
  margin-top: 2rem;
}

.tab-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.tab-buttons button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: var(--transition);
}

.tab-buttons button.active,
.tab-buttons button:hover {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

/* ✅ Data Lists */
.data-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.data-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
}

.data-item.safe {
  border-left-color: var(--success-color);
}

.item-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.data-item.safe .item-icon {
  background: var(--success-color);
}

.item-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.item-content p {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.item-purpose {
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: 500;
}

/* ✅ Tools Grid */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.tool-card {
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  text-align: center;
}

.tool-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.tool-card h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.tool-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
}

/* ✅ Rights Grid */
.rights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.right-card {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  text-align: center;
  transition: var(--transition);
}

.right-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.right-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.right-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.right-action-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.right-action-btn:hover {
  background: var(--secondary-color);
}

/* ✅ Usage Timeline */
.usage-timeline {
  position: relative;
  margin-top: 2rem;
}

.usage-timeline::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-color);
}

.timeline-item {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
}

.timeline-icon {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  position: relative;
  z-index: 2;
}

.timeline-content {
  flex: 1;
  padding-top: 0.5rem;
}

.timeline-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.usage-details {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.usage-frequency,
.usage-purpose {
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
}

.usage-frequency {
  background: var(--bg-accent);
  color: var(--text-secondary);
}

.usage-purpose {
  background: var(--primary-color);
  color: white;
}

/* ✅ Security Features */
.security-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.feature-card {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  text-align: center;
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--success-color);
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 1rem;
}

.status-badge.active {
  background: var(--success-color);
  color: white;
}

/* ✅ Third Party Info */
.third-party-info {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.third-party-info h3 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2rem;
}

.third-party-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.third-party-card {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  text-align: center;
}

.provider-logo {
  font-size: 3rem;
  color: #4285f4;
  margin-bottom: 1rem;
}

.third-party-card h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.provider-policy {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
}

/* ✅ Contact Options */
.contact-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.contact-card {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  text-align: center;
  transition: var(--transition);
}

.contact-card.primary {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.contact-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.contact-card.primary .contact-icon {
  color: white;
}

.contact-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  margin-top: 1rem;
  transition: var(--transition);
}

.contact-card.primary .contact-btn {
  background: white;
  color: var(--primary-color);
}

.contact-btn:hover {
  transform: translateY(-2px);
}

/* ✅ Privacy Footer */
.privacy-footer {
  background: var(--bg-accent);
  padding: 3rem 0;
  border-top: 1px solid var(--border-color);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.trust-badges {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--bg-primary);
  border-radius: 25px;
  border: 1px solid var(--border-color);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
}

.badge i {
  color: var(--success-color);
}

.footer-actions {
  display: flex;
  gap: 1rem;
}

.footer-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.footer-btn.secondary {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.footer-btn:hover {
  transform: translateY(-2px);
}

/* ✅ Notifications */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  border-left: 4px solid var(--primary-color);
  box-shadow: var(--shadow-lg);
  z-index: 10000;
  transform: translateX(100%);
  transition: var(--transition);
}

.notification.show {
  transform: translateX(0);
}

.notification.success {
  border-left-color: var(--success-color);
}

.notification.info {
  border-left-color: var(--primary-color);
}

.notification i {
  color: var(--success-color);
}

/* ✅ Responsive Design */
@media (max-width: 1024px) {
  .privacy-details .container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .sidebar-sticky {
    position: static;
  }
  
  .privacy-nav {
    flex-direction: row;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .privacy-nav a {
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .summary-grid {
    grid-template-columns: 1fr;
  }
  
  .policy-section {
    padding: 2rem;
  }
  
  .section-header {
    flex-direction: column;
    text-align: center;
  }
  
  .tab-buttons {
    flex-wrap: wrap;
  }
  
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .trust-badges {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .privacy-hero {
    padding: 4rem 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .policy-section {
    padding: 1.5rem;
  }
  
  .data-item {
    flex-direction: column;
    text-align: center;
  }
  
  .timeline-item {
    flex-direction: column;
  }
  
  .usage-timeline::before {
    display: none;
  }
}
</style>