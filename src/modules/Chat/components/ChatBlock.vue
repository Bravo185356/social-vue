<template>
  <section v-if="authStore.authUser" class="messages">
    <div class="title">Диалог с {{ getUserName }}</div>
    <ul class="message-list">
      <MessageItem
        @edit-message="setEditMode"
        @delete-message="deleteMessage"
        v-for="message in chatInfo.messages"
        :key="message.id"
        :message="message"
        :chatId="chat.id"
      />
    </ul>
    <form class="message-form">
      <CustomInput v-model="messageInput" placeholder="Введите сообщение..." />
      <button @click.prevent="sendMessage" class="button">
        {{ editMessageId ? 'Редактировать' : 'Отправить' }}
      </button>
    </form>
  </section>
</template>

<script setup>
import CustomInput from '@/UI/CustomInput/CustomInput.vue';
import MessageItem from './MessageItem.vue';
import { ref, watchEffect, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ChatController } from '@/data/chat/chatController';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  chat: Object,
});

const route = useRoute();
const authStore = useAuthStore();

const emit = defineEmits(['updateLastMessage', 'addEmptyDialog']);

const messageInput = ref('');
const chatInfo = ref([]);
const editMessageId = ref(null);

function editMessage() {
  const message = chatInfo.value.messages.find((message) => message.id == editMessageId.value);
  message.text = messageInput.value;

  ChatController.editMessageText(props.chat.id, editMessageId.value, messageInput.value);
  const lastMessage = chatInfo.value.messages[chatInfo.value.messages.length - 1];
  // Если измененное сообщение является последним, то обновляем last message
  if (lastMessage.id == editMessageId.value) {
    emit('updateLastMessage', props.chat.id, message);
  }

  editMessageId.value = null;
  messageInput.value = '';
}

function sendMessage() {
  if (editMessageId.value) {
    editMessage();
    return;
  }

  if (!chatInfo.value.messages.length) {
    ChatController.createChat({ ...chatInfo.value, id: props.chat.id });
  }

  const messageBody = {
    id: Date.now(),
    author: {
      id: authStore.authUser.id,
      name: authStore.authUser.name,
      surname: authStore.authUser.surname,
    },
    text: messageInput.value,
    created: new Date(),
  };

  ChatController.createMessage(messageBody, props.chat.id);
  chatInfo.value.messages.push(messageBody);

  const updatedDialogItem = {
    text: messageInput.value,
    author: {
      id: authStore.authUser.id,
      name: authStore.authUser.name,
      surname: authStore.authUser.surname,
    },
  };

  emit('updateLastMessage', props.chat.id, updatedDialogItem);
  messageInput.value = '';
}

function setEditMode(messageId, messageText) {
  messageInput.value = messageText;
  editMessageId.value = messageId;
}

function deleteMessage(messageId) {
  const updatedMessages = chatInfo.value.messages.filter((message) => message.id != messageId);
  const lastMessage = chatInfo.value.messages[chatInfo.value.messages.length - 1];

  if (lastMessage.id == messageId) {
    const { author, text } = updatedMessages[updatedMessages.length - 1];
    emit('updateLastMessage', props.chat.id, { author, text });
  }

  chatInfo.value.messages = updatedMessages;
}

const getUserName = computed(() => {
  if (props.chat) {
    return `${props.chat.user.name} ${props.chat.user.surname}`;
  }
});

watchEffect(() => {
  if (props.chat) {
    const chat = JSON.parse(ChatController.getChatMessages(route.query.id, props.chat.id));
    chatInfo.value = chat;
  }
});
</script>

<style lang="scss" scoped>
@import url(../styles/ChatBlock.scss);
</style>
