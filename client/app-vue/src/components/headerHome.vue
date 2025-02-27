<script setup>
function logout() {
    localStorage.removeItem('token'); //supression du token
    window.location.reload(); //si la page est reloead et qu il n'y a pas de token on est redirigé sur login
}
</script>

<template>
    <div id="headerContainer">
        <h1 id="title">Project Manager</h1>
        <button @click="logout" class="logout">Logout</button>
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