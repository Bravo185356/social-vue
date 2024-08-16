<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useUnreadDialogs } from '@/stores/unreadDialogs'

const props = defineProps({
  chat: Object,
  selectChatId: Number,
})

const emit = defineEmits(['selectChat'])

const route = useRoute()
const router = useRouter()
const store = useUnreadDialogs()

const dialogIsUnread = computed(() => {
  const unreadDialog = store.unreadDialogs.find(unreadDialog => unreadDialog.id === props.chat.id)

  if (unreadDialog && unreadDialog.id === props.selectChatId) {
    store.removeUnreadDialog(props.chat.id)
    return
  }

  return unreadDialog ? unreadDialog.numOfUnreadMessages : false
})

function selectChat() {
  if (dialogIsUnread.value) {
    store.removeUnreadDialog(props.chat.id)
  }

  emit('selectChat', props.chat.id)
  router.push({ path: `/messages`, query: { id: props.chat.user.id } })
}
// Если есть lastMessage, то возвращаем автора и текст
const lastMessage = computed(() => {
  if (props.chat.lastMessage.author) {
    return `${props.chat.lastMessage.author.name}: ${props.chat.lastMessage.text}`
  } else {
    return 'Черновик'
  }
})
</script>

<template>
  <div
    tabindex="0"
    class="dialog"
    :class="{ selected: chat.user.id === +route.query.id }"
    @click="selectChat"
  >
    <div class="avatar">
      <img src="@/assets/default-user-image.png">
    </div>
    <div class="info">
      <div>{{ chat.user.name }} {{ chat.user.surname }}</div>
      <div class="last-message">
        {{ lastMessage }}
      </div>
    </div>
    <div
      v-if="dialogIsUnread"
      class="unread"
    >
      {{ dialogIsUnread }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url(../styles/DialogItem.scss);
</style>
