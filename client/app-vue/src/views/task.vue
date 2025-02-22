<script setup>
import tasksData from "@/json/tasks.json";
import { getTask } from "@/services/task";
import { ref, computed } from "vue";
import { onMounted } from "vue";
import NewTaskForm from "@/components/newTaskForm.vue";
import { useRoute } from 'vue-router';

const route = useRoute();


const showForm = ref(false);
const projectTasks = ref([]);
const projectId = route.params.projectId; 

function toggleForm() {
  showForm.value = !showForm.value;
}

onMounted(async () => {

  projectTasks.value = await getTask(projectId);
  console.log(projectTasks.value);
});

const tasks = ref(tasksData);

// Filtrer les tâches en fonction de leur statut
const tasksRequested = computed(() => tasks.value.filter(task => task.status === "To Do"));
const tasksInProgress = computed(() => tasks.value.filter(task => task.status === "In Progress"));
const tasksDone = computed(() => tasks.value.filter(task => task.status === "Done"));
</script>

<template>
    <h1>Task Board</h1>
    <button @click="toggleForm" class="newTaskBtn">New Task</button>
    <NewTaskForm v-if="showForm" />
    <div id="container">
        <div id="taskRequested"> 
            <h2>To Do</h2>
            <div class="task" v-for="task in tasksRequested" :key="task.title"> 
                <h3>{{ task.title }}</h3>
                <p>{{ task.description }}</p>
            </div>
        </div>

        <div id="inProgress"> 
            <h2>In Progress</h2>
            <div class="task" v-for="task in tasksInProgress" :key="task.title"> 
                <h3>{{ task.title }}</h3>
                <p>{{ task.description }}</p>
            </div>
        </div>

        <div id="done"> 
            <h2>Done</h2>
            <div class="task" v-for="task in tasksDone" :key="task.title"> 
                <h3>{{ task.title }}</h3>
                <p>{{ task.description }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
#container {
    display: flex;
    flex-direction: row;
    margin-left: 5%;
    width: 80%;
    height: auto;
    min-height: 600px;
    /*background-color: lightgray;*/
    justify-content: space-between;
    padding: 20px;
}

#taskRequested, #inProgress, #done {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 30%;
    background-color: whitesmoke;
    padding: 10px;
    border-radius: 8px;
}

.task {
    width: 90%;
    margin: 0 auto;
    padding: 10px;
    background-color: orange;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.newTaskBtn {
  margin-left: 50px;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 8px;
  background-color: lightblue;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
