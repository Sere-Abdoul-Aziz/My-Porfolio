<template>
  <div class="contact-button-container">
    <a 
      :href="phoneLink" 
      class="contact-button"
      @mouseover="hoverAnimation"
      @mouseleave="leaveAnimation"
      @touchstart="touchStartAnimation"
      @touchend="touchEndAnimation"
    >
      <div class="button-content">
        <div class="icon-wrapper">
          <i class="fas fa-phone phone-icon"></i>
          <div class="pulse-ring"></div>
          <div class="pulse-ring-2"></div>
        </div>
        <div class="text-content">
          <span class="main-text">Contactez-moi</span>
          <span class="sub-text">Appelez maintenant</span>
        </div>
        <div class="call-animation">
          <i class="fas fa-phone-volume"></i>
        </div>
      </div>
      
      <!-- Particules d'animation -->
      <div class="particle" v-for="n in 6" :key="n" :class="`particle-${n}`"></div>
      
      <!-- Effet de brillance -->
      <div class="shimmer-effect"></div>
      
      <!-- Vagues d'animation -->
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
      <div class="wave wave-3"></div>
    </a>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { gsap } from 'gsap';

// Props avec valeur par défaut
const props = defineProps({
  phoneNumber: {
    type: String,
    default: '+22671037367' 
  }
});

// Variables réactives
const isAnimating = ref(false);

// Computed pour formater le lien (on garde la fonctionnalité d'appel)
const phoneLink = computed(() => `tel:${props.phoneNumber}`);

// Plus besoin de formattedPhone puisqu'on n'affiche plus le numéro

// Animations GSAP
const hoverAnimation = () => {
  if (isAnimating.value) return;
  
  const tl = gsap.timeline();
  
  tl.to('.contact-button', {
    scale: 1.05,
    y: -5,
    duration: 0.3,
    ease: 'back.out(1.7)'
  })
  .to('.phone-icon', {
    rotate: 15,
    scale: 1.2,
    duration: 0.3,
    ease: 'elastic.out(1, 0.5)'
  }, 0)
  .to('.call-animation', {
    opacity: 1,
    scale: 1,
    rotate: 360,
    duration: 0.5,
    ease: 'power2.out'
  }, 0.1);
};

const leaveAnimation = () => {
  if (isAnimating.value) return;
  
  const tl = gsap.timeline();
  
  tl.to('.contact-button', {
    scale: 1,
    y: 0,
    duration: 0.3,
    ease: 'power2.out'
  })
  .to('.phone-icon', {
    rotate: 0,
    scale: 1,
    duration: 0.3,
    ease: 'power2.out'
  }, 0)
  .to('.call-animation', {
    opacity: 0,
    scale: 0.5,
    rotate: 0,
    duration: 0.3,
    ease: 'power2.out'
  }, 0);
};

const touchStartAnimation = () => {
  isAnimating.value = true;
  
  gsap.to('.contact-button', {
    scale: 0.95,
    duration: 0.1,
    ease: 'power2.out'
  });
  
  // Animation des particules au touch
  gsap.to('.particle', {
    scale: 1.5,
    opacity: 1,
    duration: 0.2,
    stagger: 0.05,
    ease: 'power2.out'
  });
};

const touchEndAnimation = () => {
  setTimeout(() => {
    isAnimating.value = false;
  }, 200);
  
  gsap.to('.contact-button', {
    scale: 1,
    duration: 0.2,
    ease: 'elastic.out(1, 0.5)'
  });
  
  // Success animation
  gsap.to('.contact-button', {
    scale: 1.1,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut'
  });
};

onMounted(() => {
  // Animation d'apparition
  gsap.fromTo('.contact-button-container', 
    {
      opacity: 0,
      y: 50,
      scale: 0.8
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      delay: 0.5,
      ease: 'back.out(1.7)'
    }
  );
  
  // Animation des vagues en continu
  gsap.to('.wave', {
    scale: 2,
    opacity: 0,
    duration: 2,
    stagger: 0.3,
    repeat: -1,
    ease: 'power2.out'
  });
});
</script>

<style scoped>
.contact-button-container {
  display: none; /* Caché par défaut */
  width: 100%;
  margin: 1.5rem auto 0;
  padding: 0 1rem;
}

/* Affichage uniquement sur mobile */
@media (max-width: 768px) {
  .contact-button-container {
    display: block;
  }
}

.contact-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 320px;
  height: 70px;
  margin: 0 auto;
  padding: 0 20px;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%);
  border-radius: 35px;
  text-decoration: none;
  color: white;
  font-family: 'Fira Code', monospace;
  font-weight: 600;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 
    0 10px 30px rgba(34, 197, 94, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  
  /* Animation constante de pulsation */
  animation: 
    breathingGlow 3s ease-in-out infinite alternate,
    gentleBounce 4s ease-in-out infinite;
}

@keyframes breathingGlow {
  0% {
    box-shadow: 
      0 10px 30px rgba(34, 197, 94, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
      0 0 20px rgba(34, 197, 94, 0.2);
  }
  100% {
    box-shadow: 
      0 15px 40px rgba(34, 197, 94, 0.6),
      0 0 0 1px rgba(255, 255, 255, 0.2) inset,
      0 0 30px rgba(34, 197, 94, 0.4);
  }
}

@keyframes gentleBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

.button-content {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  z-index: 2;
  position: relative;
}

.icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  backdrop-filter: blur(10px);
}

.phone-icon {
  font-size: 20px;
  z-index: 2;
  position: relative;
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.pulse-ring,
.pulse-ring-2 {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: pulseRings 2s ease-out infinite;
}

.pulse-ring-2 {
  animation-delay: 1s;
  border-color: rgba(255, 255, 255, 0.4);
}

@keyframes pulseRings {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}

.text-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: left;
}

.main-text {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 2px;
  animation: textShimmer 3s ease-in-out infinite;
}

.sub-text {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.9;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.8);
}

@keyframes textShimmer {
  0%, 100% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
  50% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  }
}

.call-animation {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  opacity: 0;
  transform: scale(0.5);
  color: rgba(255, 255, 255, 0.8);
}

/* Particules d'animation */
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}

.particle-1 { top: 20%; left: 20%; animation: particleFloat1 6s ease-in-out infinite; }
.particle-2 { top: 30%; right: 25%; animation: particleFloat2 5s ease-in-out infinite; }
.particle-3 { bottom: 25%; left: 30%; animation: particleFloat3 7s ease-in-out infinite; }
.particle-4 { bottom: 20%; right: 20%; animation: particleFloat4 4s ease-in-out infinite; }
.particle-5 { top: 50%; left: 10%; animation: particleFloat5 8s ease-in-out infinite; }
.particle-6 { top: 40%; right: 15%; animation: particleFloat6 6s ease-in-out infinite; }

@keyframes particleFloat1 {
  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
  50% { transform: translateY(-10px) translateX(5px); opacity: 0.8; }
}

@keyframes particleFloat2 {
  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
  50% { transform: translateY(-8px) translateX(-3px); opacity: 0.7; }
}

@keyframes particleFloat3 {
  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
  50% { transform: translateY(12px) translateX(-8px); opacity: 0.9; }
}

@keyframes particleFloat4 {
  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
  50% { transform: translateY(8px) translateX(4px); opacity: 0.6; }
}

@keyframes particleFloat5 {
  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
  50% { transform: translateY(-15px) translateX(10px); opacity: 1; }
}

@keyframes particleFloat6 {
  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
  50% { transform: translateY(-5px) translateX(-6px); opacity: 0.8; }
}

/* Effet de brillance */
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
  animation: autoShimmer 4s ease-in-out infinite;
}

@keyframes autoShimmer {
  0%, 90%, 100% {
    left: -100%;
  }
  10%, 20% {
    left: 100%;
  }
}

/* Vagues d'animation */
.wave {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.wave-1 { animation-delay: 0s; }
.wave-2 { animation-delay: 0.7s; }
.wave-3 { animation-delay: 1.4s; }

/* États actifs */
.contact-button:active {
  transform: scale(0.95);
}

.contact-button:hover {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 50%, #166534 100%);
}

/* Effet de vibration au touch pour mobile */
@media (max-width: 768px) {
  .contact-button:active {
    animation: vibrate 0.3s linear;
  }
}

@keyframes vibrate {
  0% { transform: translate(0); }
  20% { transform: translate(-1px, 1px); }
  40% { transform: translate(-1px, -1px); }
  60% { transform: translate(1px, 1px); }
  80% { transform: translate(1px, -1px); }
  100% { transform: translate(0); }
}

/* Respect des préférences d'accessibilité */
@media (prefers-reduced-motion: reduce) {
  .contact-button,
  .phone-icon,
  .particle,
  .pulse-ring,
  .pulse-ring-2,
  .shimmer-effect,
  .wave {
    animation: none !important;
  }
  
  .contact-button {
    animation: breathingGlow 3s ease-in-out infinite alternate !important;
  }
}
</style>