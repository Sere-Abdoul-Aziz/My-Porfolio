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
          <div class="button-glow"></div>
          <div class="button-content">
            <div class="icon-container">
              <i class="fas fa-envelope"></i>
            </div>
            <span class="button-text">Prenons contact</span>
          </div>
          <div class="button-arrow">
            <i class="fas fa-arrow-right"></i>
          </div>
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
import { onMounted, ref, nextTick, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import ContactModal from './ContactModal.vue';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const typewriterText = ref(null);
const isContactModalOpen = ref(false);
// Cache de sélecteurs DOM pour éviter les requêtes répétées
const elements = ref({
  button: null,
  iconContainer: null,
  buttonGlow: null
});
// Stock pour les timelines et animations GSAP
const animations = ref({
  pulse: null,
  iconRotation: null
});
// Pour le nettoyage des event listeners
const eventCleanupFunctions = ref([]);

const openContactModal = () => {
  isContactModalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeContactModal = () => {
  isContactModalOpen.value = false;
  document.body.style.overflow = 'auto';
};

const handleFormSubmit = (formData) => {
  console.log('Form Submitted:', formData);
  alert(`Merci, ${formData.firstName}! Votre message a été envoyé.`);
  closeContactModal();
};

// Fonction de debounce pour les événements fréquents
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

onMounted(async () => {
  await nextTick();

  // Stocker les références DOM pour éviter les requêtes répétées
  elements.value.button = document.querySelector('.cta-button');
  elements.value.iconContainer = document.querySelector('.icon-container');
  elements.value.buttonGlow = document.querySelector('.button-glow');
  
  // Créer un contexte de performance isolé
  const ctx = gsap.context(() => {
    // Text plus court et fragmenté pour performance
    const textContent = "Besoin d’un développeur fiable pour vos projets web, mobile ou logiciels ? Je mets mon expertise à votre service pour concrétiser vos ambitions, en toute simplicité. Que vous soyez une entreprise, une startup ou un indépendant, je suis à l’écoute, disponible, et facilement joignable pour vous accompagner à chaque étape. Mon approche : proximité, réactivité et confiance, pour bâtir ensemble une solution qui vous ressemble. Ensemble, faisons de votre projet une réussite.";

    // Animation d'entrée simplifiée
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#cta-section',
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true // Exécuter une seule fois pour économiser des ressources
      }
    });
    
    // Grouper les animations d'entrée pour optimiser les performances
    masterTimeline
      .set('#cta-section', { opacity: 0, y: 50 })
      .set('.cta-image', { opacity: 0, scale: 0.8, rotation: 15 })
      .set('.cta-text', { opacity: 0, x: -50 })
      .set('.cta-button', { opacity: 0, scale: 0.5 })
      .to('#cta-section', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      })
      .to('.cta-image', {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: 'back.out(1.7)'
      }, "-=0.5")
      .to('.cta-text', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, "-=0.5")
      .to(typewriterText.value, {
        text: {
          value: textContent,
          delimiter: " " // Anime mot par mot pour plus de performance
        },
        duration: 2,
        ease: "none"
      })
      .to('.cta-button', {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, "-=0.8");
    
    // Animation de pulsation optimisée
    animations.value.pulse = gsap.timeline({ 
      repeat: -1, 
      yoyo: true, 
      repeatDelay: 5,
      paused: true // Démarre uniquement quand visible
    });
    
    animations.value.pulse
      .to(elements.value.button, { 
        boxShadow: '0 10px 25px rgba(29, 78, 216, 0.5), 0 6px 12px rgba(0, 0, 0, 0.15)',
        scale: 1.03,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to(elements.value.buttonGlow, { 
        opacity: 0.4,
        duration: 0.4,
        ease: 'power2.in'
      }, "-=0.8")
      .to(elements.value.buttonGlow, { 
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, "+=0.4");

    // Animation de l'icône
    animations.value.iconRotation = gsap.to(elements.value.iconContainer.querySelector('i'), {
      rotationY: 360,
      duration: 1.2,
      repeat: -1,
      repeatDelay: 8,
      ease: 'power1.inOut',
      paused: true // Démarre uniquement quand visible
    });

    // Observer pour démarrer/arrêter les animations quand visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animations.value.pulse.play();
          animations.value.iconRotation.play();
        } else {
          animations.value.pulse.pause();
          animations.value.iconRotation.pause();
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(document.querySelector('#cta-section'));
    
    // Pré-créer le pool de particules
    if (elements.value.button) {
      const particlePool = [];
      const PARTICLE_COUNT = 5;
      
      // Créer les particules à l'avance
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particle = document.createElement('div');
        particle.className = 'button-particle';
        particle.style.opacity = '0';
        fragment.appendChild(particle);
        particlePool.push(particle);
      }
      elements.value.button.appendChild(fragment);
      
      // Fonction optimisée pour le mouseenter
      const handleMouseEnter = debounce(() => {
        if (!elements.value.iconContainer) return;
        
        gsap.to(elements.value.iconContainer, {
          rotate: 12,
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
        
        // Animer seulement les particules visibles
        const visibleParticleCount = Math.min(3, PARTICLE_COUNT);
        for (let i = 0; i < visibleParticleCount; i++) {
          const particle = particlePool[i];
          
          gsap.set(particle, {
            x: gsap.utils.random(20, 80, 1) + '%',
            y: '100%',
            scale: gsap.utils.random(0.5, 0.8, 0.1),
            opacity: gsap.utils.random(0.2, 0.6, 0.1)
          });
          
          gsap.to(particle, {
            y: '-80%',
            opacity: 0,
            duration: 0.8,
            ease: 'power1.out',
            onComplete: () => gsap.set(particle, { opacity: 0 })
          });
        }
      }, 50); // Debounce de 50ms
      
      // Fonction optimisée pour le mouseleave
      const handleMouseLeave = debounce(() => {
        if (!elements.value.iconContainer) return;
        
        gsap.to(elements.value.iconContainer, {
          rotate: 0,
          duration: 0.2,
          ease: 'power1.out'
        });
      }, 50);
      
      elements.value.button.addEventListener('mouseenter', handleMouseEnter);
      elements.value.button.addEventListener('mouseleave', handleMouseLeave);
      
      // Stocker les fonctions pour le cleanup
      eventCleanupFunctions.value.push(() => {
        elements.value.button.removeEventListener('mouseenter', handleMouseEnter);
        elements.value.button.removeEventListener('mouseleave', handleMouseLeave);
      });
    }
  });
  
  // Ajouter la fonction de nettoyage du contexte
  eventCleanupFunctions.value.push(() => ctx.revert());
});

// Nettoyer toutes les animations et event listeners
onBeforeUnmount(() => {
  // Nettoyer les event listeners
  eventCleanupFunctions.value.forEach(cleanup => cleanup());
  eventCleanupFunctions.value = [];
  
  // Tuer les animations GSAP en cours
  if (animations.value.pulse) animations.value.pulse.kill();
  if (animations.value.iconRotation) animations.value.iconRotation.kill();
  
  // Nettoyer les ScrollTriggers
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>

<style scoped>
.cta-section {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 4rem auto;
  position: relative;
  z-index: 10;
  overflow: hidden;
  color: white;
  /* Utiliser une seule propriété composite au lieu de plusieurs individuelles */
  transform: translate3d(0, 0, 0);
  contain: content; /* Optimiser le rendu */
}

/* Appliquer backdrop-filter uniquement si supporté */
@supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
  .cta-section {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}

.cta-header {
  background-color: #252526;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #3c3c3c;
  contain: content; /* Optimiser le rendu */
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
  contain: content; /* Optimiser le rendu */
}

.cta-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid rgba(59, 130, 246, 0.5);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
  /* Utiliser transform pour optimiser le GPU */
  transform: translate3d(0, 0, 0);
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

/* Optimisation du rendu du bouton */
.cta-button {
  position: relative;
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  font-weight: 600;
  padding: 0;
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(29, 78, 216, 0.3);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
              box-shadow 0.3s ease;
  transform: translateZ(0); /* Forcer la GPU */
  contain: content; /* Optimiser le rendu */
}

/* Appliquer backdrop-filter uniquement si supporté */
@supports (backdrop-filter: blur(8px)) or (-webkit-backdrop-filter: blur(8px)) {
  .cta-button {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(29, 78, 216, 0.3));
  }
  
  .cta-button:hover {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(29, 78, 216, 0.4));
  }
}

.cta-button:hover {
  transform: translateY(-5px) translateZ(0);
  box-shadow: 0 15px 30px rgba(29, 78, 216, 0.4);
}

.cta-button i {
  font-size: 1.1rem;
}

.cta-button:active {
  transform: translateY(-2px) scale(0.98) translateZ(0);
  box-shadow: 0 5px 15px rgba(29, 78, 216, 0.3);
}

/* Optimiser l'effet de lueur */
.button-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.6) 0%, transparent 60%);
  opacity: 0;
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: overlay;
}

.button-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 14px 24px;
  contain: content; /* Optimiser le rendu */
}

.icon-container {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  transform: translateZ(0); /* Forcer la GPU */
}

.icon-container i {
  font-size: 1rem;
  z-index: 2;
}

.button-arrow {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%) scale(0) translateZ(0);
  opacity: 0;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.9);
  z-index: 2;
}

.cta-button:hover .button-arrow {
  transform: translateY(-50%) scale(1) translateZ(0);
  opacity: 1;
  right: 15px;
}

.cta-button:hover .button-text {
  transform: translateX(-10px) translateZ(0);
}

.button-text {
  transition: transform 0.25s ease;
  transform: translateZ(0); /* Forcer la GPU */
}

/* Optimiser les particules */
.button-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  z-index: 1;
  pointer-events: none;
  transform: translateZ(0); /* Forcer la GPU */
}

/* Media queries restent inchangées */
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
  
  /* Désactiver les particules sur mobile */
  .button-particle {
    display: none;
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

/* Fallback pour préserver l'accessibilité */
@media (prefers-reduced-motion: reduce) {
  .cta-section,
  .cta-image,
  .cta-text,
  .cta-button {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
    transition: none !important;
  }
  
  .typewriter-text {
    visibility: visible !important;
  }
}
</style>
