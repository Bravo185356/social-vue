<template>
  <li ref="dropItem" :tabindex="isHoverable()" class="drop-menu-item">
    <slot></slot>
  </li>
</template>

<script setup>
import { ref } from 'vue';

const dropItem = ref(null)

function isHoverable() {
  if(dropItem.value) {
    return dropItem.value.closest('.hoverable') ? 0 : -1
  }
}
</script>

<style lang="scss" scoped>
@import url(../styles/DropMenuItem.scss);
</style>
