<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import { createApp } from 'vue';
import Header from './components/Header.vue';
import { app as firebaseApp } from './firebase'; // Import Firebase to ensure it's initialized


// const app = createApp(App);


// app.mount('#app');

export default {
  name: 'App',
  components: {
    Header,
  },
  mounted() {
    // Message original pour les développeurs
    console.log("%c─────────────────────────────────────────────", "color: #ff6347; font-size: 20px; font-weight: bold;");
    console.log("%c| Salut, développeur curieux !                         |", "color: #ff6347; font-size: 20px; font-weight: bold;");
    console.log("%c─────────────────────────────────────────────", "color: #ff6347; font-size: 20px; font-weight: bold;");

    console.log("%c| Il semble que tu aimes explorer les coulisses... 👀  |", "color: #20b2aa; font-size: 16px; background: #fff3cd; padding: 4px 0;");
    console.log("%c| Si tu es du genre à aimer les surprises,            |", "color: #f39c12; font-size: 16px; background: #fff3cd; padding: 4px 0;");
    console.log("%c| tu devrais peut-être chercher un petit Easter Egg   |", "color: #f39c12; font-size: 16px; background: #fff3cd; padding: 4px 0;");
    console.log("%c| caché dans ce site...                               |", "color: #f39c12; font-size: 16px; background: #fff3cd; padding: 4px 0;");
    
    console.log("%c| Astuce : Tout n'est pas que decor. Amuse-toi bien ! 🎉 |", "color: #3498db; font-size: 16px; font-style: italic; background: #dff9fb; padding: 4px 0;");
    
    console.log("%c| SERE Abdoul Aziz - Fullstack Developer              |", "color: #2ecc71; font-size: 14px; font-style: italic; background: #eafaf1; padding: 4px 0;");
    console.log("%c─────────────────────────────────────────────", "color: #ff6347; font-size: 20px; font-weight: bold;");
}

};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Masquer le défilement horizontal */
  overflow-y: scroll;
  /* overflow-y: hidden; */
}

</style>
