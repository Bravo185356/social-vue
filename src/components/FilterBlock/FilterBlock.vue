<template>
  <aside class="filter block">
    <form class="filter-form form">
      <CustomInput v-model="filterParams.name" placeholder="Имя" />
      <CustomInput v-model="filterParams.city" placeholder="Город" />
      <div class="filter-online">
        <button
          @click.prevent="filterParams.onlyOnline = false"
          class="button button_outline"
          :class="{ active: !filterParams.onlyOnline }"
        >
          Все
        </button>
        <button
          @click.prevent="filterParams.onlyOnline = true"
          class="button button_outline"
          :class="{ active: filterParams.onlyOnline }"
        >
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
import { reactive, ref } from 'vue';

const emit = defineEmits(['acceptFilter', 'resetFilter']);

const isFiltered = ref(false);
const filterParams = reactive({
  name: '',
  city: '',
  onlyOnline: false,
});

function resetFilter() {
  emit('resetFilter');
  isFiltered.value = false;
  filterParams.onlyOnline = false;
  filterParams.name = '';
  filterParams.city = '';
}

function handleName() {
  const trimName = filterParams.value.name.replace(/(?<=\s.*?)\s+/gs, '');
  const [name, surname] = trimName.split(' ');

  return surname ? { name, surname } : { name };
}

function applyFilter() {
  let query = {};

  for (const key in filterParams) {
    const filterValue = filterParams[key];

    if (key === 'name') {
      const editedName = handleName();
      query = { ...query, ...editedName };
    } else if (filterValue !== '') {
      query[key] = filterValue;
    }
  }

  emit('acceptFilter', query);
  isFiltered.value = true;
}
</script>

<style lang="scss" scoped>
@import url(./FilterBlock.scss);
</style>
