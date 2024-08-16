<script setup>
defineProps({
  filterType: String,
})

defineEmits(['updateFilter'])
</script>

<template>
  <div class="post-filter block">
    <button
      class="button button_plain"
      :class="{ active: filterType === 'all' }"
      @click="$emit('updateFilter', 'all')"
    >
      Все записи
    </button>
    <button
      class="button button_plain"
      :class="{ active: filterType === 'userOnly' }"
      @click="$emit('updateFilter', 'userOnly')"
    >
      Записи пользователя
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import url(../styles/PostFilter.scss);
</style>
