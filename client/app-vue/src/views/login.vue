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
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .input-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background: #369b72;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  
  .success {
    color: green;
    margin-top: 10px;
  }
</style>
