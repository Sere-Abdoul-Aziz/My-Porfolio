<template>
  <div class="bg-gray-800 text-white">
    <!-- Header principal -->
    <div class="flex items-center justify-between p-3 sm:p-4">
      <!-- Logo et titre -->
      <div class="flex items-center">
        <div
          class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center mr-2 sm:mr-4 logo-container"
          @mouseover="hoverLogo"
          @mouseleave="leaveLogo"
        >
          <i class="fas fa-code text-blue-400 text-sm sm:text-base"></i>
        </div>
        <h1 class="text-base sm:text-lg lg:text-xl font-bold transition-transform transform hover:scale-105 hidden sm:block">
          {{ currentLanguage === 'fr' ? 'Tableau de bord' : 'Dashboard' }}
        </h1>
      </div>
      
      <!-- Actions desktop + mobile toggle -->
      <div class="flex items-center gap-2 sm:gap-4 lg:gap-6">
        <!-- Navigation Desktop uniquement -->
        <nav class="hidden lg:flex items-center gap-4 xl:gap-6">
          <NuxtLink 
            to="/" 
            class="text-gray-300 hover:text-white transition-colors font-medium text-sm"
          >
            {{ currentLanguage === 'fr' ? 'Accueil' : 'Home' }}
          </NuxtLink>
          <NuxtLink 
            to="/ressources" 
            class="text-gray-300 hover:text-white transition-colors font-medium text-sm"
          >
            {{ currentLanguage === 'fr' ? 'Ressources' : 'Resources' }}
          </NuxtLink>
          <NuxtLink 
            to="/games" 
            class="text-gray-300 hover:text-white transition-colors font-medium text-sm"
          >
            {{ currentLanguage === 'fr' ? 'Jeux' : 'Games' }}
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="text-gray-300 hover:text-white transition-colors font-medium text-sm"
          >
            {{ currentLanguage === 'fr' ? 'À propos' : 'About' }}
          </NuxtLink>
        </nav>

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

        <!-- MacOS Window Buttons - masqués sur mobile -->
        <div class="hidden sm:flex space-x-1">
          <div class="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-red-500 rounded-full transition-transform transform hover:scale-110"></div>
          <div class="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-yellow-500 rounded-full transition-transform transform hover:scale-110"></div>
          <div class="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full transition-transform transform hover:scale-110"></div>
        </div>
        
        <!-- Avatar/Easter Egg Button -->
        <div
          class="bg-blue-600 p-1.5 sm:p-2 rounded-full avatar-container transition-transform transform hover:scale-105 hover:bg-blue-500"
          @click="toggleEasterEgg"
          @mouseover="hoverAvatar"
          @mouseleave="leaveAvatar"
          :title="currentLanguage === 'fr' ? 'Easter Egg caché ici 🥚' : 'Hidden Easter Egg here 🥚'"
        >
          <i class="fas fa-user text-white text-xs sm:text-sm"></i>
        </div>

        <!-- Burger menu mobile -->
        <button 
          @click="toggleMobileMenu" 
          class="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          :aria-label="currentLanguage === 'fr' ? 'Menu' : 'Menu'"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Menu mobile -->
    <Transition name="slide-down">
      <nav v-if="isMobileMenuOpen" class="lg:hidden border-t border-gray-700 bg-gray-800">
        <div class="flex flex-col space-y-1 p-4">
          <NuxtLink 
            to="/" 
            @click="closeMobileMenu"
            class="text-gray-300 hover:text-white hover:bg-gray-700 transition-colors font-medium py-3 px-4 rounded-lg"
          >
            {{ currentLanguage === 'fr' ? 'Accueil' : 'Home' }}
          </NuxtLink>
          <NuxtLink 
            to="/ressources" 
            @click="closeMobileMenu"
            class="text-gray-300 hover:text-white hover:bg-gray-700 transition-colors font-medium py-3 px-4 rounded-lg"
          >
            {{ currentLanguage === 'fr' ? 'Ressources' : 'Resources' }}
          </NuxtLink>
          <NuxtLink 
            to="/games" 
            @click="closeMobileMenu"
            class="text-gray-300 hover:text-white hover:bg-gray-700 transition-colors font-medium py-3 px-4 rounded-lg"
          >
            {{ currentLanguage === 'fr' ? 'Jeux' : 'Games' }}
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            @click="closeMobileMenu"
            class="text-gray-300 hover:text-white hover:bg-gray-700 transition-colors font-medium py-3 px-4 rounded-lg"
          >
            {{ currentLanguage === 'fr' ? 'À propos' : 'About' }}
          </NuxtLink>
        </div>
      </nav>
    </Transition>
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
    const isMobileMenuOpen = ref(false);
    const currentLanguage = ref('fr'); // Langue par défaut

    const toggleEasterEgg = () => {
      isEasterEggOpen.value = !isEasterEggOpen.value;
    };

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false;
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
      isMobileMenuOpen,
      currentLanguage,
      toggleEasterEgg,
      toggleMobileMenu,
      closeMobileMenu,
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

.language-toggle-btn:active .language-toggle {
  transform: scale(0.95);
}

/* Animation du menu mobile */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 300px;
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 1024px) {
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

@media (max-width: 640px) {
  .language-toggle {
    min-width: 60px;
    height: 26px;
  }
  
  .flag-mini {
    width: 12px;
    height: 12px;
  }
  
  .lang-text {
    font-size: 0.6rem;
  }
}

@media (max-width: 480px) {
  .lang-text {
    display: none;
  }
  
  .language-toggle {
    min-width: 50px;
  }
  
  .language-option {
    padding: 4px;
  }
}
</style>
