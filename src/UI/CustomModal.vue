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
@import '@/styles/_variables.scss';

.modal-overlay {
  position: fixed;
  contain: layout;
  top: 0;
  left: 0;
  color: black;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba($color: #818181, $alpha: 0.3);
}

.modal-body {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  max-width: 500px;
  background-color: $block-background;
  border-radius: 10px;
  box-shadow: $block-shadow;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 10px;
  gap: 50px;
}

.close {
  cursor: pointer;
  font-size: 24px;
}

.modal-enter-active,
.modal-leave-active,
.modal-enter-active .modal-body,
.modal-leave-active .modal-body {
  transition: all 0.3s ease;
}

.modal-enter-from .modal-body,
.modal-leave-to .modal-body {
  top: 30%;
  opacity: 0;
}

.modal-enter-to .modal-body,
.modal-leave-from .modal-body {
  top: 50%;
  opacity: 1;
}
</style>
