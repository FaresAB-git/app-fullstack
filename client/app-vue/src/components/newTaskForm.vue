<script setup> 
import { createTask, updateTask } from "@/services/task";
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  taskToEdit: Object, // La tache existant à modifier (peut être null)
});

const route = useRoute();

const errorMessage = ref('');
const successMessage = ref('');
const title = ref('')
const description = ref('')

const projectId = route.params.projectId; 

watch(() => props.taskToEdit, (newTask) => {
  if (newTask) {
    title.value = newTask.title;
    description.value = newTask.description;
  } else {
    title.value = '';
    description.value = '';
  }
},
{ immediate: true }
);

const submitTask = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    if (props.taskToEdit) {
      // Modification de la tache existant
      await updateTask(title.value, description.value,props.taskToEdit._id);
      successMessage.value = 'Tache mis à jour avec succès';
    } else {
      // Création d'une nouvelle tache
      const data = await createTask(title.value, description.value, projectId);
      successMessage.value = 'succes';
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
            <label for="title">Title:</label>
            <input v-model="title" type="text" id="title" name="title"><br><br>
            <label for="description">Description:</label>
            <input v-model="description" type="text" id="description" name="description" required="true"><br><br>
            <input type="submit" value="Submit">
        </form>
    </div>
</template>

<style scoped>


#form{
    padding: 20px;
    background-color: whitesmoke;
    width: 300px;
    margin: auto;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
}


</style>