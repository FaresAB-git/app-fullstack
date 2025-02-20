<script setup>
import { ref, onMounted } from "vue";
import { getUser } from "@/services/auth";
import { getProjectByUser } from "@/services/project";
import projectsData from "@/json/projects.json";
import ProjectCard from "@/components/projectCard.vue";
import newProjectForm from "@/components/newProjectForm.vue";

const projects = ref(projectsData);
const userProject = ref(null);
const userData = ref(null);
const showForm = ref(false);

onMounted(async () => {
  userData.value = await getUser();
  console.log(userData.value);
  console.log(userData.value._id);
  localStorage.setItem("userId", userData.value._id);

  userProject.value = await getProjectByUser();
  console.log(userProject.value);
});

function toggleForm() {
  showForm.value = !showForm.value;
}
</script>

<template>
  <button class="newBtn" @click="toggleForm">New project</button>

  <div class="projects-container">
    <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
  </div>

  
  <div v-if="showForm" class="overlay" @click="toggleForm"></div>
  <newProjectForm v-if="showForm" class="newProjectForm" />
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
