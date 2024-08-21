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
    <button v-if="visibleProjects.length < projects.length" class="see-more-button" @mouseover="hoverAnimation" @mouseleave="leaveAnimation" @click="showMoreProjects">
      <svg xmlns="http://www.w3.org/2000/svg" class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    </button>
  </div>
</template>


<script setup>
import ProjectCard from './ProjectCard.vue';
import { ref } from 'vue';
import { gsap } from 'gsap';
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
]);

const selectedProject = ref(null);
const isModalOpen = ref(false);
const visibleProjectsCount = ref(2); 

const visibleProjects = computed(() => {
  return projects.value.slice(0, visibleProjectsCount.value);
});

const showMoreProjects = () => {
  visibleProjectsCount.value += 3; 
};

const openModal = (project) => {
  selectedProject.value = project;
  isModalOpen.value = true;
};

const closeModal = () => {
  selectedProject.value = null;
  isModalOpen.value = false;
};

// Animations GSAP pour le bouton "Plus"
const hoverAnimation = () => {
  gsap.to('.eye-icon', { scale: 1.3, rotate: 15, duration: 0.3, ease: 'power2.out' });
};

const leaveAnimation = () => {
  gsap.to('.eye-icon', { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' });
};

const clickAnimation = () => {
  gsap.to('.see-more-button', { scale: 0.9, duration: 0.1, ease: 'power1.inOut', yoyo: true, repeat: 1 });
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
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(20, 129, 219, 0.8);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto 0 auto;
  position: relative;
}

.see-more-button:hover {
  background-color: rgba(30, 139, 229, 1);
  transform: translateY(-5px);
}

.eye-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}
</style>
