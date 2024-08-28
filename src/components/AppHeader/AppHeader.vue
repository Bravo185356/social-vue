<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import CustomModal from '@/UI/Modal/CustomModal.vue'
import DropMenu from '@/modules/DropMenu/components/DropMenu.vue'
import DropMenuItem from '@/modules/DropMenu/components/DropMenuItem.vue'
import { UserController } from '@/data/user/userController'
import { useUnreadDialogs } from '@/stores/unreadDialogs'
import { FriendsController } from '@/data/friends/friendsController'
import { useAuthStore } from '@/stores/auth'
import { RequestsController } from '@/data/requests/requestsController'
import CustomButton from '@/UI/CustomButton/CustomButton.vue'

const requests = ref([])

const authStore = useAuthStore()
const unreadDialogsStore = useUnreadDialogs()
const router = useRouter()
const allowOtherUsersCreatePost = ref(false)
const settingDialogActive = ref(false)

function acceptRequest(userId, requestId) {
  FriendsController.addFriend(userId)
  requests.value = requests.value.filter(request => request.id !== requestId)
}

function rejectRequest(requestId) {
  RequestsController.deleteRequest(requestId)
  requests.value = requests.value.filter(request => request.id !== requestId)
}

function logout() {
  authStore.$reset()
  unreadDialogsStore.$reset()

  router.push({ path: '/login' })
  localStorage.removeItem('token')
}

function changeSettings() {
  const newSettings = {
    allowOtherUsersCreatePost: allowOtherUsersCreatePost.value,
  }

  authStore.updateAuthUser('settings', newSettings)
  UserController.updateSettings(newSettings)
  settingDialogActive.value = false
}

const isSaveButtonShow = computed(() => {
  return authStore.authUser.settings.allowOtherUsersCreatePost !== allowOtherUsersCreatePost.value
})

watchEffect(() => {
  if (authStore.authUser) {
    allowOtherUsersCreatePost.value = authStore.authUser.settings.allowOtherUsersCreatePost

    const requestList = JSON.parse(RequestsController.getRequests())
    requests.value = requestList
  }
})
</script>

<template>
  <header class="header block">
    <div class="header-container">
      <CustomButton
        to="/"
        type="plain"
        class="logo"
      >
        Social
      </CustomButton>
      <nav
        v-if="authStore.authUser"
        class="navigation"
      >
        <CustomButton
          to="/search"
          type="icon"
          class="search"
        >
          <v-icon
            class="icon"
            icon="mdi mdi-account-search"
          />
        </CustomButton>
        <CustomButton
          to="/messages"
          type="icon"
          class="chat"
        >
          <v-icon
            class="icon"
            icon="mdi-message"
          />
          <span v-if="unreadDialogsStore.unreadDialogs.length">{{ unreadDialogsStore.unreadDialogs.length }}</span>
        </CustomButton>
        <DropMenu :text-wrap="true">
          <template #activator>
            <CustomButton
              class="requests"
              type="icon"
            >
              <v-icon icon="mdi-bell" />
            </CustomButton>
          </template>
          <template #content>
            <template v-if="requests.length">
              <DropMenuItem
                v-for="request in requests"
                :key="request.id"
              >
                <div>
                  <RouterLink
                    :to="`/${request.requestCreator.id}`"
                    class="link"
                  >
                    {{ request.requestCreator.name }} {{ request.requestCreator.surname }}
                  </RouterLink>
                  <span> хочет добавить вас в друзья</span>
                </div>
                <div class="requests-controls">
                  <CustomButton @click="acceptRequest(request.requestCreator.id, request.id)">
                    Принять
                  </CustomButton>
                  <CustomButton @click="rejectRequest(request.id)">
                    Отклонить
                  </CustomButton>
                </div>
              </DropMenuItem>
            </template>
            <div
              v-else
              class="requests-empty"
            >
              Нету запросов
            </div>
          </template>
        </DropMenu>
        <DropMenu :hover="true">
          <template #activator>
            <CustomButton
              class="avatar"
              type="icon"
            >
              <img src="../../assets/default-user-image.png">
            </CustomButton>
          </template>
          <template #content>
            <DropMenuItem @click="settingDialogActive = true">
              <div>Настройки</div>
            </DropMenuItem>
            <CustomModal v-model="settingDialogActive">
              <template #title>
                Настройки
              </template>
              <template #content>
                <v-switch
                  v-model="allowOtherUsersCreatePost"
                  color="rgb(119, 61, 255)"
                  label="Разрешить другим пользователям публиковать посты на вашей странице"
                />
                <button
                  v-if="isSaveButtonShow"
                  class="button"
                  @click="changeSettings"
                >
                  Применить
                </button>
              </template>
            </CustomModal>
            <DropMenuItem @click="logout">
              <div>Выйти</div>
            </DropMenuItem>
          </template>
        </DropMenu>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import url(./AppHeader.scss);
</style>
