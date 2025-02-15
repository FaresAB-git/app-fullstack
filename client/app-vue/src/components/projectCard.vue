<script setup>
defineProps({
  project: Object
});
</script>

<template>
  <div class="card">
    <h2>{{ project.title }}</h2>
    <p><strong>Créateur :</strong> {{ project.owner.username }}</p>
    <p><strong>Description :</strong> {{ project.description }}</p>
    <p><strong>Date de création :</strong> {{ new Date(project.dateCreation).toLocaleDateString() }}</p>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}
h2 {
  color: #333;
}
</style>
