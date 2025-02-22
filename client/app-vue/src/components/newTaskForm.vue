<script setup> 
import { createTask } from "@/services/task";
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const errorMessage = ref('');
const successMessage = ref('');
const title = ref('')
const description = ref('')

const projectId = route.params.projectId; 

const submitTask = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const data = await createTask(title.value, description.value, projectId);
    successMessage.value = 'succes';
    console.log(successMessage);
  } catch (error) {
    console.error(error);
    errorMessage.value = error.message;
  }
};

</script>

<template>
   <div id="container">
        <form id="form" @submit.prevent="submitTask">
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
    background-color: whitesmoke;
    width: 300px;
    margin: auto;
    display: flex;
    flex-direction: column;
}


</style>