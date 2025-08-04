<template>
  <div id="experience-section" class="experience-section">
    <h1 class="experience-header text-gray-200 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-center mb-12">
      EXPÉRIENCE <span class="text-primary text-blue-400">PROFESSIONNELLE</span>
    </h1>
    
    <div class="experience-timeline">
      <div v-for="(experience, index) in experiences" :key="index" 
           class="experience-card" 
           :class="{ 'active': expandedExperience === index }"
           :id="`experience-card-${index}`">
        
        <div class="experience-header-row" @click="toggleExperience(index)">
          <div>
            <h3 class="experience-title">{{ experience.title }}</h3>
            <p class="experience-company">
              {{ experience.company }}
              <span v-if="experience.location" class="experience-location">
                <i class="fas fa-map-marker-alt location-icon"></i> 
                {{ experience.location }}
              </span>
            </p>
          </div>
          <button class="toggle-btn">
            <i :class="expandedExperience === index ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
          </button>
        </div>
        
        <div class="experience-content" :class="{ 'expanded': expandedExperience === index }">
          <div class="experience-description">
            <p v-for="(item, i) in experience.description" :key="i">{{ item }}</p>
          </div>
          
          <div class="experience-tags" v-if="experience.tags && experience.tags.length">
            <span v-for="(tag, i) in experience.tags" :key="i" class="experience-tag" :style="{'--i': i}">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// État pour suivre quelle expérience est développée
const expandedExperience = ref(null);

// Liste des expériences professionnelles
const experiences = ref([
  {
    title: "Développement Web, Applications Web et mobile | Webmaster",
    company: "Jo'Fé Digital",
    period: "2022-2024",
    duration: "2 ans",
    description: [
      "Développement d'applications web et mobiles avec des technologies modernes (Vue.js, React, Flutter)",
      "Gestion et maintenance de sites web pour diverses entreprises et clients",
      "Optimisation des performances, SEO et amélioration de l'expérience utilisateur",
      "Collaboration en équipe agile, suivi des projets clients et respect des délais",
      "Intégration d'APIs, gestion de bases de données et déploiement d'applications"
    ],
    tags: ["Vue.js", "React", "Flutter", "SEO", "APIs"]
  },
  {
    title: "Développeur Logiciel",
    company: "Innorizon",
    location: "Sousse, Tunisie",
    period: "2021-2022",
    duration: "1 an",
    description: [
      "Conception et développement d'un module SaaS complet pour la gestion d'événements",
      "Mise en place d'un pipeline DevOps pour automatiser les processus de déploiement",
      "Participation active à des sprints Agile avec des itérations rapides",
      "Planification des tâches et estimation des efforts de développement"
    ],
    tags: ["SaaS", "DevOps", "Agile", "CI/CD"]
  },
  {
    title: "Développeur Fullstack",
    company: "Switch-Maker",
    location: "Burkina Faso",
    period: "2020-2021",
    duration: "1 an",
    description: [
      "Développement de projets complets : Conception et réalisation d'applications web et mobiles",
      "Maîtrise du backend et du frontend : Gestion du backend, frontend et API sécurisées",
      "Autonomie : De l'analyse des besoins à la mise en production",
      "Mise en place de solutions scalables pour répondre aux besoins croissants des clients"
    ],
    tags: ["Fullstack", "API", "Web", "Mobile"]
  },
  {
    title: " Développeur Mobile",
    company: "Gandyam Ligdi",
    period: "2019-2020",
    duration: "1 an",
    description: [
      "Amélioration de l'application de transfert d'argent : Ajout de nouvelles fonctionnalités clés",
      "Fonctionnalités avancées : Chat client, interface admin, mode PAN et divertissement",
      "Optimisation : Amélioration des performances et de la fluidité de navigation",
      "Autonomie : De l'analyse des besoins à l'intégration en production"
    ],
    tags: ["Mobile", "UI/UX", "Performance", "Flutter"]
  },
  {
    title: " Consultant Digital",
    company: "Projets d'entreprises",
    period: "2018-2019",
    duration: "1 an",
    description: [
      "Digitalisation : Conception de solutions web et mobiles pour des besoins métiers",
      "Sites & logiciels : Réalisation de sites vitrines, plateformes métiers et outils internes",
      "Adaptabilité : Analyse des besoins spécifiques et accompagnement personnalisé",
      "Autonomie : De la prise de brief au déploiement des solutions digitales"
    ],
    tags: ["Conseil", "Digital", "Web", "Accompagnement"]
  }
]);

// Fonction pour basculer l'affichage des détails d'une expérience
const toggleExperience = (index) => {
  if (expandedExperience.value === index) {
    // Fermer cette expérience
    expandedExperience.value = null;
  } else {
    // Fermer l'expérience précédente (si ouverte) et ouvrir celle-ci
    expandedExperience.value = index;
  }
};

onMounted(async () => {
  await nextTick();
  
  // Définir l'état initial explicitement
  gsap.set('.experience-header', { opacity: 0, y: -30 });
  gsap.set('.experience-card', { opacity: 0, y: 50, stagger: 0.2 });

  // Animation pour le titre
  gsap.to('.experience-header', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#experience-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Animation pour les cartes avec stagger
  gsap.to('.experience-card', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#experience-section',
      start: 'top 70%',
      toggleActions: 'play none none none',
    },
  });
});
</script>

<style scoped>
.experience-section {
  padding: 2rem;
  margin-top: 4rem;
  text-align: center;
  position: relative;
  z-index: 2;
}

.experience-timeline {
  position: relative;
  margin: 0 auto;
  max-width: 800px;
}

/* Ligne verticale de timeline */
.experience-timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, rgba(96, 165, 250, 0.7), transparent);
  transform: translateX(-50%);
  z-index: 0;
  display: none; /* Masqué par défaut, visible en desktop */
}

@media (min-width: 768px) {
  .experience-timeline::before {
    display: block;
    left: 50%;
  }
}

.experience-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  margin: 1.5rem auto;
  text-align: left;
  color: white;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  overflow: hidden;
}

.experience-card.active {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 0.15);
}

.experience-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
}

.toggle-btn {
  background: rgba(96, 165, 250, 0.2);
  color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 0;
  margin-left: 10px;
  flex-shrink: 0;
}

.toggle-btn:hover {
  background: rgba(96, 165, 250, 0.4);
  transform: scale(1.1);
}

.experience-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.3;
}

.experience-company {
  font-size: 1.1rem;
  color: rgba(96, 165, 250, 0.9);
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.experience-location {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-left: 8px;
}

.location-icon {
  margin-right: 3px;
}

.experience-content {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  margin-top: 0;
}

.experience-content.expanded {
  max-height: 1000px;
  opacity: 1;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.experience-description {
  margin-bottom: 1rem;
}

.experience-description p {
  margin-bottom: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.5;
  position: relative;
  padding-left: 1.5rem;
}

.experience-description p::before {
  content: '•';
  position: absolute;
  left: 0;
  top: 0;
  color: rgba(96, 165, 250, 0.8);
  font-size: 1.2rem;
}

.experience-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.experience-tag {
  background: rgba(96, 165, 250, 0.15);
  color: rgba(96, 165, 250, 0.9);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  animation: fadeInUp 0.5s ease both;
  animation-delay: calc(0.1s * var(--i));
}

.experience-tag:hover {
  background: rgba(96, 165, 250, 0.25);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .experience-section {
    padding: 1.5rem;
    margin-top: 2rem;
  }

  .experience-card {
    padding: 1.25rem;
    margin: 1rem auto;
    max-width: 100%;
  }

  .experience-title {
    font-size: 1.2rem;
    line-height: 1.4;
  }

  .experience-company {
    font-size: 0.95rem;
  }

  .experience-description p {
    font-size: 0.9rem;
    margin-bottom: 0.6rem;
  }
}

@media (max-width: 480px) {
  .experience-section {
    padding: 1rem;
    margin-top: 1rem;
  }

  .experience-card {
    padding: 1rem;
    margin: 0.8rem auto;
  }

  .experience-title {
    font-size: 1.1rem;
  }

  .experience-company {
    font-size: 0.85rem;
  }

  .experience-description p {
    font-size: 0.85rem;
    padding-left: 1.2rem;
  }

  .toggle-btn {
    width: 28px;
    height: 28px;
  }

  .experience-tag {
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
  }
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

/* Fallback pour éviter que le composant soit invisible */
@media (prefers-reduced-motion: reduce) {
  .experience-header,
  .experience-card,
  .experience-content {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  
  .experience-content {
    max-height: none !important;
  }
}
</style>
