<script setup>
const props = defineProps({
  projectProps: Object
});

console.log(props.projectProps);
</script>

<template>
  <div class="card">
    <router-link :to="{ name:'task', params: { projectId: projectProps._id } }">
      <h2>{{ projectProps.title }}</h2>
    </router-link>
    <p><strong>Créateur :</strong> {{ projectProps.owner }}</p>
    <p><strong>Description :</strong> {{ projectProps.description }}</p>
    <p><strong>Date de création :</strong> {{ projectProps.dateCreation }}</p>
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
