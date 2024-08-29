<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import DialogList from '../components/DialogList.vue'
import ChatBlock from '../components/ChatBlock.vue'
import { ChatController } from '@/data/chat/chatController'

const route = useRoute()

const chats = ref([])
const selectChatId = ref(null)

function updateLastMessage(chatId, newLastMessageInfo) {
  chats.value.find(chat => chat.id === chatId).lastMessage = newLastMessageInfo
}

const seletedChat = computed(() => {
  if (selectChatId.value) {
    return chats.value.find(chat => chat.id === selectChatId.value)
  }

  return null
})

function createEmptyDialog() {
  const newDialog = ChatController.getEmptyDialogItem(route.query.id)

  selectChatId.value = newDialog.id
  chats.value.push(newDialog)
}
// Если выбран определенный диалог и его нету в chats, то создаем новый dialogItem, пушим в chats и устанавливаем selectChatId
// иначе ищем чат, у которого id === route.query.id и устанавливаем его id в selectChatId
function setActiveDialog() {
  const isChatExist = chats.value.findIndex(chat => chat.user.id === +route.query.id)

  if (isChatExist === -1) {
    createEmptyDialog()
  } else {
    selectChatId.value = chats.value.find(chat => chat.user.id === +route.query.id).id
  }
}

watchEffect(() => {
  if (!chats.value.length) {
    const chatList = ChatController.getDialogs()
    chats.value.push(...chatList)
  }

  if (route.query.id) {
    setActiveDialog()
  }
})
</script>

<template>
  <div class="block">
    <DialogList
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
