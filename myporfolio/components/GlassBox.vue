<template>
  <div ref="glassBox" class="glassmorphism-box relative p-6 md:p-10 rounded-lg backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 border border-white border-opacity-30 font-fira-code max-w-full mx-auto">
    <p class="text-base md:text-lg text-gray-200 max-w-xl mx-auto">
      J'apporte de la valeur aux projets numériques
    </p>
    <p class="mt-4 md:mt-6 text-base md:text-lg text-gray-200 max-w-xl mx-auto">
      en fusionnant l'expertise technique avec l'innovation et une touche d'originalité
    </p>
    <p class="mt-4 md:mt-2 text-xs md:text-sm text-gray-200 text-center">
      Basé en Tunisie | Heure locale : {{ localTime }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const localTime = ref('');

const updateLocalTime = () => {
  const options = { timeZone: 'Africa/Tunis', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  localTime.value = new Intl.DateTimeFormat('fr-FR', options).format(new Date());
};

onMounted(() => {
  updateLocalTime();
  setInterval(updateLocalTime, 1000); // Mise à jour toutes les secondes
});
</script>

<style scoped>
.glassmorphism-box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin: 0 auto; /* Center the box */
  width: 90%; /* Reduce width on small screens */
}

@media (min-width: 768px) {
  .glassmorphism-box {
    width: 80%; /* Increase width on medium screens */
  }
}

@media (min-width: 1024px) {
  .glassmorphism-box {
    width: 70%; /* Increase width on large screens */
  }
}

.font-fira-code {
  font-family: 'Fira Code', monospace;
}

.text-gray-200 {
  color: rgba(255, 255, 255, 0.8);
}

</style>
