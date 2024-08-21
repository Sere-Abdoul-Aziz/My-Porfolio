<template>
  <div class="project-card">
    <div class="project-header">
      <span class="project-number">{{ project.index }}</span>
      <h2 class="project-title">{{ project.title }}</h2>
      <span class="project-year">{{ project.year }}</span>
    </div>
    <div class="project-details">
      <div class="project-technologies">
        <span v-for="tech in project.technologies" :key="tech" class="tech-badge">{{ tech }}</span>
      </div>
      <div class="project-image">
        <img :src="project.image" :alt="project.title" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  project: Object,
  index: Number, 
});


</script>

<style scoped>
/* The rest of your styles remain the same */
.project-card {
  position: relative;
  flex: 1 1 45%;
  margin: 1rem;
  padding: 1.5rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  color: white;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 40px rgba(0, 0, 0, 0.7);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.project-number {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.7);
}

.project-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
}

.project-year {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.7);
}

.project-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap; /* Permet de revenir à la ligne si besoin */
  gap: 8px; /* Espacement entre les technologies */
}

.tech-badge {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.2rem 0.8rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
}

.project-image img {
  max-width: 100px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
</style>
