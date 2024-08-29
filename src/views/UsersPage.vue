<script setup>
import { onMounted, ref } from 'vue'
import FilterBlock from '@/components/FilterBlock.vue'
import UserList from '@/modules/UserList/components/UserList.vue'
import { UserController } from '@/data/user/userController'

const users = ref([])

function getUsers(query) {
  if (query) {
    users.value = JSON.parse(UserController.getFilteredUserList(query))
  } else {
    users.value = UserController.getAllUsers()
  }
}

onMounted(() => {
  getUsers()
})
</script>

<template>
  <section class="users">
    <FilterBlock
      @reset-filter="getUsers"
      @accept-filter="getUsers"
    />
    <UserList :users="users" />
  </section>
</template>

<style lang="scss" scoped>
.users {
  display: flex;
  align-items: start;
  gap: 30px;
}
</style>
