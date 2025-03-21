import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import homePage from './views/homePage.vue';
import login from './views/login.vue'; // Import de la nouvelle page
import register from './views/register.vue';
import task from './views/task.vue';
const routes = [
  { path: '/', name: 'home', component: homePage, meta: {requiresAuth: true} }, // Page principale
  { path: '/login', name: 'login', component: login }, // Nouvelle page
  { path: '/register', name: 'register', component: register },
  { path: '/task/:projectId', name: 'task', component: task, meta: {requiresAuth: true} } // Ajout de l'id projet en paramètre
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Vérifie si un token est stocké

  if (to.meta.requiresAuth && !token) {
    next('/login'); // Redirige vers la page de connexion si pas de token
  } else if ((to.name === 'login' || to.name === 'register') && token) {
    next('/'); // Redirige vers la page d'accueil si déjà authentifié
  } else {
    next(); // Continue la navigation
  }
});

export default router;
