<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

  <div id="parallax-container" class="parallax-container">
    <AnimatedBackground />
    <IcebergImage />
    <main class="content flex-grow flex flex-col justify-center items-center text-center px-4">
      <header>
        <h1 class="text-gray-200 text-4xl md:text-6xl lg:text-8xl font-bold leading-tight devant">
          Bonjour, je suis <span class="text-primary text-blue-400">SERE</span>,
        </h1>
        <h2 class="text-gray-200 text-4xl md:text-6xl lg:text-8xl font-bold leading-tight devant">
          <span class="text-primary">Ingénieur en Génie Logiciel</span> <span class="text-primary text-blue-400">Fullstack</span>
        </h2>
      </header>
      
      <!-- Assurer que GlassBox a un conteneur visible -->
      <div class="glassbox-container" style="width: 100%; margin: 3rem 0; z-index: 10; position: relative;">
        <GlassBox />
         <ContactButton :phoneNumber="+22671037367" />
      </div>
      
      <section id="projects" aria-labelledby="projects-title">
        <h2 id="projects-title" class="text-gray-200 text-2xl md:text-4xl lg:text-6xl font-bold leading-tight devant mt-10 lg:mt-20">
          PROJETS <span class="text-primary text-blue-400">VEDETTES</span>
        </h2>
        <ProjectsSection />
      </section>
      
      <section id="about-me" aria-labelledby="about-me-title">
        <InteractiveDeveloperSection />
      </section>
      
      <section id="services" aria-labelledby="services-title">
        <ServiceSection />
      </section>
      
      <section id="technologies" aria-labelledby="technologies-title">
        <TechnologiesSection />
      </section>
      
      <section id="certifications" aria-labelledby="certifications-title">
        <CertificationsSection />
      </section>
      
      <section id="experience" aria-labelledby="experience-title">
        <ExperienceSection />
      </section>
      
      
      
      <section id="languages" aria-labelledby="languages-title">
        <LanguagesSection />
      </section>
      
      <section id="contact" aria-labelledby="contact-title">
        <CtaSection />
      </section>
      
      <Footer />
    </main>
    <BottomImage />
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue';
import AnimatedBackground from '@/components/AnimatedBackground.vue';
import IcebergImage from '@/components/IcebergImage.vue';
import GlassBox from '@/components/GlassBox.vue';
import InteractiveDeveloperSection from '@/components/InteractiveDeveloperSection.vue';
import ProjectsSection from '@/components/ProjectsSection.vue';
import ServiceSection from '@/components/ServiceSection.vue';
import TechnologiesSection from '@/components/TechnologiesSection.vue';
import CertificationsSection from '@/components/CertificationsSection.vue';
import ExperienceSection from '@/components/ExperienceSection.vue';
import LanguagesSection from '@/components/LanguagesSection.vue';
import CtaSection from '@/components/CtaSection.vue';
import BottomImage from '@/components/BottomImage.vue';
import Footer from '@/components/Footer.vue';
import ContactButton from '@/components/ContactButton.vue';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

onMounted(async () => {
  await nextTick();
  
  // ✅ Animation simplifiée et plus rapide
  setTimeout(() => {
    console.log('🎬 Initialisation animations optimisées...');
    
    const h1Elements = document.querySelectorAll("header h1");
    const h2Elements = document.querySelectorAll("header h2");
    
    // ✅ Animation H1 plus rapide et moins coûteuse
    if (h1Elements.length > 0) {
      gsap.fromTo(h1Elements, 
        {
          opacity: 0,
          scale: 1.5, // ✅ Réduit de 4 à 1.5
          y: -30,
          filter: "blur(5px)" // ✅ Réduit de 20px à 5px
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8, // ✅ Réduit de 1.8s à 0.8s
          ease: "power2.out",
          delay: 0.1,
          onComplete: () => addLightEffects(h1Elements[0])
        }
      );
    }

    // ✅ Animation H2 plus rapide
    if (h2Elements.length > 0) {
      gsap.fromTo(h2Elements, 
        {
          opacity: 0,
          scale: 1.3, // ✅ Réduit de 3.5 à 1.3
          y: -20,
          filter: "blur(3px)"
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6, // ✅ Réduit de 1.6s à 0.6s
          ease: "power2.out",
          delay: 0.4,
          onComplete: () => addLightEffects(h2Elements[0])
        }
      );
    }

    // ✅ GlassBox animation simplifiée
    setTimeout(() => {
      const glassBoxElement = document.querySelector(".glassmorphism-box");
      if (glassBoxElement) {
        gsap.fromTo(glassBoxElement, 
          { opacity: 0, scale: 0.9, y: 20 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 0.5, // ✅ Réduit de 1.2s à 0.5s
            ease: "back.out(1.1)"
          }
        );
      }
    }, 600); // ✅ Réduit de 2000ms à 600ms

    ScrollTrigger.refresh();
  }, 50); // ✅ Réduit de 100ms à 50ms
});

// ✅ Effets de lumière simplifiés
function addLightEffects(element) {
  if (!element) return;
  
  gsap.to(element, {
    textShadow: "0 0 10px rgba(59, 130, 246, 0.3)",
    duration: 1, // ✅ Réduit de 2s à 1s
    ease: "power1.inOut",
    yoyo: true,
    repeat: 1 // ✅ Réduit de 3 à 1
  });
}
</script>

<style scoped>
.devant {
  z-index: 1;
}

/* Amélioration pour les animations 3D */
.content {
  perspective: 1000px;
  perspective-origin: center center;
  transform-style: preserve-3d;
}

header {
  transform-style: preserve-3d;
}

header h1, header h2 {
  backface-visibility: hidden;
  will-change: transform, opacity, filter;
  transform-style: preserve-3d;
}

.parallax-container {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, 
    #0a192f 0%, 
    #1e3a8a 50%, 
    #0f172a 100%);
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 50px;
  isolation: isolate;
  transform: translateZ(0);
}

.content {
  position: relative;
  z-index: 2;
  width: 100%;
}

.font-fira-code {
  font-family: 'Fira Code', monospace;
}

/* Optimisation pour les performances d'animation */
.glassmorphism-box {
  will-change: transform, opacity, filter;
  backface-visibility: hidden;
}

.parallax-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    #0a192f 0%, 
    #1e3a8a 50%, 
    #0f172a 100%);
  z-index: -2;
}

/* Animation de fallback en CSS pour les navigateurs moins performants */
@media (prefers-reduced-motion: reduce) {
  header h1, header h2 {
    animation: simpleFadeIn 1s ease-out forwards;
  }
}

@keyframes simpleFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
