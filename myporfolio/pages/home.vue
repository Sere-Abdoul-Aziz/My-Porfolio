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
import ProjectsSection from '@/components/ProjectsSection.vue';
import InteractiveDeveloperSection from '@/components/InteractiveDeveloperSection.vue';
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
  
  setTimeout(() => {
    console.log('🎬 Initialisation animation "Chute de Canvas"...');
    
    // Configuration de la perspective pour l'effet 3D
    const container = document.querySelector('.content');
    if (container) {
      gsap.set(container, { 
        perspective: 1000,
        transformStyle: "preserve-3d"
      });
    }
    
    const h1Elements = document.querySelectorAll("header h1");
    const h2Elements = document.querySelectorAll("header h2");
    
    console.log('📝 H1 elements found:', h1Elements.length);
    console.log('📝 H2 elements found:', h2Elements.length);
    
    // Animation "Chute de Canvas" pour H1
    if (h1Elements.length > 0) {
      gsap.fromTo(h1Elements, 
        {
          // État initial : très loin, très grand, invisible
          opacity: 0,
          scale: 4,
          z: -1000,
          rotationX: 45,
          rotationY: 15,
          transformOrigin: "center center",
          filter: "blur(20px)"
        },
        {
          // État final : position normale
          opacity: 1,
          scale: 1,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power3.out",
          delay: 0.3,
          transformOrigin: "center center",
          onStart: () => {
            console.log("🎬 H1 Canvas Drop animation started");
            gsap.set(h1Elements, { visibility: 'visible' });
          },
          onComplete: () => {
            console.log("✅ H1 Canvas Drop animation completed");
            
            // Rebond final
            gsap.to(h1Elements, {
              scale: 1.05,
              duration: 0.2,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
              onComplete: () => {
                // 🌟 EFFETS DE LUMIÈRE POUR H1
                addLightEffects(h1Elements[0], 'h1');
              }
            });
          }
        }
      );
    }
    
    // Animation "Chute de Canvas" pour H2 (avec délai)
    if (h2Elements.length > 0) {
      gsap.fromTo(h2Elements, 
        {
          // État initial : approche depuis un angle différent
          opacity: 0,
          scale: 3.5,
          z: -800,
          rotationX: -30,
          rotationY: -20,
          transformOrigin: "center center",
          filter: "blur(15px)"
        },
        {
          // État final
          opacity: 1,
          scale: 1,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power3.out",
          delay: 0.8,
          transformOrigin: "center center",
          onStart: () => {
            console.log("🎬 H2 Canvas Drop animation started");
            gsap.set(h2Elements, { visibility: 'visible' });
          },
          onComplete: () => {
            console.log("✅ H2 Canvas Drop animation completed");
            
            // Rebond final différent pour H2
            gsap.to(h2Elements, {
              scale: 1.03,
              duration: 0.3,
              yoyo: true,
              repeat: 1,
              ease: "elastic.out(1, 0.5)",
              onComplete: () => {
                // 🌟 EFFETS DE LUMIÈRE POUR H2
                addLightEffects(h2Elements[0], 'h2');
              }
            });
          }
        }
      );
    }

    // 🌟 Fonction pour ajouter les effets de lumière
    function addLightEffects(element, type) {
      console.log(`✨ Adding light effects to ${type}`);
      
      // Ajouter la classe pour les effets CSS
      element.classList.add('light-effects-active');
      
      // Animation de pulsation subtile de la text-shadow
      gsap.to(element, {
        textShadow: "0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)",
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 3,
        onComplete: () => {
          // Effet de brillance subtil permanent
          gsap.set(element, {
            textShadow: "0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)"
          });
          
          // Animation de scintillement léger continu
          startContinuousGlow(element);
        }
      });

      // Animation de particules de lumière
      createLightParticles(element);
    }

    // 🌟 Fonction pour le scintillement continu
    function startContinuousGlow(element) {
      gsap.to(element, {
        textShadow: "0 0 15px rgba(59, 130, 246, 0.4), 0 0 25px rgba(59, 130, 246, 0.3)",
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    // 🌟 Fonction pour créer des particules de lumière
    function createLightParticles(element) {
      const rect = element.getBoundingClientRect();
      const container = element.parentNode;
      
      // Créer plusieurs particules de lumière
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'light-particle';
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 5;
        `;
        
        container.appendChild(particle);
        
        // Position initiale aléatoire autour du texte
        const startX = Math.random() * rect.width;
        const startY = Math.random() * rect.height;
        
        gsap.set(particle, {
          x: startX,
          y: startY,
          opacity: 0,
          scale: 0
        });
        
        // Animation des particules
        gsap.timeline()
          .to(particle, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: i * 0.1
          })
          .to(particle, {
            x: startX + (Math.random() - 0.5) * 100,
            y: startY - Math.random() * 50,
            opacity: 0,
            scale: 0.5,
            duration: 2,
            ease: "power2.out"
          }, "-=0.3")
          .call(() => {
            particle.remove();
          });
      }
    }

    // Animation pour GlassBox - Effet de matérialisation après les titres
    setTimeout(() => {
      const glassBoxElement = document.querySelector(".glassmorphism-box");
      console.log('🔍 GlassBox element found:', glassBoxElement);
      
      if (glassBoxElement) {
        gsap.fromTo(glassBoxElement, 
          {
            opacity: 0,
            scale: 0.3,
            z: -200,
            rotationX: 90,
            transformOrigin: "center bottom",
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            scale: 1,
            z: 0,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "back.out(1.7)",
            onStart: () => {
              console.log("✨ GlassBox materializing...");
              gsap.set(glassBoxElement, { visibility: 'visible' });
            },
            onComplete: () => console.log("✅ GlassBox materialization completed")
          }
        );
      }
    }, 2000);

    ScrollTrigger.refresh();
    
  }, 100);
});
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
