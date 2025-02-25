<script setup>
import { getTask, updateStatusTask, deleteTask } from "@/services/task"; // Ajout d'une fonction updateTask pour mettre à jour le 
import { getProjectUsers } from "@/services/project";
import { ref, computed } from "vue";
import { onMounted } from "vue";
import NewTaskForm from "@/components/newTaskForm.vue";
import { useRoute } from "vue-router";
import addMemberForms from "@/components/addMemberForms.vue";

const route = useRoute();

const showForm = ref(false);
const showFormMember = ref(false);
const projectTasks = ref([]);
const projectId = route.params.projectId;
const draggedTask = ref(null); // Stocke la tâche en cours de déplacement
const taskToEdit = ref(null); // Stocke le projet à éditer
const projectMembers = ref(null);

function toggleForm() {
  showForm.value = !showForm.value;
  console.log(showForm.value);
}

function toggleFormMembers() {
  showFormMember.value = !showFormMember.value;
  console.log(showForm.value);
}

function editTask(task) {
  taskToEdit.value = task; // Stocke le projet à éditer
  showForm.value = true; // Affiche le formulaire
}

function handleDelete(taskId){
  console.log(taskId)
  deleteTask(taskId)
  window.location.reload();
}

onMounted(async () => {
  projectTasks.value = await getTask(projectId);
  console.log(projectTasks.value);
  projectMembers.value = await(getProjectUsers(projectId))
  console.log(projectMembers.value)
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
    await updateStatusTask(newStatus, draggedTask.value._id);
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
  <button @click="toggleFormMembers" class="newTaskBtn">Add members</button>
  
  <div v-if="showForm" class="overlay" @click="toggleForm"></div>
  <NewTaskForm v-if="showForm" class="newTaskForm" :taskToEdit="taskToEdit"/>
  <div id="container">
    <div id="taskRequested" @dragover.prevent @drop="updateTaskStatus('taskRequested')">
      <h2>To Do</h2>
      <div class="task" v-for="task in tasksRequested" :key="task.title" :draggable="true" @dragstart="startDrag(task)">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <p> {{ task.editer }}</p>
        <button @click="editTask(task)">Edit</button>
        <button @click="handleDelete(task._id)" class='delBtn'>Delete</button>
      </div>
    </div>

    <div id="inProgress" @dragover.prevent @drop="updateTaskStatus('InProgress')">
      <h2>In Progress</h2>
      <div class="task" v-for="task in tasksInProgress" :key="task.title" :draggable="true" @dragstart="startDrag(task)">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <p> {{ task.editer }}</p>
        <button @click="editTask(task)">Edit</button>
        <button @click="handleDelete(task._id)" class='delBtn'>Delete</button>
      </div>
    </div>

    <div id="done" @dragover.prevent @drop="updateTaskStatus('Done')">
      <h2>Done</h2>
      <div class="task" v-for="task in tasksDone" :key="task.title" :draggable="true" @dragstart="startDrag(task)">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <p> {{ task.editer }}</p>
        <button @click="editTask(task)">Edit</button>
        <button @click="handleDelete(task._id)" class='delBtn'>Delete</button>
      </div>
    </div>
  </div>
  <div v-if="showFormMember" class="overlay" @click="toggleFormMembers"></div>
  <addMemberForms v-if="showFormMember"/>
  
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

.newTaskForm {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  z-index: 1001;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 1000;
}

.delBtn{
  margin-left: 10px;
}
</style>
