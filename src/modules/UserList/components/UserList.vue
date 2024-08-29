<script setup>
import UserItem from './UserItem.vue'

const props = defineProps({
  users: Array,
})
</script>

<template>
  <div class="user-list">
    <UserItem
      v-for="user in props.users"
      :key="user.id"
      :user="user"
    />
  </div>
</template>

<style lang="scss" scoped>
.user-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}
</style>
