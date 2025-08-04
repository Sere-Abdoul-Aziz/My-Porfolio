<template>
  <div id="cta-section" class="cta-section">
    <div class="cta-header">
      <div class="window-controls">
        <div class="control-button close"></div>
        <div class="control-button minimize"></div>
        <div class="control-button maximize"></div>
      </div>
      <div class="window-title">Collaboration</div>
    </div>
    
    <div class="cta-content">
      <img src="@/assets/images/profil.png" alt="Mon Portrait" class="cta-image">
      
      <div class="cta-text">
        <p ref="typewriterText" class="typewriter-text">
          <!-- Le texte sera ajouté par l'animation typewriter -->
        </p>
        <button @click="openContactModal" class="cta-button">
          <i class="fas fa-envelope"></i>
          Prenons contact
        </button>
      </div>
    </div>
  </div>

  <!-- Modal téléporté vers le body -->
  <Teleport to="body">
    <ContactModal 
      v-if="isContactModalOpen" 
      :isOpen="isContactModalOpen" 
      @close="closeContactModal" 
      @submit="handleFormSubmit" 
    />
  </Teleport>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import ContactModal from './ContactModal.vue';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const typewriterText = ref(null);
const isContactModalOpen = ref(false);

const openContactModal = () => {
  isContactModalOpen.value = true;
  console.log('Modal opened:', isContactModalOpen.value);
  // Empêcher le scroll du body quand le modal est ouvert
  document.body.style.overflow = 'hidden';
};

const closeContactModal = () => {
  isContactModalOpen.value = false;
  console.log('Modal closed:', isContactModalOpen.value);
  // Restaurer le scroll du body
  document.body.style.overflow = 'auto';
};

const handleFormSubmit = (formData) => {
  console.log('Form Submitted:', formData);
  alert(`Merci, ${formData.firstName}! Votre message a été envoyé.`);
  closeContactModal();
};

onMounted(async () => {
  await nextTick();
  
  const textContent = "Je suis toujours ouvert à de nouvelles collaborations. Que ce soit pour un projet web, une application mobile, un logiciel, ou simplement pour discuter des technologies, n'hésitez pas à me contacter. Je suis disposé à travailler en entreprise, que ce soit en local ou à distance. Ensemble, nous pouvons transformer vos idées en réalité.";

  // Définir l'état initial
  gsap.set('#cta-section', { opacity: 0, y: 50 });
  gsap.set('.cta-image', { opacity: 0, scale: 0.8, rotation: 15 });
  gsap.set('.cta-text', { opacity: 0, x: -50 });
  gsap.set('.cta-button', { opacity: 0, scale: 0.5 });

  // Animation d'entrée de la section
  gsap.to('#cta-section', {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#cta-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Animation de l'image
  gsap.to('.cta-image', {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 1.2,
    ease: 'elastic.out(1, 0.3)',
    delay: 0.3,
    scrollTrigger: {
      trigger: '#cta-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Animation du texte
  gsap.to('.cta-text', {
    opacity: 1,
    x: 0,
    duration: 1.2,
    ease: 'power2.out',
    delay: 0.5,
    scrollTrigger: {
      trigger: '#cta-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Animation typewriter
  gsap.to(typewriterText.value, {
    text: textContent,
    duration: 3,
    ease: "none",
    delay: 0.8,
    scrollTrigger: {
      trigger: '#cta-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  // Animation du bouton
  gsap.to('.cta-button', {
    opacity: 1,
    scale: 1,
    duration: 1.2,
    ease: 'back.out(1.7)',
    delay: 1,
    scrollTrigger: {
      trigger: '#cta-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Animation au survol du bouton
  const button = document.querySelector('.cta-button');
  if (button) {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        y: -3,
        boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        y: 0,
        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }
});
</script>

<style scoped>
.cta-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin: 4rem auto;
  position: relative;
  z-index: 10;
  overflow: hidden;
  color: white;
}

.cta-header {
  background-color: #252526;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #3c3c3c;
}

.window-controls {
  display: flex;
  gap: 0.5rem;
}

.control-button {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  cursor: pointer;
}

.control-button.close {
  background-color: #ff5f56;
}

.control-button.minimize {
  background-color: #ffbd2e;
}

.control-button.maximize {
  background-color: #27ca3f;
}

.window-title {
  flex-grow: 1;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  color: #d4d4d4;
  font-family: 'Fira Code', monospace;
}

.cta-content {
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.cta-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid rgba(59, 130, 246, 0.5);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
}

.cta-text {
  flex: 1;
}

.typewriter-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-family: 'Fira Code', monospace;
  text-align: justify;
}

.cta-button {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: linear-gradient(135deg, #2563eb, #1e40af);
}

.cta-button i {
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .cta-section {
    margin: 2rem 1rem;
  }

  .cta-content {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .cta-image {
    width: 100px;
    height: 100px;
  }

  .typewriter-text {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .cta-button {
    width: 100%;
    justify-content: center;
    font-size: 0.9rem;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .cta-content {
    padding: 1rem;
  }

  .cta-image {
    width: 80px;
    height: 80px;
  }

  .typewriter-text {
    font-size: 0.8rem;
    text-align: left;
  }

  .window-title {
    font-size: 0.9rem;
  }
}

/* Fallback pour éviter l'invisibilité */
@media (prefers-reduced-motion: reduce) {
  .cta-section,
  .cta-image,
  .cta-text,
  .cta-button {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
