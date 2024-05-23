<script setup>
import MessageInput from "@/components/chatGPT/MessageInput.vue";
import MessageList from "@/components/chatGPT/MessageList.vue";
import ZzimList from "@/components/chatGPT/ZzimList.vue";
import { ref } from "vue";
import { useChatGPTStore } from "@/stores/chatGPT";

const chatGPTStore = useChatGPTStore();
const { messageinit } = chatGPTStore;

const zzimlistvue = ref();

const makeNewConv = () => {
  if (zzimlistvue.value.getlist()) {
    messageinit(zzimlistvue.value.getlist());
  }
};
</script>

<template>
  <div id="chat">
    <div class="row" style="height: 56px"></div>
    <div>
      <div class="left">
        <ZzimList ref="zzimlistvue" />
        <button
          style="
            position: absolute;
            bottom: 8%;
            left: 15%;
            height: 40px;
            width: 20%;
            border-radius: 20px;
            background-color: aliceblue;
          "
          @click="makeNewConv"
        >
          현재 찜 목록으로 일정 추천 받기
        </button>
      </div>
      <div class="right">
        <MessageList />
        <MessageInput />
      </div>
    </div>
  </div>
</template>

<style scoped>
#chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ece5dd;
}

.message-list {
  height: 87.6%;
  flex-grow: 1;
  overflow-y: auto;
}

.message-input {
  flex-shrink: 0;
}

div {
  width: 100%;
  height: 88vh;
}

div.left {
  width: 50%;
  height: 90%;
  float: left;
  box-sizing: border-box;
  overflow-y: scroll;
}

div.right {
  width: 50%;
  height: 100%;
  float: right;
  box-sizing: border-box;
  border: 1px solid #003458;
}
</style>
