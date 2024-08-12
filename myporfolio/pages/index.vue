<template>
  <div id="parallax-container" class="parallax-container">
    <!-- Image de l'iceberg -->
    <div class="iceberg-container">
      <img src="@/assets/images/iceberg.svg" alt="Iceberg" class="iceberg-image" />
    </div>

    <main class="content flex-grow flex flex-col justify-center items-center text-center px-4">
      <h1 ref="heading1" class="text-gray-200 text-8xl md:text-7xl font-bold leading-tight">
        Bonjour, je suis <span class="text-primary text-blue-400">SERE</span>,
      </h1>
      <h1 ref="heading2" class="text-behind text-gray-200 text-8xl md:text-7xl font-bold leading-tight">
        <span class="text-primary">Ingénieur en Génie Logiciel</span> <span class="text-primary text-blue-400">Fullstack</span>
      </h1>
      <div ref="glassBox" class="glassmorphism-box relative mt-20 p-10 rounded-lg backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 border border-white border-opacity-30">
        <p class="text-lg text-gray-800 max-w-xl">
          J'apporte de la valeur aux projets de développement web
        </p>
        <p class="mt-6 text-lg text-gray-800 max-w-xl">
          en fusionnant l'expertise technique avec l'innovation et l'esthétique.
        </p>
        <p class="mt-2 text-sm text-gray-800">
          Basé en Tunisie | Heure locale [Heure Actuelle]
        </p>
      </div>
    </main>
    
    <!-- Section des projets placée en bas du texte -->
    <div id="projects-section" class="projects-section">
      <div class="project-card" v-for="(project, index) in projects" :key="index">
        <div class="project-header">
          <span class="project-number">0{{ index + 1 }}</span>
          <h2 class="project-title">{{ project.title }}</h2>
          <span class="project-year">{{ project.year }}</span>
        </div>
        <div class="project-details">
          <div class="project-technologies">
            <span v-for="tech in project.technologies" :key="tech" class="tech-badge">{{ tech }}</span>
          </div>
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import projet1Image from '@/assets/images/projet1.jpg';
import projet2Image from '@/assets/images/projet2.jpeg';

gsap.registerPlugin(ScrollTrigger);

const projects = [
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
  // Ajoutez plus de projets ici
];

const heading1 = ref(null);
const heading2 = ref(null);
const glassBox = ref(null);
const projectCards = ref([]);

onMounted(() => {
  gsap.from(heading1.value, { opacity: 0, y: -50, duration: 1, ease: 'power3.out' });
  gsap.from(heading2.value, { opacity: 0, y: -50, duration: 1, delay: 0.3, ease: 'power3.out' });
  gsap.from(glassBox.value, { opacity: 0, y: 50, duration: 1, delay: 0.6, ease: 'power3.out' });

  projectCards.value.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3 * index,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'bottom 60%',
        toggleActions: 'play none none reverse',
      },
    });
  });
});
</script>

<style scoped>
.parallax-container {
  position: relative;
  overflow-x: auto;
  overflow-y: auto;
  background: linear-gradient(135deg, rgba(10, 25, 45, 0.9), rgba(15, 30, 50, 0.7));
  height: 200vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.iceberg-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 0;
}

.iceberg-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  z-index: 5;
}

.content {
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
  margin-top: 20px;
}

.glassmorphism-box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 20px;
  max-width: 100%;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.projects-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 2rem;
  margin-top: 4rem;
}

.project-card {
  position: relative;
  flex: 1 1 45%;
  margin: 1rem;
  padding: 1.5rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  color: white;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 40px rgba(0, 0, 0, 0.7);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.project-number {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.7);
}

.project-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
}

.project-year {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.7);
}

.project-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-technologies {
  display: flex;
  gap: 0.5rem;
}

.tech-badge {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.2rem 0.8rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
}

.project-image img {
  max-width: 100px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Effets de lumière */
.parallax-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.15), transparent),
              radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1), transparent),
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05), transparent);
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 1; /* Mettre les effets de lumière en dessous de l'image de l'iceberg */
}
</style>
