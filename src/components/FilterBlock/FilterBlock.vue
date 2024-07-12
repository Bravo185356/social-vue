<template>
  <aside class="filter block">
    <form class="filter-form form">
      <CustomInput v-model="nameInput" placeholder="Имя"  />
      <CustomInput v-model="cityInput" placeholder="Город"  />
      <div class="filter-online">
        <button @click.prevent="onlyOnlineFriends = false" class="button button_outline" :class="{ active: !onlyOnlineFriends }">
          Все
        </button>
        <button @click.prevent="onlyOnlineFriends = true" class="button button_outline" :class="{ active: onlyOnlineFriends }">
          Онлайн
        </button>
      </div>
      <button @click.prevent="applyFilter" class="button">Поиск</button>
      <button v-if="isFiltered" @click="resetFilter" class="button">Сбросить</button>
    </form>
  </aside>
</template>

<script setup>
import CustomInput from '@/UI/CustomInput/CustomInput.vue';
import { ref } from 'vue';

const emit = defineEmits(['acceptFilter', 'resetFilter']);

const nameInput = ref('Тестовый');
const cityInput = ref('');
const onlyOnlineFriends = ref(false);
const isFiltered = ref(false);

function resetFilter() {
  emit('resetFilter');
  isFiltered.value = false;
  onlyOnlineFriends.value = false;
  nameInput.value = '';
  cityInput.value = '';
}

function applyFilter() {
  const name = nameInput.value.split(' ')[0];
  const surname = nameInput.value.split(' ')[1];

  const query = {
    status: onlyOnlineFriends.value ? 'online' : 'all',
  };

  if (surname) {
    query.surname = surname;
  }

  if (name) {
    query.name = name;
  }

  if (cityInput.value) {
    query.city = cityInput.value;
  }

  emit('acceptFilter', query);
  isFiltered.value = true;
}
</script>

<style lang="scss" scoped>
@import url(./FilterBlock.scss);
</style>
