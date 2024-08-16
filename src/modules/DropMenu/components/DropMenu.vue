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

watchEffect(() => {
  if (menuActive.value) {
    window.addEventListener('mousedown', checkEventTarget)
    window.addEventListener('keypress', checkEventTarget)
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
@import url(../styles/DropMenu.scss);
</style>
