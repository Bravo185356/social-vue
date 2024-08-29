<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { RequestsController } from '@/data/requests/requestsController'
import { useRequestStore } from '@/stores/requests'
import DropMenu from '@/modules/DropMenu/components/DropMenu.vue'
import DropMenuItem from '@/modules/DropMenu/components/DropMenuItem.vue'

const props = defineProps({
  user: Object,
  isFriend: Boolean,
})

const emit = defineEmits(['deleteFriend'])

const authStore = useAuthStore()
const requestStore = useRequestStore()
const route = useRoute()
const router = useRouter()

function addFriend() {
  const request = RequestsController.createRequest(route.params.id)
  requestStore.addMyRequest(request)
}

const hasFriendRequest = computed(() => {
  return requestStore.myRequests.find(request => request.userId === +route.params.id)
})

function redirectToChat() {
  router.push({ name: 'chat', query: { id: props.user.id } })
}
</script>

<template>
  <section class="profile block">
    <div class="avatar">
      <img src="@/assets/default-user-image.png">
    </div>
    <div class="info">
      <div>
        <div class="name">
          {{ user.name }} {{ user.surname }}
        </div>
        <div class="city">
          Город
        </div>
        <div class="phone">
          Телефон
        </div>
      </div>
      <DropMenu
        v-if="+route.params.id !== authStore.authUser.id"
        :hover="true"
      >
        <template #activator>
          <div class="icon-wrapper-gray">
            <v-icon icon="mdi mdi-dots-vertical" />
          </div>
        </template>
        <template #content>
          <ul>
            <DropMenuItem>
              <div
                v-if="+route.params.id !== authStore.authUser.id"
                @click="redirectToChat"
              >
                Написать
              </div>
            </DropMenuItem>
            <DropMenuItem>
              <div class="edit">
                <div v-if="hasFriendRequest">
                  Отменить запрос
                </div>
                <div
                  v-else-if="!isFriend && authStore.authUser.id !== +route.params.id"
                  @click="addFriend"
                >
                  Добавить в друзья
                </div>
                <div
                  v-else-if="isFriend"
                  @click="emit('deleteFriend', authStore.authUser.id)"
                >
                  Удалить из друзей
                </div>
              </div>
            </DropMenuItem>
          </ul>
        </template>
      </DropMenu>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.profile {
  padding: 20px;
}

.info {
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 7px;
  margin-top: 15px;
}

.name {
  font-size: 20px;
}

.avatar {
  width: 260px;
  height: 260px;
}
</style>
