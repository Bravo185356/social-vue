<script setup>
import OnlineStatus from '@/UI/OnlineStatus.vue'

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
@import '@/styles/_variables.scss';

.user-item {
  display: flex;
  padding: 20px;
  gap: 20px;
}

.avatar {
  position: relative;
  width: 100px;
  height: 100px;
}

.city {
  font-size: 14px;
}

.user-link {
  font-size: 18px;
  letter-spacing: 0.5px;
}
</style>
