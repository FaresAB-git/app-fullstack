<script setup>
import { ref, onMounted } from 'vue';
import { getAllUsers } from '@/services/auth';
import { addUserToProject, getProjectUsers, deleteUserFromProject} from '@/services/project';
import { useRoute } from 'vue-router';

const route = useRoute();

const projectId = route.params.projectId;
const users = ref([]);
const selectedUser = ref(null);
const projectMembers = ref([]);

onMounted(async () => {
  users.value = await getAllUsers();  //recuperation de la liste de tout les utilisateurs pour pouvoir les ajouter
  projectMembers.value = await getProjectUsers(projectId);  //recuperation des membre du projet 

});

async function handleAddMember() {
  if (selectedUser.value) {
    await addUserToProject(projectId, selectedUser.value);
    projectMembers.value = await getProjectUsers(projectId); // Met à jour la liste des membres
  }
}

async function deleteMember(memberId) {
  await deleteUserFromProject(projectId, memberId);
  projectMembers.value = await getProjectUsers(projectId); // Met à jour la liste des membres
}
</script>

<template>
  <div class="memberformContainer">
    <div class="add-member-container">
      <div class="select-container">
        <select v-model="selectedUser">
          <option v-for="user in users" :key="user._id" :value="user._id">
            {{ user.username }}
          </option>
        </select>
        <button @click="handleAddMember" class="add-btn">Add</button>
      </div>
      <div class="member-list">
        <h3>Project Members:</h3>
        <ul>
          <li v-for="member in projectMembers" :key="member._id">
            {{ member.username }}
            <button @click="deleteMember(member._id)" class="delete-btn">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.memberformContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 400px; 
  z-index: 1000;
}

.add-member-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  z-index: 1001;
}

.select-container {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

select {
  flex: 1;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
}

select:focus {
  border-color: #007bff;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-btn {
  background-color: #007bff;
  color: #ffffff;
}

.add-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
  color: #ffffff;
  margin-left: 10px;
}

.delete-btn:hover {
  background-color: #c82333;
}

.member-list {
  margin-top: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e9ecef;
}

h3 {
  margin-bottom: 10px;
  color: #333;
}
</style>