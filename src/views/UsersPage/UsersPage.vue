<template>
  <section class="users">
    <FilterBlock @reset-filter="getUsers" @accept-filter="getUsers" />
    <UserList :users="users" />
  </section>
</template>

<script setup>
import FilterBlock from '@/components/FilterBlock/FilterBlock.vue';
import UserList from '@/modules/UserList/components/UserList.vue';
import { UserController } from '@/data/user/userController';
import { onMounted, ref } from 'vue';

const users = ref([]);

function getUsers(query) {
  if (query) {
    users.value = JSON.parse(UserController.getFilteredUserList(query));
  } else {
    users.value = UserController.getAllUsers();
  }
}

onMounted(() => {
  getUsers();
});
</script>

<style lang="scss" scoped>
@import url(./UsersPage.scss);
</style>
