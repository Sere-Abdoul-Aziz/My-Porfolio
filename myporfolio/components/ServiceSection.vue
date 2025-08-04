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
      <!-- Cartes de service -->
      <div 
        v-for="(service, index) in filteredServices" 
        :key="index"
        class="service-card"
        :class="{ expanded: expandedService === index }"
        @click="toggleService(index)"
        ref="serviceCards"
      >
        <div class="service-inner">
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
            <div class="service-explore">
              <span>Explorer</span>
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
          
          <!-- Face arrière (détails) -->
          <div class="service-back">
            <h3 class="service-title">{{ service.title }}</h3>
            <div class="service-description">{{ service.description }}</div>
            
            <!-- Satisfaction client -->
            <div v-if="service.satisfaction" class="service-satisfaction">
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
    
    <!-- Indicateur de qualité -->
    <div class="quality-indicator">
      <div class="indicator-item">
        <i class="fas fa-rocket"></i>
        <span>Livraison Rapide</span>
      </div>
      <div class="indicator-item">
        <i class="fas fa-shield-alt"></i>
        <span>Code Sécurisé</span>
      </div>
      <div class="indicator-item">
        <i class="fas fa-sync-alt"></i>
        <span>Support Continu</span>
      </div>
      <div class="indicator-item">
        <i class="fas fa-headset"></i>
        <span>Accompagnement Personnalisé</span>
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
    
    <!-- Particules de fond décoratives -->
    <div class="services-particles">
      <div v-for="i in 20" :key="i" :class="`particle particle-${i}`"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Services data
const services = ref([
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

// État du composant
const activeCategory = ref('all');
const expandedService = ref(null);
const serviceCards = ref([]);

// Filtrage des services par catégorie
const filteredServices = computed(() => {
  if (activeCategory.value === 'all') {
    return services.value;
  }
  return services.value.filter(service => service.category === activeCategory.value);
});

// Fonction pour filtrer par catégorie
const filterCategory = (category) => {
  activeCategory.value = category;
  expandedService.value = null; // Fermer le service développé lors du changement de filtre
  
  // Animation de réorganisation
  nextTick(() => {
    animateServicesLayout();
  });
};

// Ouvrir/fermer un service
const toggleService = (index) => {
  if (expandedService.value === index) {
    expandedService.value = null;
  } else {
    expandedService.value = index;
  }
};

const closeService = () => {
  expandedService.value = null;
};

// Fonction pour demander un service spécifique
const requestService = (serviceTitle) => {
  // Stocker le service sélectionné pour le récupérer dans le formulaire de contact
  localStorage.setItem('requestedService', serviceTitle);
  
  // Scroll vers la section contact
  const contactSection = document.getElementById('cta-section');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    
    // Animation pour attirer l'attention sur le CTA
    gsap.to('.cta-content', {
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      padding: '2rem',
      borderRadius: '15px',
      duration: 0.5,
      repeat: 1,
      yoyo: true,
      ease: 'power1.inOut'
    });
    
    // Déclencher l'ouverture du modal de contact si disponible
    setTimeout(() => {
      if (window.openContactModal) {
        window.openContactModal(serviceTitle);
      }
    }, 800);
  }
  
  // Tracking de l'événement (pourrait être connecté à un outil d'analytics)
  console.log(`Service requested: ${serviceTitle}`);
};

// Animation des cartes lors de la réorganisation
const animateServicesLayout = () => {
  gsap.from('.service-card', {
    opacity: 0,
    y: 30,
    scale: 0.9,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out',
  });
};

// Scroll vers la section contact
const scrollToContact = () => {
  const contactSection = document.getElementById('cta-section');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Exposer la méthode pour ouvrir le modal depuis d'autres composants
if (typeof window !== 'undefined') {
  window.requestServiceQuote = requestService;
}

// Animations au chargement
onMounted(async () => {
  await nextTick();
  
  // Animation des particules de fond
  const particles = document.querySelectorAll('.particle');
  particles.forEach(particle => {
    gsap.set(particle, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: Math.random() * 0.5 + 0.1
    });
    
    gsap.to(particle, {
      x: `+=${Math.random() * 200 - 100}`,
      y: `+=${Math.random() * 200 - 100}`,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 10 + 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  // Animation du titre
  gsap.from('.services-section h1', {
    opacity: 0,
    y: -30,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.services-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
  
  // Animation des filtres
  gsap.from('.filter-button', {
    opacity: 0,
    y: -20,
    stagger: 0.1,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 0.2,
    scrollTrigger: {
      trigger: '.services-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Animation des cartes de service
  gsap.from('.service-card', {
    opacity: 0,
    scale: 0.8,
    y: 50,
    stagger: 0.1,
    duration: 0.8,
    ease: 'back.out(1.4)',
    delay: 0.5,
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
  
  // Animation des indicateurs de qualité
  gsap.from('.indicator-item', {
    opacity: 0,
    x: -30,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.quality-indicator',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
  
  // Animation du bouton CTA
  gsap.from('.services-cta-button', {
    opacity: 0,
    scale: 0.5,
    duration: 1,
    ease: 'elastic.out(1, 0.5)',
    delay: 1,
    scrollTrigger: {
      trigger: '.services-cta',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });

  // Effet de perspective 3D sur hover des cartes
  serviceCards.value.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (expandedService.value !== null) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = -(x - centerX) / 20;
      
      gsap.to(card.querySelector('.service-inner'), {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: 'power1.out',
        transformPerspective: 1000,
        transformOrigin: 'center center'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card.querySelector('.service-inner'), {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
});
</script>

<style scoped>
.services-section {
  position: relative;
  padding: 4rem 2rem;
  margin: 6rem 0;
  overflow: hidden;
  z-index: 2;
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
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
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
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 0 auto;
  max-width: 1400px;
}

/* Carte de service */
.service-card {
  position: relative;
  height: 280px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.5s ease, height 0.5s ease;
  perspective: 1000px;
}

.service-card.expanded {
  height: 520px;  /* Increased height to fit new content */
  z-index: 10;
}

.service-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

.service-front, .service-back {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease;
}

.service-back {
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
  overflow-y: auto;
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
}

/* Contenu des cartes */
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
  background: linear-gradient(90deg, #ffffff, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.service-summary {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  flex-grow: 1;
}

.service-explore {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: rgba(96, 165, 250, 0.9);
  margin-top: auto;
}

.service-explore i {
  transition: transform 0.3s ease;
}

.service-card:hover .service-explore i {
  transform: translateY(3px);
}

.service-description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

/* Éléments de satisfaction client */
.service-satisfaction {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
}

.satisfaction-stars {
  color: #fbbf24;
  font-size: 0.9rem;
}

.satisfaction-rate {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.service-offers {
  margin-bottom: 1.5rem;
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
  animation-delay: calc(0.1s * var(--i));
}

/* Bouton de demande de service */
.service-action {
  margin-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
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
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(29, 78, 216, 0.3);
  width: 100%;
}

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
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(29, 78, 216, 0.5);
}

.service-availability {
  display: flex;
  justify-content: center;
  font-size: 0.85rem;
}

.availability-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: rgba(147, 197, 253, 0.9);
  font-weight: 500;
  font-style: italic;
}

.availability-badge i {
  font-size: 0.8rem;
}

.service-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
}

.service-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

/* Indicateurs de qualité */
.quality-indicator {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 4rem auto;
  max-width: 900px;
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
}

.indicator-item i {
  font-size: 1.3rem;
  color: #3b82f6;
}

.indicator-item:hover {
  background: rgba(96, 165, 250, 0.1);
  transform: translateY(-3px);
}

/* CTA Button */
.services-cta {
  text-align: center;
  margin-top: 3rem;
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

/* Particules décoratives */
.services-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(96, 165, 250, 0.3);
  filter: blur(1px);
  opacity: 0.3;
}

.particle:nth-child(3n) {
  background: rgba(59, 130, 246, 0.3);
  width: 8px;
  height: 8px;
}

.particle:nth-child(4n) {
  background: rgba(147, 197, 253, 0.3);
  width: 4px;
  height: 4px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
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
  
  .service-card.expanded {
    height: 450px;
  }
}

@media (max-width: 480px) {
  .filter-container {
    gap: 0.5rem;
  }
  
  .filter-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }
  
  .filter-button i {
    font-size: 0.9rem;
  }
  
  .services-cta-button {
    padding: 0.8rem 1.8rem;
    font-size: 1rem;
  }
  
  .service-icon-container {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .service-card.expanded {
    height: 520px;
  }
}

/* Effet 3D amélioré pour les cartes */
.service-card:hover:not(.expanded) {
  transform: translateY(-10px);
}

.service-card:hover:not(.expanded) .service-inner {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}
</style>