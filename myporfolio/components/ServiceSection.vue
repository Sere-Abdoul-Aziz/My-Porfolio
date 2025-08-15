<template>
  <div id="services-section" class="services-section">
    <h1 class="text-gray-200 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-center mb-12">
      Mes <span class="text-primary text-blue-400">Services</span>
    </h1>

    <!-- Filtres de catégories -->
    <div class="filter-container">
      <button 
        v-for="(category, index) in categories" 
        :key="index"
        @click="filterCategory(category.id)"
        class="filter-button"
        :class="{ active: activeCategory === category.id || activeCategory === 'all' }"
      >
        <i :class="category.icon"></i>
        <span>{{ category.name }}</span>
      </button>
    </div>
    
    <div class="services-grid">
      <!-- Cartes de service avec v-show au lieu de v-if pour préserver les instances -->
      <div 
        v-for="(service, index) in services" 
        :key="index"
        v-show="isVisible(service)"
        class="service-card"
        :class="{ expanded: expandedService === index }"
        @click="toggleService(index)"
        ref="serviceCards"
      >
        <div class="service-inner" :style="getCardStyle(index)">
          <!-- Face avant -->
          <div class="service-front">
            <div class="service-icon-container">
              <i :class="service.icon"></i>
            </div>
            
            <!-- Badges d'expertise/popularité -->
            <div class="service-badges">
              <span v-if="index % 2 === 0" class="badge popular-badge">Populaire</span>
              <span v-if="index % 3 === 0" class="badge expert-badge">Expert</span>
            </div>
            
            <h3 class="service-title">{{ service.title }}</h3>
            <div class="service-summary">{{ service.summary }}</div>
            <button class="service-discover-btn">
              <span class="btn-text">Découvrir ce service</span>
              <span class="btn-icon">
                <i class="fas fa-arrow-right"></i>
              </span>
              <span class="btn-shine"></span>
            </button>
          </div>
          
          <!-- Face arrière (détails) avec lazy loading des contenus -->
          <div class="service-back" :class="{'loading-content': expandedService !== index}">
            <h3 class="service-title">{{ service.title }}</h3>
            <div class="service-description">{{ service.description }}</div>
            
            <!-- Satisfaction client chargé uniquement si nécessaire -->
            <div v-if="expandedService === index && service.satisfaction" class="service-satisfaction">
              <div class="satisfaction-stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>
              <span class="satisfaction-rate">{{ service.satisfaction }}/5 satisfaction client</span>
            </div>
            
            <div class="service-offers">
              <div v-for="(offer, i) in service.offers" :key="i" class="service-offer">
                <i class="fas fa-check-circle"></i>
                <span>{{ offer }}</span>
              </div>
            </div>
            
            <div class="service-techs">
              <div 
                v-for="(tech, i) in service.technologies" 
                :key="i" 
                class="tech-badge"
                :style="{'--i': i}"
              >
                {{ tech }}
              </div>
            </div>
            
            <!-- Bouton de demande de devis -->
            <div class="service-action">
              <button @click.stop="requestService(service.title)" class="service-request-button">
                <i class="fas fa-paper-plane"></i>
                Obtenir un devis gratuit
              </button>
              <div class="service-availability">
                <span class="availability-badge">
                  <i class="fas fa-clock"></i> 
                  {{ service.timeframe ? service.timeframe : 'Réponse sous 24h' }}
                </span>
              </div>
            </div>
            
            <div class="service-close" @click.stop="closeService()">
              <i class="fas fa-times"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Indicateurs de qualité -->
    <div class="quality-indicator">
      <div class="indicator-item" v-for="(indicator, index) in indicators" :key="index">
        <i :class="indicator.icon"></i>
        <span>{{ indicator.text }}</span>
      </div>
    </div>
    
    <!-- Bouton CTA -->
    <div class="services-cta">
      <button @click="scrollToContact" class="services-cta-button">
        <i class="fas fa-comments"></i>
        Discutons de votre projet
      </button>
      <p class="services-guarantee">Pas d'engagement - Devis gratuit et personnalisé</p>
    </div>
    
    <!-- Particules de fond décoratives - nombre réduit et efficacement rendues -->
    <div class="services-particles">
      <div 
        v-for="i in 10" 
        :key="i" 
        class="particle" 
        :class="`particle-${i}`"
        :style="particleStyles[i-1]"
      ></div>
    </div>
    
    <!-- Modal pour détails de service -->
    <Teleport to="body">
      <div v-if="modalService" class="modal-backdrop" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
          
          <div class="modal-header">
            <div class="modal-icon-container">
              <i :class="modalService.icon"></i>
            </div>
            <h2 class="modal-title">{{ modalService.title }}</h2>
          </div>
          
          <div class="modal-body">
            <!-- Vue détails du service (affichée par défaut) -->
            <div v-if="!showQuoteForm">
              <p class="modal-description">{{ modalService.description }}</p>

                <div class="modal-cta" style="margin-bottom: 2rem;">
                <button @click="showQuoteForm = true" class="modal-cta-button">
                  <span class="cta-main">
                    <i class="fas fa-paper-plane"></i>
                  Obtenez un prix personnalisé
                  </span>
                  <span class="cta-secondary">Gratuit et sans engagement</span>
                  <div class="cta-shine"></div>
                </button>
                <p class="modal-guarantee">Sans engagement • Réponse sous 24h</p>
                </div>

              
              <!-- Satisfaction client -->
              <div v-if="modalService.satisfaction" class="modal-satisfaction">
                <div class="satisfaction-stars">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
                </div>
                <span class="satisfaction-rate">{{ modalService.satisfaction }}/5 satisfaction client</span>
              </div>
              
              <div class="modal-section">
                <h3 class="modal-section-title">Ce que j'offre</h3>
                <div class="modal-offers">
                  <div v-for="(offer, i) in modalService.offers" :key="i" class="modal-offer">
                    <i class="fas fa-check-circle"></i>
                    <span>{{ offer }}</span>
                  </div>
                </div>
              </div>
              
              <div class="modal-section">
                <h3 class="modal-section-title">Technologies utilisées</h3>
                <ul class="technologies-list">
                  <li v-for="tech in modalService.technologies" :key="tech">{{ tech }}</li>
                </ul>
              </div>
              
              <div class="modal-section">
                <h3 class="modal-section-title">Délai estimé</h3>
                <div class="modal-timeframe">
                  <i class="fas fa-clock"></i>
                  <span>{{ modalService.timeframe ? modalService.timeframe : 'Délai sur demande' }}</span>
                </div>
              </div>
              
              
            </div>
            
            <!-- Formulaire de devis -->
            <div v-else class="quote-form-container">
              <div class="form-header">
                <h3>
                  <i class="fas fa-file-invoice"></i>
                  Demande de devis pour "{{ modalService.title }}"
                </h3>
                <button @click="showQuoteForm = false" class="back-to-details">
                  <i class="fas fa-arrow-left"></i> Retour aux détails
                </button>
              </div>
              
              <form @submit.prevent="submitQuoteRequest" class="quote-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="name">Nom complet *</label>
                    <input type="text" id="name" v-model="quoteForm.name" required placeholder="Votre nom et prénom">
                  </div>
                  <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" v-model="quoteForm.email" required placeholder="votre@email.com">
                  </div>
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="phone">Téléphone</label>
                    <input type="tel" id="phone" v-model="quoteForm.phone" placeholder="Facultatif">
                  </div>
                  <!-- <div class="form-group">
                    <label for="company">Entreprise</label>
                    <input type="text" id="company" v-model="quoteForm.company" placeholder="Nom de votre entreprise">
                  </div> -->
                </div>
                
                <div class="form-group full-width">
                  <label for="project-description">Description de votre projet *</label>
                  <textarea 
                    id="project-description" 
                    v-model="quoteForm.description" 
                    required 
                    rows="4"
                    :placeholder="`Décrivez votre projet ${modalService.title} en quelques lignes...`"
                  ></textarea>
                </div>
                
                <!-- Options spécifiques au service -->
                <div v-if="serviceSpecificFields.length > 0" class="form-group full-width">
                  <label>Options spécifiques à ce service</label>
                  <div class="service-options">
                    <div 
                      v-for="(option, index) in serviceSpecificFields" 
                      :key="index" 
                      class="option-checkbox"
                    >
                      <input 
                        type="checkbox" 
                        :id="`option-${index}`" 
                        v-model="quoteForm.options[option.id]" 
                        :value="true"
                      >
                      <label :for="`option-${index}`">
                        {{ option.label }}
                        <span v-if="option.info" class="option-info" :title="option.info">
                          <i class="fas fa-info-circle"></i>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                
                               <!-- Délai souhaité - version améliorée -->
                <div class="form-group full-width">
                  <label for="deadline">Délai souhaité</label>
                  <div class="select-wrapper">
                    <select id="deadline" v-model="quoteForm.deadline" required>
                      <option value="" disabled selected>Sélectionnez un délai</option>
                      <option value="flexible">Flexible - Pas d'urgence</option>
                      <option value="soon">Dans le mois</option>
                      <option value="urgent">Urgent - Dès que possible</option>
                      <option value="specific">Date spécifique</option>
                    </select>
                  </div>
                  <div v-if="quoteForm.deadline === 'specific'" class="date-input-container">
                    <label for="specific-date">Date exacte:</label>
                    <input 
                      id="specific-date"
                      type="date" 
                      v-model="quoteForm.specificDate"
                      class="date-input"
                      required
                    >
                  </div>
                </div>
                
                <!-- Budget approximatif - version améliorée -->
                <!-- <div class="form-group full-width">
                  <label for="budget">Budget approximatif</label>
                  <div class="select-wrapper">
                    <select id="budget" v-model="quoteForm.budget" required>
                      <option value="" disabled selected>Choisissez une fourchette de budget</option>
                      <option value="unknown">Je ne sais pas encore</option>
                      <option value="small">Moins de 1000€</option>
                      <option value="medium">Entre 1000€ et 5000€</option>
                      <option value="large">Plus de 5000€</option>
                    </select>
                  </div>
                </div> -->
                
                <div class="form-group checkbox-group">
                  <input type="checkbox" id="terms" v-model="quoteForm.terms" required>
                  <label for="terms">
                    J'accepte que mes données soient utilisées pour me recontacter *
                  </label>
                </div>
                
                <div class="form-actions">
                                  <button 
                    type="submit" 
                    class="submit-quote-btn" 
                    :class="{ submitting: isSubmitting }" 
                    :disabled="isSubmitting"
                  >
                    <i class="fas fa-paper-plane" v-if="!isSubmitting"></i>
                    {{ isSubmitting ? '' : 'Envoyer ma demande de devis' }}
                  </button>
                </div>
                
                <p class="form-notice">
                  <i class="fas fa-shield-alt"></i>
                  Vos données sont sécurisées et ne seront jamais partagées avec des tiers.
                </p>
              </form>
                            <!-- Message de succès animé -->
              <div v-if="showSuccessModal" class="success-message-container">
                <div class="success-message">
                  <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                  </div>
                  <h3>Demande envoyée avec succès!</h3>
                  <p>Nous avons bien reçu votre demande de devis pour "{{ modalService.title }}".</p>
                  <p>Un mail de confirmation vous a été envoyé à l'adresse {{ quoteForm.email }}.</p>
                  <p class="contact-timing">Nous vous contacterons dans les 24h.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, onUnmounted, reactive, watch } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { db } from '@/firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import confetti from 'canvas-confetti';
// ✅ AJOUT : Import du composable analytics
import { useAnalytics } from '~/composables/useAnalytics';

gsap.registerPlugin(ScrollTrigger);

// ✅ AJOUT : Initialisation du tracking avec vérification
const { trackServiceView, trackQuoteRequest, trackEvent, isGtagEnabled } = useAnalytics();

// Services data
const services = ref([
      
    {
      title: "Site Web", // ✅ Changé de "Site Vitrine" à "Site Web"
      category: "web",
      icon: "fas fa-globe", // ✅ Changé de "fas fa-building" à "fas fa-globe"
      summary: "Sites web professionnels et performants",
      description: "Création de sites web modernes et optimisés pour présenter votre entreprise, vos services ou votre portfolio avec une identité visuelle cohérente et des fonctionnalités adaptées à vos besoins.",
      offers: [
        "Design sur mesure et responsive",
        "Optimisation SEO avancée",
        "Formulaire de contact interactif",
        "Intégration réseaux sociaux et analytics",
      ],
      technologies: ["Nuxt.js", "React", "JavaScript", "Gsap", "JavaScript", "Vue.js", "TailwindCSS", "..."],
      satisfaction: "4.9",
      projects: "35+", 
      timeframe: "1-3 semaines"
    },
  {
    title: "Applications Web",
    category: "web",
    icon: "fas fa-desktop",
    summary: "Applications web modernes et réactives",
    description: "Développement d'applications web sur mesure, optimisées pour tous les navigateurs et appareils, avec une attention particulière à l'expérience utilisateur et aux performances.",
    offers: [
      "SPA (Single Page Applications)",
      "Applications PWA",
      "Tableaux de bord interactifs",
      "Intégration API",
    ],
    technologies: ["Vue.js", "React", "Angular", "TailwindCSS", "GSAP"],
    satisfaction: "4.9",
    projects: "25+",
    timeframe: "2-4 semaines"
  },
  {
    title: "Applications Mobiles",
    category: "mobile",
    icon: "fas fa-mobile-alt",
    summary: "Apps mobiles performantes et intuitives",
    description: "Création d'applications mobiles natives et cross-platform pour iOS et Android, offrant une expérience utilisateur fluide et des performances optimales.",
    offers: [
      "Apps multiplateformes",
      "Applications natives iOS/Android",
      "Services de localisation",
      "Notifications push",
    ],
    technologies: ["Flutter", "React Native", "Swift", "Firebase", "SQLite"],
    satisfaction: "4.8",
    projects: "15+",
    timeframe: "3-6 semaines"
  },
    {
    title: "Portfolio personnalisé",
    category: "web",
    icon: "fas fa-user-tie",
    summary: "Mettez en valeur vos compétences et réalisations",
    description: "Conception et développement de portfolios professionnels personnalisés pour mettre en avant vos travaux, compétences et réalisations de manière attractive et interactive.",
    offers: [
      "Design unique et adapté à votre profil",
      "Sections projets avec galeries",
      "CV interactif",
      "Témoignages et recommandations",
    ],
    technologies: ["React", "Vue.js", "GSAP", "TailwindCSS", "Framer Motion"],
    satisfaction: "4.8",
    projects: "22+",
    timeframe: "2-3 semaines"
  },
  {
    title: "Développement Backend",
    category: "backend",
    icon: "fas fa-server",
    summary: "APIs robustes et systèmes évolutifs",
    description: "Conception et développement de systèmes backend robustes, APIs sécurisées et bases de données optimisées pour supporter vos applications critiques.",
    offers: [
      "REST & GraphQL APIs",
      "Microservices",
      "Bases de données SQL/NoSQL",
      "Cloud Integration",
    ],
    technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Redis"],
    satisfaction: "4.9",
    projects: "20+",
    timeframe: "2-5 semaines"
  },
  {
    title: "Solutions SaaS",
    category: "saas",
    icon: "fas fa-cloud",
    summary: "Services cloud innovants et évolutifs",
    description: "Développement de solutions Software as a Service (SaaS) complètes, de la conception à la mise en production, avec architecture évolutive et modèle économique adapté.",
    offers: [
      "Architectures multi-tenant",
      "Systèmes de facturation",
      "Monitoring & Analytics",
      "Dashboards personnalisés",
    ],
    technologies: ["AWS", "Docker", "Kubernetes", "CI/CD", "Stripe"],
    satisfaction: "4.7",
    projects: "10+",
    timeframe: "4-8 semaines"
  },
  {
    title: "E-Commerce",
    category: "ecommerce",
    icon: "fas fa-shopping-cart",
    summary: "Boutiques en ligne et systèmes de paiement",
    description: "Création de plateformes e-commerce complètes avec gestion de catalogue, systèmes de paiement sécurisés, et expérience d'achat optimisée.",
    offers: [
      "Solutions e-commerce sur mesure",
      "Intégration paiements sécurisés",
      "Gestion des stocks",
      "Analytics e-commerce",
    ],
    technologies: ["Stripe", "PayPal", "WooCommerce", "Shopify API", "Vue Storefront"],
    satisfaction: "4.8",
    projects: "12+",
    timeframe: "3-6 semaines"
  },
  {
    title: "DevOps & CI/CD",
    category: "devops",
    icon: "fas fa-cogs",
    summary: "Automatisation et déploiement continu",
    description: "Mise en place de pipelines CI/CD, orchestration de conteneurs et automatisation des déploiements pour améliorer la productivité des équipes de développement.",
    offers: [
      "Configuration pipelines CI/CD",
      "Containerisation (Docker)",
      "Orchestration Kubernetes",
      "Infrastructure as Code",
    ],
    technologies: ["Jenkins", "GitHub Actions", "Docker", "Kubernetes", "Terraform"],
    satisfaction: "4.8",
    projects: "8+",
    timeframe: "2-4 semaines"
  },
  {
    title: "Système de Monitoring",
    category: "monitoring",
    icon: "fas fa-chart-line",
    summary: "Suivi en temps réel et analytique avancée",
    description: "Solutions de surveillance et d'analyse pour applications et infrastructures, permettant de suivre les performances, détecter les anomalies et optimiser vos systèmes.",
    offers: [
      "Dashboards temps réel",
      "Alerting intelligent",
      "Visualisation de données",
      "Rapports automatisés",
    ],
    technologies: ["Grafana", "Prometheus", "ELK Stack", "New Relic", "InfluxDB"],
    satisfaction: "4.7",
    projects: "7+",
    timeframe: "2-3 semaines"
  },
  {
    title: "UI/UX Design",
    category: "design",
    icon: "fas fa-paint-brush",
    summary: "Interfaces utilisateur modernes et intuitives",
    description: "Conception d'interfaces utilisateur attrayantes et fonctionnelles, avec une attention particulière à l'expérience utilisateur, l'accessibilité et les tendances actuelles.",
    offers: [
      "Wireframes & Prototypes",
      "Design System",
      "Responsive Design",
      "Tests d'utilisabilité",
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "CSS Animations", "Material Design"],
    satisfaction: "4.9",
    projects: "18+",
    timeframe: "1-3 semaines"
  }
]);

// Catégories de filtrage
const categories = [
  { id: 'all', name: 'Tous', icon: 'fas fa-th' },
  { id: 'web', name: 'Web', icon: 'fas fa-desktop' },
  { id: 'mobile', name: 'Mobile', icon: 'fas fa-mobile-alt' },
  { id: 'backend', name: 'Backend', icon: 'fas fa-server' },
  { id: 'saas', name: 'SaaS', icon: 'fas fa-cloud' },
];

// Indicateurs de qualité précompilés
const indicators = [
  { icon: "fas fa-rocket", text: "Livraison Rapide" },
  { icon: "fas fa-shield-alt", text: "Code Sécurisé" },
  { icon: "fas fa-sync-alt", text: "Support Continu" },
  { icon: "fas fa-headset", text: "Accompagnement Personnalisé" },
];

// État du composant
const activeCategory = ref('all');
const expandedService = ref(null);
const serviceCards = ref([]);
const cardRotations = reactive({});
const particleStyles = reactive([]);
const modalService = ref(null); // État pour le service du modal

// États pour la gestion du succès et de l'animation
const showSuccessModal = ref(false);
const isSubmissionSuccessful = ref(false);

// États pour le formulaire de devis
const showQuoteForm = ref(false);
const isSubmitting = ref(false);
const quoteForm = reactive({
  name: '',
  email: '',
  phone: '',
  // company: '',
  description: '',
  options: {},
  deadline: 'flexible',
  specificDate: '',
  budget: 'unknown',
  terms: false
});

// Pré-calcul des styles de particules
for (let i = 0; i < 10; i++) {
  particleStyles.push({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    opacity: 0.1 + Math.random() * 0.5,
    transform: `scale(${0.8 + Math.random() * 0.5})`,
  });
}

// Fonction pour obtenir les options spécifiques à un service
const serviceSpecificFields = computed(() => {
  if (!modalService.value) return [];
  
  // Options spécifiques selon le type de service
  switch(modalService.value.category) {
    case 'web':
      // Vérification du titre du service pour personnaliser les options
      if (modalService.value.title === 'Site Web') { 
    return [
      { id: 'responsive', label: 'Design responsive', info: 'Adaptatif à tous les appareils' },
      { id: 'seo', label: 'Optimisation SEO avancée', info: 'Référencement naturel et technique' },
      { id: 'cms', label: 'Système de gestion de contenu', info: 'Pour mettre à jour votre site facilement' },
      { id: 'social', label: 'Intégration réseaux sociaux', info: 'Partage et boutons sociaux' },
      { id: 'analytics', label: 'Analytics et statistiques', info: 'Suivi des performances et visiteurs' },
      { id: 'contact', label: 'Formulaires avancés', info: 'Formulaires de contact personnalisés' }
    ];
  } else if (modalService.value.title === 'Portfolio personnalisé') {
        return [
          { id: 'animations', label: 'Animations avancées', info: 'Effets visuels dynamiques' },
          { id: 'projects', label: 'Section projets interactive', info: 'Présentation attractive de vos travaux' },
          { id: 'contact', label: 'Formulaire de contact personnalisé', info: 'Pour que les recruteurs puissent vous joindre' },
          { id: 'darkmode', label: 'Mode sombre/clair', info: 'Option de changement de thème' }
        ];
      } else if (modalService.value.title === 'Applications Web') {
        return [
          { id: 'responsive', label: 'Design responsive', info: 'Adaptatif à tous les appareils' },
          { id: 'seo', label: 'Optimisation SEO', info: 'Référencement naturel' },
          { id: 'analytics', label: 'Analytics et statistiques', info: 'Suivi des performances' },
          { id: 'maintenance', label: 'Maintenance mensuelle', info: 'Mises à jour et corrections' }
        ];
      } else {
        // Options par défaut pour les autres services web
        return [
          { id: 'responsive', label: 'Design responsive', info: 'Adaptatif à tous les appareils' },
          { id: 'seo', label: 'Optimisation SEO', info: 'Référencement naturel' },
          { id: 'analytics', label: 'Analytics et statistiques', info: 'Suivi des performances' },
          { id: 'maintenance', label: 'Maintenance mensuelle', info: 'Mises à jour et corrections' }
        ];
      }
    case 'mobile':
      return [
        { id: 'ios', label: 'Application iOS' },
        { id: 'android', label: 'Application Android' },
        { id: 'crossplatform', label: 'Application multiplateforme' },
        { id: 'push', label: 'Notifications push' }
      ];
    case 'backend':
      return [
        { id: 'api', label: 'API REST' },
        { id: 'graphql', label: 'API GraphQL' },
        { id: 'authentication', label: 'Système d\'authentification' },
        { id: 'databases', label: 'Optimisation des bases de données' }
      ];
    case 'ecommerce':
      return [
        { id: 'catalog', label: 'Catalogue produits' },
        { id: 'payment', label: 'Intégration paiement' },
        { id: 'stock', label: 'Gestion des stocks' },
        { id: 'shipping', label: 'Calcul des frais de livraison' }
      ];
    default:
      return [
        { id: 'custom', label: 'Besoin sur mesure' }
      ];
  }
});

// Vérification si un service doit être visible selon le filtre
const isVisible = (service) => {
  return activeCategory.value === 'all' || service.category === activeCategory.value;
};

// Style personnalisé pour chaque carte
const getCardStyle = (index) => {
  if (expandedService.value === index) {
    return {}; // Style par défaut pour la carte développée
  }
  
  return {
    transform: cardRotations[index] || 'none',
    willChange: 'transform', // Aide à l'optimisation
  };
};

// Fonction pour filtrer par catégorie
const filterCategory = (category) => {
  activeCategory.value = category;
  expandedService.value = null;
  
  // ✅ AJOUT : Tracking du filtrage (avec vérification)
  if (isGtagEnabled()) {
    trackEvent('service_filter_used', {
      label: category,
      section: 'services',
      filter_type: 'category'
    });
  }
  
  // Animation de réorganisation
  nextTick(() => {
    animateServicesLayout();
  });
};

// Fonction throttle pour limiter la fréquence d'exécution
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Ouvrir le service dans le modal
const toggleService = (index) => {
  // Définir le service sélectionné
  modalService.value = services.value[index];
  
  // ✅ AJOUT : Tracking de l'ouverture du modal service (avec vérification)
  if (isGtagEnabled()) {
    trackServiceView(services.value[index].title);
  }
  
  // Empêcher le défilement du corps
  document.body.style.overflow = 'hidden';
  // Réinitialiser l'état du formulaire
  showQuoteForm.value = false;
};

// Ajouter cette nouvelle fonction pour fermer le modal
const closeModal = () => {
  modalService.value = null;
  // Réinitialiser l'état du formulaire
  showQuoteForm.value = false;
  // Réactiver le défilement
  document.body.style.overflow = '';
};

const closeService = () => {
  expandedService.value = null;
};


// Fonction pour soumettre le formulaire de devis
const submitQuoteRequest = async () => {
  isSubmitting.value = true;
  
  try {
    // Vérifier que le service est bien défini
    if (!modalService.value || !modalService.value.title) {
      throw new Error("Information de service manquante");
    }

    // ✅ AJOUT : Tracking du début de soumission (avec vérification)
    if (isGtagEnabled()) {
      trackEvent('quote_form_start', {
        label: modalService.value.title,
        section: 'services',
        form_type: 'quote_request'
      });
    }

    // Préparation des données du formulaire - conversion des options en format compatible Firestore
    const options = {};
    Object.keys(quoteForm.options).forEach(key => {
      if (quoteForm.options[key]) {
        options[key] = true;
      }
    });
    
    const quoteData = {
      service: modalService.value.title,
      name: quoteForm.name,
      email: quoteForm.email,
      phone: quoteForm.phone || "Non fourni",
      // company: quoteForm.company || "Non fournie",
      description: quoteForm.description,
      options: options, // Objet simplifié
      deadline: quoteForm.deadline,
      specificDate: quoteForm.deadline === 'specific' ? quoteForm.specificDate : null,
      budget: quoteForm.budget,
      timestamp: new Date(),
    };
    
    console.log("Tentative d'enregistrement dans Firestore:", quoteData);
    
    // Enregistrement dans Firestore dans une collection "devis"
    const docRef = await addDoc(collection(db, 'devis'), quoteData);
    console.log("Document enregistré avec l'ID:", docRef.id);
    
    // Affichage de l'animation de confettis
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0099ff', '#8000ff', '#ff00ff'],
      zIndex: 10000
    });
    
    // Afficher le succès
    isSubmissionSuccessful.value = true;
    
    // Animation et message de succès
    const formContainer = document.querySelector('.quote-form-container');
    if (formContainer) {
      gsap.to(formContainer, {
        scale: 1.03,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          showSuccessModal.value = true;
          
          // Réinitialiser et fermer après un délai
          setTimeout(() => {
            resetQuoteForm();
            showQuoteForm.value = false;
            closeModal();
            isSubmissionSuccessful.value = false;
            showSuccessModal.value = false;
          }, 8000);
        }
      });
    }
    
    // ✅ AJOUT : Tracking de la soumission réussie (avec vérification)
    if (isGtagEnabled()) {
      trackQuoteRequest(modalService.value.title, quoteForm.budget);
      
      // ✅ AJOUT : Tracking des options sélectionnées
      const selectedOptions = Object.keys(options).filter(key => options[key]);
      if (selectedOptions.length > 0) {
        trackEvent('quote_options_selected', {
          label: modalService.value.title,
          section: 'services',
          options_count: selectedOptions.length,
          selected_options: selectedOptions.join(',')
        });
      }
    }
    
  } catch (error) {
    console.error('Erreur détaillée lors de l\'envoi du formulaire:', error);
    
    // ✅ AJOUT : Tracking des erreurs (avec vérification)
    if (isGtagEnabled()) {
      trackEvent('quote_form_error', {
        label: modalService.value?.title || 'unknown_service',
        section: 'services',
        error_type: error.code || 'unknown_error',
        error_message: error.message
      });
    }
    
    // Message d'erreur plus précis selon le type d'erreur
    if (error.code === 'permission-denied') {
      alert('Erreur d\'autorisation: Vous n\'avez pas les droits nécessaires pour effectuer cette action.');
    } else if (error.code === 'unavailable') {
      alert('Erreur de connexion: Vérifiez votre connexion internet et réessayez.');
    } else {
      alert(`Une erreur est survenue: ${error.message}. Veuillez réessayer ultérieurement.`);
    }
  } finally {
    isSubmitting.value = false;
  }
};

// Fonction pour afficher un message de succès
const showSuccessMessage = () => {
  // Vous pouvez implémenter ici votre propre logique d'affichage de message de succès
  // Par exemple avec une notification ou un toast
  alert('Votre demande de devis a bien été envoyée! Nous vous recontacterons dans les plus brefs délais.');
};

// Fonction pour réinitialiser le formulaire
const resetQuoteForm = () => {
  Object.keys(quoteForm).forEach(key => {
    if (key === 'options') {
      quoteForm.options = {};
    } else if (key === 'terms') {
      quoteForm.terms = false;
    } else {
      quoteForm[key] = '';
    }
  });
  quoteForm.deadline = 'flexible';
  quoteForm.budget = 'unknown';
};

// Réinitialiser le formulaire à la fermeture du modal
watch(modalService, (newVal) => {
  if (!newVal) {
    resetQuoteForm();
  }
});

// Fonction pour demander un service spécifique - optimisée
const requestService = (serviceTitle) => {
  // ✅ AJOUT : Tracking de la demande de service (avec vérification)
  if (isGtagEnabled()) {
    trackEvent('service_request_initiated', {
      label: serviceTitle,
      section: 'services',
      request_method: 'cta_button'
    });
  }
  
  // Stocker le service sélectionné
  localStorage.setItem('requestedService', serviceTitle);
  
  // Scroll vers la section contact
  const contactSection = document.getElementById('cta-section');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    
    // Animation allégée
    gsap.to('.cta-content', {
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      duration: 0.4,
      repeat: 1,
      yoyo: true
    });
    
    // Utiliser requestAnimationFrame pour être synchronisé avec le cycle de rendu
    if (window.openContactModal) {
      requestAnimationFrame(() => {
        setTimeout(() => window.openContactModal(serviceTitle), 800);
      });
    }
  }
  
  console.log(`Service requested: ${serviceTitle}`);
};

// Scroll vers la section contact
const scrollToContact = () => {
  // ✅ AJOUT : Tracking du scroll vers contact (avec vérification)
  if (isGtagEnabled()) {
    trackEvent('contact_section_accessed', {
      label: 'services_cta_button',
      section: 'services',
      action_type: 'scroll_to_contact'
    });
  }
  
  const contactSection = document.getElementById('cta-section');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Gestion optimisée des effets 3D
const handleMouseMove = throttle((card, e) => {
  if (expandedService.value !== null) return;
  
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 30; // Réduit l'angle pour moins de calculs
  const rotateY = -(x - centerX) / 30;
  
  const index = card.dataset.index;
  cardRotations[index] = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}, 30); // Limite à 30ms entre les appels

const handleMouseLeave = (card) => {
  const index = card.dataset.index;
  gsap.to(card, {
    rotationX: 0,
    rotationY: 0,
    duration: 0.5,
    clearProps: 'all' // Important pour nettoyer les styles après l'animation
  });
  cardRotations[index] = 'none';
};

// Variables pour le nettoyage
let observers = [];
let eventListeners = [];
let animations = [];

onMounted(async () => {
  await nextTick();
  
  // Utilisation d'IntersectionObserver pour les animations basées sur le scroll
  const animateOnScroll = (elements, animProps) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target, 
            { opacity: 0, y: 20 }, 
            { 
              ...animProps,
              opacity: 1,
              y: 0,
              duration: 0.6,
              clearProps: 'all'
            }
          );
          observer.unobserve(entry.target); // Ne déclenche qu'une fois
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
    observers.push(observer);
  };
  
  // Animation du titre plus légère
  animateOnScroll([document.querySelector('.services-section h1')], {});
  
  // Animation des filtres plus légère
  animateOnScroll(document.querySelectorAll('.filter-button'), { stagger: 0.05 });
  
  // Animation des cartes plus légère
  animateOnScroll(document.querySelectorAll('.service-card'), { stagger: 0.05 });
  
  // Animation des indicateurs plus légère
  animateOnScroll(document.querySelectorAll('.indicator-item'), { stagger: 0.05 });
  
  // Animation du bouton CTA plus légère
  animateOnScroll([document.querySelector('.services-cta-button')], { scale: 0.9 });
  
  // Animation des particules moins gourmande (en utilisant transform plutôt que left/top)
  document.querySelectorAll('.particle').forEach((particle, i) => {
    const anim = gsap.to(particle, {
      x: `+=${Math.random() * 100 - 50}`,
      y: `+=${Math.random() * 100 - 50}`,
      duration: 10 + Math.random() * 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    animations.push(anim);
  });
  
  // Effet 3D optimisé
  serviceCards.value.forEach((card, index) => {
    card.dataset.index = index;
    
    // Utilise les événements passifs pour améliorer les performances
    const moveHandler = (e) => handleMouseMove(card, e);
    const leaveHandler = () => handleMouseLeave(card);
    
    card.addEventListener('mousemove', moveHandler, { passive: true });
    card.addEventListener('mouseleave', leaveHandler, { passive: true });
    
    eventListeners.push({ 
      element: card, 
      event: 'mousemove', 
      handler: moveHandler
    });
    
    eventListeners.push({ 
      element: card, 
      event: 'mouseleave', 
      handler: leaveHandler
    });
  });

  // Exposer la méthode pour ouvrir le modal depuis d'autres composants
  if (typeof window !== 'undefined') {
    window.requestServiceQuote = requestService;
  }
});

// Nettoyage propre lors du démontage du composant
onUnmounted(() => {
  // Nettoyer les observateurs
  observers.forEach(observer => observer.disconnect());
  
  // Nettoyer les écouteurs d'événements
  eventListeners.forEach(({ element, event, handler }) => {
    element.removeEventListener(event, handler);
  });
  
  // Nettoyer les animations GSAP
  animations.forEach(anim => anim.kill());
  
  // Nettoyer les timelines et tweens GSAP
  gsap.killTweensOf('.services-section *');
});
</script>

<style scoped>
.services-section {
  position: relative;
  padding: 10rem 2rem 4rem; /* ✅ Changé : 6rem en haut au lieu de 4rem */
  margin: 8rem 0 6rem; /* ✅ Changé : 8rem en haut au lieu de 6rem */
  overflow: hidden;
  z-index: 2;
  contain: layout paint;
}

/* Filtres de catégories */
.filter-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.filter-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 500;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  /* Retire le backdrop-filter pour améliorer les performances */
}

.filter-button:hover, .filter-button.active {
  background: rgba(96, 165, 250, 0.2);
  border-color: rgba(96, 165, 250, 0.5);
  color: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.filter-button i {
  font-size: 1rem;
}

/* Grille de services */

/* Desktop par défaut - 3 colonnes (déjà défini) */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 0 auto;
  max-width: 1400px;
  contain: layout;
}

/* Tablette paysage - 2 colonnes */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 1.8rem;
  }
}

/* Tablette portrait et mobile - 1 colonne */
@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr !important;
    gap: 1.5rem;
    padding: 0 0.5rem;
  }
}

/* Très petit mobile - optimisations supplémentaires */
@media (max-width: 480px) {
  .services-grid {
    grid-template-columns: 1fr !important;
    gap: 1.2rem;
    padding: 0 1rem;
  }
}

/* Carte de service */
.service-card {
  position: relative;
  height: 280px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  will-change: transform, height; /* Aide le navigateur à optimiser */
  transform: translateZ(0); /* Force l'accélération GPU */
  contain: content; /* Optimisation de contenu */
}

.service-card.expanded {
  height: auto;  /* Hauteur adaptative plutôt que fixe */
  min-height: 280px;
  max-height: 720px;
  z-index: 10;
  contain: none; /* Désactiver containment pour la carte développée */
}

.service-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.service-front, .service-back {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.08);
  /* Applique backdrop-filter uniquement sur desktop pour des performances optimales */
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Conditionnellement appliquer backdrop-filter */
@media (min-width: 768px) {
  .service-front, .service-back {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}

.service-back {
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
  overflow-y: visible; /* Évite les scrollbars */
}

.loading-content {
  visibility: hidden; /* Cache le contenu pour éviter les rendus inutiles */
}

.service-card.expanded .service-front {
  opacity: 0;
  transform: translateY(-20px);
  pointer-events: none;
}

.service-card.expanded .service-back {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  visibility: visible;
}

/* Contenu des cartes - styles optimisés */
.service-icon-container {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.8), rgba(59, 130, 246, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  transform: translateZ(0); /* Force l'accélération GPU */
}

.service-badges {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.popular-badge {
  background: rgba(245, 158, 11, 0.2);
  color: rgba(245, 158, 11, 0.9);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.expert-badge {
  background: rgba(59, 130, 246, 0.2);
  color: rgba(59, 130, 246, 0.9);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.service-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  /* Utiliser color standard pour moins de charge GPU */
  color: #ffffff;
  text-shadow: 0 0 15px rgba(96, 165, 250, 0.5);
}

.service-summary {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  flex-grow: 1;
}

.service-description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  line-height: 1.6;
}

/* Éléments de satisfaction client */
.service-satisfaction {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.7rem;
  padding: 0.3rem 0;
}

.satisfaction-stars {
  color: #fbbf24;
  font-size: 0.9rem;
}

.satisfaction-rate {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Optimisations des éléments de service */
.service-offers {
  margin-bottom: 1rem;
}

.service-offer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.service-offer i {
  color: #3b82f6;
  font-size: 0.85rem;
}

.service-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
  margin-bottom: 1rem;
}

.tech-badge {
  padding: 0.25rem 0.6rem;
  background: rgba(96, 165, 250, 0.15);
  color: rgba(96, 165, 250, 0.9);
  border-radius: 12px;
  font-size: 0.75rem;
  animation: fadeInUp 0.5s ease both;
  animation-delay: calc(0.05s * var(--i)); /* Réduit le délai */
}

/* Bouton de demande de service - optimisé */
.service-action {
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.service-request-button {
  padding: 0.8rem 1.2rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(29, 78, 216, 0.3);
  width: 100%;
  transform: translateZ(0); /* Accélération GPU */
}

/* Simplifie l'effet de vague pour moins de calculs */
.service-request-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s ease;
}

.service-request-button:hover::before {
  left: 100%;
}

.service-request-button:hover {
  transform: translateY(-3px) translateZ(0);
  box-shadow: 0 7px 20px rgba(29, 78, 216, 0.5);
}

/* Indicateurs de qualité - styles complets */
.quality-indicator {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 4rem auto 2rem;
  max-width: 1200px;
}

.indicator-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  transition: all 0.3s ease;
  transform: translateZ(0);
}

.indicator-item i {
  font-size: 1.3rem;
  color: #3b82f6;
}

.indicator-item:hover {
  background: rgba(96, 165, 250, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Section CTA - styles complets */
.services-cta {
  text-align: center;
  margin: 3rem auto;
  max-width: 800px;
}

.services-cta-button {
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50px;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: 0 8px 25px rgba(29, 78, 216, 0.4);
  transition: all 0.3s ease;
  border: none;
  transform: translateZ(0);
  cursor: pointer;
}

.services-cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(29, 78, 216, 0.6);
}

.services-cta-button i {
  font-size: 1.2rem;
}

.services-guarantee {
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  font-style: italic;
}

/* Particules décoratives optimisées */
.services-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  contain: strict; /* Contient strictement pour de meilleures performances */
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(96, 165, 250, 0.3);
  filter: blur(1px);
  will-change: transform; /* Aide à l'optimisation */
  transform: translateZ(0); /* Force l'accélération GPU */
}

/* Réduire la complexité des animations keyframes */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Bouton découvrir amélioré */
.service-discover-btn {
  margin-top: auto;
  width: 100%;
  padding: 0.8rem 0;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(37, 99, 235, 0.3));
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transform: translateZ(0);
}

.service-discover-btn:hover {
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.4), rgba(37, 99, 235, 0.5));
  box-shadow: 0 5px 15px rgba(37, 99, 235, 0.4);
  transform: translateY(-2px);
}

.service-discover-btn:active {
  transform: translateY(0);
}

.btn-text {
  position: relative;
  z-index: 2;
}

.btn-icon {
  position: relative;
  z-index: 2;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.service-discover-btn:hover .btn-icon {
  transform: translateX(4px);
  opacity: 1;
}

.btn-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(45deg);
  animation: btn-shine-idle 3s infinite;
}

.service-discover-btn:hover .btn-shine {
  animation: btn-shine-hover 1.5s infinite;
}

@keyframes btn-shine-idle {
  0% {
    left: -100%;
    top: -100%;
  }
  100% {
    left: 100%;
    top: 100%;
  }
}

@keyframes btn-shine-hover {
  0% {
    left: -100%;
    top: -100%;
  }
  100% {
    left: 100%;
    top: 100%;
  }
}

/* Animation de pulsation pour attirer l'attention */
.service-card:nth-child(3n+1) .service-discover-btn {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(96, 165, 250, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(96, 165, 250, 0);
  }
}

/* Modal - styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  background: rgba(17, 25, 40, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow-y: auto;
  padding: 0;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  color: white;
  position: relative;
  animation: modalAppear 0.3s forwards ease-out;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.modal-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(59, 130, 246, 0.1);
}

.modal-icon-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.8), rgba(59, 130, 246, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-right: 1rem;
  color: white;
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.modal-body {
  padding: 2rem;
}

.modal-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.modal-satisfaction {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.satisfaction-stars {
  color: #fbbf24;
  font-size: 1.1rem;
}

.satisfaction-rate {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.modal-section {
  margin-bottom: 2rem;
}

.modal-section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(96, 165, 250, 0.9);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.modal-offers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.modal-offer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.modal-offer i {
  color: #3b82f6;
}

.technologies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  list-style: none;
  padding: 0;
}

.technologies-list li {
  background: rgba(20, 129, 219, 0.3);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 500;
}

.modal-timeframe {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.modal-timeframe i {
  color: #3b82f6;
}

.modal-cta {
  margin-top: 3rem;
  text-align: center;
}

/* Styles du bouton CTA amélioré */
.modal-cta-button {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #22c55e, #15803d);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(21, 128, 61, 0.4);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.modal-cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(21, 128, 61, 0.6);
}

.cta-main {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.1rem;
}

.cta-secondary {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Animation d'apparition du modal */
@keyframes modalAppear {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive Design optimisé */
@media (max-width: 768px) {
  .services-section {
    padding: 2rem 1rem;
    margin: 3rem 0;
  }
  
  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .filter-button {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .quality-indicator {
    flex-direction: column;
    gap: 1rem;
    margin: 2rem auto;
  }
  
  /* Hauteur adaptive au lieu de fixe */
  .service-card.expanded {
    min-height: 450px;
    height: auto;
    max-height: none;
  }
}

/* Modal - styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  background: rgba(17, 25, 40, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow-y: auto;
  padding: 0;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  color: white;
  position: relative;
  animation: modalAppear 0.3s forwards ease-out;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.modal-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(59, 130, 246, 0.1);
}

.modal-icon-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.8), rgba(59, 130, 246, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-right: 1rem;
  color: white;
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.modal-body {
  padding: 2rem;
}

.modal-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.modal-satisfaction {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.satisfaction-stars {
  color: #fbbf24;
  font-size: 1.1rem;
}

.satisfaction-rate {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.modal-section {
  margin-bottom: 2rem;
}

.modal-section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(96, 165, 250, 0.9);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.modal-offers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.modal-offer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.modal-offer i {
  color: #3b82f6;
}

.technologies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  list-style: none;
  padding: 0;
}

.technologies-list li {
  background: rgba(20, 129, 219, 0.3);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 500;
}

.modal-timeframe {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.modal-timeframe i {
  color: #3b82f6;
}

.modal-cta {
  margin-top: 3rem;
  text-align: center;
}

/* Styles du bouton CTA amélioré */
.modal-cta-button {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #22c55e, #15803d);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(21, 128, 61, 0.4);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.modal-cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(21, 128, 61, 0.6);
}

.cta-main {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.1rem;
}

.cta-secondary {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Animation d'apparition du modal */
@keyframes modalAppear {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive Design optimisé */
@media (max-width: 768px) {
  .services-section {
    padding: 2rem 1rem;
    margin: 3rem 0;
  }
  
  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .filter-button {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .quality-indicator {
    flex-direction: column;
    gap: 1rem;
    margin: 2rem auto;
  }
  
  /* Hauteur adaptive au lieu de fixe */
  .service-card.expanded {
    min-height: 450px;
    height: auto;
    max-height: none;
  }
}

/* Modal - styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  background: rgba(17, 25, 40, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow-y: auto;
  padding: 0;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  color: white;
  position: relative;
  animation: modalAppear 0.3s forwards ease-out;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.modal-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(59, 130, 246, 0.1);
}

.modal-icon-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.8), rgba(59, 130, 246, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-right: 1rem;
  color: white;
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.modal-body {
  padding: 2rem;
}

.modal-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.modal-satisfaction {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.satisfaction-stars {
  color: #fbbf24;
  font-size: 1.1rem;
}

.satisfaction-rate {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.modal-section {
  margin-bottom: 2rem;
}

.modal-section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(96, 165, 250, 0.9);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.modal-offers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.modal-offer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.modal-offer i {
  color: #3b82f6;
}

.technologies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  list-style: none;
  padding: 0;
}

.technologies-list li {
  background: rgba(20, 129, 219, 0.3);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 500;
}

.modal-timeframe {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.modal-timeframe i {
  color: #3b82f6;
}

.modal-cta {
  margin-top: 3rem;
  text-align: center;
}

/* Styles du bouton CTA amélioré */
.modal-cta-button {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #22c55e, #15803d);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(21, 128, 61, 0.4);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.modal-cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(21, 128, 61, 0.6);
}

.cta-main {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.1rem;
}

.cta-secondary {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Animation d'apparition du modal */
@keyframes modalAppear {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive Design optimisé */
@media (max-width: 768px) {
  .services-section {
    padding: 2rem 1rem;
    margin: 3rem 0;
  }
  
  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .filter-button {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .quality-indicator {
    flex-direction: column;
    gap: 1rem;
    margin: 2rem auto;
  }
  
  /* Hauteur adaptive au lieu de fixe */
  .service-card.expanded {
    min-height: 450px;
    height: auto;
    max-height: none;
  }
}

/* Modal - styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  background: rgba(17, 25, 40, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow-y: auto;
  padding: 0;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  color: white;
  position: relative;
  animation: modalAppear 0.3s forwards ease-out;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.modal-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(59, 130, 246, 0.1);
}

.modal-icon-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.8), rgba(59, 130, 246, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-right: 1rem;
  color: white;
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.modal-body {
  padding: 2rem;
}

.modal-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.modal-satisfaction {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.satisfaction-stars {
  color: #fbbf24;
  font-size: 1.1rem;
}

.satisfaction-rate {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.modal-section {
  margin-bottom: 2rem;
}

.modal-section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(96, 165, 250, 0.9);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.modal-offers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.modal-offer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.modal-offer i {
  color: #3b82f6;
}

.technologies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  list-style: none;
  padding: 0;
}

.technologies-list li {
  background: rgba(20, 129, 219, 0.3);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 500;
}

.modal-timeframe {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.modal-timeframe i {
  color: #3b82f6;
}

.modal-cta {
  margin-top: 3rem;
  text-align: center;
}

/* Styles du bouton CTA amélioré */
.modal-cta-button {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #22c55e, #15803d);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(21, 128, 61, 0.4);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.modal-cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(21, 128, 61, 0.6);
}

.cta-main {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.1rem;
}

.cta-secondary {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Animation d'apparition du modal */
@keyframes modalAppear {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive Design optimisé */
@media (max-width: 768px) {
  .services-section {
    padding: 2rem 1rem;
    margin: 3rem 0;
  }
  
  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .filter-button {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .quality-indicator {
    flex-direction: column;
    gap: 1rem;
    margin: 2rem auto;
  }
  
  /* Hauteur adaptive au lieu de fixe */
  .service-card.expanded {
    min-height: 450px;
    height: auto;
    max-height: none;
  }
}

/* Modal - styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  background: rgba(17, 25, 40, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow-y: auto;
  padding: 0;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  color: white;
  position: relative;
  animation: modalAppear 0.3s forwards ease-out;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.modal-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(59, 130, 246, 0.1);
}

.modal-icon-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.8), rgba(59, 130, 246, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-right: 1rem;
  color: white;
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.modal-body {
  padding: 2rem;
}

.modal-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.modal-satisfaction {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.satisfaction-stars {
  color: #fbbf24;
  font-size: 1.1rem;
}

.satisfaction-rate {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.modal-section {
  margin-bottom: 2rem;
}

.modal-section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(96, 165, 250, 0.9);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.modal-offers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.modal-offer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.modal-offer i {
  color: #3b82f6;
}

.technologies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  list-style: none;
  padding: 0;
}

.technologies-list li {
  background: rgba(20, 129, 219, 0.3);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 500;
}

.modal-timeframe {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.modal-timeframe i {
  color: #3b82f6;
}

.modal-cta {
  margin-top: 3rem;
  text-align: center;
}

/* Styles du bouton CTA amélioré */
.modal-cta-button {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #22c55e, #15803d);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(21, 128, 61, 0.4);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.modal-cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(21, 128, 61, 0.6);
}

.cta-main {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.1rem;
}

.cta-secondary {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Animation d'apparition du modal */
@keyframes modalAppear {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive Design optimisé */
@media (max-width: 768px) {
  .services-section {
    padding: 2rem 1rem;
    margin: 3rem 0;
  }
  
  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .filter-button {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .quality-indicator {
    flex-direction: column;
    gap: 1rem;
    margin: 2rem auto;
  }
  
  /* Hauteur adaptive au lieu de fixe */
  .service-card.expanded {
    min-height: 450px;
    height: auto;
    max-height: none;
  }
}

/* Modal - styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  background: rgba(17, 25, 40, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow-y: auto;
  padding: 0;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  color: white;
  position: relative;
  animation: modalAppear 0.3s forwards ease-out;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.modal-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(59, 130, 246, 0.1);
}

.modal-icon-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.8), rgba(59, 130, 246, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-right: 1rem;
  color: white;
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.modal-body {
  padding: 2rem;
}

.modal-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.modal-satisfaction {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.satisfaction-stars {
  color: #fbbf24;
  font-size: 1.1rem;
}

.satisfaction-rate {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.modal-section {
  margin-bottom: 2rem;
}

.modal-section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(96, 165, 250, 0.9);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.modal-offers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.modal-offer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.modal-offer i {
  color: #3b82f6;
}

.technologies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  list-style: none;
  padding: 0;
}

.technologies-list li {
  background: rgba(20, 129, 219, 0.3);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 500;
}

.modal-timeframe {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.modal-timeframe i {
  color: #3b82f6;
}

.modal-cta {
  margin-top: 3rem;
  text-align: center;
}

/* Styles du bouton CTA amélioré */
.modal-cta-button {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #22c55e, #15803d);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(21, 128, 61, 0.4);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.modal-cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(21, 128, 61, 0.6);
}

.cta-main {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.1rem;
}

.cta-secondary {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Animation d'apparition du modal */
@keyframes modalAppear {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Styles améliorés pour le formulaire de devis */
.quote-form-container {
  animation: fadeScale 0.5s ease-out forwards;
  border-radius: 12px;
  background: linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8));
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

@keyframes fadeScale {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

.form-header {
  background: linear-gradient(90deg, rgba(29, 78, 216, 0.2), rgba(37, 99, 235, 0.1));
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid rgba(96, 165, 250, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.form-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.form-header h3 i {
  color: #3b82f6;
  font-size: 1.3rem;
  filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5));
}

.back-to-details {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.back-to-details:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-3px);
}

.quote-form {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.form-group {
  flex: 1;
  position: relative;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.3px;
}

input[type="text"],
input[type="email"],
input[type="tel"],
textarea,
select {
  width: 100%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 0.9rem 1.1rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) inset;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  padding-right: 2.5rem;
  cursor: pointer;
}

input[type="text"]:hover,
input[type="email"]:hover,
input[type="tel"]:hover,
textarea:hover,
select:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  background-color: rgba(255, 255, 255, 0.12);
}

textarea {
  min-height: 120px;
  resize: vertical;
  line-height: 1.6;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  padding-right: 2.5rem;
}

.date-input {
  margin-top: 0.8rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 0.8rem 1rem;
  color: white;
  width: 100%;
}

.service-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1rem;
  margin-top: 0.5rem;
}

.option-checkbox {
  position: relative;
  padding-left: 2.5rem;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
}

.option-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.option-checkbox label {
  cursor: pointer;
  font-weight: 400;
  margin: 0;
  padding: 0.3rem 0;
}

.option-checkbox label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1.2rem;
  height: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.option-checkbox input:checked + label:before {
  background: #3b82f6;
  border-color: #3b82f6;
}

.option-checkbox input:checked + label:after {
  content: '';
  position: absolute;
  left: 0.4rem;
  top: calc(50% - 0.4rem);
  width: 0.4rem;
  height: 0.8rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.option-info {
  margin-left: 0.5rem;
  color: #60a5fa;
  cursor: help;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
  margin-top: 1rem;
  background: rgba(59, 130, 246, 0.1);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.checkbox-group input[type="checkbox"] {
  margin-top: 0.2rem;
  margin-right: 0.8rem;
  width: 1.2rem;
  height: 1.2rem;
  accent-color: #3b82f6;
}

.form-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.submit-quote-btn {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(29, 78, 216, 0.4);
  position: relative;
  overflow: hidden;
}

.submit-quote-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(29, 78, 216, 0.6);
}

.submit-quote-btn:active {
  transform: translateY(-1px);
}

.submit-quote-btn:before {
  content: '';
  position: absolute;
   width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: rotate 1s infinite linear;
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}

.submit-quote-btn.submitting {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  position: relative;
  color: transparent;
}

.submit-quote-btn.submitting::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s infinite linear;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.form-notice {
  text-align: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.form-notice i {
  color: #22c55e;
  font-size: 1rem;
}

/* Responsive design pour le formulaire */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .service-options {
    grid-template-columns: 1fr;
  }
  
  .form-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .back-to-details {
    width: 100%;
    justify-content: center;
  }
}

/* Style pour les options des sélecteurs */
select option {
  background-color: #1e293b;
  color: white;
  padding: 10px;
  font-size: 1rem;
}

/* Améliorations spécifiques pour les select de délai et budget */
#deadline, #budget {
  font-weight: 500;
  position: relative;
  z-index: 2;
}

/* Message de sélection par défaut avec couleur distinctive */
select:required:invalid {
  color: rgba(255, 255, 255, 0.6);
}

/* Style spécifique pour les groupes de ces éléments */
.form-group.full-width {
  margin-bottom: 0.5rem;
}


/* Ajout d'un indicateur visuel pour les sélecteurs */
.form-group.full-width label::after {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: rgba(59, 130, 246, 0.5);
  border-radius: 50%;
  margin-left: 8px;
  vertical-align: middle;
}

/* Styles pour les éléments sur la même ligne pour le délai spécifique */
.date-input-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

/* Animation de reflet pour le bouton CTA */
.cta-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-20deg);
  animation: ctaShineAnimation 3s infinite;
}

/* Version améliorée avec effet de pulsation */
.modal-cta-button {
  position: relative;
  overflow: hidden;
  animation: ctaPulse 2s infinite;
}

/* Animation du reflet qui traverse le bouton */
@keyframes ctaShineAnimation {
  0% {
    left: -100%;
    opacity: 0.5;
  }
  20% {
    left: -100%;
    opacity: 0.5;
  }
  80% {
    left: 100%;
    opacity: 0.9;
  }
  100% {
    left: 100%;
    opacity: 0.5;
  }
}

/* Animation de pulsation subtile */
@keyframes ctaPulse {
  0% {
    box-shadow: 0 8px 25px rgba(21, 128, 61, 0.4);
  }
  50% {
    box-shadow: 0 12px 30px rgba(21, 128, 61, 0.7);
  }
  100% {
    box-shadow: 0 8px 25px rgba(21, 128, 61, 0.4);
  }
}

/* Effet au survol pour intensifier l'animation */
.modal-cta-button:hover .cta-shine {
  animation: ctaShineAnimationHover 1.5s infinite;
}

@keyframes ctaShineAnimationHover {
  0% {
    left: -100%;
    opacity: 0.7;
  }
  100% {
    left: 100%;
    opacity: 1;
  }
}

/* Styles pour le message de succès */
.success-message-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  animation: fadeIn 0.5s ease forwards;
  border-radius: 12px;
}

.success-message {
  text-align: center;
  padding: 2rem;
  max-width: 80%;
}

.success-icon {
  font-size: 4rem;
  color: #22c55e;
  margin-bottom: 1.5rem;
  animation: bounceIn 0.8s ease;
}

.success-message h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  animation: slideUpFade 0.6s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
  transform: translateY(20px);
}

.success-message p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  animation: slideUpFade 0.6s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
  transform: translateY(20px);
}

.contact-timing {
  font-weight: 600;
  color: #3b82f6 !important;
  margin-top: 1rem;
  animation-delay: 0.6s !important;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bounceIn {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.2); }
  80% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
