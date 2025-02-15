import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import homePage from './views/homePage.vue';
import login from './views/login.vue'; // Import de la nouvelle page

const routes = [
  { path: '/', component: homePage },      // Page principale
  { path: '/login', component: login } // Nouvelle page
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
