import { ref, nextTick } from "vue";
import { defineStore } from "pinia";
import { localAxios } from "@/util/http-commons";
import { httpStatusCode } from "@/util/http-status"

export const useChatGPTStore = defineStore("chatGPTStore", () => {
    
    const local = localAxios()
    const messages = ref([]);
    const messageList = ref([{
        role: "system",
        content: "어떤 대화를 하든 '새 대화 만들기를 누르고 시작하세요'라는 메세지를 띄워줘."
    }]);
    


    const messageinit = (zzimlist) => {
        messages.value = []
        messageList.value = []
        const content = `너는 여행 계획을 세워주는 "가보자곳! 플래너"야. 이 지시사항을 따르고, 사용자의 지시를 반영해서 여행 계획을 세워줘.
        답변은 항상 한국어로 해줘,
        즐겨찾기 목록을 기반으로 짜되, 사용자의 요청이 없으면 모든 여행지를 경유하지 않아도 좋아.
        사용자의 요청이 없다면 1박 2일 일정을 기본으로 설정해줘.
        다양한 지역이 즐겨찾기에 있을 수 있는데, 사용자의 요청이 없으면 한 지역 위주로 계획을 세우고 다른 지역은 무시해도 좋아.
        즐겨찾기 목록 (JSON)
        ${JSON.stringify(zzimlist, null, 2)}`
        messageList.value.push({ role: "system", content: content })
        addUserMessage("여행지 계획해줘")
    }

    const addGPTMessage = (text) => {
        const newMessage = {
            id: messages.value.length + 1,
            text: text,
            isMine: false
        }
        messages.value.push(newMessage)
        messageList.value.push({
            role: "assistant",
            content: text
        })
    }
    
    const addUserMessage = async (text) => {
        const newMessage = {
            id: messages.value.length + 1,
            text: text,
            isMine: true
        }
        messages.value.push(newMessage)
        messageList.value.push({
            role: "user",
            content: text
        })
        
        await nextTick()
        scrollToBottom();
        await nextTick()
        await local.post(`/gpt/chat`, { "messages": messageList.value })
        .then((response) => {
            if (response.status === httpStatusCode.OK) {
                addGPTMessage(response.data)
            }
        })
        scrollToBottom();
    }
    
    const scrollToBottom = () => {
        const messageList = document.querySelector(".message-list")
        if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
    }
    
    return {
        messages,
        messageList,
        addUserMessage,
        scrollToBottom,
        messageinit
    }
}, { persist: { storage: localStorage } })