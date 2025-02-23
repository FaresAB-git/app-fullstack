<script setup>
import { getTask, updateTask } from "@/services/task"; // Ajout d'une fonction updateTask pour mettre à jour le statut
import { ref, computed } from "vue";
import { onMounted } from "vue";
import NewTaskForm from "@/components/newTaskForm.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const showForm = ref(false);
const projectTasks = ref([]);
const projectId = route.params.projectId;
const draggedTask = ref(null); // Stocke la tâche en cours de déplacement

function toggleForm() {
  showForm.value = !showForm.value;
}

onMounted(async () => {
  projectTasks.value = await getTask(projectId);
  console.log(projectTasks.value);
});

// Filtrer les tâches en fonction de leur statut
const tasksRequested = computed(() =>
  projectTasks.value.filter((task) => task.status === "taskRequested")
);
const tasksInProgress = computed(() =>
  projectTasks.value.filter((task) => task.status === "InProgress")
);
const tasksDone = computed(() =>
  projectTasks.value.filter((task) => task.status === "Done")
);

// Fonction appelée lors du début du drag
function startDrag(task) {
  draggedTask.value = task;
}

// Fonction appelée lorsqu'une tâche est déposée dans une nouvelle colonne
async function updateTaskStatus(newStatus) {
  if (draggedTask.value) {
    draggedTask.value.status = newStatus;

    // Mettre à jour l'affichage local
    projectTasks.value = projectTasks.value.map((task) =>
      task.title === draggedTask.value.title ? { ...task, status: newStatus } : task
    );

    try {
    await updateTask( draggedTask.value.title, draggedTask.value.description, draggedTask.value.project, newStatus, draggedTask.value._id);
    } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
  }

    draggedTask.value = null; // Réinitialiser après le déplacement
  }
}
</script>

<template>
  <h1>Task Board</h1>
  <button @click="toggleForm" class="newTaskBtn">New Task</button>
  <NewTaskForm v-if="showForm" />
  <div id="container">
    <div id="taskRequested" @dragover.prevent @drop="updateTaskStatus('taskRequested')">
      <h2>To Do</h2>
      <div class="task" v-for="task in tasksRequested" :key="task.title" :draggable="true" @dragstart="startDrag(task)">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
      </div>
    </div>

    <div id="inProgress" @dragover.prevent @drop="updateTaskStatus('InProgress')">
      <h2>In Progress</h2>
      <div class="task" v-for="task in tasksInProgress" :key="task.title" :draggable="true" @dragstart="startDrag(task)">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
      </div>
    </div>

    <div id="done" @dragover.prevent @drop="updateTaskStatus('Done')">
      <h2>Done</h2>
      <div class="task" v-for="task in tasksDone" :key="task.title" :draggable="true" @dragstart="startDrag(task)">
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
  justify-content: space-between;
  padding: 20px;
}

#taskRequested,
#inProgress,
#done {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30%;
  background-color: whitesmoke;
  padding: 10px;
  border-radius: 8px;
  min-height: 400px;
}

.task {
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  background-color: orange;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  cursor: grab;
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
