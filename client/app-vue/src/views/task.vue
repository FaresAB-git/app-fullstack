<script setup>
import tasksData from "@/json/tasks.json";
import { ref, computed } from "vue";

const tasks = ref(tasksData);

// Filtrer les tâches en fonction de leur statut
const tasksRequested = computed(() => tasks.value.filter(task => task.status === "To Do"));
const tasksInProgress = computed(() => tasks.value.filter(task => task.status === "In Progress"));
const tasksDone = computed(() => tasks.value.filter(task => task.status === "Done"));
</script>

<template>
    <h1>Task Board</h1>
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
</style>
