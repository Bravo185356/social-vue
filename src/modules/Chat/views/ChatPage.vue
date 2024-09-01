<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ChatList from '../components/ChatList.vue'
import ChatBlock from '../components/ChatBlock.vue'
import { ChatController } from '@/data/chat/chatController'

const route = useRoute()

const chats = ref([])
const selectChatId = ref(null)

function updateLastMessage(chatId, newLastMessage) {
  chats.value.find(chat => chat.id === chatId).lastMessage = newLastMessage
}

const seletedChat = computed(() => {
  if (selectChatId.value) {
    return chats.value.find(chat => chat.id === selectChatId.value)
  }

  return null
})

function setActiveChat() {
  const isChatExist = chats.value.findIndex(chat => chat.user.id === +route.query.id)

  if (isChatExist === -1) {
    createEmptyChat()
  } else {
    selectChatId.value = chats.value.find(chat => chat.user.id === +route.query.id).id
  }
}

function createEmptyChat() {
  const emptyChat = ChatController.getEmptyChatItem(route.query.id)

  selectChatId.value = emptyChat.id
  chats.value.push(emptyChat)
}

watchEffect(() => {
  if (!chats.value.length) {
    const chatList = ChatController.getChats()
    chats.value.push(...chatList)
  }

  if (route.query.id) {
    setActiveChat()
  }
})
</script>

<template>
  <div class="block">
    <ChatList
      :select-chat-id="selectChatId"
      :chats="chats"
      @select-chat="(chatId) => (selectChatId = chatId)"
    />
    <ChatBlock
      v-if="route.query.id"
      :chat="seletedChat"
      @update-last-message="updateLastMessage"
    />
  </div>
</template>

<style lang="scss" scoped>
.block {
  display: flex;
  min-height: 600px;
}
</style>
