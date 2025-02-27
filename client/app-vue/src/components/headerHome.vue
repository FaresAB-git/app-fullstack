<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

function logout() {
    localStorage.removeItem('token'); // suppression du token
    window.location.reload(); // si la page est rechargée et qu'il n'y a pas de token, on est redirigé sur login
}

const route = useRoute();
const router = useRouter();

const showLogoutButton = computed(() => {
    return route.name !== 'login' && route.name !== 'register';
});

const goToHome = () => {
    router.push('/');
};
</script>

<template>
    <div id="headerContainer">
        <h1 id="title" @click="goToHome">Project Manager</h1>
        <button v-if="showLogoutButton" class="logout" @click="logout">Logout</button>
    </div>
</template>

<style scoped>
#headerContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #007bff;
    padding: 16px 32px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: #ffffff;
}

#title {
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
}

.logout {
    background-color: #dc3545;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.logout:hover {
    background-color: #c82333;
}
</style>