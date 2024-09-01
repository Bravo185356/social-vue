<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useUnreadChats } from '@/stores/unreadChats'

const props = defineProps({
  chatItem: Object,
  selectChatId: Number,
})

const emit = defineEmits(['selectChat'])

const route = useRoute()
const router = useRouter()
const store = useUnreadChats()

const chatIsUnread = computed(() => {
  const unreadChat = store.unreadChats.find(chat => chat.id === props.chatItem.id)

  if (unreadChat && unreadChat.id === props.selectChatId) {
    store.removeUnreadChat(props.chatItem.id)
    return
  }

  return unreadChat ? unreadChat.numOfUnreadMessages : false
})

function selectChat() {
  if (chatIsUnread.value) {
    store.removeUnreadChat(props.chatItem.id)
  }

  emit('selectChat', props.chatItem.id)
  router.push({ path: `/messages`, query: { id: props.chatItem.user.id } })
}
// Если есть lastMessage, то возвращаем автора и текст
const lastMessage = computed(() => {
  if (props.chatItem.lastMessage.author) {
    return `${props.chatItem.lastMessage.author.name}: ${props.chatItem.lastMessage.text}`
  } else {
    return 'Черновик'
  }
})
</script>

<template>
  <div
    tabindex="0"
    class="chat-item"
    :class="{ selected: chatItem.user.id === +route.query.id }"
    @click="selectChat"
  >
    <div class="avatar">
      <img src="@/assets/default-user-image.png">
    </div>
    <div class="info">
      <div>{{ chatItem.user.name }} {{ chatItem.user.surname }}</div>
      <div class="last-message">
        {{ lastMessage }}
      </div>
    </div>
    <div
      v-if="chatIsUnread"
      class="unread"
    >
      {{ chatIsUnread }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.chat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border-bottom: 1px solid $border-color;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: $hover-background;
  }

  &.selected {
    background-color: $button-background-hover;
  }
}

.avatar {
  max-width: 50px;
  max-height: 50px;
}

.info {
  flex: 1 1 auto;
}

.unread {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(236, 236, 236);
  padding: 0px 10px;
  height: 25px;
  border-radius: 10px;
  color: black;
}

.last-message {
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
}
</style>
