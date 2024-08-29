<script setup>
import CustomButton from '@/UI/CustomButton.vue'

defineProps({
  filterType: String,
})

defineEmits(['updateFilter'])
</script>

<template>
  <div class="post-filter block">
    <CustomButton
      type="plain"
      :class="{ active: filterType === 'all' }"
      @click="$emit('updateFilter', 'all')"
    >
      Все записи
    </CustomButton>
    <CustomButton
      type="plain"
      :class="{ active: filterType === 'userOnly' }"
      @click="$emit('updateFilter', 'userOnly')"
    >
      Записи пользователя
    </CustomButton>
  </div>
</template>

<style lang="scss" scoped>
.post-filter {
  display: flex;
  gap: 10px;
  padding: 15px;
  margin-bottom: 10px;
}
</style>
