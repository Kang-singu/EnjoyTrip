<script setup>
import { ref } from "vue";
import { useChatGPTStore } from "@/stores/chatGPT";

const newMessage = ref("");
const chatGPTStore = useChatGPTStore();

const { addUserMessage, scrollToBottom } = chatGPTStore;

const send = () => {
  if (newMessage.value.trim() !== "") {
    const messageToSend = newMessage.value;
    newMessage.value = "";
    scrollToBottom();
    addUserMessage(messageToSend).then(() => {
      scrollToBottom();
    });
  }
};
</script>

<template>
  <div class="container">
    <input
      type="text"
      class="input"
      v-model="newMessage"
      @keyup.enter="send"
      placeholder="입력해주세요..."
    />
    <button @click="send" class="send-button">전송</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100px;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #fff;
}

.input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
}

.send-button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 20px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>
