<script setup>
import { ref } from 'vue'

const dropItem = ref(null)

function isHoverable() {
  if (dropItem.value) {
    return dropItem.value.closest('.hoverable') ? 0 : -1
  }
}
</script>

<template>
  <li
    ref="dropItem"
    :tabindex="isHoverable()"
    class="drop-menu-item"
  >
    <slot />
  </li>
</template>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.drop-menu-item {
  padding: 10px 15px;

  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}

.drop-menu:not(.hoverable) .drop-menu-item:not(:last-child) {
  border-bottom: 1px solid $border-color;
}
</style>
