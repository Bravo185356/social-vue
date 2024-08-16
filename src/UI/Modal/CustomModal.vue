<script setup>
const model = defineModel()
</script>

<template>
  <Transition name="modal">
    <div
      v-if="model"
      class="modal-overlay"
      @click.self="model = false"
    >
      <div class="modal-body">
        <div class="title">
          <slot name="title" />
          <div class="icon-wrapper">
            <v-icon
              icon="mdi mdi-window-close"
              class="close"
              @click="model = false"
            />
          </div>
        </div>
        <slot name="content" />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import url(./CustomModal.scss);
</style>
