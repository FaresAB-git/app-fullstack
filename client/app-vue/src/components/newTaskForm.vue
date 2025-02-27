<script setup>
import { createTask, updateTask } from "@/services/task";
import { getUser } from "@/services/auth";
import { getProjectUsers} from '@/services/project';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  taskToEdit: Object, // La tache existant à modifier (peut être null)
});

const route = useRoute();

const errorMessage = ref('');
const successMessage = ref('');
const title = ref('');
const description = ref('');
const responsable = ref('');
const projectMembers = ref([]);
const userResponsable = ref('');

const projectId = route.params.projectId;


onMounted(async () => {
  projectMembers.value = await getProjectUsers(projectId);
  console.log(projectMembers.value);
});

watch(() => props.taskToEdit, (newTask) => {
  if (newTask) {
    title.value = newTask.title;
    description.value = newTask.description;
  } else {
    title.value = '';
    description.value = '';
  }
}, { immediate: true });

const submitTask = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  console.log(projectId);
  try {
    if (props.taskToEdit) {
      // Modification de la tache existant
      console.log("editTask");
      console.log(responsable.value);
      await updateTask(title.value, description.value, responsable.value, props.taskToEdit._id);
      successMessage.value = 'Tache mis à jour avec succès';
    } else {
      // Création d'une nouvelle tache
      await createTask(title.value, description.value, responsable.value, projectId);
      successMessage.value = 'Tache édité avec succès';
      console.log(successMessage);
    }
  } catch (error) {
    console.error(error);
    errorMessage.value = error.message;
  }
  window.location.reload();
};
</script>

<template>
  <div id="containerTaskForm">
    <form id="form" @submit.prevent="submitTask">
      <h2>{{ props.taskToEdit ? 'Edit Task' : 'New Task' }}</h2>
      <div class="form-group">
        <label for="title">Title:</label>
        <input v-model="title" type="text" id="title" name="title" required>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="description" id="description" name="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="description">responsable:</label>
        <select v-model="responsable" id="responsable" name="responsable" value= required>
          <option v-for="member in projectMembers" :key="member._id" :value="member._id"> {{ member.username }}</option>
        </select>
      </div>
      <div class="form-group">
        <input type="submit" value="Submit" class="submit-btn">
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
#containerTaskForm {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

#form {
  padding: 30px; 
  background-color: #ffffff;
  width: 100%;
  max-width: 600px; 
  min-width: 300px; 
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px; 
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

h2 {
  text-align: center;
  color: #007bff;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

textarea {
  resize: vertical;
  min-height: 150px; 
}

input[type="text"], textarea {
  padding: 14px; 
  font-size: 16px; 
}

input[type="text"]:focus,
textarea:focus {
  border-color: #007bff;
}

.submit-btn {
  padding: 12px 24px; 
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.error-message {
  color: #dc3545;
  text-align: center;
  margin-top: 10px;
}

.success-message {
  color: #28a745;
  text-align: center;
  margin-top: 10px;
}

@media (max-width: 600px) {
  #form {
    padding: 20px;
    min-width: 100%;
  }
}
</style>