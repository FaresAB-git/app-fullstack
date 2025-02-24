<script setup> 
function logout() {
    localStorage.removeItem('token');
    window.location.reload();
}
</script>

<template>
    <div id="headerContainer">
        <h1 id="title"> Project Manager </h1>
        <button @click="logout" class="logout">logout</button>
    </div>

</template>

<style scoped>

    #headerContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: lightgray;
        padding: 16px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }

    #title {
        color: #333;
    }

    .logout{
        position: absolute;
        top:50px;
        right: 50px;
    }

</style>