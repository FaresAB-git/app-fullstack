<script setup>
import { ref } from 'vue';
import { loginUser } from '@/services/auth';  // Import de la fonction de service
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();

const login = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const data = await loginUser(email.value, password.value); //fetch login
    localStorage.setItem('token', data.token)   //token dans le local storage, pour le passer en header dans tout nos autre fetch
    successMessage.value = 'Connexion réussie !';
    router.push('/');
  } catch (error) {
    console.error(error);
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div class="login-container">
    <h2>Connexion</h2>

    <form @submit.prevent="login">
      <div class="input-group">
        <label>Email :</label>
        <input type="email" v-model="email" required />
      </div>

      <div class="input-group">
        <label>Mot de passe :</label>
        <input type="password" v-model="password" required />
      </div>

      <button type="submit">Se connecter</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
    <p>Pas encore de compte ? <router-link to="/register">Inscrivez-vous</router-link></p>
  </div>
</template>

<style scoped> 
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-bottom: 20px;
  color: #007bff;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
}

button {
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #0056b3;
}

.error {
  color: #dc3545;
  margin-top: 10px;
}

.success {
  color: #28a745;
  margin-top: 10px;
}

p {
  margin-top: 20px;
  color: #333;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>