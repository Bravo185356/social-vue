import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUnreadDialogs = defineStore('unreadDialogs', () => {
  const unreadDialogs = ref([])

  function setUnreadDialogs(list) {
    unreadDialogs.value = list
  }

  function removeUnreadDialog(id) {
    unreadDialogs.value = unreadDialogs.value.filter(dialog => dialog.id !== id)
  }

  function $reset() {
    unreadDialogs.value = []
  }

  return { unreadDialogs, setUnreadDialogs, removeUnreadDialog, $reset }
})
