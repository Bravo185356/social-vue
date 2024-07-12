<template>
  <div class="input-block">
    <div class="input-wrapper">
      <input class="input" :placeholder="props.placeholder" v-model="model" />
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
const props = defineProps({
  placeholder: String,
  errors: Array,
});

const model = defineModel();
</script>

<style lang="scss" scoped>
@import url(./CustomInput.scss);
</style>
