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
            <a href="mailto:abdoulazizsere0@gmail.com" class="social-link">
              <i class="fas fa-envelope"></i>
            </a>
            <a href="https://www.linkedin.com/in/aziz-sere/" target="_blank" rel="noopener" class="social-link">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/Sere-Abdoul-Aziz/" target="_blank" rel="noopener" class="social-link">
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
import { ref, watch, computed, onMounted, nextTick, onUnmounted } from 'vue';
import confetti from 'canvas-confetti';
import { useAnalytics } from '~/composables/useAnalytics';
const { public: { web3formsKey } } = useRuntimeConfig();

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['close', 'submit']);

// ✅ AJOUT : Initialisation du tracking
const { 
  trackEvent, 
  trackContactAction, 
  trackEngagement, 
  isGtagEnabled 
} = useAnalytics();

// Variables existantes...
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

// ✅ AJOUT : Variables de tracking
const modalOpenTime = ref(null);
const formStartTime = ref(null);
const fieldInteractions = ref({});
const hasUserInteracted = ref(false);
let engagementTimer = null;

// Calcul du progrès du formulaire (existant)
const formProgress = computed(() => {
  let progress = 0;
  const totalFields = 4;
  
  if (firstName.value.length > 0) progress += 25;
  if (lastName.value.length > 0) progress += 25;
  if (email.value.length > 0) progress += 25;
  if (message.value.length > 0) progress += 25;
  
  return Math.min(100, progress);
});

// ✅ AJOUT : Tracking du progrès du formulaire
watch(formProgress, (newProgress, oldProgress) => {
  if (isGtagEnabled() && newProgress > oldProgress) {
    trackEvent('contact_form_progress', {
      label: 'Form Progress',
      section: 'contact',
      progress_percentage: newProgress,
      progress_milestone: Math.floor(newProgress / 25) * 25
    });
    
    // Marquer le début du formulaire à la première interaction
    if (!formStartTime.value && newProgress > 0) {
      formStartTime.value = Date.now();
      trackEvent('contact_form_started', {
        label: 'Form Interaction Started',
        section: 'contact',
        form_type: 'contact_modal'
      });
    }
  }
});

// Vérifier si un champ spécifique est valide (existant)
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

// ✅ MODIFICATION : Mise à jour du progrès avec tracking
const updateProgress = (event) => {
  const fieldName = event.target.id;
  
  // ✅ AJOUT : Tracking des interactions par champ
  if (isGtagEnabled()) {
    if (!fieldInteractions.value[fieldName]) {
      fieldInteractions.value[fieldName] = {
        firstInteraction: Date.now(),
        interactionCount: 0
      };
      
      trackEvent('contact_field_first_interaction', {
        label: fieldName,
        section: 'contact',
        field_name: fieldName
      });
    }
    
    fieldInteractions.value[fieldName].interactionCount++;
    hasUserInteracted.value = true;
  }
  
  validateField(fieldName);
};

// ✅ MODIFICATION : Validation avec tracking
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
        // ✅ AJOUT : Tracking de validation réussie
        if (isGtagEnabled()) {
          trackEvent('contact_field_validated', {
            label: 'firstName',
            section: 'contact',
            field_name: 'firstName',
            validation_status: 'success'
          });
        }
      }
      break;
      
    case 'lastName':
      if (!lastName.value) {
        newErrors.lastName = 'Votre nom est requis';
      } else if (lastName.value.length < 2) {
        newErrors.lastName = 'Votre nom doit contenir au moins 2 caractères';
      } else {
        delete newErrors.lastName;
        if (isGtagEnabled()) {
          trackEvent('contact_field_validated', {
            label: 'lastName',
            section: 'contact',
            field_name: 'lastName',
            validation_status: 'success'
          });
        }
      }
      break;
      
    case 'email':
      if (!email.value) {
        newErrors.email = 'Votre email est requis';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        newErrors.email = 'Veuillez entrer un email valide';
        // ✅ AJOUT : Tracking d'erreur de validation
        if (isGtagEnabled()) {
          trackEvent('contact_field_validation_error', {
            label: 'email',
            section: 'contact',
            field_name: 'email',
            error_type: 'invalid_format'
          });
        }
      } else {
        delete newErrors.email;
        if (isGtagEnabled()) {
          trackEvent('contact_field_validated', {
            label: 'email',
            section: 'contact',
            field_name: 'email',
            validation_status: 'success'
          });
        }
      }
      break;
      
    case 'message':
      if (!message.value) {
        newErrors.message = 'Votre message est requis';
      } else if (message.value.length < 10) {
        newErrors.message = 'Votre message est un peu court, n\'hésitez pas à détailler';
        if (isGtagEnabled()) {
          trackEvent('contact_field_validation_error', {
            label: 'message',
            section: 'contact',
            field_name: 'message',
            error_type: 'too_short',
            message_length: message.value.length
          });
        }
      } else if (message.value.length > 1000) {
        newErrors.message = 'Votre message ne doit pas dépasser 1000 caractères';
        if (isGtagEnabled()) {
          trackEvent('contact_field_validation_error', {
            label: 'message',
            section: 'contact',
            field_name: 'message',
            error_type: 'too_long',
            message_length: message.value.length
          });
        }
      } else {
        delete newErrors.message;
        if (isGtagEnabled()) {
          trackEvent('contact_field_validated', {
            label: 'message',
            section: 'contact',
            field_name: 'message',
            validation_status: 'success',
            message_length: message.value.length
          });
        }
      }
      break;
  }
  
  errors.value = newErrors;
};

// ✅ MODIFICATION : Validation du formulaire avec tracking
const validateForm = () => {
  ['firstName', 'lastName', 'email', 'message'].forEach(validateField);
  const isValid = Object.keys(errors.value).length === 0;
  
  // ✅ AJOUT : Tracking de validation globale
  if (isGtagEnabled()) {
    trackEvent('contact_form_validation', {
      label: 'Form Validation Attempt',
      section: 'contact',
      validation_result: isValid ? 'success' : 'failed',
      error_count: Object.keys(errors.value).length,
      form_completion: formProgress.value
    });
  }
  
  return isValid;
};

// ✅ MODIFICATION : Fermeture du modal avec tracking
const closeModal = () => {
  // ✅ AJOUT : Tracking de fermeture
  if (isGtagEnabled() && modalOpenTime.value) {
    const timeSpent = Math.round((Date.now() - modalOpenTime.value) / 1000);
    const abandonReason = determineAbandonReason();
    
    trackEvent('contact_modal_closed', {
      label: 'Modal Closed',
      section: 'contact',
      time_spent: timeSpent,
      form_progress: formProgress.value,
      user_interacted: hasUserInteracted.value,
      abandon_reason: abandonReason,
      close_method: 'manual_close'
    });
    
    // Arrêter le timer d'engagement
    if (engagementTimer) {
      clearInterval(engagementTimer);
      engagementTimer = null;
    }
  }
  
  emit('close');
  resetModalState();
};

// ✅ AJOUT : Fonction pour déterminer la raison d'abandon
const determineAbandonReason = () => {
  if (formProgress.value === 0) return 'no_interaction';
  if (formProgress.value < 25) return 'early_abandon';
  if (formProgress.value < 75) return 'mid_abandon';
  if (formProgress.value < 100) return 'late_abandon';
  return 'form_complete';
};

// ✅ AJOUT : Réinitialisation de l'état du modal
const resetModalState = () => {
  modalOpenTime.value = null;
  formStartTime.value = null;
  fieldInteractions.value = {};
  hasUserInteracted.value = false;
};

// ✅ MODIFICATION : Fermeture du modal de succès avec tracking
const closeSuccessModal = () => {
  if (isGtagEnabled()) {
    trackEvent('contact_success_modal_closed', {
      label: 'Success Modal Dismissed',
      section: 'contact',
      action_type: 'success_acknowledgment'
    });
  }
  
  showSuccessModal.value = false;
  closeModal();
};

// ✅ MODIFICATION : Soumission du formulaire avec tracking avancé
const submitForm = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  
  // ✅ AJOUT : Tracking du début de soumission
  if (isGtagEnabled()) {
    const timeToSubmit = formStartTime.value ? 
      Math.round((Date.now() - formStartTime.value) / 1000) : 0;
    
    trackEvent('contact_form_submit_attempt', {
      label: 'Form Submission Started',
      section: 'contact',
      time_to_submit: timeToSubmit,
      contact_preference: contactPreference.value,
      message_length: message.value.length,
      has_phone: phone.value ? 'yes' : 'no'
    });
  }

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
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: web3formsKey,
        subject: `Nouveau message de ${firstName.value} ${lastName.value}`,
        from_name: `${firstName.value} ${lastName.value}`,
        email: email.value,
        phone: phone.value || 'Non fourni',
        contact_preference: contactPreference.value,
        message: message.value,
      }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || 'Erreur réseau');
    
    // ✅ AJOUT : Tracking de succès
    if (isGtagEnabled()) {
      const totalTime = modalOpenTime.value ? 
        Math.round((Date.now() - modalOpenTime.value) / 1000) : 0;
      
      trackContactAction('form_submitted', 'contact_modal');
      
      trackEvent('contact_form_submit_success', {
        label: `${firstName.value} ${lastName.value}`,
        section: 'contact',
        total_modal_time: totalTime,
        contact_preference: contactPreference.value,
        message_category: categorizeMessage(message.value),
        form_efficiency: calculateFormEfficiency(),
        value: 10 // Valeur élevée pour une soumission réussie
      });
    }
    
    // Célébration avec confetti (existant)
    confetti({
      zIndex: 99999,
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#60a5fa', '#93c5fd', '#ffffff']
    });
    
    // Réinitialisation du formulaire (existant)
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
    
    // ✅ AJOUT : Tracking d'erreur
    if (isGtagEnabled()) {
      trackEvent('contact_form_submit_error', {
        label: 'Form Submission Failed',
        section: 'contact',
        error_type: error.code || 'unknown_error',
        error_message: error.message,
        form_progress: formProgress.value
      });
    }
    
    errors.value.submit = "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.";
  } finally {
    isSubmitting.value = false;
  }
};

// ✅ AJOUT : Fonction pour catégoriser le message
const categorizeMessage = (messageText) => {
  const text = messageText.toLowerCase();
  if (text.includes('projet') || text.includes('développement')) return 'project_inquiry';
  if (text.includes('devis') || text.includes('prix') || text.includes('coût')) return 'quote_request';
  if (text.includes('collaboration') || text.includes('partenariat')) return 'collaboration';
  if (text.includes('question') || text.includes('information')) return 'information_request';
  return 'general_inquiry';
};

// ✅ AJOUT : Calcul de l'efficacité du formulaire
const calculateFormEfficiency = () => {
  if (!formStartTime.value) return 100;
  
  const timeSpent = (Date.now() - formStartTime.value) / 1000;
  const fieldCount = Object.keys(fieldInteractions.value).length;
  const avgTimePerField = timeSpent / fieldCount;
  
  if (avgTimePerField < 10) return 'very_fast';
  if (avgTimePerField < 30) return 'fast';
  if (avgTimePerField < 60) return 'normal';
  if (avgTimePerField < 120) return 'slow';
  return 'very_slow';
};

// ✅ AJOUT : Tracking des préférences de contact
const trackContactPreferenceChange = (newPreference) => {
  if (isGtagEnabled()) {
    trackEvent('contact_preference_selected', {
      label: newPreference,
      section: 'contact',
      preference_type: newPreference,
      form_progress: formProgress.value
    });
  }
  contactPreference.value = newPreference;
};

// ✅ AJOUT : Tracking du défilement
const trackScrollBehavior = () => {
  if (isGtagEnabled()) {
    trackEvent('contact_modal_scrolled', {
      label: 'User Scrolled Modal',
      section: 'contact',
      scroll_triggered: 'content_overflow'
    });
  }
};

// Vérifier si le défilement est nécessaire (existant avec ajout de tracking)
const checkScrollNeeded = () => {
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    const needsScroll = modalContent.scrollHeight > modalContent.clientHeight;
    showScrollIndicator.value = needsScroll;
    
    // ✅ AJOUT : Tracking si le défilement est nécessaire
    if (needsScroll && isGtagEnabled()) {
      trackEvent('contact_modal_scroll_required', {
        label: 'Modal Content Overflow',
        section: 'contact',
        content_height: modalContent.scrollHeight,
        visible_height: modalContent.clientHeight
      });
    }
    
    modalContent.addEventListener('scroll', () => {
      if (modalContent.scrollTop > 20) {
        showScrollIndicator.value = false;
        trackScrollBehavior();
      }
    }, { passive: true });
  }
};

// ✅ AJOUT : Tracking de l'engagement utilisateur
const startEngagementTracking = () => {
  if (isGtagEnabled()) {
    engagementTimer = setInterval(() => {
      trackEngagement('modal_active', 30);
    }, 30000); // Tracker toutes les 30 secondes
  }
};

// Vérifier à nouveau si l'indicateur est nécessaire (existant avec ajouts)
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
    
    // ✅ AJOUT : Tracking d'ouverture du modal
    modalOpenTime.value = Date.now();
    if (isGtagEnabled()) {
      trackEvent('contact_modal_opened', {
        label: 'Contact Modal Opened',
        section: 'contact',
        modal_type: 'contact_form'
      });
      
      trackContactAction('modal_opened', 'contact_modal');
    }
    
    // Démarrer le tracking d'engagement
    startEngagementTracking();
    
    nextTick(() => {
      setTimeout(checkScrollNeeded, 500);
    });
  } else {
    document.body.style.overflow = 'auto';
    resetModalState();
  }
});

// ✅ AJOUT : Watchers pour le tracking des changements
watch(contactPreference, (newPref, oldPref) => {
  if (oldPref && newPref !== oldPref && isGtagEnabled()) {
    trackEvent('contact_preference_changed', {
      label: `${oldPref} to ${newPref}`,
      section: 'contact',
      old_preference: oldPref,
      new_preference: newPref
    });
  }
});

// ✅ AJOUT : Tracking des erreurs de validation en temps réel
watch(errors, (newErrors, oldErrors) => {
  if (isGtagEnabled()) {
    const newErrorCount = Object.keys(newErrors).length;
    const oldErrorCount = Object.keys(oldErrors || {}).length;
    
    if (newErrorCount > oldErrorCount) {
      trackEvent('contact_validation_errors_increased', {
        label: 'Validation Errors',
        section: 'contact',
        error_count: newErrorCount,
        form_progress: formProgress.value
      });
    }
  }
}, { deep: true });

// onMounted existant avec ajouts
onMounted(async () => {
  nextTick(() => {
    setTimeout(checkScrollNeeded, 500);
  });
});

// ✅ AJOUT : Nettoyage au démontage
onUnmounted(() => {
  if (engagementTimer) {
    clearInterval(engagementTimer);
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
