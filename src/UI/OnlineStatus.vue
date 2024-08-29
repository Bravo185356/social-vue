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
.online-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transform: translate(-5px, -5px);

  &.online {
    background-color: rgb(0, 206, 0);
  }

  &.offline {
    background-color: gray;
  }
}
</style>
