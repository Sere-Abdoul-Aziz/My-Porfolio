<template>
  <div id="cta-section" class="cta-section glassmorphism-box flex flex-col items-center mt-10 mb-20 p-8 rounded-lg">
    <div class="cta-header bg-dark-800 text-white p-2 rounded-t-lg w-full text-center">Collaboration</div>
    
    <div class="cta-content p-6 flex flex-col md:flex-row items-center">
      <img src="@/assets/images/profil.png" alt="Mon Portrait" class="cta-image w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg mr-0 md:mr-8 mb-4 md:mb-0">
      
      <div class="cta-text flex-grow">
        <p ref="typewriterText" class="text-white text-lg mb-4">
          <!-- Le texte initial peut être vide -->
        </p>
        <button @click="openContactModal" class="cta-button bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-all">Prenons contact</button>
      
      
      </div>
    </div>
  </div>
  <div>
    <ContactModal v-if="isContactModalOpen" :isOpen="isContactModalOpen" @close="closeContactModal" @submit="handleFormSubmit" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import ContactModal from './ContactModal.vue';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const typewriterText = ref(null);

onMounted(() => {
  const textContent = "Je suis toujours ouvert à de nouvelles collaborations. Que ce soit pour un projet web, une application mobile, un logiciel, ou simplement pour discuter des technologies, n'hésitez pas à me contacter. Je suis disposé à travailler en entreprise, que ce soit en local ou à distance. Ensemble, nous pouvons transformer vos idées en réalité.";

  gsap.from('#cta-section', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#cta-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  gsap.from('.cta-image', {
    scale: 0.8,
    rotation: 15,
    duration: 1.2,
    ease: 'elastic.out(1, 0.3)',
    scrollTrigger: {
      trigger: '#cta-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  gsap.from('.cta-text', {
    opacity: 0,
    x: -50,
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#cta-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  gsap.to(typewriterText.value, {
    text: textContent,
    duration: 5,
    ease: "none",
    scrollTrigger: {
      trigger: '#cta-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  gsap.from('.cta-button', {
    opacity: 0,
    scale: 0.5,
    duration: 1.2,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '#cta-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Animation au survol du bouton
  const button = document.querySelector('.cta-button');
  button.addEventListener('mouseenter', () => {
    gsap.to(button, {
      scale: 1.1,
      rotate: -5,
      backgroundColor: '#005f99',
      boxShadow: '0 8px 30px rgba(0, 122, 204, 0.7)',
      duration: 0.1,
      ease: 'back.out(1.7)',
    });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      scale: 1,
      rotate: 0,
      backgroundColor: '#007acc',
      boxShadow: '0 4px 15px rgba(0, 122, 204, 0.5)',
      duration: 0.1,
      ease: 'power2.out',
    });
  });
});

const isContactModalOpen = ref(false);

const openContactModal = () => {
  isContactModalOpen.value = true;
};

const closeContactModal = () => {
  isContactModalOpen.value = false;
};

const handleFormSubmit = (formData) => {
  console.log('Form Submitted:', formData);
  
  alert(`Merci, ${formData.firstName}! Votre message a été envoyé.`);
};
</script>

<style scoped>
.cta-section {
  opacity: 1;
  display: block;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 10;
  transform: translateY(0);
  margin-top: 200px;
  margin-bottom: 200px;
}

.cta-header {
  background-color: #1e1e1e;
  font-family: 'Fira Code', monospace;
  font-size: 1.25rem;
  font-weight: bold;
}

.cta-content {
  display: flex;
  align-items: center;
  text-align: left;
}

.cta-image {
  border: 3px solid rgba(255, 255, 255, 0.5);
}

.cta-text {
  color: #d4d4d4;
  font-family: 'Fira Code', monospace;
  text-align: justify;
}

.cta-button {
  background-color: #007acc;
  color: white;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 122, 204, 0.5);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
</style>
