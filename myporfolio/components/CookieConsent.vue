<!-- filepath: d:\Stockage\Perso\Porfolio\My-Porfolio\myporfolio\components\CookieConsent.vue -->
<template>
  <!-- ✅ Version subtile en bas de page -->
  <Transition name="cookie-slide" appear>
    <div v-if="showConsent" class="cookie-consent-subtle">
      <div class="consent-bar">
        <!-- ✅ Icône discrète -->
        <div class="consent-icon-small">
          <i class="fas fa-shield-alt"></i>
        </div>

        <!-- ✅ Message concis et élégant -->
        <div class="consent-message">
          <span class="consent-title">
            <i class="fas fa-cookie-bite"></i>
            Cookies & Confidentialité
          </span>
          <p class="consent-text">
            Ce site utilise Google Analytics (via Google Tag Manager) pour 
            <span class="highlight">améliorer votre expérience</span>. 
            Données 100% anonymes, conformes RGPD.
            <button @click="showDetails = !showDetails" class="learn-more-link">
              <i class="fas fa-info-circle"></i>
              {{ showDetails ? 'Masquer' : 'Détails' }}
            </button>
          </p>
        </div>

        <!-- ✅ Actions compactes avec dark pattern subtil -->
        <div class="consent-actions-compact">
          <!-- ✅ Bouton accept - plus attractif (dark pattern) -->
          <button @click="acceptCookies" class="accept-btn-compact">
            <i class="fas fa-check"></i>
            <span>J'accepte</span>
            <div class="btn-pulse"></div>
          </button>

          <!-- ✅ Bouton decline - plus petit et gris -->
          <button @click="declineCookies" class="decline-btn-compact">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- ✅ Bouton fermeture discret -->
        <button @click="dismissTemporary" class="dismiss-btn" aria-label="Reporter plus tard">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>

      <!-- ✅ Détails expandables (très compact) -->
      <Transition name="details-slide">
        <div v-if="showDetails" class="consent-details-compact">
          <div class="details-content">
            <div class="detail-item">
              <i class="fas fa-chart-bar text-blue-400"></i>
              <span><strong>Google Analytics :</strong> Statistiques de visite anonymes</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-tag text-purple-400"></i>
              <span><strong>Google Tag Manager :</strong> Gestion des cookies analytiques</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-shield-alt text-green-400"></i>
              <span><strong>RGPD :</strong> Conformité totale, IP anonymisée</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-user-shield text-blue-400"></i>
              <span><strong>Vos droits :</strong> Refus, modification, suppression</span>
            </div>
          </div>
          
          <div class="details-footer">
            <a href="/privacy" class="privacy-link-compact">
              <i class="fas fa-external-link-alt"></i>
              Politique de confidentialité complète
            </a>
            <a href="https://policies.google.com/privacy" target="_blank" class="privacy-link-compact">
              <i class="fas fa-external-link-alt"></i>
              Politique Google
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>

  <!-- ✅ Indicateur de choix fait (très discret) -->
  <Transition name="fade">
    <div v-if="showChoiceIndicator" class="choice-indicator">
      <i class="fas fa-check-circle"></i>
      <span>{{ choiceMessage }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showConsent = ref(false)
const showDetails = ref(false)
const showChoiceIndicator = ref(false)
const choiceMessage = ref('')
const { $analyticsConsent } = useNuxtApp()

onMounted(() => {
  const consent = localStorage.getItem('analytics-consent')
  if (!consent) {
    // ✅ Apparition très retardée et subtile
    setTimeout(() => {
      showConsent.value = true
    }, 5000) // 5 secondes pour ne pas déranger
  }
})

// ✅ Dark pattern : Reporter temporairement (réapparaît plus tard)
const dismissTemporary = () => {
  showConsent.value = false
  // ✅ Réapparaît après 30 secondes (dark pattern subtil)
  setTimeout(() => {
    if (!localStorage.getItem('analytics-consent')) {
      showConsent.value = true
    }
  }, 30000)
}

const acceptCookies = () => {
  showConsent.value = false
  choiceMessage.value = 'Merci ! Analytics activé'
  showChoiceIndicator.value = true
  
  if ($analyticsConsent) {
    $analyticsConsent.accept()
  }
  
  // ✅ Feedback positif
  setTimeout(() => {
    showChoiceIndicator.value = false
  }, 3000)
}

const declineCookies = () => {
  showConsent.value = false
  choiceMessage.value = 'Analytics désactivé'
  showChoiceIndicator.value = true
  
  if ($analyticsConsent) {
    $analyticsConsent.decline()
  }
  
  // ✅ Feedback neutre
  setTimeout(() => {
    showChoiceIndicator.value = false
  }, 2000)
}
</script>

<style scoped>
/* ✅ Base subtile - En bas comme une notification */
.cookie-consent-subtle {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 10001;
  max-width: 900px;
  margin: 0 auto;
}

.consent-bar {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(96, 165, 250, 0.3);
  border-radius: 16px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.consent-bar:hover {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

/* ✅ Icône très discrète */
.consent-icon-small {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

/* ✅ Message élégant et compact */
.consent-message {
  flex: 1;
  color: white;
}

.consent-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #60a5fa;
  margin-bottom: 0.25rem;
}

.consent-text {
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
}

.highlight {
  color: #60a5fa;
  font-weight: 500;
}

.learn-more-link {
  background: none;
  border: none;
  color: rgba(96, 165, 250, 0.8);
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.2s ease;
}

.learn-more-link:hover {
  color: #60a5fa;
}

/* ✅ Actions compactes avec dark pattern */
.consent-actions-compact {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.accept-btn-compact {
  position: relative;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border: none;
  border-radius: 10px;
  padding: 0.6rem 1rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: 0 4px 8px rgba(34, 197, 94, 0.3);
}

.accept-btn-compact:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 12px rgba(34, 197, 94, 0.4);
}

.btn-pulse {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: inherit;
  animation: pulse-effect 2s ease-in-out infinite;
}

.decline-btn-compact {
  width: 36px;
  height: 36px;
  background: rgba(107, 114, 128, 0.4);
  border: 1px solid rgba(107, 114, 128, 0.6);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 0.8rem;
}

.decline-btn-compact:hover {
  background: rgba(107, 114, 128, 0.6);
  color: rgba(255, 255, 255, 0.8);
}

.dismiss-btn {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 0.8rem;
}

.dismiss-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
}

/* ✅ Détails très compacts */
.consent-details-compact {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 12px;
  margin-top: 0.75rem;
  padding: 1rem;
}

.details-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
}

.details-footer {
  text-align: center;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(96, 165, 250, 0.1);
}

.privacy-link-compact {
  color: #60a5fa;
  text-decoration: none;
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.2s ease;
}

.privacy-link-compact:hover {
  color: #93c5fd;
}

/* ✅ Indicateur de choix très discret */
.choice-indicator {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 10002;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.choice-indicator i {
  color: #22c55e;
}

/* ✅ Animations subtiles */
@keyframes pulse-effect {
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(1); 
  }
  50% { 
    opacity: 0.1; 
    transform: scale(1.05); 
  }
}

/* ✅ Transitions */
.cookie-slide-enter-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.cookie-slide-leave-active {
  transition: all 0.3s ease-in;
}

.cookie-slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.cookie-slide-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.details-slide-enter-active,
.details-slide-leave-active {
  transition: all 0.3s ease;
}

.details-slide-enter-from,
.details-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.details-slide-enter-to,
.details-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 200px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* ✅ Responsive très optimisé */
@media (max-width: 768px) {
  .cookie-consent-subtle {
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  
  .consent-bar {
    padding: 0.75rem 1rem;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .consent-message {
    order: 1;
    flex-basis: 100%;
  }
  
  .consent-actions-compact {
    order: 2;
  }
  
  .dismiss-btn {
    order: 3;
  }
  
  .details-content {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .consent-bar {
    padding: 0.5rem 0.75rem;
  }
  
  .consent-icon-small {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
  
  .consent-title {
    font-size: 0.8rem;
  }
  
  .consent-text {
    font-size: 0.75rem;
  }
  
  .accept-btn-compact {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .choice-indicator {
    top: 10px;
    right: 10px;
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>