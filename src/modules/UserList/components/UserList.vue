<template>
  <div class="user-list">
    <UserItem v-for="user in props.users" :user="user" :key="user.id" />
  </div>
</template>

<script setup>
import UserItem from './UserItem.vue';

const props = defineProps({
  users: Array,
});
</script>

<style lang="scss" scoped>
@import url(../styles/UserList.scss);
</style>
