<script setup>
import { ref, watchEffect } from 'vue'

defineProps({
  hover: Boolean,
  textWrap: Boolean,
})

const menuActive = ref(false)
const wrapperItem = ref('')

function removeListeners() {
  window.removeEventListener('mousedown', checkEventTarget)
  window.removeEventListener('keypress', checkEventTarget)
  document.addEventListener('focusin', checkTabFocusTarget)
}

function checkEventTarget(e) {
  if (e.type === 'keypress' && e.key !== 'Enter') {
    return
  }

  if (e.target.closest('.drop-wrapper') !== wrapperItem.value) {
    menuActive.value = false
    removeListeners()
  }
}

function checkTabFocusTarget(e) {
  if (e.target.closest('.drop-wrapper') !== wrapperItem.value) {
    menuActive.value = false
  }
}

watchEffect(() => {
  if (menuActive.value) {
    window.addEventListener('mousedown', checkEventTarget)
    window.addEventListener('keypress', checkEventTarget)
    document.addEventListener('focusin', checkTabFocusTarget)
  }
})
</script>

<template>
  <div
    ref="wrapperItem"
    class="drop-wrapper"
  >
    <div @click="menuActive = !menuActive">
      <slot name="activator" />
    </div>
    <Transition name="drop-menu">
      <ul
        v-if="menuActive"
        :class="{ 'hoverable': hover, 'text-wrap': textWrap }"
        class="drop-menu"
      >
        <slot name="content" />
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.drop-wrapper {
  position: relative;
}

.drop-menu {
  position: absolute;
  top: 110%;
  right: 0;
  min-width: 100px;
  background-color: $block-background;
  border-radius: 5px;
  box-shadow: $drop-menu-shadow;
  z-index: 100;
  text-wrap: nowrap;
}

.text-wrap :deep(.drop-menu-item:hover) {
  text-wrap: wrap;
}

.drop-menu-enter-to,
.drop-menu-leave-from {
  opacity: 1;
}

.drop-menu-enter-from,
.drop-menu-leave-to {
  opacity: 0;
}

.drop-menu-enter-active,
.drop-menu-leave-active {
  transition: opacity 0.2s ease;
}

.hoverable :deep(.drop-menu-item:hover),
.hoverable :deep(.drop-menu-item:focus) {
  transition: background-color 0.3s ease;
  cursor: pointer;
  background-color: $hover-background;
}
</style>
