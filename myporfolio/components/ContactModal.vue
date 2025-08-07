<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-backdrop" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <button class="close-button" @click="closeModal" aria-label="Fermer">
            <i class="fas fa-times"></i>
          </button>
          <h2 class="modal-title">
            <span class="greeting-emoji">👋</span> Discutons de votre projet
          </h2>
          <p class="modal-subtitle">Je vous répondrai sous 24h</p>
        </div>
        
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: formProgress + '%' }"></div>
        </div>
        
        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-columns">
            <div class="form-group">
              <label for="firstName">
                <i class="fas fa-user field-icon"></i>
                Prénom
              </label>
              <input 
                type="text" 
                id="firstName" 
                v-model="firstName" 
                required 
                placeholder="Votre prénom"
                @input="updateProgress"
                :class="{ 'field-valid': isFieldValid('firstName') }"
              />
              <Transition name="error-fade">
                <div v-if="errors.firstName" class="error-card">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.firstName }}
                </div>
              </Transition>
              <div v-if="isFieldValid('firstName')" class="valid-indicator">
                <i class="fas fa-check-circle"></i>
              </div>
            </div>
            
            <div class="form-group">
              <label for="lastName">
                <i class="fas fa-user field-icon"></i>
                Nom
              </label>
              <input 
                type="text" 
                id="lastName" 
                v-model="lastName" 
                required
                placeholder="Votre nom"
                @input="updateProgress"
                :class="{ 'field-valid': isFieldValid('lastName') }"
              />
              <Transition name="error-fade">
                <div v-if="errors.lastName" class="error-card">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.lastName }}
                </div>
              </Transition>
              <div v-if="isFieldValid('lastName')" class="valid-indicator">
                <i class="fas fa-check-circle"></i>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">
              <i class="fas fa-envelope field-icon"></i>
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              required
              placeholder="votre.email@exemple.com"
              @input="updateProgress"
              :class="{ 'field-valid': isFieldValid('email') }"
            />
            <Transition name="error-fade">
              <div v-if="errors.email" class="error-card">
                <i class="fas fa-exclamation-circle"></i>
                {{ errors.email }}
              </div>
            </Transition>
            <div v-if="isFieldValid('email')" class="valid-indicator">
              <i class="fas fa-check-circle"></i>
            </div>
          </div>
          
          <div class="form-group message-group">
            <label for="message">
              <i class="fas fa-comment field-icon"></i>
              Votre message
              <span class="label-hint">N'hésitez pas à détailler votre projet</span>
            </label>
            <textarea 
              id="message" 
              v-model="message" 
              required
              placeholder="Décrivez votre projet, vos besoins ou vos questions..."
              @input="updateProgress"
              :class="{ 'field-valid': isFieldValid('message') }"
            ></textarea>
            <div class="character-counter" :class="{ 'warning': message.length > 500 }">
              {{ message.length }}/1000
            </div>
            <Transition name="error-fade">
              <div v-if="errors.message" class="error-card">
                <i class="fas fa-exclamation-circle"></i>
                {{ errors.message }}
              </div>
            </Transition>
          </div>
          
          <div class="contact-options">
            <p class="options-label">Comment préférez-vous être contacté(e) ?</p>
            <div class="options-buttons">
              <button 
                type="button" 
                @click="contactPreference = 'email'" 
                class="option-button"
                :class="{ 'selected': contactPreference === 'email' }"
              >
                <i class="fas fa-envelope"></i> Email
              </button>
              <button 
                type="button" 
                @click="contactPreference = 'phone'" 
                class="option-button"
                :class="{ 'selected': contactPreference === 'phone' }"
              >
                <i class="fas fa-phone"></i> Téléphone
              </button>
              <button 
                type="button" 
                @click="contactPreference = 'video'" 
                class="option-button"
                :class="{ 'selected': contactPreference === 'video' }"
              >
                <i class="fas fa-video"></i> Visio
              </button>
            </div>
          </div>
          
          <Transition name="slide-up">
            <div v-if="contactPreference === 'phone'" class="form-group extra-field">
              <label for="phone">
                <i class="fas fa-phone field-icon"></i>
                Votre numéro
              </label>
              <input 
                type="tel" 
                id="phone" 
                v-model="phone" 
                placeholder="Votre numéro de téléphone"
              />
            </div>
          </Transition>
          
          <div class="form-actions">
            <button type="submit" class="submit-button" :disabled="isSubmitting">
              <span class="button-icon">
                <i class="fas fa-paper-plane"></i>
              </span>
              <span class="button-text">
                {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer mon message' }}
              </span>
              <span class="button-shine"></span>
            </button>
          </div>
        </form>
        
        <div class="form-footer">
          <p>Ou contactez-moi directement via :</p>
          <div class="social-links">
            <a href="mailto:votre@email.com" class="social-link">
              <i class="fas fa-envelope"></i>
            </a>
            <a href="https://linkedin.com/in/votreprofil" target="_blank" class="social-link">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/votreprofil" target="_blank" class="social-link">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </div>

        <div class="scroll-indicator" ref="scrollIndicator" v-show="showScrollIndicator">
          <div class="indicator-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <span class="indicator-text">Faire défiler pour voir plus</span>
          <div class="indicator-arrow">
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>

      <Transition name="success-fade">
        <div v-if="showSuccessModal" class="success-modal">
          <div class="success-content">
            <div class="success-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h3>Message envoyé avec succès!</h3>
            <p>Merci {{ firstName }} ! Je vous répondrai très rapidement.</p>
            <div class="success-illustration">
              <div class="envelope">
                <i class="fas fa-envelope"></i>
                <div class="envelope-path"></div>
              </div>
            </div>
            <button @click="closeSuccessModal" class="ok-button">
              <span>Super !</span>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue';
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
const phone = ref('');
const contactPreference = ref('email');
const errors = ref({});
const showSuccessModal = ref(false);
const isSubmitting = ref(false);
const scrollIndicator = ref(null);
const showScrollIndicator = ref(false);

// Calcul du progrès du formulaire
const formProgress = computed(() => {
  let progress = 0;
  const totalFields = 4; // Nom, prénom, email, message
  
  if (firstName.value.length > 0) progress += 25;
  if (lastName.value.length > 0) progress += 25;
  if (email.value.length > 0) progress += 25;
  if (message.value.length > 0) progress += 25;
  
  return Math.min(100, progress);
});

// Vérifier si un champ spécifique est valide
const isFieldValid = (field) => {
  switch (field) {
    case 'firstName':
      return firstName.value.length >= 2;
    case 'lastName':
      return lastName.value.length >= 2;
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    case 'message':
      return message.value.length >= 10;
    default:
      return false;
  }
};

// Mise à jour du progrès et validation en temps réel
const updateProgress = () => {
  validateField(event.target.id);
};

const validateField = (fieldName) => {
  const newErrors = { ...errors.value };
  
  switch (fieldName) {
    case 'firstName':
      if (!firstName.value) {
        newErrors.firstName = 'Votre prénom est requis';
      } else if (firstName.value.length < 2) {
        newErrors.firstName = 'Votre prénom doit contenir au moins 2 caractères';
      } else {
        delete newErrors.firstName;
      }
      break;
      
    case 'lastName':
      if (!lastName.value) {
        newErrors.lastName = 'Votre nom est requis';
      } else if (lastName.value.length < 2) {
        newErrors.lastName = 'Votre nom doit contenir au moins 2 caractères';
      } else {
        delete newErrors.lastName;
      }
      break;
      
    case 'email':
      if (!email.value) {
        newErrors.email = 'Votre email est requis';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        newErrors.email = 'Veuillez entrer un email valide';
      } else {
        delete newErrors.email;
      }
      break;
      
    case 'message':
      if (!message.value) {
        newErrors.message = 'Votre message est requis';
      } else if (message.value.length < 10) {
        newErrors.message = 'Votre message est un peu court, n\'hésitez pas à détailler';
      } else if (message.value.length > 1000) {
        newErrors.message = 'Votre message ne doit pas dépasser 1000 caractères';
      } else {
        delete newErrors.message;
      }
      break;
  }
  
  errors.value = newErrors;
};

const validateForm = () => {
  ['firstName', 'lastName', 'email', 'message'].forEach(validateField);
  return Object.keys(errors.value).length === 0;
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
  isSubmitting.value = true;

  const formData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    message: message.value,
    contactPreference: contactPreference.value,
    phone: phone.value || null,
    timestamp: new Date(),
  };

  try {
    await addDoc(collection(db, 'messages'), formData);
    
    // Célébration avec confetti
    confetti({
      zIndex: 99999,
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#60a5fa', '#93c5fd', '#ffffff']
    });
    
    // Réinitialisation du formulaire
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    message.value = '';
    phone.value = '';
    contactPreference.value = 'email';
    errors.value = {};
    
    showSuccessModal.value = true;
    emit('submit', formData);
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message :', error);
    errors.value.submit = "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.";
  } finally {
    isSubmitting.value = false;
  }
};

// Vérifier si le défilement est nécessaire après le montage et les transitions
onMounted(async () => {
  nextTick(() => {
    setTimeout(checkScrollNeeded, 500); // Délai pour permettre le rendu complet
  });
});

// Ajouter cette fonction pour vérifier si le contenu nécessite un défilement
const checkScrollNeeded = () => {
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    // Montrer l'indicateur uniquement si le contenu est plus grand que le container
    showScrollIndicator.value = modalContent.scrollHeight > modalContent.clientHeight;
    
    // Ajouter un listener pour cacher l'indicateur dès que l'utilisateur défile
    modalContent.addEventListener('scroll', () => {
      if (modalContent.scrollTop > 20) { // Si l'utilisateur a défilé de plus de 20px
        showScrollIndicator.value = false;
      }
    }, { passive: true });
  }
};

// Vérifier à nouveau si l'indicateur est nécessaire quand le modal s'ouvre
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
    // Réinitialiser et vérifier l'indicateur de défilement
    nextTick(() => {
      setTimeout(checkScrollNeeded, 500);
    });
  } else {
    document.body.style.overflow = 'auto';
  }
});
</script>

<style scoped>
/* Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.success-fade-enter-active,
.success-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.success-fade-enter-from,
.success-fade-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.error-fade-enter-active,
.error-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.error-fade-enter-from,
.error-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  padding: 20px;
  box-sizing: border-box;
}

/* Modifier le conteneur modal pour assurer que tout le contenu est visible */
.modal-content {
  width: 100%;
  max-width: 550px;
  max-height: 85vh; /* Légèrement réduit */
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9));
  border-radius: 20px;
  overflow-y: auto; /* Garder ce paramètre */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  color: white;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex; /* Ajout */
  flex-direction: column; /* Ajout */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

/* S'assurer que la partie formulaire prend tout l'espace disponible */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  position: relative;
  flex: 1; /* Ajout pour que le formulaire s'étende */
}

/* S'assurer que les options sont bien visibles */
.contact-options {
  margin: 5px 0;
  position: relative; /* Ajout */
  z-index: 5; /* Ajout */
}

/* S'assurer que le bouton est bien visible */
.form-actions {
  margin-top: 15px;
  position: relative; /* Ajout */
  z-index: 5; /* Ajout */
}

/* Améliorer la visibilité des boutons d'option */
.option-button {
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.3); /* Légèrement plus visible */
  background: rgba(255, 255, 255, 0.1); /* Légèrement plus visible */
  color: white;
  font-weight: 500; /* Ajout */
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Ajout */
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: white;
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.modal-title {
  font-size: 1.8rem;
  margin-bottom: 10px;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.greeting-emoji {
  font-size: 2rem;
  animation: wave 2.5s infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}

.modal-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 15px;
}

.progress-bar-container {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 30px;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #3b82f6, #60a5fa);
  width: 0;
  transition: width 0.5s ease;
  border-radius: 2px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  position: relative;
}

.form-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  position: relative;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.field-icon {
  color: #3b82f6;
  font-size: 0.9rem;
}

.label-hint {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: normal;
  margin-left: 5px;
}

.form-group input,
.form-group textarea {
  padding: 12px 15px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.form-group textarea {
  resize: none;
  min-height: 120px;
}

.message-group {
  position: relative;
}

.character-counter {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
}

.character-counter.warning {
  color: #fbbf24;
}

.field-valid {
  border-color: #10b981 !important;
}

.valid-indicator {
  position: absolute;
  right: 12px;
  top: 43px;
  color: #10b981;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

.error-card {
  background: rgba(239, 68, 68, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  margin-top: 5px;
  color: #f87171;
  font-size: 0.85rem;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-card i {
  color: #ef4444;
}

.contact-options {
  margin: 5px 0;
  position: relative; /* Ajout */
  z-index: 5; /* Ajout */
}

.options-label {
  font-size: 0.95rem;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
}

.options-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.option-button {
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.3); /* Légèrement plus visible */
  background: rgba(255, 255, 255, 0.1); /* Légèrement plus visible */
  color: white;
  font-weight: 500; /* Ajout */
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Ajout */
}

.option-button i {
  font-size: 0.8rem;
}

.option-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.option-button.selected {
  background: rgba(59, 130, 246, 0.3);
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.extra-field {
  animation: slideDown 0.3s forwards;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.form-actions {
  margin-top: 15px;
  position: relative; /* Ajout */
  z-index: 5; /* Ajout */
}

.submit-button {
  width: 100%;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  font-weight: 600;
  padding: 0;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
}

.button-text {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  transition: transform 0.3s ease;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(37, 99, 235, 0.4);
  background: linear-gradient(135deg, #4f46e5, #2563eb);
}

.submit-button:hover .button-icon {
  transform: translateX(3px);
}

.submit-button:active {
  transform: translateY(0);
}

.button-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(30deg);
  animation: shine 8s infinite;
  z-index: 1;
}

@keyframes shine {
  0% { left: -50%; }
  20% { left: 100%; }
  100% { left: 100%; }
}

.form-footer {
  padding: 20px 30px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.form-footer p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 15px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #3b82f6;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.success-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100000;
  width: 90%;
  max-width: 400px;
}

.success-content {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9));
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.success-icon {
  font-size: 3rem;
  color: white;
  margin-bottom: 15px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.success-content h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.success-content p {
  margin-bottom: 25px;
  font-size: 1.1rem;
}

.success-illustration {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.envelope {
  font-size: 2.5rem;
  position: relative;
  animation: float 3s infinite alternate ease-in-out;
}

.envelope-path {
  position: absolute;
  width: 100px;
  height: 1px;
  border-top: 2px dashed rgba(255, 255, 255, 0.5);
  top: 50%;
  left: 100%;
  transform-origin: left center;
  animation: dash 2s infinite;
}

@keyframes float {
  0% { transform: translateY(0); }
  100% { transform: translateY(-10px); }
}

@keyframes dash {
  0% { width: 0; opacity: 1; }
  100% { width: 100px; opacity: 0; }
}

.ok-button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-weight: 600;
  padding: 12px 30px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.ok-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    padding: 15px 0;
  }
  
  .form-columns {
    grid-template-columns: 1fr;
  }
  
  .contact-form {
    padding: 20px;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .modal-subtitle {
    font-size: 0.9rem;
  }
  
  .scroll-indicator {
    padding: 6px 15px;
  }
  
  .indicator-text {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 10px 0;
  }
  
  .contact-form {
    padding: 15px;
  }
  
  .close-button {
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
  }
  
  .modal-header {
    padding: 15px 15px 10px;
  }
  
  .form-group label {
    font-size: 0.9rem;
  }
  
  .form-group input,
  .form-group textarea {
    padding: 10px;
    font-size: 0.95rem;
  }
  
  .greeting-emoji {
    font-size: 1.8rem;
  }
  
  .social-link {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
}

/* Indicateur de défilement */
.scroll-indicator {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  padding: 8px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  transition: opacity 0.3s ease, transform 0.3s ease;
  animation: pulseIndicator 2s infinite alternate;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

@keyframes pulseIndicator {
  0% {
    transform: translateX(-50%) translateY(0);
  }
  100% {
    transform: translateX(-50%) translateY(-5px);
  }
}

.indicator-dots {
  display: flex;
  gap: 4px;
  margin-bottom: 3px;
}

.dot {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  opacity: 0.7;
}

.dot:nth-child(1) {
  animation: dotBlink 1.5s infinite 0s;
}

.dot:nth-child(2) {
  animation: dotBlink 1.5s infinite 0.5s;
}

.dot:nth-child(3) {
  animation: dotBlink 1.5s infinite 1s;
}

@keyframes dotBlink {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}

.indicator-text {
  font-size: 0.8rem;
  color: white;
  font-weight: 500;
}

.indicator-arrow {
  margin-top: 2px;
  animation: arrowBounce 1s infinite alternate;
  color: white;
  font-size: 0.9rem;
}

@keyframes arrowBounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(4px);
  }
}
</style>
