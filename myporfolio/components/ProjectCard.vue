<template>
  <div class="project-card" @click="handleClick">
    <div class="project-header">
      <span class="project-number">{{ String(index + 1).padStart(2, '0') }}</span>
      <h2 class="project-title">{{ project.title }}</h2>
      <span class="project-year">{{ project.year }}</span>
    </div>
    <div class="project-details">
      <div class="project-info">
        <div class="project-technologies">
          <span v-for="tech in project.technologies.slice(0, 3)" :key="tech" class="tech-badge">{{ tech }}</span>
          <span v-if="project.technologies.length > 3" class="tech-more">+{{ project.technologies.length - 3 }}</span>
        </div>
        <div class="project-client" v-if="project.client">
          <span class="client-label">Client:</span>
          <span class="client-name">{{ project.client }}</span>
        </div>
      </div>
      <div class="project-image" v-if="project.image">
        <img :src="project.image" :alt="project.title" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  project: Object,
  index: Number, 
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click', props.project);
};
</script>

<style scoped>
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
  cursor: pointer;
  min-height: 250px;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 40px rgba(0, 0, 0, 0.7);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.project-number {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(96, 165, 250, 0.8);
  background: rgba(96, 165, 250, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
}

.project-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  flex: 1;
  margin: 0 1rem;
}

.project-year {
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
}

.project-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.project-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-badge {
  background: rgba(96, 165, 250, 0.2);
  border: 1px solid rgba(96, 165, 250, 0.3);
  border-radius: 12px;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  font-weight: 500;
}

.tech-more {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.project-client {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.client-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  font-weight: 500;
}

.client-name {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}

.project-image {
  flex-shrink: 0;
}

.project-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid rgba(96, 165, 250, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .project-card {
    flex: 1 1 100%;
    margin: 0.5rem 0;
    padding: 1rem;
    min-height: 200px;
  }
  
  .project-title {
    font-size: 1.2rem;
    margin: 0 0.5rem;
  }
  
  .project-details {
    flex-direction: column;
    gap: 1rem;
  }
  
  .project-image img {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .project-header {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
  
  .project-title {
    margin: 0;
  }
}
</style>
