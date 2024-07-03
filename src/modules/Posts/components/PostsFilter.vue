<template>
  <div class="post-filter block">
    <button @click="$emit('updateFilter', 'all')" class="button button_outline" :class="{ active: filterType === 'all' }">
      Все записи
    </button>
    <button @click="$emit('updateFilter', 'userOnly')" class="button button_outline" :class="{ active: filterType === 'userOnly' }">
      Записи пользователя
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  filterType: String,
});
</script>

<style lang="scss" scoped>
@import url(../styles/PostFilter.scss);
</style>
