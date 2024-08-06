<template>
  <div class="input-block">
    <div class="input-wrapper">
      <input ref="inputElement" class="input" :placeholder="props.placeholder" v-model="model" />
      <span></span>
    </div>
    <div v-if="props.errors">
      <div class="input-error" v-for="error in props.errors">
        {{ error.$message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  placeholder: String,
  errors: Array,
  autofocus: Boolean
});

const model = defineModel();

const inputElement = ref(null)

watchEffect(() => {
  if(props.autofocus && inputElement.value) {
    inputElement.value.focus()
  }
})
</script>

<style lang="scss" scoped>
@import url(./CustomInput.scss);
</style>
