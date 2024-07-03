<template>
  <div class="friends">
    <FilterBlock @reset-filter="getFriendList" @accept-filter="getFriendList" />
    <UserList :users="friends" />
  </div>
</template>

<script setup>
import FilterBlock from '@/components/FilterBlock/FilterBlock.vue';
import UserList from '@/modules/UserList/components/UserList.vue';
import { FriendsController } from '@/data/friends/friendsController';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const friends = ref([]);

function getFriendList(query) {
  if (query) {
    friends.value = JSON.parse(FriendsController.getFilteredFriendList(query, route.params.id));
  } else {
    friends.value = JSON.parse(FriendsController.getFriends(route.params.id));
  }
}

onMounted(() => {
  getFriendList();
});
</script>

<style lang="scss" scoped>
@import url(./FriendsPage.scss);
</style>
