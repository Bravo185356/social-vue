<script setup>
const props = defineProps({
  status: String,
})
</script>

<template>
  <div
    class="online-status"
    :class="{ online: props.status === 'online', offline: props.status === 'offline' }"
  />
</template>

<style lang="scss" scoped>
@import url(./OnlineStatus.scss);
</style>
