import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
  // Ajoutez d'autres routes ici si nécessaire
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
