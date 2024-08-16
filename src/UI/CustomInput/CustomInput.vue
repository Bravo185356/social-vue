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
@import url(./CustomInput.scss);
</style>
