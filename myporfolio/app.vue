<template>
  <div id="app">
    <!-- ✅ Contenu critique VISIBLE immédiatement -->
    <div class="critical-splash" v-if="isLoading">
      <div class="critical-content">
        <h1 class="critical-title">SERE</h1>
        <p class="critical-subtitle">Ingénieur Fullstack</p>
        <div class="critical-loader"></div>
      </div>
    </div>
    
    <!-- ✅ Contenu principal -->
    <div v-show="!isLoading" class="main-content">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'

const isLoading = ref(true)

onMounted(() => {
  // ✅ Masquer le splash après le rendu critique
  setTimeout(() => {
    isLoading.value = false
  }, 300) // Temps minimal pour FCP
})
</script>

<style>
/* ✅ Styles critiques inline pour FCP immédiat */
.critical-splash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #0a192f 0%, #1e3a8a 50%, #0f172a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.critical-content {
  text-align: center;
  color: white;
}

.critical-title {
  font-size: 3rem;
  font-weight: bold;
  color: #60a5fa;
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
}

.critical-subtitle {
  font-size: 1.2rem;
  margin: 0.5rem 0;
  opacity: 0.8;
}

.critical-loader {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(96, 165, 250, 0.3);
  border-top: 3px solid #60a5fa;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 1rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.main-content {
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out 0.3s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}
</style>
