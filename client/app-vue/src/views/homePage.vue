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
    userData.value = await getUser();  //fetch pour recuperer les info de l'utilisateur
    console.log(userData.value);
    console.log(userData.value._id);
    localStorage.setItem("userId", userData.value._id);  //besoin du user id dans certain fetch pour recuperer les projet de l'utilisateur ou autre
  } catch (error) {
    console.error(error);
    if (error.message === "Token is not valid") {
      localStorage.removeItem("userId");
      localStorage.removeItem("token"); // Si tu stockes le token
      router.push("/login"); // Redirection via Vue Router
    }
  }

  userProject.value = await getProjectByUser(); //recupecation des projet du user 
  console.log(userProject.value);
});

//toggle le formulaire de creation de projet
function toggleForm() {           
  showForm.value = !showForm.value;
}

//toggle le formulaire pour edit le projet (meme formulaire mais avec le projet en props)
function editProject(project) {     
  projectToEdit.value = project; // Stocke le projet à éditer
  showForm.value = true; // Affiche le formulaire
}

//suppression du projet
async function handleDelete(projectId) {
  try {
    await deleteProject(projectId);
    userProject.value = userProject.value.filter(p => p._id !== projectId); // Supprime le projet localement
  } catch (error) {
    console.error(error);
  }
}

async function refreshProjects() {
  userProject.value = await getProjectByUser(); // Recharge la liste des projets
  showForm.value = false; // Ferme le formulaire
}
</script>

<template>
  <div class="home-container">
    <button class="newBtn" @click="toggleForm">New project</button>

    <div class="projects-container">
      <ProjectCard v-for="project in userProject" :key="project._id" :projectProps="project" @editProject="editProject" @deleteProject="handleDelete"/>
    </div>

    <div v-if="showForm" class="overlay" @click="toggleForm"></div>
    <newProjectForm v-if="showForm" class="newProjectForm" :projectToEdit="projectToEdit" @projectUpdated="refreshProjects"/>
  </div>
</template>

<style scoped>
.home-container {
  padding: 20px;
}

.newBtn {
  margin: 20px 0;
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.newBtn:hover {
  background-color: #0056b3;
}

.projects-container {
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
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  z-index: 1001;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
</style>