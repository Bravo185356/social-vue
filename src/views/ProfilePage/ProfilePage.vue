<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import FriendList from '@/components/FriendList/FriendList.vue'
import ProfileBlock from '@/components/ProfileBlock/ProfileBlock.vue'
import PostsBlock from '@/modules/Posts/components/PostsBlock.vue'
import { UserController } from '@/data/user/userController'
import { FriendsController } from '@/data/friends/friendsController'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const route = useRoute()

const user = ref({})
const friends = ref([])

function removeFriend(id) {
  friends.value = friends.value.filter(friend => friend.id !== id)
  FriendsController.deleteFriendFromData(user.value.id)
}

const isFriend = computed(() => {
  const result = friends.value.find(friend => authStore.authUser.id === friend.id)
  return !!result
})

watchEffect(() => {
  user.value = JSON.parse(UserController.fetchUser(route.params.id))
  friends.value = JSON.parse(FriendsController.getFriends(route.params.id))
})
</script>

<template>
  <div class="profile-content">
    <div
      v-if="authStore.authUser"
      class="profile-left"
    >
      <ProfileBlock
        :is-friend="isFriend"
        :user="user"
        @delete-friend="removeFriend"
      />
      <FriendList :friend-list="friends" />
    </div>
    <div class="profile-right">
      <PostsBlock :user="user" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url(./ProfilePage.scss);
</style>
