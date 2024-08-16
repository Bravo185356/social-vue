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
@import url(../styles/UserList.scss);
</style>
