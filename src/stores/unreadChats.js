import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUnreadChats = defineStore('unreadChats', () => {
  const unreadChats = ref([])

  function setUnreadChats(list) {
    unreadChats.value = list
  }

  function removeUnreadChat(id) {
    unreadChats.value = unreadChats.value.filter(chat => chat.id !== id)
  }

  function $reset() {
    unreadChats.value = []
  }

  return { unreadChats, setUnreadChats, removeUnreadChat, $reset }
})
