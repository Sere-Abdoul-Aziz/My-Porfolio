<template>
  <div class="contact-button-container">
    <a 
      :href="phoneLink" 
      class="contact-button"
      @click="handleContactClick"
      @mouseenter="handleHover"
      @mouseleave="handleLeave"
      @touchstart="handleTouch"
      aria-label="Appeler SERE Abdoul Aziz"
    >
      <!-- ✅ Ajout d'un pulse ring léger -->
      <div class="pulse-ring"></div>
      
      <div class="button-content">
        <div class="icon-wrapper">
          <svg class="phone-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </div>
        <div class="text-content">
          <span class="main-text">Contactez-moi</span>
          <span class="sub-text">Appelez maintenant</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAnalytics } from '~/composables/useAnalytics'

const props = defineProps({
  phoneNumber: { type: String, default: '+22671037367' }
})

const phoneLink = computed(() => `tel:${props.phoneNumber}`)
const { trackContactAction, isGtagEnabled } = useAnalytics()

// ✅ Tracking du clic de contact (avec vérification)
const handleContactClick = () => {
  // 📊 Tracker l'action de contact seulement si gtag est disponible
  if (isGtagEnabled()) {
    trackContactAction('call', 'phone_button')
  }
  
  // Feedback tactile existant
  if (navigator.vibrate) {
    navigator.vibrate(50)
  }
}

// ... reste du code existant
</script>

<style scoped>
.contact-button-container {
  display: block;
  width: 100%;
  margin: 1.5rem auto 0;
  padding: 0 1rem;
}

/* Masquer sur desktop */
@media (min-width: 1025px) {
  .contact-button-container {
    display: none;
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
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border-radius: 35px;
  text-decoration: none;
  color: white;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
  overflow: hidden;
  
  /* ✅ Animation principale optimisée */
  animation: breathe 4s ease-in-out infinite;
}

/* ✅ Pulse ring - Animation constante et légère */
.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(34, 197, 94, 0.6);
  border-radius: 35px;
  transform: translate(-50%, -50%);
  animation: pulseRing 3s ease-out infinite;
  pointer-events: none;
}

/* ✅ Animations ultra-légères et optimisées */
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 12px 35px rgba(34, 197, 94, 0.4);
  }
}

@keyframes pulseRing {
  0% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0.7;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.3;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 0;
  }
}

.contact-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 35px rgba(34, 197, 94, 0.5);
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  animation-play-state: paused; /* ✅ Pause l'animation au hover */
}

.contact-button:active {
  transform: translateY(0) scale(0.98);
  transition: transform 0.1s ease;
}

.button-content {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  z-index: 2;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  transition: transform 0.2s ease;
  
  /* ✅ Animation subtile de l'icône */
  animation: iconFloat 2s ease-in-out infinite alternate;
}

@keyframes iconFloat {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-2px);
  }
}

.contact-button:hover .icon-wrapper {
  transform: rotate(10deg) scale(1.1) translateY(-2px);
  animation-play-state: paused;
}

.phone-icon {
  width: 20px;
  height: 20px;
  opacity: 0.9;
  
  /* ✅ Animation très subtile de rotation */
  animation: iconPulse 3s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
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
  font-weight: 600;
  margin-bottom: 2px;
  line-height: 1.2;
  
  /* ✅ Animation subtile du texte */
  animation: textShimmer 6s ease-in-out infinite;
}

@keyframes textShimmer {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.95;
  }
}

.sub-text {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.8;
  line-height: 1.2;
}

/* Optimisations mobile */
@media (max-width: 768px) {
  .contact-button {
    height: 65px;
    max-width: 300px;
  }
  
  .contact-button:active {
    transform: scale(0.95);
  }
  
  .main-text {
    font-size: 15px;
  }
  
  .sub-text {
    font-size: 11px;
  }
  
  /* ✅ Animation plus subtile sur mobile */
  @keyframes breathe {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.01);
    }
  }
}

/* ✅ Respect des préférences d'accessibilité */
@media (prefers-reduced-motion: reduce) {
  .contact-button,
  .pulse-ring,
  .icon-wrapper,
  .phone-icon,
  .main-text {
    animation: none !important;
  }
  
  .contact-button:hover {
    transform: translateY(-2px);
    animation: none;
  }
  
  .icon-wrapper {
    animation: none;
  }
  
  .contact-button:hover .icon-wrapper {
    transform: rotate(10deg) scale(1.1);
  }
}

/* ✅ Focus pour accessibilité */
.contact-button:focus-visible {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
  animation-play-state: paused;
}

/* ✅ Optimisations de performance */
.contact-button,
.pulse-ring,
.icon-wrapper,
.phone-icon {
  will-change: transform;
  transform-origin: center;
}

/* ✅ GPU acceleration */
.contact-button {
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>