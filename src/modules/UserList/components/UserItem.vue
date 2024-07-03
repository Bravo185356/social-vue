<template>
  <div class="user-item block">
    <div class="avatar">
      <img src="@/assets/default-user-image.png" alt="" />
      <OnlineStatus :status="user.status" />
    </div>
    <div>
      <RouterLink class="user-link" :to="`/${user.id}`">{{ user.name }} {{ user.surname }}</RouterLink>
      <div class="city">{{ user.city }}</div>
    </div>
  </div>
</template>

<script setup>
import OnlineStatus from '@/UI/OnlineStatus/OnlineStatus.vue';
const props = defineProps({
  user: Object,
});
</script>

<style lang="scss" scoped>
@import url(../styles/UserItem.scss);
</style>
