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

const submitProject = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    if (props.projectToEdit) {
      // Modification du projet existant
      await updateProject(title.value, description.value,props.projectToEdit._id);
      successMessage.value = 'Projet mis à jour avec succès';
    } else {
      // Création d'un nouveau projet
      await createProject(title.value, description.value);
      successMessage.value = 'Projet créé avec succès';
    }
    } catch (error) {
    console.error(error);
    errorMessage.value = error.message;
  }
  window.location.reload();
};

</script>

<template>
   <div id="container">
        <form id="form" @submit.prevent="submitProject">
            <label for="title">Title:</label>
            <input v-model="title" type="text" id="title" name="title"><br><br>
            <label for="description">Description:</label>
            <input v-model="description" type="text" id="description" name="description"><br><br>
            <input type="submit" value="Submit">
        </form>
    </div>
</template>

<style scoped>


#form{
    padding: 20px;
    border-radius: 8px;
    background-color: whitesmoke;
    width: 300px;
    margin: auto;
    display: flex;
    flex-direction: column;
}


</style>