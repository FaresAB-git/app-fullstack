import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // Import du routeur
import './main.css';







const app = createApp(App);
app.use(router); // Activation de Vue Router
app.mount('#app');