<template>
  <div id="projects-section" class="projects-section">
    <ProjectCard
      v-for="(project, index) in visibleProjects"
      :key="index"
      :project="project"
      @click="openModal(project)"
      :index="index"
    />
    <ProjectModal
      v-if="selectedProject"
      :project="selectedProject"
      :isOpen="isModalOpen"
      @close="closeModal"
    />
    <button 
      v-if="visibleProjects.length < projects.length" 
      class="see-more-button" 
      @mouseover="hoverAnimation" 
      @mouseleave="leaveAnimation" 
      @click="showMoreProjects"
    >
      <div class="button-content">
        <div class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <span class="button-text">Découvrir plus</span>
        <div class="shimmer-effect"></div>
        <div class="pulse-ring"></div>
      </div>
    </button>
  </div>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue';
import ProjectModal from './ProjectModal.vue';
import { ref, computed } from 'vue';
import { gsap } from 'gsap';

// Images existantes (conservées)
import projet1Image from '@/assets/images/projet1.jpg';
import projet2Image from '@/assets/images/projet2.jpg';
import projet3Image from '@/assets/images/projet3.jpg';
import connexionmyteach from '@/assets/images/connexionmyteach.jpg';
import enseignantmyteach from '@/assets/images/enseignantmyteach.jpg';
import dash from '@/assets/images/dash.png';
import eventcalendar from '@/assets/images/eventcalendar.png';
import eventdashboard from '@/assets/images/eventdashboard.png';
import eventdetail from '@/assets/images/eventdetail.png';
import eventlist from '@/assets/images/eventlist.png';
import homemyteach from '@/assets/images/homemyteach.jpg';
import messagemyteach from '@/assets/images/messagemyteach.jpg';
import missarticle from '@/assets/images/missarticle.jpg';
import misscompetence from '@/assets/images/misscompetence.jpg';
import misscover from '@/assets/images/misscover.jpg';
import misshome from '@/assets/images/misshome.jpg';
import missphoto from '@/assets/images/missphoto.jpg';
import missplus from '@/assets/images/missplus.jpg';
import profilmyteach from '@/assets/images/profilmyteach.jpg';
import profilprofmyteach from '@/assets/images/profilprofmyteach.jpg';
import tacheeventmanager from '@/assets/images/tacheeventmanager.png';

// 📱 Import des images Payment Mobile App
import paymentAppWelcome from '@/assets/images/Payment Mobile App/1.png';
import paymentAppLogin from '@/assets/images/Payment Mobile App/2.png';
import paymentAppDashboard from '@/assets/images/Payment Mobile App/3.png';
import paymentAppProfile from '@/assets/images/Payment Mobile App/4.png';
import paymentAppTransfer from '@/assets/images/Payment Mobile App/5.png';
import paymentAppHistory from '@/assets/images/Payment Mobile App/6.png';
import paymentAppCards from '@/assets/images/Payment Mobile App/7.png';
import paymentAppSettings from '@/assets/images/Payment Mobile App/8.png';
import paymentAppNotifications from '@/assets/images/Payment Mobile App/9.png';
import paymentAppSupport from '@/assets/images/Payment Mobile App/10.png';

// 🏢 Import des images ONG
import ongDashboard from '@/assets/images/ong/1.png';
import ongProjects from '@/assets/images/ong/2.png';
import ongDonations from '@/assets/images/ong/3.png';
import ongReports from '@/assets/images/ong/4.png';

// 📚 Import des images Formations
import formationsHome from '@/assets/images/formations/1.png';
import formationsCatalog from '@/assets/images/formations/2.png';
import formationsCourseDetail from '@/assets/images/formations/3.png';
import formationsLearning from '@/assets/images/formations/4.png';
import formationsProgress from '@/assets/images/formations/5.png';
import formationsQuiz from '@/assets/images/formations/6.png';
import formationsCertificates from '@/assets/images/formations/7.png';
import formationsProfile from '@/assets/images/formations/8.png';
import formationsChat from '@/assets/images/formations/9.png';
import formationsSettings from '@/assets/images/formations/10.png';

// 🛒 Import des images E-commerce
import ecommerceHome from '@/assets/images/ecommerce/1.png';
import ecommerceProducts from '@/assets/images/ecommerce/2.png';
import ecommerceProductDetail from '@/assets/images/ecommerce/3.png';
import ecommerceCart from '@/assets/images/ecommerce/4.png';
import ecommerceCheckout from '@/assets/images/ecommerce/5.png';
import ecommerceProfile from '@/assets/images/ecommerce/6.png';
import ecommerceOrders from '@/assets/images/ecommerce/7.png';
import ecommerceWishlist from '@/assets/images/ecommerce/8.png';
import ecommerceSearch from '@/assets/images/ecommerce/9.png';
import ecommerceAdmin from '@/assets/images/ecommerce/10.png';
import ecommerceAnalytics from '@/assets/images/ecommerce/11.png';

// Groupement des images par projet pour faciliter l'utilisation
const projectImages = {
  paymentApp: {
    main: paymentAppWelcome,
    screens: [
      paymentAppWelcome, paymentAppLogin, paymentAppDashboard, paymentAppProfile,
      paymentAppTransfer, paymentAppHistory, paymentAppCards, paymentAppSettings,
      paymentAppNotifications, paymentAppSupport
    ]
  },
  ong: {
    main: ongDashboard,
    screens: [ongDashboard, ongProjects, ongDonations, ongReports]
  },
  formations: {
    main: formationsHome,
    screens: [
      formationsHome, formationsCatalog, formationsCourseDetail, formationsLearning,
      formationsProgress, formationsQuiz, formationsCertificates, formationsProfile,
      formationsChat, formationsSettings
    ]
  },
  ecommerce: {
    main: ecommerceHome,
    screens: [
      ecommerceHome, ecommerceProducts, ecommerceProductDetail, ecommerceCart,
      ecommerceCheckout, ecommerceProfile, ecommerceOrders, ecommerceWishlist,
      ecommerceSearch, ecommerceAdmin, ecommerceAnalytics
    ]
  }
};

const projects = ref([
  {
    title: 'EVENT MANAGER',
    year: '2024',
    client: 'Innorizon',
    partner: 'Innorizon',
    technologies: ['Express JS', 'Node JS', 'Angular', 'PostgreSQL' , 'Sequelize', 'Docker'],
    image: projet1Image,
    description: "Event Manager est un SaaS spécialement conçu pour répondre aux besoins des associations dans la planification et la gestion d'événements. Développé pour Innorizon en 2024, ce service en ligne permet aux associations de centraliser l'organisation de leurs événements, de gérer efficacement les tâches, et de suivre la participation de leurs membres et invités. L'application, accessible depuis n'importe quel appareil connecté, propose un calendrier d'événements dynamique, un tableau de bord intuitif, et des vues détaillées pour chaque événement, offrant ainsi une vue d'ensemble et un contrôle complet. Conçu pour s'adapter aux besoins spécifiques des associations, Event Manager intègre les dernières technologies web, telles qu'Express JS, Node JS, Angular, PostgreSQL et Sequelize, pour offrir une expérience utilisateur fluide et une gestion des données performante. Docker est également utilisé pour garantir un déploiement flexible et une évolutivité maximale, permettant aux associations de se concentrer sur leurs missions tout en laissant la technologie s'occuper de la logistique.",
    additionalImages: [
      eventcalendar,
      eventdashboard,
      eventdetail,
      eventlist,
      tacheeventmanager
    ],
    // link: 'https://example.com',
  },
  {
    title: 'Miss Universités', 
    year: '2023',
    client: 'Moov Africa',
    partner: 'JoFe Digital',
    technologies: ['Flutter', 'Firebase', 'Dart', 'node Js', 'Android Studio'],
    image: projet2Image,
    description: "Miss Universités est une application mobile innovante, développée pour Moov Africa en 2023, qui permet aux utilisateurs de voter et de suivre les actualités du concours via des fonctionnalités inspirées des réseaux sociaux. Cette application permet aux participants et au public de visualiser les profils des candidates, de découvrir les photos des événements, de visionner des vidéos, et de lire des articles liés au concours. Conçue pour offrir une expérience utilisateur immersive, l'application utilise Flutter pour une compatibilité multiplateforme, avec une gestion sécurisée et en temps réel des données grâce à Firebase. L'intégration avec Node.js et Dart garantit une performance optimale, tandis qu'Android Studio permet un développement spécifique pour les utilisateurs mobiles. Réalisée en collaboration avec JoFe Digital, l'application Miss Universités renforce l'engagement du public tout en soutenant la mission de Moov Africa de promouvoir le talent et l'excellence au sein des universités africaines.",
    additionalImages: [
      missarticle,
      misscompetence,
      misscover,
      misshome,
      missphoto,
      missplus
    ],
    // link: 'https://anotherexample.com',
  },
  {
    title: 'MyTeach', 
    year: '2023',
    // client: 'Moov Africa',
    partner: 'EPI',
    technologies: ['Flutter', 'Firebase', 'Dart', 'node Js', 'Android Studio'],
    image: projet3Image,
    description: "MyTeach est une application mobile innovante destinée à mettre en relation des enseignants qualifiés avec des apprenants à la recherche de cours particuliers. Conçue pour offrir une expérience fluide et personnalisée, MyTeach permet aux apprenants de choisir parmi un large éventail d'enseignants qualifiés pour des cours à domicile, en fonction de leurs besoins spécifiques. Ils peuvent réserver des séances facilement via l'application. De leur côté, les enseignants ont accès à un espace de gestion des réservations, leur permettant de s'organiser efficacement pour leurs différents apprenants. En complément, MyTeach intègre une plateforme d'échange dans le style des réseaux sociaux, où enseignants et étudiants peuvent interagir, partager des ressources, et collaborer au-delà des cours. L'application vise à simplifier l'accès à l'éducation personnalisée tout en facilitant l'organisation et la communication entre les enseignants et les apprenants.",
    additionalImages: [
      connexionmyteach,
      enseignantmyteach,
      homemyteach,
      messagemyteach,
      profilmyteach,
      profilprofmyteach
    ],
    // link: 'https://anotherexample.com',
  },
  {
    title: 'Plateforme E-commerce',
    year: '2025',
    client: 'Confidentiel',
    technologies: ['Laravel', 'Livewire', 'Php', 'MySql', 'Flutter', 'Dart'],
    image: ecommerceHome, // Utilisera une image existante, vous la changerez
    description: "Développement d’une solution e-commerce complète combinant une application mobile intuitive et une plateforme web moderne. Ce projet intègre un système de gestion des commandes optimisé, un catalogue de produits dynamique, ainsi qu’un processus de paiement fluide et sécurisé, incluant les services de Mobile Money. L’interface administrateur permet un suivi centralisé avec gestion des stocks en temps réel, organisation des catégories, et supervision des marchands. Côté utilisateurs, l’expérience est pensée pour la simplicité et la rapidité, avec recherche par catégories, ajout au panier, suivi des commandes et notifications automatiques. Les marchands disposent d’outils pour créer et gérer leurs boutiques, publier des articles, et analyser leurs ventes. L’architecture modulaire et scalable garantit des performances optimales et une adaptation fluide à l’évolution des besoins.",
    additionalImages: [
      ecommerceProducts,
      ecommerceCheckout,
      ecommerceProfile,
      ecommerceOrders,
      ecommerceAnalytics,
      ecommerceWishlist,


    ],
    services: ['Développement Mobile', 'Développement Web', 'Intégration Paiement', 'UX/UI Design']
  },
  {
    title: 'Plateforme de Formation',
    year: '2025',
    client: 'Confidentiel',
    technologies: ['Laravel', 'Livewire', 'Php', 'MySql', 'Flutter', 'Dart'],
    image: formationsHome, // Utilisera une image existante, vous la changerez
    description: "Conception et développement d’une solution complète dédiée à l’apprentissage en ligne et à l’accompagnement personnalisé. Le projet combine une application mobile et une plateforme web offrant des parcours de formation interactifs, des séances de coaching en direct, ainsi qu’un système de suivi des progrès et d’évaluation continue. Les fonctionnalités incluent le partage instantané de documents, un processus automatisé de délivrance des certifications, la gestion complète des cours et de l’emploi du temps par les enseignants, la gestion des formations dispensées et des ressources pédagogiques, la possibilité pour les apprenants de suivre des cours, d’accéder à une bibliothèque numérique et à des ressources annexes, ainsi que d’évoluer vers un rôle de formateur. Un module administrateur permet la supervision et l’administration globale de la plateforme, incluant la gestion des utilisateurs, des contenus, des formations et des emplois du temps. L’interface, pensée pour la simplicité et l’efficacité, garantit une expérience fluide et accessible à tous les profils.",
    additionalImages: [
      formationsCatalog,
      formationsCourseDetail,
      formationsLearning,
      formationsCertificates,
      formationsProfile
    ],
    services: ['Plateforme LMS', 'Streaming Vidéo', 'Système Certification', 'Analytics Apprentissage']
  },
  {
    title: 'Agrégateur de Paiement',
    year: '2025',
    client: 'Confidentiel',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'API Gateway', 'Flutter', 'Dart'],
    image: paymentAppWelcome, // Utilisera une image existante, vous la changerez
    description: "Développement d’une solution de transfert d’argent, comprenant une application mobile et un backend robuste. La plateforme permet d’envoyer et de recevoir des fonds de manière simple et sécurisée, avec un suivi des transactions en temps réel. Côté utilisateur, elle intègre un système de gestion des pannes pour signaler et suivre la résolution des problèmes techniques, ainsi qu’une fonctionnalité de chat en direct avec le service client pour un support rapide et efficace. Côté administrateur, elle offre un tableau de bord complet pour superviser les opérations, gérer les utilisateurs, suivre les transactions et administrer l’ensemble de la plateforme. L’architecture a été pensée pour assurer une haute disponibilité, une évolutivité optimale et des performances stables, même en période de forte activité.",
    additionalImages: [
      paymentAppProfile,
      paymentAppTransfer,
      paymentAppHistory,
      paymentAppCards,
      paymentAppNotifications,
      paymentAppSupport
    ],
    services: ['Intégration Multi-Paiement', 'Chat', 'Système de Gestion des Pannes', 'API Gateway']
  },
  {
    title: 'Plateforme ONG',
    year: '2025',
    client: 'Confidentiel',
    technologies: ['Laravel', 'Livewire', 'Mysql', 'Php', 'Email Service'],
    image: ongProjects, 
    description: "Développement d’une plateforme complète dédiée à la gestion de projets et de missions à impact social, incluant le suivi des initiatives, la planification des activités et la coordination des équipes sur le terrain. La solution propose un système de gestion et de suivi des missions, des outils de reporting détaillés pour évaluer l’avancement et l’impact des actions, ainsi que des fonctionnalités de communication centralisée entre les différents acteurs impliqués.",
    additionalImages: [
      ongDashboard,
      ongDonations,
      ongReports
    ],
  services: [
  'Gestion des Missions',
  'Suivi des Projets',
  'Coordination des Équipes',
  'Reporting et Analyse d’Impact'
],
 }
]);

const selectedProject = ref(null);
const isModalOpen = ref(false);
const visibleProjectsCount = ref(2); 

const visibleProjects = computed(() => {
  return projects.value.slice(0, visibleProjectsCount.value);
});

// Animations GSAP pour le bouton "Plus" - Version améliorée
const hoverAnimation = () => {
  const tl = gsap.timeline();
  
  tl.to('.eye-icon', { 
    scale: 1.2, 
    rotate: 15, 
    duration: 0.3, 
    ease: 'back.out(1.7)' 
  })
  .to('.button-text', { 
    x: 2, 
    duration: 0.3, 
    ease: 'power2.out' 
  }, 0)
  .to('.see-more-button', { 
    y: -8, 
    scale: 1.05,
    duration: 0.4, 
    ease: 'power2.out' 
  }, 0);
};

const leaveAnimation = () => {
  const tl = gsap.timeline();
  
  tl.to('.eye-icon', { 
    scale: 1, 
    rotate: 0, 
    duration: 0.3, 
    ease: 'power2.out' 
  })
  .to('.button-text', { 
    x: 0, 
    duration: 0.3, 
    ease: 'power2.out' 
  }, 0)
  .to('.see-more-button', { 
    y: 0, 
    scale: 1,
    duration: 0.4, 
    ease: 'power2.out' 
  }, 0);
};

const clickAnimation = () => {
  gsap.to('.see-more-button', { 
    scale: 0.95, 
    duration: 0.1, 
    ease: 'power2.inOut', 
    yoyo: true, 
    repeat: 1,
    onComplete: () => {
      // Animation de succès après le clic
      gsap.to('.see-more-button', {
        scale: 1.1,
        duration: 0.2,
        ease: 'back.out(1.7)',
        yoyo: true,
        repeat: 1
      });
    }
  });
};

// Modifier la fonction showMoreProjects pour inclure l'animation
const showMoreProjects = () => {
  clickAnimation();
  visibleProjectsCount.value = projects.value.length;
};

const openModal = (project) => {
  selectedProject.value = project;
  isModalOpen.value = true;
};

const closeModal = () => {
  selectedProject.value = null;
  isModalOpen.value = false;
};

</script>

<style scoped>
.projects-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 2rem;
  margin-top: 4rem;
}

.see-more-button {
  position: relative;
  width: 180px;
  height: 60px;
  border-radius: 30px;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%);
  color: white;
  font-family: 'Fira Code', monospace;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin: 3rem auto 0 auto;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 
    0 10px 40px rgba(59, 130, 246, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  transform: translateY(0);
  
  /* ✨ ANIMATION CONSTANTE - Pulsation douce */
  animation: 
    buttonAppear 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards,
    constantPulse 3s ease-in-out infinite,
    breathingGlow 4s ease-in-out infinite alternate;
}

/* Animation de pulsation constante */
@keyframes constantPulse {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-2px) scale(1.02);
  }
}

/* Animation de lueur respirante */
@keyframes breathingGlow {
  0% {
    box-shadow: 
      0 10px 40px rgba(59, 130, 246, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
      0 0 10px rgba(59, 130, 246, 0.2);
  }
  100% {
    box-shadow: 
      0 15px 50px rgba(59, 130, 246, 0.6),
      0 0 0 1px rgba(255, 255, 255, 0.2) inset,
      0 0 20px rgba(59, 130, 246, 0.4);
  }
}

/* Animation de l'icône - rotation subtile constante */
.eye-icon {
  width: 20px;
  height: 20px;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  
  /* ✨ Rotation subtile constante */
  animation: iconFloat 6s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(5deg) scale(1.05);
  }
  50% {
    transform: rotate(0deg) scale(1);
  }
  75% {
    transform: rotate(-5deg) scale(1.05);
  }
}

/* Animation du texte - effet de scintillement */
.button-text {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  /* ✨ Scintillement subtil du texte */
  animation: textShimmer 5s ease-in-out infinite;
}

@keyframes textShimmer {
  0%, 100% {
    text-shadow: 
      0 1px 2px rgba(0, 0, 0, 0.1),
      0 0 5px rgba(59, 130, 246, 0.2);
  }
  50% {
    text-shadow: 
      0 1px 2px rgba(0, 0, 0, 0.1),
      0 0 10px rgba(59, 130, 246, 0.4),
      0 0 15px rgba(59, 130, 246, 0.2);
  }
}

/* Animation de l'effet shimmer - passage périodique */
.shimmer-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: left 0.6s ease;
  
  /* ✨ Passage automatique de la brillance */
  animation: autoShimmer 8s ease-in-out infinite;
}

@keyframes autoShimmer {
  0%, 90%, 100% {
    left: -100%;
    opacity: 0;
  }
  5%, 15% {
    left: 100%;
    opacity: 1;
  }
}

/* Animation de l'anneau de pulsation - apparition périodique */
.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border: 2px solid rgba(59, 130, 246, 0.8);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  
  /* ✨ Pulsation périodique automatique */
  animation: autoPulseRing 10s ease-in-out infinite;
}

@keyframes autoPulseRing {
  0%, 85%, 100% {
    width: 0;
    height: 0;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  5% {
    width: 100px;
    height: 100px;
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.8);
  }
  15% {
    width: 200px;
    height: 200px;
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

/* Effet de particules en mouvement */
.see-more-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 30% 30%, 
    rgba(59, 130, 246, 0.1) 0%, 
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 30px;
  pointer-events: none;
  
  /* ✨ Mouvement de particules constant */
  animation: constantParticleGlow 7s ease-in-out infinite;
}

@keyframes constantParticleGlow {
  0%, 100% {
    background: radial-gradient(
      circle at 20% 20%, 
      rgba(59, 130, 246, 0.1) 0%, 
      transparent 40%
    );
    opacity: 0.3;
  }
  25% {
    background: radial-gradient(
      circle at 80% 30%, 
      rgba(59, 130, 246, 0.15) 0%, 
      transparent 50%
    );
    opacity: 0.5;
  }
  50% {
    background: radial-gradient(
      circle at 70% 80%, 
      rgba(59, 130, 246, 0.12) 0%, 
      transparent 45%
    );
    opacity: 0.4;
  }
  75% {
    background: radial-gradient(
      circle at 30% 70%, 
      rgba(59, 130, 246, 0.18) 0%, 
      transparent 55%
    );
    opacity: 0.6;
  }
}

/* Animation d'attraction magnétique */
@keyframes magneticAttraction {
  0%, 100% {
    transform: translateY(0) scale(1) rotate(0deg);
  }
  25% {
    transform: translateY(-1px) scale(1.01) rotate(0.5deg);
  }
  50% {
    transform: translateY(-2px) scale(1.02) rotate(0deg);
  }
  75% {
    transform: translateY(-1px) scale(1.01) rotate(-0.5deg);
  }
}

/* Appliquer l'attraction magnétique au contenu du bouton */
.button-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  
  /* ✨ Mouvement magnétique subtil */
  animation: magneticAttraction 4s ease-in-out infinite;
}

/* Intensification des animations au survol */
.see-more-button:hover {
  animation: 
    subtleButtonGlow 1s ease-in-out infinite alternate,
    constantPulse 1.5s ease-in-out infinite,
    breathingGlow 2s ease-in-out infinite alternate;
}

.see-more-button:hover .eye-icon {
  animation: iconFloat 3s ease-in-out infinite;
}

.see-more-button:hover .button-text {
  animation: textShimmer 2.5s ease-in-out infinite;
}

.see-more-button:hover .shimmer-effect {
  animation: autoShimmer 4s ease-in-out infinite;
}

.see-more-button:hover .pulse-ring {
  animation: autoPulseRing 5s ease-in-out infinite;
}

/* Responsive - Réduction des animations sur mobile */
@media (max-width: 768px) {
  .see-more-button {
    animation: 
      buttonAppear 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards,
      constantPulse 4s ease-in-out infinite;
  }
  
  .eye-icon {
    animation: iconFloat 8s ease-in-out infinite;
  }
  
  .button-text {
    animation: textShimmer 6s ease-in-out infinite;
  }
}

/* Respect des préférences d'accessibilité */
@media (prefers-reduced-motion: reduce) {
  .see-more-button,
  .eye-icon,
  .button-text,
  .shimmer-effect,
  .pulse-ring,
  .button-content,
  .see-more-button::after {
    animation: none !important;
  }
  
  .see-more-button {
    animation: buttonAppear 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards !important;
  }
}
</style>
