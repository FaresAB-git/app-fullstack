<script setup>
import HeaderHome from "@/components/headerHome.vue";
</script>

<template>
  
  <HeaderHome />
  
  <router-view></router-view> 
  


</template>

<style scoped>
.nav-links {
  display: flex;
  gap: 15px;
  margin: 20px 50px;
}

.nav-links a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}

.nav-links a:hover {
  color: blue;
}
</style>
