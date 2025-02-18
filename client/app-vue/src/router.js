import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import homePage from './views/homePage.vue';
import login from './views/login.vue'; // Import de la nouvelle page
import register from './views/register.vue';

const routes = [
  { path: '/', component: homePage, meta: {requiresAuth: true} },      // Page principale
  { path: '/login', component: login }, // Nouvelle page
  { path: '/register', component: register }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Vérifie si un token est stocké

  if (to.meta.requiresAuth && !token) {
    next('/login'); // Redirige vers la page de connexion si pas de token
  } else {
    next(); // Continue la navigation
  }
});

export default router;
