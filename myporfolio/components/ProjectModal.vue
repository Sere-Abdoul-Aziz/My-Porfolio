<template>
  <Teleport to="body">
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
          </div>

          <div class="additional-images" v-if="project.additionalImages && project.additionalImages.length">
            <img v-for="(img, index) in project.additionalImages" :key="index" :src="img" alt="Additional Project Image" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  project: Object,
  isOpen: Boolean,
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

// Lock/unlock scroll when modal opens/closes
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
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
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  color: white;
  position: relative;
  margin: auto;
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
  z-index: 10;
}

.close-button:hover {
  color: #fff;
}

.modal-title {
  font-size: 2rem;
  margin-bottom: 10px;
  font-weight: 700;
  text-align: center;
}

.technologies-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  list-style: none;
  padding: 0;
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

.modal-description {
  text-align: justify;
  margin-bottom: 20px;
  line-height: 1.6;
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
  .modal-backdrop {
    padding: 10px;
  }
  
  .modal-content {
    max-height: 95vh;
    padding: 15px;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .additional-images img {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 10px;
  }
  
  .close-button {
    font-size: 1.5rem;
    top: 10px;
    right: 10px;
  }
}
</style>
