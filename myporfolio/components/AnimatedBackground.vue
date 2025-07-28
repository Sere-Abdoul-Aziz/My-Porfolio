<template>
  <div class="animated-background">
    <!-- Particules de lumière -->
    <div class="light-particles">
      <div v-for="i in 50" :key="i" class="particle" :class="`particle-${i}`"></div>
    </div>
    
    <!-- Rayons de lumière rotatifs -->
    <div class="light-rays">
      <div v-for="i in 8" :key="i" class="ray" :class="`ray-${i}`"></div>
    </div>
    
    <!-- NOUVEAUX : Rayons océaniques réalistes - RÉDUITS -->
    <div class="ocean-light-rays">
      <div v-for="i in 12" :key="i" class="ocean-ray" :class="`ocean-ray-${i}`"></div>
    </div>
    
    <!-- NOUVEAU : Effet de caustiques (reflets de lumière dans l'eau) -->
    <div class="caustics-container">
      <div v-for="i in 8" :key="i" class="caustic" :class="`caustic-${i}`"></div>
    </div>
    
    <!-- Motifs géométriques -->
    <div class="geometric-patterns">
      <div v-for="i in 12" :key="i" class="pattern" :class="`pattern-${i}`"></div>
    </div>
    
    <!-- Gradient animé -->
    <div class="animated-gradient"></div>
    
    <!-- Ondulations -->
    <div class="wave-container">
      <div v-for="i in 3" :key="i" class="wave" :class="`wave-${i}`"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import { gsap } from 'gsap';

let animations = [];

onMounted(async () => {
  await nextTick();
  
  // Nettoyer toutes les animations précédentes
  gsap.killTweensOf("*");
  
  // Animation des particules de lumière
  for (let i = 1; i <= 50; i++) {
    const particle = document.querySelector(`.particle-${i}`);
    if (particle) {
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.8 + 0.2
      });
      
      const moveAnim = gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: Math.random() * 8 + 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
      
      const opacityAnim = gsap.to(particle, {
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 3 + 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 1
      });
      
      animations.push(moveAnim, opacityAnim);
    }
  }
  
  // Animation des rayons de lumière rotatifs
  for (let i = 1; i <= 8; i++) {
    const ray = document.querySelector(`.ray-${i}`);
    if (ray) {
      gsap.set(ray, {
        rotation: (i - 1) * 45,
        transformOrigin: "50% 100%"
      });
      
      const rotateAnim = gsap.to(ray, {
        rotation: `+=${360}`,
        duration: 20 + i * 2,
        repeat: -1,
        ease: "none"
      });
      
      const rayOpacityAnim = gsap.to(ray, {
        opacity: 0.1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5
      });
      
      animations.push(rotateAnim, rayOpacityAnim);
    }
  }
  
  // NOUVEAUX : Animation des rayons océaniques réalistes - MODIFIÉS
  const centerX = window.innerWidth / 2; // Point central d'origine
  const centerY = -100; // Origine en haut de l'écran
  
  for (let i = 1; i <= 12; i++) {
    const oceanRay = document.querySelector(`.ocean-ray-${i}`);
    if (oceanRay) {
      // Angle de dispersion depuis le centre (éventail de -30° à +30°)
      const disperseAngle = ((i - 6.5) / 5.5) * 30; // Dispersion de -30° à +30°
      
      gsap.set(oceanRay, {
        x: centerX,
        y: centerY,
        rotation: disperseAngle,
        opacity: 0,
        scaleY: 1,
        transformOrigin: "50% 0%" // Origine au sommet du rayon
      });
      
      // Animation principale : apparition lente, brillance, disparition
      const oceanRayLifecycle = gsap.timeline({ repeat: -1, delay: Math.random() * 10 });
      
      // Phase 1 : Apparition lente
      oceanRayLifecycle.to(oceanRay, {
        opacity: 0.5 + Math.random() * 0.4,
        duration: 3 + Math.random() * 4,
        ease: "power2.out"
      });
      
      // Phase 2 : Maintien avec légère pulsation
      oceanRayLifecycle.to(oceanRay, {
        opacity: 0.7 + Math.random() * 0.3,
        duration: 2 + Math.random() * 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1
      });
      
      // Phase 3 : Brillance maximum
      oceanRayLifecycle.to(oceanRay, {
        opacity: 0.8 + Math.random() * 0.2,
        duration: 1 + Math.random() * 2,
        ease: "power2.inOut"
      });
      
      // Phase 4 : Disparition lente
      oceanRayLifecycle.to(oceanRay, {
        opacity: 0,
        duration: 4 + Math.random() * 5,
        ease: "power2.in"
      });
      
      // Phase 5 : Pause avant recommencement
      oceanRayLifecycle.to(oceanRay, {
        opacity: 0,
        duration: 3 + Math.random() * 8,
        ease: "none"
      });
      
      animations.push(oceanRayLifecycle);
    }
  }
  
  // NOUVEAUX : Animation des caustiques
  for (let i = 1; i <= 8; i++) {
    const caustic = document.querySelector(`.caustic-${i}`);
    if (caustic) {
      gsap.set(caustic, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.3,
        rotation: Math.random() * 360,
        opacity: 0
      });
      
      // Animation des formes de caustiques
      const causticMorph = gsap.to(caustic, {
        scale: Math.random() * 1.5 + 0.5,
        rotation: `+=${360}`,
        duration: 8 + Math.random() * 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 4
      });
      
      // Animation d'apparition/disparition
      const causticFade = gsap.to(caustic, {
        opacity: 0.4,
        duration: 3 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 2
      });
      
      // Mouvement lent
      const causticDrift = gsap.to(caustic, {
        x: `+=${Math.random() * 300 - 150}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: 12 + Math.random() * 8,
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: Math.random() * 5
      });
      
      animations.push(causticMorph, causticFade, causticDrift);
    }
  }
  
  // Animation des motifs géométriques
  for (let i = 1; i <= 12; i++) {
    const pattern = document.querySelector(`.pattern-${i}`);
    if (pattern) {
      gsap.set(pattern, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 360
      });
      
      const patternRotateAnim = gsap.to(pattern, {
        rotation: `+=${360}`,
        duration: 15 + Math.random() * 10,
        repeat: -1,
        ease: "none"
      });
      
      const patternScaleAnim = gsap.to(pattern, {
        scale: 0.5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 2
      });
      
      animations.push(patternRotateAnim, patternScaleAnim);
    }
  }
  
  // Animation du gradient
  const gradient = document.querySelector('.animated-gradient');
  if (gradient) {
    const gradientAnim = gsap.to(gradient, {
      backgroundPosition: "200% 200%",
      duration: 15,
      repeat: -1,
      ease: "none"
    });
    animations.push(gradientAnim);
  }
  
  // Animation des ondulations
  for (let i = 1; i <= 3; i++) {
    const wave = document.querySelector(`.wave-${i}`);
    if (wave) {
      const waveAnim = gsap.to(wave, {
        x: "100vw",
        duration: 8 + i * 2,
        repeat: -1,
        ease: "none",
        delay: i * 2
      });
      animations.push(waveAnim);
    }
  }
});

onUnmounted(() => {
  // Nettoyer toutes les animations
  animations.forEach(anim => {
    if (anim && anim.kill) {
      anim.kill();
    }
  });
  animations = [];
  gsap.killTweensOf("*");
});
</script>

<style scoped>
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
  /* Background uniquement en nuances de bleu */
  background: linear-gradient(135deg, 
    #0a192f 0%, 
    #1e3a8a 50%, 
    #0f172a 100%);
  transform: translateZ(0);
}

.light-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateZ(0);
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.8) 0%, transparent 70%);
  border-radius: 50%;
  box-shadow: 
    0 0 6px rgba(96, 165, 250, 0.6),
    0 0 12px rgba(96, 165, 250, 0.4),
    0 0 18px rgba(96, 165, 250, 0.2);
  transform: translateZ(0);
}

.light-rays {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateZ(0);
}

.ray {
  position: absolute;
  width: 2px;
  height: 50vh;
  background: linear-gradient(to top, 
    transparent 0%, 
    rgba(96, 165, 250, 0.1) 20%, 
    rgba(96, 165, 250, 0.3) 50%, 
    rgba(96, 165, 250, 0.1) 80%, 
    transparent 100%);
  left: 50%;
  bottom: 0;
  transform-origin: 50% 100%;
  opacity: 0.3;
  transform: translateZ(0);
}

/* NOUVEAUX STYLES : Rayons océaniques réalistes - MODIFIÉS */
.ocean-light-rays {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: translateZ(0);
  overflow: hidden;
}

.ocean-ray {
  position: absolute;
  width: 2px; /* Très fin */
  height: 200vh; /* Infiniment long - traverse largement l'écran */
  background: linear-gradient(to bottom,
    rgba(96, 165, 250, 1) 0%,
    rgba(96, 165, 250, 0.95) 1%,
    rgba(96, 165, 250, 0.9) 3%,
    rgba(96, 165, 250, 0.85) 6%,
    rgba(96, 165, 250, 0.8) 10%,
    rgba(96, 165, 250, 0.7) 15%,
    rgba(96, 165, 250, 0.6) 22%,
    rgba(96, 165, 250, 0.5) 30%,
    rgba(96, 165, 250, 0.4) 40%,
    rgba(96, 165, 250, 0.3) 52%,
    rgba(96, 165, 250, 0.25) 65%,
    rgba(96, 165, 250, 0.2) 75%,
    rgba(96, 165, 250, 0.15) 85%,
    rgba(96, 165, 250, 0.1) 92%,
    rgba(96, 165, 250, 0.05) 97%,
    transparent 100%);
  border-radius: 1px;
  filter: blur(0.5px);
  transform-origin: 50% 0%; /* Origine au sommet */
  box-shadow: 
    0 0 6px rgba(96, 165, 250, 0.7),
    0 0 12px rgba(96, 165, 250, 0.4),
    0 0 18px rgba(96, 165, 250, 0.2);
}

/* Variations pour créer de la diversité */
.ocean-ray:nth-child(2n) {
  width: 1.5px;
  filter: blur(0.3px);
  background: linear-gradient(to bottom,
    rgba(59, 130, 246, 1) 0%,
    rgba(59, 130, 246, 0.9) 2%,
    rgba(59, 130, 246, 0.8) 5%,
    rgba(59, 130, 246, 0.7) 12%,
    rgba(59, 130, 246, 0.6) 20%,
    rgba(59, 130, 246, 0.5) 30%,
    rgba(59, 130, 246, 0.4) 42%,
    rgba(59, 130, 246, 0.3) 56%,
    rgba(59, 130, 246, 0.2) 70%,
    rgba(59, 130, 246, 0.15) 82%,
    rgba(59, 130, 246, 0.1) 90%,
    rgba(59, 130, 246, 0.05) 96%,
    transparent 100%);
}

.ocean-ray:nth-child(3n) {
  width: 3px;
  filter: blur(0.8px);
  background: linear-gradient(to bottom,
    rgba(147, 197, 253, 0.8) 0%,
    rgba(147, 197, 253, 0.75) 3%,
    rgba(147, 197, 253, 0.7) 8%,
    rgba(147, 197, 253, 0.65) 15%,
    rgba(147, 197, 253, 0.6) 25%,
    rgba(147, 197, 253, 0.5) 35%,
    rgba(147, 197, 253, 0.4) 48%,
    rgba(147, 197, 253, 0.3) 62%,
    rgba(147, 197, 253, 0.2) 75%,
    rgba(147, 197, 253, 0.15) 85%,
    rgba(147, 197, 253, 0.1) 92%,
    rgba(147, 197, 253, 0.05) 97%,
    transparent 100%);
}

.ocean-ray:nth-child(4n) {
  width: 2.5px;
  filter: blur(0.4px);
  background: linear-gradient(to bottom,
    rgba(96, 165, 250, 0.9) 0%,
    rgba(96, 165, 250, 0.85) 2%,
    rgba(96, 165, 250, 0.8) 6%,
    rgba(96, 165, 250, 0.75) 12%,
    rgba(96, 165, 250, 0.7) 20%,
    rgba(96, 165, 250, 0.6) 30%,
    rgba(96, 165, 250, 0.5) 42%,
    rgba(96, 165, 250, 0.4) 55%,
    rgba(96, 165, 250, 0.3) 68%,
    rgba(96, 165, 250, 0.2) 80%,
    rgba(96, 165, 250, 0.1) 90%,
    rgba(96, 165, 250, 0.05) 96%,
    transparent 100%);
  box-shadow: 
    0 0 8px rgba(96, 165, 250, 0.8),
    0 0 16px rgba(96, 165, 250, 0.5);
}

/* NOUVEAUX STYLES : Caustiques (reflets de lumière dans l'eau) */
.caustics-container {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateZ(0);
}

.caustic {
  position: absolute;
  width: 150px;
  height: 150px;
  background: radial-gradient(
    ellipse 70% 30% at 50% 50%,
    rgba(96, 165, 250, 0.2) 0%,
    rgba(96, 165, 250, 0.1) 30%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(2px);
  transform: translateZ(0);
}

.caustic:nth-child(even) {
  background: radial-gradient(
    ellipse 50% 80% at 30% 70%,
    rgba(96, 165, 250, 0.15) 0%,
    rgba(96, 165, 250, 0.08) 40%,
    transparent 80%
  );
  width: 200px;
  height: 100px;
}

.caustic:nth-child(3n) {
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    rgba(96, 165, 250, 0.1) 60deg,
    rgba(96, 165, 250, 0.2) 120deg,
    rgba(96, 165, 250, 0.1) 180deg,
    transparent 240deg,
    rgba(96, 165, 250, 0.05) 300deg,
    transparent 360deg
  );
  border-radius: 30% 70% 20% 80%;
  width: 120px;
  height: 120px;
}

.geometric-patterns {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateZ(0);
}

.pattern {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(96, 165, 250, 0.2);
  opacity: 0.6;
  transform: translateZ(0);
}

.pattern:nth-child(odd) {
  border-radius: 50%;
  background: rgba(96, 165, 250, 0.05);
}

.pattern:nth-child(even) {
  transform: rotate(45deg) translateZ(0);
  background: rgba(96, 165, 250, 0.02);
}

.pattern:nth-child(3n) {
  width: 30px;
  height: 30px;
  border: 2px solid rgba(96, 165, 250, 0.15);
  border-radius: 0;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.animated-gradient {
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    ellipse at center,
    rgba(96, 165, 250, 0.1) 0%,
    rgba(30, 58, 138, 0.05) 25%,
    transparent 50%,
    rgba(96, 165, 250, 0.02) 75%,
    transparent 100%
  );
  background-size: 100% 100%;
  background-position: 0% 0%;
  top: -50%;
  left: -50%;
  transform: translateZ(0);
}

.wave-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: translateZ(0);
}

.wave {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid rgba(96, 165, 250, 0.1);
  left: -100px;
  opacity: 0.3;
  transform: translateZ(0);
}

.wave-1 {
  top: 20%;
}

.wave-2 {
  top: 50%;
  border-color: rgba(96, 165, 250, 0.1);
}

.wave-3 {
  top: 80%;
  border-color: rgba(96, 165, 250, 0.15);
}

/* Effet de scintillement pour certaines particules */
.particle:nth-child(5n) {
  animation: twinkle 2s infinite;
}

@keyframes twinkle {
  0%, 100% { 
    opacity: 0.2; 
    transform: scale(1) translateZ(0); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1.5) translateZ(0); 
  }
}

/* Responsive */
@media (max-width: 768px) {
  .particle {
    width: 2px;
    height: 2px;
  }
  
  .pattern {
    width: 15px;
    height: 15px;
  }
  
  .ray {
    height: 30vh;
  }
  
  .ocean-ray {
    width: 1.5px;
  }
  
  .ocean-ray:nth-child(2n) {
    width: 1px;
  }
  
  .ocean-ray:nth-child(3n) {
    width: 2px;
  }
  
  .ocean-ray:nth-child(4n) {
    width: 1.5px;
  }
  
  .caustic {
    width: 100px;
    height: 100px;
  }
}

/* Performance optimizations */
.animated-background * {
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>