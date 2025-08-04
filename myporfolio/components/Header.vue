<template>
  <div class="bg-gray-800 text-white flex items-center justify-between p-4">
    <div class="flex items-center">
      <div
        class="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4 logo-container"
        @mouseover="hoverLogo"
        @mouseleave="leaveLogo"
      >
        <!-- Logo or Icon -->
        <i class="fas fa-code text-blue-400"></i>
      </div>
      <h1 class="text-xl font-bold transition-transform transform hover:scale-105">
        {{ currentLanguage === 'fr' ? 'Tableau de bord' : 'Dashboard' }}
      </h1>
    </div>
    
    <div class="flex items-center space-x-4">
      <!-- Language Toggle -->
      <div class="language-toggle-container">
        <button 
          @click="toggleLanguage" 
          class="language-toggle-btn"
          :title="currentLanguage === 'fr' ? 'Switch to English' : 'Passer au français'"
        >
          <div class="language-toggle">
            <div class="language-option" :class="{ active: currentLanguage === 'fr' }">
              <img src="@/assets/images/france_flag.jpeg" alt="Français" class="flag-mini">
              <span class="lang-text">FR</span>
            </div>
            <div class="language-option" :class="{ active: currentLanguage === 'en' }">
              <img src="@/assets/images/uk_flag.jpeg" alt="English" class="flag-mini">
              <span class="lang-text">EN</span>
            </div>
            <div class="toggle-slider" :class="{ 'slide-right': currentLanguage === 'en' }"></div>
          </div>
        </button>
      </div>

      <!-- MacOS Window Buttons -->
      <div class="flex space-x-1">
        <div
          class="w-3.5 h-3.5 bg-red-500 rounded-full transition-transform transform hover:scale-110"
        ></div>
        <div
          class="w-3.5 h-3.5 bg-yellow-500 rounded-full transition-transform transform hover:scale-110"
        ></div>
        <div
          class="w-3.5 h-3.5 bg-green-500 rounded-full transition-transform transform hover:scale-110"
        ></div>
      </div>
      
      <!-- Avatar/Easter Egg Button -->
      <div
        class="bg-blue-600 p-2 rounded-full avatar-container transition-transform transform hover:scale-105 hover:bg-blue-500"
        @click="toggleEasterEgg"
        @mouseover="hoverAvatar"
        @mouseleave="leaveAvatar"
        :title="currentLanguage === 'fr' ? 'Easter Egg caché ici 🥚' : 'Hidden Easter Egg here 🥚'"
      >
        <i class="fas fa-user text-white"></i>
      </div>
    </div>
  </div>
  
  <EasterEggModal :isOpen="isEasterEggOpen" @close="toggleEasterEgg" />
</template>

<script>
import { ref, computed } from 'vue';
import EasterEggModal from '@/components/EasterEggModal.vue';

export default {
  name: 'Header',
  components: {
    EasterEggModal,
  },
  setup() {
    const isEasterEggOpen = ref(false);
    const currentLanguage = ref('fr'); // Langue par défaut

    const toggleEasterEgg = () => {
      isEasterEggOpen.value = !isEasterEggOpen.value;
    };

    const toggleLanguage = () => {
      currentLanguage.value = currentLanguage.value === 'fr' ? 'en' : 'fr';
      
      // Émettre un événement global pour informer les autres composants
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: currentLanguage.value } 
      }));
      
      // Optionnel : sauvegarder dans localStorage
      localStorage.setItem('preferred-language', currentLanguage.value);
      
      console.log(`Language switched to: ${currentLanguage.value}`);
    };

    // Charger la langue sauvegardée au démarrage
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && ['fr', 'en'].includes(savedLanguage)) {
      currentLanguage.value = savedLanguage;
    }

    return {
      isEasterEggOpen,
      currentLanguage,
      toggleEasterEgg,
      toggleLanguage,
      hoverLogo() {
        const logo = document.querySelector('.logo-container');
        logo?.classList.add('animate-pulse');
      },
      leaveLogo() {
        const logo = document.querySelector('.logo-container');
        logo?.classList.remove('animate-pulse');
      },
      hoverAvatar() {
        const avatar = document.querySelector('.avatar-container');
        avatar?.classList.add('animate-bounce');
      },
      leaveAvatar() {
        const avatar = document.querySelector('.avatar-container');
        avatar?.classList.remove('animate-bounce');
      },
    };
  },
};
</script>

<style scoped>
.logo-container,
.avatar-container {
  transition: all 0.3s ease-in-out;
}

.language-toggle-container {
  position: relative;
}

.language-toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.language-toggle {
  position: relative;
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  min-width: 80px;
  height: 32px;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 18px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  flex: 1;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.language-option.active {
  color: rgba(255, 255, 255, 0.95);
}

.language-option:not(.active) {
  color: rgba(255, 255, 255, 0.6);
}

.flag-mini {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.lang-text {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(50% - 2px);
  height: calc(100% - 4px);
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 16px;
  transition: transform 0.3s ease;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

.toggle-slider.slide-right {
  transform: translateX(100%);
}

.language-toggle:hover {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.language-toggle:hover .toggle-slider {
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.6);
}

/* Animation de transition */
.language-toggle-btn:active .language-toggle {
  transform: scale(0.95);
}

/* Responsive */
@media (max-width: 768px) {
  .language-toggle {
    min-width: 70px;
    height: 28px;
  }
  
  .flag-mini {
    width: 14px;
    height: 14px;
  }
  
  .lang-text {
    font-size: 0.65rem;
  }
  
  .language-option {
    padding: 2px 6px;
    gap: 2px;
  }
}

@media (max-width: 480px) {
  .lang-text {
    display: none; /* Masquer le texte sur très petits écrans */
  }
  
  .language-toggle {
    min-width: 50px;
  }
  
  .language-option {
    padding: 4px;
  }
}
</style>
