// main.js
import { createApp } from 'vue';
import App from './app.vue';
import router from './router/index'; // Si vous avez un routeur


const app = createApp(App);

app.use(router); // Si vous utilisez un routeur


app.mount('#app');
