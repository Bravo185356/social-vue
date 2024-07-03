<template>
  <section class="profile block">
    <div>
      <div class="avatar">
        <img src="../../assets/default-user-image.png" />
      </div>
      <div class="edit">
        <button v-if="hasFriendRequest" class="button">Отменить запрос</button>
        <button v-else-if="!isFriend && authStore.authUser.id != route.params.id" @click="addFriend" class="button">Добавить в друзья</button>
        <button v-else-if="isFriend" @click="$emit('deleteFriend', authStore.authUser.id)" class="button">Удалить из друзей</button>
      </div>
    </div>
    <div class="info">
      <div class="name">{{ user.name }} {{ user.surname }}</div>
      <div class="city">Город</div>
      <div class="phone">Телефон</div>
    </div>
    <div>
      <button @click="redirectToChat" v-if="route.params.id != authStore.authUser.id" class="button">Написать</button>
    </div>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { RequestsController } from '@/data/requests/requestsController';
import { useRequestStore } from '@/stores/requests';
import { computed } from 'vue';

const props = defineProps({
  user: Object,
  isFriend: Boolean,
});

const authStore = useAuthStore();
const requestStore = useRequestStore();
const route = useRoute();
const router = useRouter();

function addFriend() {
  const request = RequestsController.createRequest(route.params.id);
  requestStore.addMyRequest(request);
}

const hasFriendRequest = computed(() => {
  return requestStore.myRequests.find((request) => request.userId == route.params.id);
});

function redirectToChat() {
  router.push({ name: 'chat', query: { id: props.user.id } });
}
</script>

<style lang="scss" scoped>
@import url(./ProfileBlock.scss);
</style>
