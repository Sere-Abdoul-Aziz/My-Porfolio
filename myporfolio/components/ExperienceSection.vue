<template>
  <div id="experience-section" class="experience-section">
    <h2 class="experience-header">EXPÉRIENCE PROFESSIONNELLE</h2>
    
    <div class="experience-card">
      <div class="experience-content">
        <h3 class="experience-title">Développement Web, Applications Web et mobile | Webmaster</h3>
        <p class="experience-company">2022-2024 | Jo'Fé Digital | 2 ans</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  gsap.from('.experience-card', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.experience-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  gsap.from('.experience-header', {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: 'elastic.out(1, 0.5)',
    scrollTrigger: {
      trigger: '.experience-section',
      start: 'top 100%',
      toggleActions: 'play none none none',
    },
  });
});
</script>

<style scoped>
.experience-section {
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 4rem;
}

.experience-header {
  font-size: 2.5rem;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 2rem;
  border-bottom: 2px solid #6c757d;
  display: inline-block;
  padding-bottom: 0.5rem;
}

.experience-card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin: 1rem auto;
  max-width: 600px;
  text-align: left;
}

.experience-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #495057;
}

.experience-company {
  font-size: 1.1rem;
  color: #6c757d;
}

@media (max-width: 768px) {
  .experience-section {
    padding: 1.5rem;
    margin-top: 2rem;
  }

  .experience-header {
    font-size: 2rem; /* Réduction de la taille de la police pour les écrans moyens */
    margin-bottom: 1.5rem;
  }

  .experience-card {
    padding: 1rem;
    max-width: 100%; /* S'assurer que la carte prend toute la largeur disponible */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .experience-title {
    font-size: 1.25rem; /* Réduction de la taille de la police */
  }

  .experience-company {
    font-size: 1rem; /* Réduction de la taille de la police */
  }
}

@media (max-width: 480px) {
  .experience-section {
    padding: 1rem;
    margin-top: 1rem;
  }

  .experience-header {
    font-size: 1.75rem; /* Réduction supplémentaire de la taille de la police pour les très petits écrans */
    margin-bottom: 1rem;
  }

  .experience-card {
    padding: 0.75rem;
  }

  .experience-title {
    font-size: 1rem; /* Réduction supplémentaire de la taille de la police */
  }

  .experience-company {
    font-size: 0.9rem; /* Réduction de la taille de la police */
  }
}
</style>
