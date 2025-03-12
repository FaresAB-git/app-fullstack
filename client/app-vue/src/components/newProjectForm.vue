<script setup> 
import { createProject, updateProject } from '@/services/project';
import { ref, watch } from 'vue';

const props = defineProps({
  projectToEdit: Object, // Le projet existant à modifier (peut être null)
});

const errorMessage = ref('');
const successMessage = ref('');
const title = ref('')
const description = ref('')

//regarde si il le props est vide, si le props n'est pas null, les champs se remplisse avec le titre et la description
watch(() => props.projectToEdit, (newProject) => {
  if (newProject) {
    title.value = newProject.title;
    description.value = newProject.description;
  } else {
    title.value = '';
    description.value = '';
  }
},
{ immediate: true }
);

const emit = defineEmits(['projectUpdated']); //evennement pour recharger la page après la création ou la modification du projet


const submitProject = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    if (props.projectToEdit) {
      // Modification du projet existant
      await updateProject(title.value, description.value, props.projectToEdit._id);
      successMessage.value = 'Projet mis à jour avec succès';
    } else {
      // Création d'un nouveau projet
      const newProject = await createProject(title.value, description.value);
      successMessage.value = 'Projet créé avec succès';
      emit('projectUpdated', newProject); // Émettre l'événement avec le nouveau projet
    }
  } catch (error) {
    console.error(error);
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div id="containerProjectForm">
    <form id="form" @submit.prevent="submitProject">
      <h2>{{ props.projectToEdit ? 'Modifier le Projet' : 'Nouveau Projet' }}</h2>
      <div class="form-group">
        <label for="title">Title :</label>
        <input v-model="title" type="text" id="title" name="title" required>
      </div>
      <div class="form-group">
        <label for="description">Description :</label>
        <textarea v-model="description" id="description" name="description" required></textarea>
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
#containerProjectForm {
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