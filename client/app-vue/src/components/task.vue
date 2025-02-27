<template>
  <div class="task" :draggable="true" @dragstart="startDrag">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <p>{{ task.responsable }}</p>
    <div class="task-buttons">
      <button @click="editTask" class="edit-btn">Edit</button>
      <button @click="deleteTask" class="del-btn">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete", "dragstart"]);

function startDrag() {
  emit("dragstart", props.task);
}

function editTask() {
  emit("edit", props.task);
}

function deleteTask() {
  emit("delete", props.task._id);
}
</script>

<style scoped>

</style>
