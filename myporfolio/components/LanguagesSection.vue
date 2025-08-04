<template>
  <div id="languages-section" class="languages-section">
    <h1 class="text-gray-200 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-center mb-12">
      Langues <span class="text-primary text-blue-400">Maîtrisées</span>
    </h1>

    <div class="languages-container">
      <!-- Français -->
      <div class="language-card french-card">
        <div class="language-header">
          <div class="flag-container">
            <img src="@/assets/images/france_flag.jpeg" alt="Drapeau Français" class="flag-icon">
          </div>
          <div class="language-info">
            <h3 class="language-name">Français</h3>
            <p class="language-level">Langue Maternelle</p>
          </div>
          <div class="proficiency-badge native">100%</div>
        </div>
        <div class="language-body">
          <div class="progress-container">
            <div class="progress-bar french-progress" data-width="100"></div>
          </div>
          <div class="language-skills">
            <span class="skill-tag">Écrit</span>
            <span class="skill-tag">Oral</span>
            <span class="skill-tag">Professionnel</span>
          </div>
          <p class="language-description">
            "Maîtrise parfaite de ma langue maternelle, utilisée quotidiennement dans mes interactions professionnelles et personnelles."
          </p>
        </div>
      </div>

      <!-- Anglais -->
      <div class="language-card english-card">
        <div class="language-header">
          <div class="flag-container">
            <img src="@/assets/images/uk_flag.jpeg" alt="Drapeau Anglais" class="flag-icon">
          </div>
          <div class="language-info">
            <h3 class="language-name">English</h3>
            <p class="language-level">Intermédiaire Avancé</p>
          </div>
          <div class="proficiency-badge intermediate">75%</div>
        </div>
        <div class="language-body">
          <div class="progress-container">
            <div class="progress-bar english-progress" data-width="75"></div>
          </div>
          <div class="language-skills">
            <span class="skill-tag">Technical Reading</span>
            <span class="skill-tag">Documentation</span>
            <span class="skill-tag">Code Reviews</span>
          </div>
          <p class="language-description">
            "Strong technical English for development work, documentation, and international collaboration in tech projects."
          </p>
        </div>
      </div>
    </div>

    <!-- Petit bonus : Indicator global -->
    <div class="global-indicator">
      <div class="indicator-item">
        <i class="fas fa-globe"></i>
        <span>Communication Internationale</span>
      </div>
      <div class="indicator-item">
        <i class="fas fa-code"></i>
        <span>Documentation Technique</span>
      </div>
      <div class="indicator-item">
        <i class="fas fa-users"></i>
        <span>Collaboration Multiculturelle</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMounted(async () => {
  await nextTick();

  // Animation du titre
  gsap.from('h1', {
    opacity: 0,
    y: -30,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#languages-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Animation des cartes de langues
  gsap.from('.language-card', {
    opacity: 0,
    y: 50,
    scale: 0.9,
    duration: 1,
    stagger: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.languages-container',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Animation des barres de progression
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach((bar) => {
    const width = bar.getAttribute('data-width');
    gsap.fromTo(bar, 
      { width: '0%' },
      {
        width: `${width}%`,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Animation des indicateurs globaux
  gsap.from('.indicator-item', {
    opacity: 0,
    x: -30,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.global-indicator',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
});
</script>

<style scoped>
.languages-section {
  padding: 2rem;
  margin: 4rem 0;
  position: relative;
  z-index: 2;
}

.languages-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.language-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.language-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
}

.language-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.french-card::before {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.english-card::before {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.language-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.flag-container {
  position: relative;
}

.flag-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.language-info {
  flex: 1;
}

.language-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
}

.language-level {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.2rem 0 0 0;
}

.proficiency-badge {
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.4);
  color: #3b82f6;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
}

.proficiency-badge.native {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.4);
  color: #22c55e;
}

.proficiency-badge.intermediate {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.4);
  color: #3b82f6;
}

.language-body {
  margin-top: 1rem;
}

.progress-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-bar {
  height: 100%;
  border-radius: 10px;
  transition: width 2s ease-out;
}

.french-progress {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.english-progress {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.language-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.skill-tag {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.language-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.5;
  font-style: italic;
  margin: 0;
}

.global-indicator {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.indicator-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.indicator-item i {
  color: #3b82f6;
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .languages-section {
    padding: 1rem;
    margin: 2rem 0;
  }

  .languages-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .language-card {
    padding: 1.2rem;
  }

  .language-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  .flag-icon {
    width: 40px;
    height: 40px;
  }

  .language-name {
    font-size: 1.3rem;
  }

  .global-indicator {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .indicator-item {
    justify-content: center;
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .language-card {
    padding: 1rem;
  }

  .language-header {
    gap: 0.5rem;
  }

  .language-name {
    font-size: 1.1rem;
  }

  .language-skills {
    gap: 0.3rem;
  }

  .skill-tag {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
}
</style>
