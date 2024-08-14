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

      
      
    </main>
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
  gsap.fromTo('.parallax-container', 
  { background: 'linear-gradient(135deg, #145DA0, #145DA0)' }, 
    { 
      background: 'linear-gradient(135deg, #0C2D48, #0C2D48)',
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    }
  );
  
});
</script>

<style scoped>

.parallax-container {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(10, 25, 45, 0.9), rgba(15, 30, 50, 0.7));
  height: 1000vh;
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
  z-index: 1; /* Mettre les effets de lumière en dessous de l'image de l'iceberg */
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
  position: absolute;
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
  top: 120px;
  right: -200px;
}

.collaboration-card {
  top: 480px;
  right: 550px;
}

.online-card {
  top: 300px;
  right: 300px;
}

.hobbies-card {
  top: 450px;
  left: 300px;
}

.technologies-section {
  text-align: center;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2rem;
  justify-content: center;
  align-items: center;
}

.tech-bubble {
  width: 150px;
  height: 150px;
  background: linear-gradient(145deg, #2e2e2e, #1c1c1c);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 15px #000000, -5px -5px 15px #3c3c3c;
  transition: transform 0.3s ease-in-out;
}

.tech-bubble:hover {
  transform: scale(1.1);
}

.tech-logo {
  width: 70px;
  height: 70px;
  object-fit: contain;
}

.tech-name {
  margin-top: 0.5rem;
  color: #d4d4d4;
  font-size: 1rem;
}


</style>
