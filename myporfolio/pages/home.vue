<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

  <div id="parallax-container" class="parallax-container">
    <AnimatedBackground />
    <IcebergImage />
    <main class="content flex-grow flex flex-col justify-center items-center text-center px-4 ">
      <h1 class="text-gray-200 text-4xl md:text-6xl lg:text-8xl font-bold leading-tight ">
        Bonjour, je suis <span class="text-primary text-blue-400">SERE</span>,
      </h1>
      <h1 class="text-gray-200 text-4xl md:text-6xl lg:text-8xl font-bold leading-tight devant">
        <span class="text-primary">Ingénieur en Génie Logiciel</span> <span class="text-primary text-blue-400">Fullstack</span>
      </h1>
      <GlassBox />
      
      <h1 class="text-gray-200 text-2xl md:text-4xl lg:text-6xl font-bold leading-tight devant mt-10 lg:mt-20">
        PROJETS <span class="text-primary text-blue-400">VEDETTES</span>
      </h1>
      <ProjectsSection />
      <InteractiveDeveloperSection />
      <ServiceSection />
      <TechnologiesSection />
      <CertificationsSection />
      <ExperienceSection />
      <LanguagesSection />
      <CtaSection /> 
      <Footer />
    </main>
    <BottomImage />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import AnimatedBackground from '@/components/AnimatedBackground.vue';
import IcebergImage from '@/components/IcebergImage.vue';
import GlassBox from '@/components/GlassBox.vue';
import ProjectsSection from '@/components/ProjectsSection.vue';
import InteractiveDeveloperSection from '@/components/InteractiveDeveloperSection.vue';
import TechnologiesSection from '@/components/TechnologiesSection.vue';
import CertificationsSection from '@/components/CertificationsSection.vue';
import ExperienceSection from '@/components/ExperienceSection.vue';
import LanguagesSection from '@/components/LanguagesSection.vue';
import CtaSection from '@/components/CtaSection.vue';
import BottomImage from '@/components/BottomImage.vue';
import Footer from '@/components/Footer.vue';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  // Animation pour les titres
  gsap.from("h1", {
    opacity: 0,
    y: -50,
    duration: 1.5,
    ease: "power3.out",
    stagger: 0.3,
    scrollTrigger: {
      trigger: "h1",
      start: "top 80%",
    }
  });

  // Animation pour GlassBox
  gsap.from(".glassmorphism-box", {
    opacity: 0,
    y: 50,
    duration: 1.2,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".glassmorphism-box",
      start: "top 80%",
    }
  });

  // Animation pour l'image du bas
  gsap.from(".bottom-image-container", {
    opacity: 0,
    y: 100,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".bottom-image-container",
      start: "top 80%",
    }
  });
});
</script>

<style scoped>
.devant {
  z-index: 1;
}

.parallax-container {
  position: relative;
  overflow: hidden;
  /* CORRECTION : Gradient uniquement en nuances de bleu */
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
  
  /* Optimisations pour éviter le gris */
  isolation: isolate;
  transform: translateZ(0);
}

/* Assurer que le contenu reste au-dessus de l'arrière-plan */
.content {
  position: relative;
  z-index: 2;
  width: 100%;
}

.font-fira-code {
  font-family: 'Fira Code', monospace;
}

/* Fallback pour éviter tout problème de rendu */
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
</style>
