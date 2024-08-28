<script setup>
import { useAttrs } from 'vue'

defineProps({
  type: 'icon' || 'plain',
})

const attrs = useAttrs()
</script>

<template>
  <component
    :is="attrs.to ? 'RouterLink' : 'button'"
    class="button"
    :class="{ icon: type === 'icon', plain: type === 'plain' }"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.button {
  background-color: $button-background;
  border-radius: 5px;
  padding: 5px 15px;
  color: white;
  transition: background-color 0.2s ease;
  text-align: center;
  cursor: pointer;

  &.icon {
    background-color: inherit;
    padding: 5px;
  }

  &.plain {
    background-color: inherit;

    &.active {
      color: white;
      background-color: $button-background;
    }
  }

  &:hover,
  &:focus {
    background-color: $button-background-hover;
  }

}
</style>
