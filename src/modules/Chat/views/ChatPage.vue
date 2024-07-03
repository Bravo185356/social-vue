<template>
  <div class="block">
    <DialogList @select-chat="(chatId) => (selectChatId = chatId)" :selectChatId="selectChatId" :chats="chats" />
    <ChatBlock v-if="route.query.id" @update-last-message="updateLastMessage" :chat="seletedChat" />
  </div>
</template>

<script setup>
import DialogList from '../components/DialogList.vue';
import ChatBlock from '../components/ChatBlock.vue';
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { ChatController } from '@/data/chat/chatController';

const route = useRoute();

const chats = ref([]);
const selectChatId = ref(null);

function updateLastMessage(chatId, newLastMessageInfo) {
  chats.value.find((chat) => chat.id == chatId).lastMessage = newLastMessageInfo;
}

const seletedChat = computed(() => {
  if (selectChatId.value) {
    return chats.value.find((chat) => chat.id == selectChatId.value);
  }
});

function createEmptyDialog() {
  const newDialog = ChatController.getEmptyDialogItem(route.query.id);

  selectChatId.value = newDialog.id;
  chats.value.push(newDialog);
}
// Если выбран определенный диалог и его нету в chats, то создаем новый dialogItem, пушим в chats и устанавливаем selectChatId
// иначе ищем чат, у которого id === route.query.id и устанавливаем его id в selectChatId
function setActiveDialog() {
  const isChatExist = chats.value.findIndex((chat) => chat.user.id == route.query.id);

  if (isChatExist === -1) {
    createEmptyDialog()
  } else {
    selectChatId.value = chats.value.find((chat) => chat.user.id == route.query.id).id;
  }
}

watchEffect(() => {
  if (!chats.value.length) {
    const chatList = ChatController.getDialogs();
    chats.value.push(...chatList);
  }
  
  if (route.query.id) {
    setActiveDialog();
  }
});
</script>

<style lang="scss" scoped>
@import url(../styles/ChatPage.scss);
</style>
