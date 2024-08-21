<template>
  <div id="interactive-developer-wrapper" class="relative py-12">
    <h1 ref="heading1" class="text-gray-200 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-center mb-12">
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
        <img src="@/assets/images/profil.png" alt="Mon Portrait" class="w-full h-auto rounded-lg">
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
</template>
  
  <script setup>

import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const cards = document.querySelectorAll('.window-card');

  cards.forEach((card, index) => {
    gsap.fromTo(card, 
      {
        opacity: 0,
        y: 50,
        rotate: 10,
      },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 1,
        delay: index * 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%', 
          toggleActions: 'play none none none', 
        },
      }
    );
  });
});

  </script>
  
  <style scoped>
  
.window-card {
  position: relative;
  width: 100%; /* Full width on small screens */
  max-width: 400px; /* Limit max width */
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
  justify-content: center;
  height: 1%;
  width: 100%;
  padding: 2rem;
  z-index: 10; /* Assurez-vous que cette section apparaît au-dessus des autres si nécessaire */
}

.about-me-card {
  order: 1; /* Controls the order of appearance */
}

.portrait-card {
  order: 2;
}

.collaboration-card {
  order: 3;
}

.online-card {
  order: 4;
}

.hobbies-card {
  order: 5;
}

@media (min-width: 640px) {


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
}

/* #interactive-developer-wrapper {
  margin-bottom: 80px; 
  height: 120vh; 
} */

#interactive-developer-wrapper {
  flex-direction: column;
  margin-bottom: 40px; /* Réduire la marge sur les grands écrans */
  padding-bottom: 20px; /* Ajoutez un padding en bas pour plus d'espace */
}

@media (max-width: 640px) {
  #interactive-developer-wrapper {
    min-height: 100%; /* Assurez-vous que la section occupe au moins la hauteur de l'écran sur les petits écrans */
    margin-bottom: 80px; /* Augmenter la marge pour les petits écrans si nécessaire */
  }
}

@media (min-width: 1024px) {
  #interactive-developer-wrapper {
    margin-bottom: 40px; /* Réduire la marge sur les grands écrans */
  }
}




  </style>
  