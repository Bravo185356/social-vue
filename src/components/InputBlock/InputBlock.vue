<template>
  <div>
    <input class="input" :placeholder="props.placeholder" v-model="model" />
    <div v-if="props.errors.length">
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

<style lang="scss" scoped></style>
