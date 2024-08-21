<template>
  <div class="bg-gray-800 text-white flex items-center justify-between p-4">
    <div class="flex items-center">
      <div
        class="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4 logo-container"
        @mouseover="hoverLogo"
        @mouseleave="leaveLogo"
      >
        <!-- Logo or Icon -->
      </div>
      <h1 class="text-xl font-bold transition-transform transform hover:scale-105">Dashboard</h1>
    </div>
    <div class="flex items-center space-x-3">
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
      <div
        class="bg-blue-600 p-2 rounded-full avatar-container transition-transform transform hover:scale-105 hover:bg-blue-500"
        @click="toggleEasterEgg"
        @mouseover="hoverAvatar"
        @mouseleave="leaveAvatar"
      >
        <!-- <img src="path-to-avatar.jpg" alt="User Avatar" class="w-8 h-8 rounded-full"> -->
      </div>
    </div>
  </div>
  <EasterEggModal :isOpen="isEasterEggOpen" @close="toggleEasterEgg" />
</template>

<script>
import { ref } from 'vue';
import EasterEggModal from '@/components/EasterEggModal.vue'; // Chemin vers votre composant

export default {
  name: 'Header',
  components: {
    EasterEggModal,
  },
  setup() {
    const isEasterEggOpen = ref(false);

    const toggleEasterEgg = () => {
      isEasterEggOpen.value = !isEasterEggOpen.value;
    };

    return {
      isEasterEggOpen,
      toggleEasterEgg,
      hoverLogo() {
        const logo = document.querySelector('.logo-container');
        logo.classList.add('animate-pulse');
      },
      leaveLogo() {
        const logo = document.querySelector('.logo-container');
        logo.classList.remove('animate-pulse');
      },
      hoverAvatar() {
        const avatar = document.querySelector('.avatar-container');
        avatar.classList.add('animate-bounce');
      },
      leaveAvatar() {
        const avatar = document.querySelector('.avatar-container');
        avatar.classList.remove('animate-bounce');
      },
    };
  },
};
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques au composant si nécessaire */
.logo-container,
.avatar-container {
  transition: all 0.3s ease-in-out;
}
</style>
