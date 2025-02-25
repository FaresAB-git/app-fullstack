<script setup>
import { ref, onMounted } from 'vue';
import { getAllUsers } from '@/services/auth';
import { addUserToProject, getProjectUsers } from '@/services/project';
import { useRoute } from 'vue-router';

const route = useRoute();


const projectId = route.params.projectId;
const users = ref([]);
const selectedUser = ref(null);
const projectMembers = ref([]);

onMounted(async () => {
  users.value = await getAllUsers();
  projectMembers.value = await getProjectUsers(projectId);
});

async function handleAddMember() {
  if (selectedUser.value) {
    await addUserToProject(projectId, selectedUser.value);
    projectMembers.value = await getProjectUsers(projectId); // Met à jour la liste des membres
  }
}
</script>

<template>
<div class="memberformContainer">
    
</div>
  <div class="add-member-container">
    <div class="select-container">
      <select v-model="selectedUser">
        <option v-for="user in users" :key="user._id" :value="user._id">
          {{ user.username }}
        </option>
      </select>
      <button @click="handleAddMember">Add</button>
    </div>
    <div class="member-list">
      <h3>Project Members:</h3>
      <ul>
        <li v-for="member in projectMembers" :key="member._id">{{ member.username }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.add-member-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* S'assure qu'il soit au-dessus des autres éléments */
}

.select-container {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

button {
  padding: 5px 10px;
  background-color: lightblue;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.member-list {
  margin-top: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 5px 0;
}
</style>
