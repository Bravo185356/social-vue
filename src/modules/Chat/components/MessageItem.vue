<template>
  <li class="message">
    <div class="header">
      <RouterLink tabindex="-1" :to="`/${message.author.id}`" class="avatar">
        <img src="@/assets/default-user-image.png" />
      </RouterLink>
      <div class="right-side">
        <div class="info">
          <RouterLink :to="`/${message.author.id}`" class="link">{{ message.author.name }}</RouterLink>
          <div class="date">{{ formatDate(message.created) }}</div>
        </div>
        <span>
          {{ message.text }}
        </span>
      </div>
      <div v-if="message.author.id === authStore.authUser.id" class="controls">
        <button @click="editMessage" class="icon-wrapper-gray">
          <v-icon icon="mdi mdi-pencil" />
        </button>
        <button @click="deleteMessage" class="icon-wrapper-gray">
          <v-icon icon="mdi mdi-delete" />
        </button>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ChatController } from '@/data/chat/chatController';
import { useAuthStore } from '@/stores/auth';
import { formatDate } from '@/helpers/formatDate';

const props = defineProps({
  message: Object,
  chatId: Number,
});

const emit = defineEmits(['deleteMessage', 'editMessage']);

const authStore = useAuthStore();

function editMessage() {
  emit('editMessage', props.message.id, props.message.text);
}

function deleteMessage() {
  ChatController.removeMessage(props.message.id, props.chatId);
  emit('deleteMessage', props.message.id);
}
</script>

<style lang="scss" scoped>
@import url(../styles/MessageItem.scss);
</style>
