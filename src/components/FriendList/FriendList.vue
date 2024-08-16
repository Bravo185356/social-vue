<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  friendList: Array,
})

const route = useRoute()

const slicedFriends = computed(() => {
  return props.friendList.slice(0, 3)
})
</script>

<template>
  <section class="friends block">
    <div class="total-num">
      <RouterLink
        :to="`/friends/${route.params.id}`"
        class="link"
      >
        Друзья {{ props.friendList.length }}
      </RouterLink>
    </div>
    <ul
      v-if="props.friendList.length"
      class="friend-list"
    >
      <li
        v-for="friend in slicedFriends"
        :key="friend.id"
      >
        <RouterLink
          :to="`/${friend.id}`"
          class="friend"
        >
          <div class="avatar">
            <img src="@/assets/default-user-image.png">
          </div>
          <div>{{ friend.name }}</div>
        </RouterLink>
      </li>
    </ul>
    <div v-else>
      Нет друзей
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url(./FriendList.scss);
</style>
