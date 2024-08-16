import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const authUser = ref(null)

  function setAuthUser(user) {
    authUser.value = user
  }

  function $reset() {
    authUser.value = null
  }

  function updateAuthUser(fieldName, updatedValue) {
    authUser.value[fieldName] = updatedValue
  }

  return { authUser, setAuthUser, $reset, updateAuthUser }
})
