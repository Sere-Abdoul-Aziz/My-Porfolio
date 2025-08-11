<template>
  <div ref="glassBox" class="glassmorphism-box relative p-6 md:p-10 rounded-lg backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 border border-white border-opacity-30 font-fira-code max-w-full mx-auto" style="z-index: 10;">
    <p class="text-base md:text-lg text-gray-200 max-w-xl mx-auto">
      J'apporte de la valeur aux projets numériques
    </p>
    <p class="mt-4 md:mt-6 text-base md:text-lg text-gray-200 max-w-xl mx-auto">
      en fusionnant l'expertise technique avec l'innovation et une touche d'originalité
    </p>
    <p class="mt-4 md:mt-2 text-xs md:text-sm text-gray-200 text-center">
      Basé à Ouagadougou | Heure locale : {{ localTime }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const localTime = ref('');

const updateLocalTime = () => {
  // Timezone pour le Burkina Faso (GMT+0, même que UTC)
  const options = { 
    timeZone: 'Africa/Ouagadougou', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false 
  };
  localTime.value = new Intl.DateTimeFormat('fr-FR', options).format(new Date());
};

onMounted(() => {
  updateLocalTime();
  setInterval(updateLocalTime, 1000); // Mise à jour toutes les secondes
});
</script>

<style scoped>
.glassmorphism-box {
  background: rgba(255, 255, 255, 0.15) !important; /* Plus visible */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.4) !important; /* Bordure plus visible */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important; /* Ombre plus marquée */
  margin: 2rem auto; /* Espacement plus visible */
  width: 90%;
  position: relative;
  z-index: 10; /* Assurer qu'il soit au-dessus */
  min-height: 120px; /* Hauteur minimale pour être visible */
}

/* Assurer la visibilité du texte */
.text-gray-200 {
  color: rgba(255, 255, 255, 0.9) !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5); /* Ombre pour le texte */
}

@media (min-width: 768px) {
  .glassmorphism-box {
    width: 80%;
  }
}

@media (min-width: 1024px) {
  .glassmorphism-box {
    width: 70%;
  }
}

.font-fira-code {
  font-family: 'Fira Code', monospace;
}
</style>
