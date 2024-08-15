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

      <h1 ref="heading1" class="text-gray-200 text-3xl md:text-6xl font-bold leading-tight">
        PROJETS <span class="text-primary text-blue-400">VEDETTES</span>
      </h1>

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
        <button class="see-more-button">Plus</button>
      </div>

      <!-- Section "Your Interactive Developer" -->
      <div id="interactive-developer-wrapper" class="mt-20 relative">
        
        <h1 ref="heading1" class="text-gray-200 text-3xl md:text-6xl font-bold leading-tight">
         Ton Développeur <span class="text-primary text-blue-400">Dynamique</span>
        </h1>


        <!-- Fenêtre "About Me" -->
        <div class="window-card about-me-card">
          <div class="window-header bg-blue-400 text-white p-2 rounded-t-lg">About Me</div>
          <div class="window-body p-4 bg-gray-100 rounded-b-lg">
            <p>Je suis SERE, un ingénieur en génie logiciel passionné par le développement Fullstack. J'adore créer des solutions innovantes et esthétiques.</p>
          </div>
        </div>

        <!-- Fenêtre "Portrait" -->
        <div class="window-card portrait-card">
          <div class="window-header bg-blue-400 text-white p-2 rounded-t-lg">Portrait</div>
          <div class="window-body p-4 bg-gray-100 rounded-b-lg">
            <img src="@/assets/images/profil.jpeg" alt="Mon Portrait" class="w-full h-auto rounded-lg">
          </div>
        </div>

        <!-- Fenêtre "Collaboration" -->
        <div class="window-card collaboration-card">
          <div class="window-header bg-blue-400 text-white p-2 rounded-t-lg">Collaboration</div>
          <div class="window-body p-4 bg-gray-100 rounded-b-lg">
            <p>J'aime collaborer en équipe, en utilisant des méthodes agiles pour garantir la réussite des projets.</p>
          </div>
        </div>

        <!-- Fenêtre "Me Online" -->
        <div class="window-card online-card">
          <div class="window-header bg-blue-400 text-white p-2 rounded-t-lg">Me Online</div>
          <div class="window-body p-4 bg-gray-100 rounded-b-lg">
            <p>Retrouvez-moi sur:</p>
            <ul>
              <li><a href="#" class="text-blue-500">LinkedIn</a></li>
              <li><a href="#" class="text-blue-500">GitHub</a></li>
              <li><a href="#" class="text-blue-500">Twitter</a></li>
            </ul>
          </div>
        </div>

        <!-- Fenêtre "Hobbies" -->
        <div class="window-card hobbies-card">
          <div class="window-header bg-blue-400 text-white p-2 rounded-t-lg">Hobbies</div>
          <div class="window-body p-4 bg-gray-100 rounded-b-lg">
            <ul>
              <li>Codage</li>
              <li>Lecture</li>
              <li>Voyage</li>
              <li>Jeux vidéo</li>
            </ul>
          </div>
        </div>


      </div>

       <!-- Section des technologies placée en bas des fenêtres -->
       <div id="technologies-section" class="mt-20 text-center">
  <h2 class="text-5xl font-bold text-gray-200 mb-10">Technologies que j'utilise</h2>
  <div id="cubes-container" class="cubes-container"></div>
</div>

<div id="certifications-section" class="certifications-section">
    <h2 class="text-5xl font-bold text-gray-200 mb-10">Diplômes et Certifications Professionnelles</h2>

    <!-- Sous-titre Diplômes -->
    <h3 class="text-4xl font-bold text-gold mb-6">Diplômes</h3>
    <div class="certificates-container">
      <div v-for="(diplome, index) in diplomes" :key="index" class="certificate-card">
        <img :src="diplome.image" alt="Diplôme Image" class="certificate-background" />
        <div class="certificate-content">
          <h4 class="certificate-title">{{ diplome.title }}</h4>
          <p class="certificate-date">{{ diplome.date }}</p>
        </div>
      </div>
    </div>

    <!-- Sous-titre Certifications -->
    <h3 class="text-4xl font-bold text-gold mb-6 mt-10">Certifications</h3>
    <div class="certificates-container">
      <div v-for="(certification, index) in certifications" :key="index" class="certificate-card">
        <img :src="certification.image" alt="Certification Image" class="certificate-background" />
        <div class="certificate-content">
          <h4 class="certificate-title">{{ certification.title }}</h4>
          <p class="certificate-date">{{ certification.date }}</p>
        </div>
      </div>
    </div>
  </div>
      
  <div id="experience-section" class="experience-section">
  <h2 class="experience-header">EXPÉRIENCE PROFESSIONNELLE</h2>
  
  <div class="experience-card">
    <div class="experience-content">
      <h3 class="experience-title">Développement Web, Applications Web et mobile | Webmaster</h3>
      <p class="experience-company">2022-2024 | Jo'Fé Digital | 2 ans </p>
    </div>
  </div>
</div>

<div id="languages-section" class="languages-section">
  <h2 class="text-5xl font-bold text-gray-200 mb-10">Langues</h2>

  <div class="language-card">
    <div class="language-header">
      <img src="@/assets/images/france_flag.jpeg" alt="French Flag" class="flag-icon">
      <h3 class="language-title">Français</h3>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: 100%;"></div>
    </div>
    <p class="progress-percentage">100%</p>
  </div>

  <div class="language-card">
    <div class="language-header">
      <img src="@/assets/images/uk_flag.jpeg" alt="English Flag" class="flag-icon">
      <h3 class="language-title">Anglais</h3>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: 75%;"></div>
    </div>
    <p class="progress-percentage">75%</p>
  </div>
</div>





      
    </main>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';


import projet1Image from '@/assets/images/projet1.jpg';
import projet2Image from '@/assets/images/projet2.jpeg';

import vueLogo from '@/assets/images/vue.jpeg';
import nuxtLogo from '@/assets/images/nuxt.jpeg';
import flutterLogo from '@/assets/images/flutter.jpeg';
import reactLogo from '@/assets/images/react.jpeg';
import expressLogo from '@/assets/images/Express JS.jpeg';
import nodejsLogo from '@/assets/images/nodejs.jpeg';
import dockerLogo from '@/assets/images/docker.jpeg';
import nextLogo from '@/assets/images/next.jpeg';
import angularLogo from '@/assets/images/angular.jpeg';
import adonisLogo from '@/assets/images/adonis.jpeg';

import baccalaureatImage from '@/assets/images/Baccalauréat.jpeg';
import cyclePreparatoireImage from '@/assets/images/prepa.png';
import ingenieurImage from '@/assets/images/Ingenieur.png';
import esbCertificationImage from '@/assets/images/ESB_logo.png';
import azureCertificationImage from '@/assets/images/microsoft_logo.jpeg';
import ccnaCertificationImage from '@/assets/images/cisco_logo.jpeg';
import goldimage from '@/assets/images/gold.png';


gsap.registerPlugin(ScrollTrigger);

const technologies = ref([
  { name: 'Vue.js', logo: vueLogo },
  { name: 'Nuxt.js', logo: nuxtLogo },
  { name: 'Flutter', logo: flutterLogo },
  { name: 'React.js', logo: reactLogo },
  { name: 'Express.js', logo: expressLogo },
  { name: 'Node.js', logo: nodejsLogo },
  { name: 'Docker', logo: dockerLogo },
  { name: 'Next.js', logo: nextLogo },
  { name: 'Angular', logo: angularLogo },
  { name: 'Adonis.js', logo: adonisLogo },
]);

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

const diplomes = [
  { title: "Baccalauréat Scientifique (D)", date: "2019", image: baccalaureatImage },
  { title: "Diplôme D'Etudes Universitaires Du Premier Cycle Préparatoire en MATH-Physique Aux Etudes D'Ingénieurs", date: "2021", image: cyclePreparatoireImage },
  { title: "Diplômes d'ingénieur Genie Logiciel", date: "2023", image: ingenieurImage },
];

const certifications = [
  { title: "Entrepreneurship and Small Business (ESB)", date: "Jan 2024", image: esbCertificationImage },
  { title: "Microsoft Certified: Azure Fundamentals", date: "Janv. 2023", image: azureCertificationImage },
  { title: "CCNA: Switching, Routing, and Wireless Essentials", date: "Avril 2022", image: ccnaCertificationImage },
];



const heading1 = ref(null);
const heading2 = ref(null);
const glassBox = ref(null);
const projectCards = ref([]);

onMounted(() => {
  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('cubes-container').appendChild(renderer.domElement);

  const geometry = new RoundedBoxGeometry(1.5, 1.5, 1.5, 10, 0.4); 

  const textureLoader = new THREE.TextureLoader();

  const textures = [
    textureLoader.load(vueLogo),
    textureLoader.load(nuxtLogo),
    textureLoader.load(flutterLogo),
    textureLoader.load(reactLogo),
    textureLoader.load(expressLogo),
    textureLoader.load(nodejsLogo),
    textureLoader.load(dockerLogo),
    textureLoader.load(nextLogo),
    textureLoader.load(angularLogo),
    textureLoader.load(adonisLogo),
  ];

  const cubes = textures.map(texture => {
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.8 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
  });

  cubes.forEach((cube, i) => {
    cube.position.x = (i % 4) * 3 - 4.5;
    cube.position.y = Math.floor(i / 4) * 3 - 1.5;
    cube.position.z = Math.random() * 4 - 2;

    const rotationDuration = Math.random() * 5 + 5;  // Durée de rotation aléatoire entre 3 et 8 secondes
  const floatDuration = Math.random() * 2 + 5;  // Durée de flottement aléatoire entre 2 et 4 secondes
  const floatAmount = Math.random() * 1 + 0.5;  // Amplitude de flottement aléatoire

  gsap.to(cube.rotation, {
    y: Math.PI * 2,
    duration: rotationDuration,
    repeat: -1,
    ease: "none"
  });

  gsap.to(cube.position, {
    y: cube.position.y + floatAmount,
    duration: floatDuration,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });
  });

  camera.position.z = 10;

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
});
</script>

<style scoped>

.parallax-container {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(10, 25, 45, 0.9), rgba(15, 30, 50, 0.7));
  height: auto;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 50px;
}

.iceberg-container {

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
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
  justify-content: flex-start;
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
  z-index: 1; 
}
.see-more-button {
  margin-top: 2rem;
  padding: 0.75rem 2rem;
  border-radius: 10px;
  background-color: rgba(20, 129, 219, 0.8);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  
  display: block;
  margin-left: auto;
  margin-right: auto;

}

.see-more-button:hover {
  background-color: rgba(30, 139, 229, 1);
  transform: translateY(-5px);
}

/* @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap'); */

.window-card {
  position: relative;
  width: 400px;
  background-color: #1e1e1e;
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  font-family: 'Fira Code', monospace;
  color: #d4d4d4;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px; 
}

.window-header {
  background-color: #252526;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.window-header .window-controls {
  display: flex;
  gap: 0.4rem;
}

.window-header .window-controls .control-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #3c3c3c;
  cursor: pointer;
}

.window-header .window-title {
  flex-grow: 1;
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
}

.window-body {
  padding: 1rem;
  overflow-y: auto;
  flex-grow: 1;
  text-align: justify;
}

.window-body a {
  color: #3794ff;
  text-decoration: none;
}

.window-body a:hover {
  text-decoration: underline;
}

.window-body img {
  border-radius: 3px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  max-width: 100%;
}

.window-body ul {
  list-style-type: disc;
  padding-left: 1.2rem;
}

.window-body li {
  margin-bottom: 0.5rem;
}



#interactive-developer-section {
  position: absolute;
  top: 100vh; /* Positionnez cette section en-dessous de tout le contenu au-dessus */
  width: 100%;
  padding: 2rem;
  z-index: 10; /* Assurez-vous que cette section apparaît au-dessus des autres si nécessaire */
}


.about-me-card {
  top: 100px;
  left: -100px;
}

.portrait-card {
  bottom: 100px;
  right: -500px;
}

.collaboration-card {
  bottom: 300px;
  right: 100px;
}

.online-card {
  top: -650px;
  left: 150px;
}

.hobbies-card {
  bottom: 600px;
  left: 300px;
}

#interactive-developer-wrapper {
  /* margin-bottom: 80px;  */
  height: 30%; /* Définir une hauteur fixe */
}

.technologies-section {
  text-align: center;
 
}
#technologies-section {
  position: relative;
  height: 100vh;
  width: 100%;
  /* background: linear-gradient(135deg, rgba(10, 25, 45, 0.9), rgba(15, 30, 50, 0.7)); */
}

.cubes-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.certifications-section {
  padding: 2rem;
 
  text-align: center;
  position: relative; /* Pour le positionnement z-index des cartes */
 
  
}

.certificate-card {
  position: relative;
  z-index: 2; /* S'assurer que les cartes sont au-dessus du fond */
  width: 300px;
  margin: 1rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); /* Augmentation de l'ombre pour plus de profondeur */
  backdrop-filter: blur(5px);
}


.text-gold {
  color: #d4af37;
}

.certificates-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}



.certificate-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  z-index: 1;
  border-radius: 15px;
  
}

.certificate-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.certificate-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #fff;
}

.certificate-date {
  font-size: 1rem;
  color: #d4af37;
}

.experience-section {
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 4rem;
}

.experience-header {
  font-size: 2.5rem;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 2rem;
  border-bottom: 2px solid #6c757d;
  display: inline-block;
  padding-bottom: 0.5rem;
}

.experience-card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin: 1rem auto;
  max-width: 600px;
  text-align: left;
}

.experience-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #495057;
}

.experience-company {
  font-size: 1.1rem;
  color: #6c757d;
}

.experience-content {
  position: relative;
  z-index: 2;
}
.languages-section {
  padding: 2rem;
  text-align: center;
  margin-top: 4rem;
  background: url('@/assets/images/map_background.jpg') no-repeat center center;
  background-size: cover;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.language-card {
  background: rgba(255, 255, 255, 0.2); /* Transparent white with a hint of color */
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1.5rem;
  margin: 1rem auto;
  max-width: 600px;
  text-align: left;
  position: relative;
}

.language-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.flag-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.language-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #34495e;
}

.progress-bar-container {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  overflow: hidden;
  height: 20px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(135deg, #ff7675, #f5f5f5);
  border-radius: 10px;
  transition: width 1s ease-in-out;
}

.progress-percentage {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #34495e;
  font-weight: 600;
}




</style>
