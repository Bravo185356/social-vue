<template>
  <li class="message">
    <div class="header">
      <div>
        <div class="avatar">
          <img src="@/assets/default-user-image.png" />
        </div>
      </div>
      <div class="right-side">
        <div class="info">
          <div class="author link">{{ message.author.name }}</div>
          <div class="date">{{ formatDate(message.created) }}</div>
        </div>
        <span>
          {{ message.text }}
        </span>
      </div>
      <div class="controls">
        <div class="icon-wrapper-gray">
          <v-icon v-if="message.author.id === authStore.authUser.id" @click="editMessage" icon="mdi mdi-pencil" />
        </div>
        <div class="icon-wrapper-gray">
          <v-icon v-if="message.author.id === authStore.authUser.id" @click="deleteMessage" icon="mdi mdi-delete" />
        </div>
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
