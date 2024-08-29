<script setup>
import { ChatController } from '@/data/chat/chatController'
import { useAuthStore } from '@/stores/auth'
import { formatDate } from '@/helpers/formatDate'
import CustomButton from '@/UI/CustomButton.vue'

const props = defineProps({
  message: Object,
  chatId: Number,
})

const emit = defineEmits(['deleteMessage', 'editMessage'])

const authStore = useAuthStore()

function editMessage() {
  emit('editMessage', props.message.id, props.message.text)
}

function deleteMessage() {
  ChatController.removeMessage(props.message.id, props.chatId)
  emit('deleteMessage', props.message.id)
}
</script>

<template>
  <li class="message">
    <div class="header">
      <RouterLink
        tabindex="-1"
        :to="`/${message.author.id}`"
        class="avatar"
      >
        <img src="@/assets/default-user-image.png">
      </RouterLink>
      <div class="right-side">
        <div class="info">
          <RouterLink
            :to="`/${message.author.id}`"
            class="link"
          >
            {{ message.author.name }}
          </RouterLink>
          <div class="date">
            {{ formatDate(message.created) }}
          </div>
        </div>
        <span>
          {{ message.text }}
        </span>
      </div>
      <div
        v-if="message.author.id === authStore.authUser.id"
        class="controls"
      >
        <CustomButton
          type="icon"
          @click="editMessage"
        >
          <v-icon icon="mdi mdi-pencil" />
        </CustomButton>
        <CustomButton
          type="icon"
          @click="deleteMessage"
        >
          <v-icon icon="mdi mdi-delete" />
        </CustomButton>
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.message {
  padding: 15px;

  &:hover .controls {
    visibility: visible;
  }
}

.header {
  display: flex;
  gap: 10px;
}

.date {
  font-size: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.right-side {
  flex: 1 1 auto;
}

.controls {
  display: flex;
  gap: 10px;
  align-items: center;
  visibility: hidden;
}
</style>
