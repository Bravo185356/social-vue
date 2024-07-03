<template>
  <div @click="modalActive = true">
    <slot name="activator"></slot>
  </div>
  <Transition name="modal">
    <div @click.self="modalActive = false" class="modal-overlay" v-if="modalActive">
      <div class="modal-body">
        <div class="title">
          <slot name="title"></slot>
          <v-icon @click="modalActive = false" icon="mdi mdi-window-close" class="close icon-wrapper icon-wrapper_gray" />
        </div>
        <slot name="content"></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['closeModal'])

const props = defineProps({
  isActive: Boolean,
});

const modalActive = ref(false)
</script>

<style lang="scss" scoped>
@import url(./CustomModal.scss);
</style>
