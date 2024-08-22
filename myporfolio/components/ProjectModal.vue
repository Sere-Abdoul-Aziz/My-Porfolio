<template>
  <div v-if="isOpen" class="modal-backdrop" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="closeModal">&times;</button>
      
      <div class="modal-header">
        <h1 class="modal-title">{{ project.title }}</h1>
        <ul class="technologies-list">
          <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
        </ul>
      </div>
      
      <img :src="project.image" alt="Project Image" class="modal-image" />
      
      <div class="modal-body">
        <div class="modal-description">
          <p>{{ project.description }}</p>
        </div>
        
        <div class="modal-info">
          <div class="info-section">
            <p class="info-label">Year</p>
            <p class="info-detail">{{ project.year }}</p>
          </div>
          <div class="info-section" v-if="project.client">
            <p class="info-label">Client</p>
            <p class="info-detail">{{ project.client }}</p>
          </div>
          <div class="info-section" v-if="project.partner">
            <p class="info-label">Partner</p>
            <p class="info-detail">{{ project.partner }}</p>
          </div>
          <div class="info-section" v-if="project.services && project.services.length">
            <p class="info-label">Services</p>
            <div class="services-list">
              <span class="service-tag" v-for="service in project.services" :key="service">{{ service }}</span>
            </div>
          </div>
          <div class="info-section" v-if="project.link">
            <p class="info-label">Link</p>
            <a :href="project.link" target="_blank" class="info-link">Visit Website</a>
          </div>
        </div>

        <div class="additional-images">
          <img v-for="(img, index) in project.additionalImages" :key="index" :src="img" alt="Additional Project Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  project: Object,
  isOpen: Boolean,
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

// Lock scroll when modal is open
onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.body.style.overflow = 'auto';
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 800px;
  max-height: 90%;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  color: white;
  position: relative;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #fff;
}

.modal-header {
  margin-bottom: 20px;
  text-align: center;
}

.modal-title {
  font-size: 2rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.technologies-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.technologies-list li {
  background: rgba(20, 129, 219, 0.3);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 500;
}

.modal-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 10px;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.info-section {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.info-label {
  font-weight: 700;
  font-size: 1.1rem;
  color: #bbb;
  margin-bottom: 5px;
}

.info-detail {
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.6;
}

.services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.service-tag {
  background: rgba(20, 129, 219, 0.3);
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #ffffff;
  transition: background-color 0.3s ease;
}

.service-tag:hover {
  background: rgba(20, 129, 219, 0.5);
}

.info-link {
  color: #1e90ff;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
}

.info-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background: #1e90ff;
  transition: width 0.3s ease;
}

.info-link:hover {
  color: #63b3ed;
}

.info-link:hover::after {
  width: 100%;
}

.modal-description {
  text-align: justify;
}

.additional-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.additional-images img {
  width: calc(50% - 10px);
  border-radius: 10px;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    max-height: 80%;
  }
  
  .modal-title {
    font-size: 1.8rem;
  }

  .info-section {
    padding: 12px;
  }

  .info-label {
    font-size: 1rem;
  }

  .info-detail {
    font-size: 0.9rem;
  }

  .technologies-list li {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .modal-content {
    width: 100%;
    max-height: 75%;
    padding: 15px;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }

  .info-section {
    padding: 10px;
  }

  .info-label {
    font-size: 0.9rem;
  }

  .info-detail {
    font-size: 0.8rem;
  }

  .technologies-list li {
    font-size: 0.7rem;
  }

  .additional-images img {
    width: 100%;
  }
}
</style>
