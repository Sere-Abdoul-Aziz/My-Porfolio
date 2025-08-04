<template>
  <div v-if="isOpen" class="modal-backdrop" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="closeModal">&times;</button>
      <h2 class="modal-title">Contacte-moi</h2>
      <form @submit.prevent="submitForm" class="contact-form">
        <!-- Votre formulaire existant -->
        <div class="form-group">
          <label for="lastName">Nom</label>
          <input type="text" id="lastName" v-model="lastName" required />
          <div v-if="errors.lastName" class="error-card">{{ errors.lastName }}</div>
        </div>
        <div class="form-group">
          <label for="firstName">Prénom</label>
          <input type="text" id="firstName" v-model="firstName" required />
          <div v-if="errors.firstName" class="error-card">{{ errors.firstName }}</div>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
          <div v-if="errors.email" class="error-card">{{ errors.email }}</div>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="message" required></textarea>
          <div v-if="errors.message" class="error-card">{{ errors.message }}</div>
        </div>
        <button type="submit" class="submit-button">Envoyer</button>
      </form>
    </div>

    <div v-if="showSuccessModal" class="success-modal">
      <div class="modal-content success-card" @click.stop>
        <h2 class="modal-title">🎉 Message bien reçu ! 🎉</h2>
        <p>Merci de m'avoir contacté. Je reviendrai vers vous dès que possible.</p>
        <button @click="closeSuccessModal" class="submit-button">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Votre script existant...
import { ref, watch } from 'vue';
import { db } from '@/firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import confetti from 'canvas-confetti';

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['close', 'submit']);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const message = ref('');
const errors = ref({});
const showSuccessModal = ref(false);

// Votre logique existante...
const validateForm = () => {
  const newErrors = {};

  if (!firstName.value) {
    newErrors.firstName = 'Veuillez renseigner ce champ';
  }

  if (!lastName.value) {
    newErrors.lastName = 'Veuillez renseigner ce champ';
  }

  if (!email.value) {
    newErrors.email = 'Veuillez renseigner ce champ';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    newErrors.email = 'Email invalide';
  }

  if (!message.value) {
    newErrors.message = 'Veuillez renseigner ce champ';
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const closeModal = () => {
  emit('close');
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  closeModal();
};

const submitForm = async () => {
  if (!validateForm()) return;

  const formData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    message: message.value,
    timestamp: new Date(),
  };

  try {
    await addDoc(collection(db, 'messages'), formData); 
    confetti({
      zIndex: 99999, // Z-index très élevé pour les confettis
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    showSuccessModal.value = true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message :', error);
  }

  emit('submit', formData);
};

// Gérer le scroll quand le modal s'ouvre/ferme
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
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
  z-index: 99999; /* Z-index maximum */
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 15px;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  color: white;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
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
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  background: rgba(255, 255, 255, 0.15);
}

.form-group textarea {
  resize: none;
  height: 100px;
}

.error-card {
  background: rgba(255, 0, 0, 0.1);
  padding: 8px;
  border-radius: 8px;
  margin-top: 5px;
  color: #ff4c4c;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 2px 10px rgba(255, 0, 0, 0.2);
}

.submit-button {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  font-weight: 600;
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.submit-button:hover {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
}

.success-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 50px rgba(11, 180, 214, 0.3);
  color: white;
  z-index: 100000; /* Encore plus haut que le modal principal */
  text-align: center;
  width: 90%;
  max-width: 400px;
}

.success-card p {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

/* Responsive */
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
