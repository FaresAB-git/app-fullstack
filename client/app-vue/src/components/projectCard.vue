<script setup>
const props = defineProps({
  projectProps: Object
});

const emit = defineEmits(["editProject", "deleteProject"]); // Émission d'un événement pour passer le projet à éditer
</script>

<template>
  <div class="card">
    <router-link :to="{ name: 'task', params: { projectId: projectProps._id } }" class="link">
      <h2>{{ projectProps.title }}</h2>
    
      <p><strong>Créateur :</strong> {{ projectProps.owner }}</p>
      <p><strong>Description :</strong> {{ projectProps.description }}</p>
      <p><strong>Date de création :</strong> {{ projectProps.dateCreation }}</p>
    </router-link>

    <button @click="$emit('editProject', projectProps)" class="edit-btn">Edit</button>
    <button @click="$emit('deleteProject', projectProps._id)" class="del-btn">Delete</button>

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
.edit-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: orange;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.del-btn {
  margin-top: 10px;
  margin-left: 10px;
  padding: 5px 10px;
  background-color: rgb(245, 37, 37);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.link {
  text-decoration: none;
  color: black;
}
</style>
