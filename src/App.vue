<template>
  <div class="wrapper">
    <AppHeader />
    <main class="wrapper__container">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader/AppHeader.vue';
import { RouterView } from 'vue-router';
import { watchEffect } from 'vue';
import { UserController } from './data/user/userController';
import { useUnreadDialogs } from './stores/unreadDialogs';
import { useAuthStore } from './stores/auth';
import { RequestsController } from './data/requests/requestsController';
import { useRequestStore } from './stores/requests';
import { AuthController } from './data/auth/authData';

const authStore = useAuthStore();
const requestStore = useRequestStore();
const unreadedDialogsStore = useUnreadDialogs();

watchEffect(() => {
  if (localStorage.getItem('token')) {
    const user = JSON.parse(AuthController.getUserWithToken(localStorage.getItem('token')));
    authStore.setAuthUser(user);
  }
  
  if (authStore.authUser) {
    const unreadedDialogs = JSON.parse(UserController.getUnreadedDialogs(authStore.authUser.id));
    unreadedDialogsStore.setUnreadDialogs(unreadedDialogs);
    
    const myRequests = JSON.parse(RequestsController.getSendedRequests());
    requestStore.setRequests(myRequests);
  }
});
</script>

<style scoped></style>
