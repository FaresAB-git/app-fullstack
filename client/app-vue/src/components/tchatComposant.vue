<script setup>

const emit = defineEmits(["toggleTchat"]);

</script>
<template>
    <div class="chat-container">
      <div class="chat-header">
        <span class="header-title">Discussion</span>
        <button class="closeBtn"  @click="$emit('toggleTchat')">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </button>
      </div>
      <div class="chat-messages">
        <div class="message"><strong>Utilisateur 1:</strong> Message exemple</div>
        <div class="message"><strong>Utilisateur 2:</strong> Un autre message</div>
      </div>
      <div class="chat-input">
        <input class="input-field" placeholder="Écrire un message..." />
        <button class="send-button">Envoyer</button>
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
    background: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }
  

  .chat-header {
    background-color: lightblue;
    color: black;
    padding: 10px;
    max-height: 30px;
    font-weight: bold;
    display: flex; 
    align-items: center;
    justify-content: space-between; 
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  

  .header-title {
    flex: 1;
    text-align: center; 
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
    fill: white; 
  }
  

  .chat-messages {
    padding: 10px;
    height: 200px;
    overflow-y: auto;
    background: white;
  }
  
  .message {
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 4px;
    background: #e9ecef;
  }
  
  .chat-input {
    display: flex;
    padding: 10px;
    background: #f5f5f5;
    border-top: 1px solid #ccc;
  }
  
  .input-field {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  }
  
  .send-button {
    margin-left: 5px;
    padding: 8px 12px;
    background: lightblue;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .send-button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  </style>
  