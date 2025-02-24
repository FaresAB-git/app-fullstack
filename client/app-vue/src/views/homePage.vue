<script setup>
import { ref, onMounted } from "vue";
import { getUser } from "@/services/auth";
import { getProjectByUser, deleteProject } from "@/services/project";
import ProjectCard from "@/components/projectCard.vue";
import newProjectForm from "@/components/newProjectForm.vue";
import { useRouter } from "vue-router";


const userProject = ref([]);
const userData = ref(null);
const showForm = ref(false);
const projectToEdit = ref(null); // Stocke le projet à éditer

const router = useRouter();

onMounted(async () => {
  try {
    userData.value = await getUser();
    console.log(userData.value);
    console.log(userData.value._id);
    localStorage.setItem("userId", userData.value._id);
  } catch (error) {
    console.error(error);
    if (error.message === "Token is not valid") {
      localStorage.removeItem("userId");
      localStorage.removeItem("token"); // Si tu stockes le token
      router.push("/login"); // Redirection via Vue Router
    }
  }

  userProject.value = await getProjectByUser();
  console.log(userProject.value);
});

function toggleForm() {
  showForm.value = !showForm.value;
}

function editProject(project) {
  projectToEdit.value = project; // Stocke le projet à éditer
  showForm.value = true; // Affiche le formulaire
}

function handleDelete(projectId) {
  console.log(projectId);
  deleteProject(projectId);
  window.location.reload();
}
</script>

<template>
  <button class="newBtn" @click="toggleForm">New project</button>

  <div class="projects-container">
    <ProjectCard v-for="project in userProject" :key="project._id" :projectProps="project" @editProject="editProject" @deleteProject="handleDelete"/>
  </div>

  
  <div v-if="showForm" class="overlay" @click="toggleForm"></div>
  <newProjectForm v-if="showForm" class="newProjectForm" :projectToEdit="projectToEdit"/>
</template>

<style scoped>
.newBtn {
  margin-left: 50px;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 8px;
  background-color: lightblue;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.projects-container {
  margin-left: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
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

/* Formulaire centré */
.newProjectForm {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  z-index: 1001;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
