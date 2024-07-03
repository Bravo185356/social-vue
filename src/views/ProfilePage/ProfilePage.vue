<template>
  <div v-if="authStore.authUser">
    <ProfileBlock :isFriend="isFriend" @delete-friend="removeFriend" :user="user" />
    <div class="bottom-blocks">
      <FriendList :friendList="friends" />
      <PostsBlock :user="user" />
    </div>
  </div>
</template>

<script setup>
import FriendList from '@/components/FriendList/FriendList.vue';
import ProfileBlock from '@/components/ProfileBlock/ProfileBlock.vue';
import PostsBlock from '@/modules/Posts/components/PostsBlock.vue';
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { UserController } from '@/data/user/userController';
import { FriendsController } from '@/data/friends/friendsController';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const route = useRoute();

const user = ref({});
const friends = ref([]);

function removeFriend(id) {
  friends.value = friends.value.filter((friend) => friend.id != id);
  FriendsController.deleteFriendFromData(user.value.id);
}

const isFriend = computed(() => {
  const result = friends.value.find((friend) => authStore.authUser.id == friend.id);
  return result ? true : false;
});

watchEffect(() => {
  user.value = JSON.parse(UserController.fetchUser(route.params.id));
  friends.value = JSON.parse(FriendsController.getFriends(route.params.id));
});
</script>

<style lang="scss" scoped>
@import url(./ProfilePage.scss);
</style>
