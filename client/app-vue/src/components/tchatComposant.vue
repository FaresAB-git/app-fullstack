<script setup>
const emit = defineEmits(["toggleTchat"]);
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { io } from "socket.io-client";
import { useRoute } from "vue-router";

const route = useRoute();
const token = localStorage.getItem("token");
const socket = io(import.meta.env.VITE_API_URI, {
    auth: { token }, // On envoie le token ici
});
const messages = ref([]);
const message = ref("");
const userId= localStorage.getItem("userId");
const messagesEndRef = ref(null);

//permet d'afficher les derniers message
const scrollToBottom = () => {   
    nextTick(() => {
        messagesEndRef.value?.scrollIntoView({ behavior: 'smooth' });
    });
};

//on rejoint la room du chat projet
socket.on("connect", () => {
    socket.emit("joinProject", route.params.projectId);
    console.log("Connected to server");
});

onMounted(() => {
    // Fetch message history
    socket.emit("getMessages", route.params.projectId, (history) => {
        messages.value = history;
        scrollToBottom();
        //On ce met en bas de la page
    });

    socket.on("receiveMessages", (history) => {
        messages.value = history;
        scrollToBottom();
    });

});

const sendMessage = () => {
    socket.emit("sendMessage", {
        projectId: route.params.projectId,
        userId: userId,
        message: message.value,
        date: new Date().toLocaleString()
    });
    message.value = "";
};

socket.on("receiveMessage", (msg) => {
    messages.value.push(msg);
    //Si c'est nous qui avons envoyé un message, on scroll en bas
    if (msg.user._id == userId){
      scrollToBottom();
    }
});
    
onUnmounted(() => {
    socket.disconnect();
});
</script>

<template>
  <div class="chat-container">
      <div class="chat-header">
          <span class="header-title">Discussion</span>
          <button class="closeBtn" @click="$emit('toggleTchat')">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
          </svg>
          </button>
      </div>
      <div class="chat-messages">
          <div v-for="msg in messages" :key="msg.id" :class="['message', { 'my-message': msg.user._id == userId }]">
              <div><strong>{{ msg.user.username }}</strong> <em style="font-size: 0.8em;">{{ msg.date }}</em></div>
              <div>{{ msg.message }}</div>
          </div>
          <div ref="messagesEndRef"></div>
      </div>
      <div class="chat-input">
          <input class="input-field" placeholder="Écrire un message..." v-model="message" />
          <button class="send-button" :disabled="!message" @click="sendMessage">Envoyer</button>
      </div>
  </div>
</template>

<style scoped>
.chat-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40%;
    max-width: 400px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
}

.chat-header {
    background-color: #007bff;
    color: #ffffff;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.header-title {
    flex: 1;
    text-align: center;
    font-weight: bold;
}

.closeBtn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
}

.icon {
    width: 18px;
    height: 18px;
    fill: #ffffff;
}

.chat-messages {
    padding: 10px;
    height: 250px;
    overflow-y: auto;
    background: #f8f9fa;
}

.message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
    background: #e9ecef;
    transition: background 0.3s ease;
}

.message:hover {
    background: #dee2e6;
}

.my-message {
    background: #d1ecf1;
    border: 1px solid #bee5eb;
}

.chat-input {
    display: flex;
    padding: 10px;
    background: #f1f1f1;
    border-top: 1px solid #e0e0e0;
}

.input-field {
    flex: 1;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s ease;
}

.input-field:focus {
    border-color: #007bff;
}

.send-button {
    margin-left: 10px;
    padding: 10px 15px;
    background: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.send-button:disabled {
    background: #6c757d;
    cursor: not-allowed;
}

.send-button:not(:disabled):hover {
    background: #0056b3;
}
</style>