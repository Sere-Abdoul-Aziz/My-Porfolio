<template>
  <div id="parallax-container" class="parallax-container">
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
      <TechnologiesSection />
      <CertificationsSection />
      <ExperienceSection />
      <LanguagesSection />
      <CtaSection /> 
    </main>
    <BottomImage />
  </div>
</template>

<script setup>
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
  background: linear-gradient(to bottom, rgba(10, 25, 45, 0.9), rgb(19, 19, 19));
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 50px;
  transition: background 0.3s ease;
}
</style>
