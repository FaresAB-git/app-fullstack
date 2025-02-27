<script setup>
import { onMounted, ref } from 'vue';
import { getUserById } from '@/services/auth';

const props = defineProps({
  projectProps: Object
});

const ownerName = ref("Chargement...");

const isOwner = ref(false); //permet d'afficher le bouton edit et supprimer uniquement si le user est owner du projet

// verifie si le user est owner du projet + Récupère le username de l'owner via son ID 
onMounted(async () => {
  try {
    if(props.projectProps.owner == localStorage.getItem("userId")) {  
      isOwner.value = true;
      console.log(isOwner.value);
    }

    const user = await getUserById(props.projectProps.owner);
    ownerName.value = user.username || "Utilisateur inconnu";
  } catch (error) {
    console.error("Erreur lors de la récupération de l'owner :", error);
    ownerName.value = "Erreur de chargement";
  }
  
});

const emit = defineEmits(["editProject", "deleteProject"]); // Émission d'un événement pour passer le projet à éditer
</script>

<template>
  <div class="card">
    <router-link :to="{ name: 'task', params: { projectId: projectProps._id } }" class="link">
      <h2>{{ projectProps.title }}</h2>
      <p><strong>Créateur :</strong> {{ ownerName }}</p>
      <p><strong>Description :</strong> {{ projectProps.description }}</p>
      <p><strong>Date de création :</strong> {{ projectProps.dateCreation }}</p>
    </router-link>
    <div class="button-group">
      <button @click="$emit('editProject', projectProps)" class="edit-btn" v-if="isOwner">Edit</button>
      <button @click="$emit('deleteProject', projectProps._id)" class="del-btn" v-if="isOwner">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  background: #ffffff;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.2);
}

h2 {
  color: #007bff;
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
  color: #333;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.edit-btn, .del-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.edit-btn {
  background-color: #ffc107;
  color: #fff;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.del-btn {
  background-color: #dc3545;
  color: #fff;
  margin-left: 10px;
}

.del-btn:hover {
  background-color: #c82333;
}

.link {
  text-decoration: none;
  color: inherit;
  display: block;
}
</style>