<template>
  <header class="header block">
    <div class="header-container">
      <div class="logo">
        <RouterLink to="/">Social</RouterLink>
      </div>
      <div v-if="authStore.authUser" class="navigation">
        <div class="search icon-wrapper">
          <RouterLink :to="'/search'">
            <v-icon class="icon" icon="mdi mdi-account-search" />
          </RouterLink>
        </div>
        <div class="chat icon-wrapper">
          <RouterLink :to="'/messages'">
            <v-icon class="icon" icon="mdi-message" />
            <span v-if="unreadDialogsStore.unreadDialogs.length">{{ unreadDialogsStore.unreadDialogs.length }}</span>
          </RouterLink>
        </div>
        <DropMenu>
          <template v-slot:activator>
            <div class="requests icon-wrapper">
              <v-icon icon="mdi-bell"></v-icon>
            </div>
          </template>
          <template v-slot:content>
            <template v-if="requests.length">
              <DropMenuItem v-for="request in requests" :key="request.id">
                <div>
                  <RouterLink class="link" :to="`/${request.requestCreator.id}`">
                    {{ request.requestCreator.name }} {{ request.requestCreator.surname }}
                  </RouterLink>
                  <span> хочет добавить вас в друзья</span>
                </div>
                <div class="requests-controls">
                  <button @click="acceptRequest(request.requestCreator.id, request.id)" class="button">Принять</button>
                  <button @click="rejectRequest(request.id)" class="button">Отклонить</button>
                </div>
              </DropMenuItem>
            </template>
            <div v-else class="requests-empty">Нету запросов</div>
          </template>
        </DropMenu>
        <DropMenu :hover="true">
          <template v-slot:activator>
            <div class="avatar">
              <img src="../../assets/default-user-image.png" />
            </div>
          </template>
          <template v-slot:content>
            <DropMenuItem @click="settingDialogActive = true">
              <div>Настройки</div>
            </DropMenuItem>
            <CustomModal v-model="settingDialogActive">
              <template v-slot:title>Настройки</template>
              <template v-slot:content>
                <v-switch
                  v-model="allowOtherUsersCreatePost"
                  color="rgb(119, 61, 255)"
                  label="Разрешить другим пользователям публиковать посты на вашей странице"
                />
                <button @click="changeSettings" class="button">Применить</button>
              </template>
            </CustomModal>
            <DropMenuItem @click="logout">
              <div>Выйти</div>
            </DropMenuItem>
          </template>
        </DropMenu>
      </div>
    </div>
  </header>
</template>

<script setup>
import CustomModal from '@/UI/Modal/CustomModal.vue';
import DropMenu from '@/modules/DropMenu/components/DropMenu.vue';
import DropMenuItem from '@/modules/DropMenu/components/DropMenuItem.vue';
import { UserController } from '@/data/user/userController';
import { useUnreadDialogs } from '@/stores/unreadDialogs';
import { FriendsController } from '@/data/friends/friendsController';
import { ref, watchEffect } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { RequestsController } from '@/data/requests/requestsController';

const requests = ref([]);

const authStore = useAuthStore();
const unreadDialogsStore = useUnreadDialogs();
const router = useRouter();
const allowOtherUsersCreatePost = ref(false);
const settingDialogActive = ref(false);

function acceptRequest(userId, requestId) {
  FriendsController.addFriend(userId);
  requests.value = requests.value.filter((request) => request.id != requestId);
}

function rejectRequest(requestId) {
  RequestsController.deleteRequest(requestId);
  requests.value = requests.value.filter((request) => request.id !== requestId);
}

function logout() {
  authStore.$reset();
  unreadDialogsStore.$reset();

  router.push({ path: '/login' });
  localStorage.removeItem('token');
}

function changeSettings() {
  const newSettings = {
    allowOtherUsersCreatePost: allowOtherUsersCreatePost.value,
  };

  authStore.updateAuthUser('settings', newSettings);
  UserController.updateSettings(newSettings);
  settingDialogActive.value = false
}

watchEffect(() => {
  if (authStore.authUser) {
    allowOtherUsersCreatePost.value = authStore.authUser.settings.allowOtherUsersCreatePost;

    const requestList = JSON.parse(RequestsController.getRequests());
    requests.value = requestList;
  }
});
</script>

<style lang="scss" scoped>
@import url(./AppHeader.scss);
</style>
