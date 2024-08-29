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
@import '@/styles/_variables.scss';

.friends {
  padding: 15px;
}

.total-num {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(180, 180, 180);
}

.friend-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
}

.friend {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  padding: 7px;
  transition: background-color 0.2s ease;

  &:hover,
  &:focus {
    background-color: $hover-background;
    border-radius: 5px;
  }
}
</style>
