<template>
  <div ref="wrapperItem" class="drop-wrapper">
    <div @click="menuActive = !menuActive">
      <slot name="activator"></slot>
    </div>
    <Transition name="drop-menu">
      <div v-if="menuActive" :class="{ 'hoverable': hover }" class="drop-menu">
        <slot name="content"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  hover: Boolean
})
const emit = defineEmits(['close-drop']);

const menuActive = ref(false);
const wrapperItem = ref('');

function removeListeners() {
  window.removeEventListener('mousedown', checkEventTarget);
}

function checkEventTarget(e) {
  if (e.target.closest('.drop-wrapper') !== wrapperItem.value) {
    menuActive.value = false;
    removeListeners();
  }
}

watchEffect(() => {
  if (menuActive.value) {
    window.addEventListener('mousedown', checkEventTarget);
  }
});
</script>

<style lang="scss" scoped>
@import url(../styles/DropMenu.scss);
</style>
