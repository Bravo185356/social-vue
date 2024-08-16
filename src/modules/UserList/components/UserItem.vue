<script setup>
import OnlineStatus from '@/UI/OnlineStatus/OnlineStatus.vue'

defineProps({
  user: Object,
})
</script>

<template>
  <div class="user-item block">
    <div class="avatar">
      <img
        src="@/assets/default-user-image.png"
        alt=""
      >
      <OnlineStatus :status="user.status" />
    </div>
    <div>
      <RouterLink
        class="user-link link"
        :to="`/${user.id}`"
      >
        {{ user.name }} {{ user.surname }}
      </RouterLink>
      <div class="city">
        {{ user.city }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url(../styles/UserItem.scss);
</style>
