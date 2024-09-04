<template>
  <div v-if="isOpen" class="modal-backdrop" @click="closeModal">
      <div class="modal-content" @click.stop>
          <button class="close-button" @click="closeModal">&times;</button>
          <iframe :src="htmlContent" class="game-frame"></iframe>
      </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
isOpen: Boolean,
});

const emit = defineEmits(['close']);

const htmlContent = ref('');

// Fonction de fermeture du modal
const closeModal = () => {
emit('close');
};

// Charger l'URL du fichier HTML lors de l'ouverture du modal
watch(() => props.isOpen, (newVal) => {
if (newVal) {
  htmlContent.value = '/Egg.html'; // Chemin relatif à partir du dossier public
}
});
</script>

<style scoped>
.modal-backdrop {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.8);
display: flex;
align-items: center;
justify-content: center;
z-index: 1000;
}

.modal-content {
width: 80%;
max-width: 800px;
height: 80%;
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
border-radius: 15px;
padding: 20px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
position: relative;
overflow: auto;
}

.close-button {
position: absolute;
top: 10px;
right: 10px;
background: none;
border: none;
font-size: 2rem;
color: white;
cursor: pointer;
}

.game-frame {
width: 100%;
height: 100%;
border-radius: 10px;
border: none;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    height: 70%;
    padding: 15px;
  }
  
  .close-button {
    font-size: 1.5rem;
    top: 5px;
    right: 5px;
  }
}

@media (max-width: 480px) {
  .modal-content {
    width: 100%;
    height: 60%;
    padding: 10px;
  }
  
  .close-button {
    font-size: 1.2rem;
  }
  
  .game-frame {
    border-radius: 5px;
  }
}

</style>
