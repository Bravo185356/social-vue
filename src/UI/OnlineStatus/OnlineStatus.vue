<template>
  <div class="online-status" :class="{ online: props.status === 'online', offline: props.status === 'offline' }"></div>
</template>

<script setup>
const props = defineProps({
    status: String
})
</script>

<style lang="scss" scoped>
@import url(./OnlineStatus.scss);
</style>
