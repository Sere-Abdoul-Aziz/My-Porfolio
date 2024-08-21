import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/egg',  // Nouvelle route pour accéder à Egg.html
    name: 'Egg',
    beforeEnter() {
      // Rediriger vers le fichier Egg.html dans le dossier public
      window.location.href = '/Egg.html';
    }
  }
 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
