<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import FilterBlock from '@/components/FilterBlock.vue'
import UserList from '@/modules/UserList/components/UserList.vue'
import { FriendsController } from '@/data/friends/friendsController'

const route = useRoute()

const friends = ref([])

function getFriendList(query) {
  if (query) {
    friends.value = JSON.parse(FriendsController.getFilteredFriendList(query, route.params.id))
  } else {
    friends.value = JSON.parse(FriendsController.getFriends(route.params.id))
  }
}

onMounted(() => {
  getFriendList()
})
</script>

<template>
  <div class="friends">
    <FilterBlock
      @reset-filter="getFriendList"
      @accept-filter="getFriendList"
    />
    <UserList :users="friends" />
  </div>
</template>

<style lang="scss" scoped>
.friends {
  display: flex;
  align-items: start;
  gap: 30px;
}
</style>
