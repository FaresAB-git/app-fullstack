<script setup>
import { ref } from "vue";
import projectsData from "@/json/projects.json";
import ProjectCard from "@/components/projectCard.vue";

const projects = ref(projectsData);
</script>

<template>
  <button class="newBtn"> New project </button>

  <div class="projects-container">
    <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
  </div>
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
</style>
