<template>
  <div id="projects-section" class="projects-section">
    <ProjectCard v-for="(project, index) in projects" :key="index" :project="project" :index="index" />
    <button class="see-more-button" @mouseover="hoverAnimation" @mouseleave="leaveAnimation" @click="clickAnimation">
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
import projet2Image from '@/assets/images/projet2.jpeg';

const projects = ref([
  {
    title: 'Project One',
    year: '2023',
    technologies: ['webflow', 'gsap', 'javascript', 'css'],
    image: projet1Image,
  },
  {
    title: 'Project Two',
    year: '2023',
    technologies: ['vue.js', 'nuxt.js', 'tailwindcss'],
    image: projet2Image,
  },
]);

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
