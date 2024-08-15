<template>
  <Transition name="modal">
    <div @click.self="model = false" class="modal-overlay" v-if="model">
      <div class="modal-body">
        <div class="title">
          <slot name="title"></slot>
          <div class="icon-wrapper">
            <v-icon @click="model = false" icon="mdi mdi-window-close" class="close" />
          </div>
        </div>
        <slot name="content"></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const model = defineModel();
</script>

<style lang="scss" scoped>
@import url(./CustomModal.scss);
</style>
