<script setup>
import { RouterView } from 'vue-router'
import { watchEffect } from 'vue'
import AppHeader from './components/AppHeader.vue'
import { UserController } from './data/user/userController'
import { useUnreadChats } from './stores/unreadChats'
import { useAuthStore } from './stores/auth'
import { RequestsController } from './data/requests/requestsController'
import { useRequestStore } from './stores/requests'
import { AuthController } from './data/auth/authData'

const authStore = useAuthStore()
const requestStore = useRequestStore()
const unreadedChatsStore = useUnreadChats()

watchEffect(() => {
  if (localStorage.getItem('token')) {
    const user = JSON.parse(AuthController.getUserWithToken(localStorage.getItem('token')))
    authStore.setAuthUser(user)
  }

  if (authStore.authUser) {
    const unreadedChats = JSON.parse(UserController.getUnreadedChats(authStore.authUser.id))
    unreadedChatsStore.setUnreadChats(unreadedChats)

    const myRequests = JSON.parse(RequestsController.getSendedRequests())
    requestStore.setRequests(myRequests)
  }
})
</script>

<template>
  <div class="wrapper">
    <AppHeader />
    <main class="wrapper__container">
      <RouterView />
    </main>
  </div>
</template>
