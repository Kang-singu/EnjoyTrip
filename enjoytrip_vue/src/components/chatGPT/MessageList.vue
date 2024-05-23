<script setup>
import { useChatGPTStore } from "@/stores/chatGPT";
import { storeToRefs } from "pinia";
import { ref, computed, watch, onMounted } from "vue";
import { marked } from "marked";

const chatGPTStore = useChatGPTStore();
const messages = computed(() => chatGPTStore.messages);
const { scrollToBottom } = chatGPTStore;

watch(messages, () => {
  scrollToBottom();
});

onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <div ref="messageList" class="message-list">
    <div
      v-for="message in messages"
      :key="messages.id"
      class="message"
      :class="{ mine: message.isMine }"
    >
      <div class="message-text" v-html="marked.parse(message.text)"></div>
    </div>
  </div>
</template>

<style scoped>
.message-list {
  overflow-y: scroll;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.message {
  display: flex;
  margin-bottom: 10px;
}

.mine {
  justify-content: flex-end;
}

.message.mine .message-text {
  max-width: 60%;
  padding: 10px;
  border-radius: 10px;
  color: #ece5dd;
  background-color: black;
  position: relative;
  word-wrap: break-word;
}

.message:not(.mine) .message-text {
  max-width: 60%;
  padding: 10px;
  border-radius: 10px;
  color: black;
  background-color: #ece5dd;
  position: relative;
  word-wrap: break-word;
}

.message-text::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.message:not(.mine) .message-text::before {
  border-width: 10px 10px 10px 0;
  border-color: transparent #ece5dd transparent transparent;
  left: -10px;
  top: 10px;
}

.message.mine .message-text::before {
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent black;
  right: -10px;
  top: 10px;
  /* Flip the arrow */
}
</style>
