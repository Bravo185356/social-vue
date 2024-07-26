<template>
  <div ref="wrapperItem" class="drop-wrapper">
    <div @click="menuActive = !menuActive">
      <slot name="activator"></slot>
    </div>
    <Transition name="drop-menu">
      <ul v-if="menuActive" :class="{ hoverable: hover, 'text-wrap': textWrap }" class="drop-menu">
        <slot name="content"></slot>
      </ul>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  hover: Boolean,
  textWrap: Boolean
})
const emit = defineEmits(['close-drop']);

const menuActive = ref(false);
const wrapperItem = ref('');

function removeListeners() {
  window.removeEventListener('mousedown', checkEventTarget);
  window.removeEventListener('keypress', checkEventTarget);
}

function checkEventTarget(e) {
  if (e.type === 'keypress' && e.key !== 'Enter') {
    return;
  }

  if (e.target.closest('.drop-wrapper') !== wrapperItem.value) {
    menuActive.value = false;
    removeListeners();
  }
}

watchEffect(() => {
  if (menuActive.value) {
    window.addEventListener('mousedown', checkEventTarget);
    window.addEventListener('keypress', checkEventTarget);
  }
});
</script>

<style lang="scss" scoped>
@import url(../styles/DropMenu.scss);
</style>
