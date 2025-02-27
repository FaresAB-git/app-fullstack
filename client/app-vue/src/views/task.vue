<script setup>
import { getTask, updateStatusTask, deleteTask } from "@/services/task";
import { getProjectUsers } from "@/services/project";
import { ref, computed } from "vue";
import { onMounted } from "vue";
import NewTaskForm from "@/components/newTaskForm.vue";
import { useRoute } from "vue-router";
import addMemberForms from "@/components/addMemberForms.vue";
import tchatComposant from "@/components/tchatComposant.vue";

const route = useRoute();

const showForm = ref(false);
const showFormMember = ref(false);
const showTchat = ref(false);
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
  console.log(showFormMember.value);
}

function toggleTchat() {
  showTchat.value = !showTchat.value;
}

function editTask(task) {
  taskToEdit.value = task; // Stocke le projet à éditer
  showForm.value = true; // Affiche le formulaire
}

function handleDelete(taskId) {
  console.log(taskId);
  deleteTask(taskId);
  window.location.reload();
}

onMounted(async () => {
  projectTasks.value = await getTask(projectId);
  console.log(projectTasks.value);
  projectMembers.value = await getProjectUsers(projectId);
  console.log(projectMembers.value);
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
  <div class="task-page">
    <h1 id="kanbanTitle">Kanban</h1>
    
    <div class="buttons">
      <button @click="toggleForm" class="newTaskBtn">New Task</button>
      <button @click="toggleFormMembers" class="newTaskBtn">Add members</button>
    </div>
    
    <div v-if="showForm" class="overlay" @click="toggleForm"></div>
    <NewTaskForm v-if="showForm" class="newTaskForm" :taskToEdit="taskToEdit"/>
    
    <div id="container">
      <div id="taskRequested" @dragover.prevent @drop="updateTaskStatus('taskRequested')">
        <h2 class="statusTitle">To Do</h2>
        <div class="task" v-for="task in tasksRequested" :key="task.title" :draggable="true" @dragstart="startDrag(task)">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <p>{{ task.editer }}</p>
          <div class="task-buttons">
            <button @click="editTask(task)" class="edit-btn">Edit</button>
            <button @click="handleDelete(task._id)" class="del-btn">Delete</button>
          </div>
        </div>
      </div>

      <div id="inProgress" @dragover.prevent @drop="updateTaskStatus('InProgress')">
        <h2 class="statusTitle">In Progress</h2>
        <div class="task" v-for="task in tasksInProgress" :key="task.title" :draggable="true" @dragstart="startDrag(task)">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <p>{{ task.editer }}</p>
          <div class="task-buttons">
            <button @click="editTask(task)" class="edit-btn">Edit</button>
            <button @click="handleDelete(task._id)" class="del-btn">Delete</button>
          </div>
        </div>
      </div>

      <div id="done" @dragover.prevent @drop="updateTaskStatus('Done')">
        <h2 class="statusTitle">Done</h2>
        <div class="task" v-for="task in tasksDone" :key="task.title" :draggable="true" @dragstart="startDrag(task)">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <p>{{ task.editer }}</p>
          <div class="task-buttons">
            <button @click="editTask(task)" class="edit-btn">Edit</button>
            <button @click="handleDelete(task._id)" class="del-btn">Delete</button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="showFormMember" class="overlay" @click="toggleFormMembers"></div>
    <addMemberForms v-if="showFormMember"/>

    <div>
      <button type="button" class="btnTchat" @click="toggleTchat">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2s0 0 0 0s0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.2-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9c0 0 0 0 0 0s0 0 0 0l-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"/>
        </svg>
      </button>
    </div>
    
    <transition name="chat-transition">
      <tchatComposant v-if="showTchat" @toggleTchat="toggleTchat"/>
    </transition>
  </div>
</template>

<style scoped>
.task-page {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

#kanbanTitle {
  text-align: center;
  margin-bottom: 20px;
  color: #007bff;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.newTaskBtn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.newTaskBtn:hover {
  background-color: #0056b3;
}

#container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}
@media (max-width: 768px) {
  #container {
    flex-direction: column;
  }
}

#taskRequested,
#inProgress,
#done {
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#taskRequested .task {
  background-color: #f8d7da; /* Light red for "To Do" */
}

#inProgress .task {
  background-color: #fff3cd; /* Light yellow for "In Progress" */
}

#done .task {
  background-color: #d4edda; /* Light green for "Done" */
}
.statusTitle {
  text-align: center;
  margin-bottom: 10px;
  color: #333;
}

.task {
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  cursor: grab;
  transition: background 0.3s ease;
}

.task:hover {
  background-color: #e0e0e0;
}

.task-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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
}

.del-btn:hover {
  background-color: #c82333;
}

.newTaskForm {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  z-index: 1001;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
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

.btnTchat {
  width: 40px;
  height: 40px;
  position: fixed;
  right: 30px;
  bottom: 30px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btnTchat:hover {
  background-color: #0056b3;
}

.chat-transition-enter-active,
.chat-transition-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.chat-transition-enter, .chat-transition-leave-to /* .chat-transition-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(20px);
}
</style>