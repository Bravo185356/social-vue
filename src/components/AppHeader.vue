<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import CustomModal from '@/UI/CustomModal.vue'
import DropMenu from '@/modules/DropMenu/components/DropMenu.vue'
import DropMenuItem from '@/modules/DropMenu/components/DropMenuItem.vue'
import { UserController } from '@/data/user/userController'
import { useUnreadChats } from '@/stores/unreadChats'
import { FriendsController } from '@/data/friends/friendsController'
import { useAuthStore } from '@/stores/auth'
import { RequestsController } from '@/data/requests/requestsController'
import CustomButton from '@/UI/CustomButton.vue'

const requests = ref([])

const authStore = useAuthStore()
const unreadChatsStore = useUnreadChats()
const router = useRouter()
const allowOtherUsersCreatePost = ref(false)
const settingChatActive = ref(false)

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
  unreadChatsStore.$reset()

  router.push({ path: '/login' })
  localStorage.removeItem('token')
}

function changeSettings() {
  const newSettings = {
    allowOtherUsersCreatePost: allowOtherUsersCreatePost.value,
  }

  authStore.updateAuthUser('settings', newSettings)
  UserController.updateSettings(newSettings)
  settingChatActive.value = false
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
          <span v-if="unreadChatsStore.unreadChats.length">{{ unreadChatsStore.unreadChats.length }}</span>
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
              <img src="@/assets/default-user-image.png">
            </CustomButton>
          </template>
          <template #content>
            <DropMenuItem @click="settingChatActive = true">
              <div>Настройки</div>
            </DropMenuItem>
            <CustomModal v-model="settingChatActive">
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
@import '@/styles/_variables.scss';

.header {
  background-color: $block-background;
  color: white;
  border-radius: 0;
  padding: 0px 15px;
}

.logo {
  font-size: 24px;
}

.avatar {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  gap: 20px;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 20px;
}

.chat {
  font-size: 18px;
}

.search,
.requests {
  font-size: 20px;
}

.requests-empty {
  text-wrap: nowrap;
  padding: 10px 15px;
}

.requests-controls {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.settings__block {
  display: flex;
}
</style>
