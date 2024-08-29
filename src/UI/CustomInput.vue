<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  placeholder: String,
  errors: Array,
  autofocus: Boolean,
})

const model = defineModel()

const inputElement = ref(null)

watchEffect(() => {
  if (props.autofocus && inputElement.value) {
    inputElement.value.focus()
  }
})
</script>

<template>
  <div class="input-block">
    <div class="input-wrapper">
      <input
        ref="inputElement"
        v-model="model"
        class="input"
        :placeholder="props.placeholder"
      >
      <span />
    </div>
    <div v-if="props.errors">
      <div
        v-for="error in props.errors"
        :key="error"
        class="input-error"
      >
        {{ error.$message }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.input-block {
  width: 100%;
}

.input-wrapper {
  position: relative;

  .input {
    position: relative;
    border-bottom: 1px solid rgb(153, 153, 153);
    padding: 5px;
    width: 100%;
    color: white;

    &::placeholder {
      color: rgb(165, 165, 165);
    }

    &:focus + span {
      width: 100%;
      left: 0;
    }

    &:focus {
      outline: 0;
    }
  }

  span {
    content: '';
    transition: all 0.2s ease;
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: $blue-color;
    z-index: 10;
  }
}
</style>
