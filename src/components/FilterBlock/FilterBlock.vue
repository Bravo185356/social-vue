<script setup>
import { reactive, ref } from 'vue'
import CustomInput from '@/UI/CustomInput/CustomInput.vue'
import CustomButton from '@/UI/CustomButton/CustomButton.vue'

const emit = defineEmits(['acceptFilter', 'resetFilter'])

const isFiltered = ref(false)
const filterParams = reactive({
  name: '',
  city: '',
  onlyOnline: false,
})

function resetFilter() {
  emit('resetFilter')
  isFiltered.value = false
  filterParams.onlyOnline = false
  filterParams.name = ''
  filterParams.city = ''
}

function handleName() {
  if (!filterParams.name) {
    return
  }

  const splitedName = filterParams.name.trim().split(/\s+/)
  const formatedName = splitedName.slice(0, 2).join(' ') + splitedName.slice(2).join('')
  const [name, surname] = formatedName.split(' ')

  return surname ? { name, surname } : { name }
}

function applyFilter() {
  let query = {}

  for (const key in filterParams) {
    const filterValue = filterParams[key]

    if (key === 'name') {
      const editedName = handleName()

      if (editedName) {
        query = { ...query, ...editedName }
      }
    } else if (filterValue !== '') {
      query[key] = filterValue
    }
  }

  emit('acceptFilter', query)
  isFiltered.value = true
}
</script>

<template>
  <aside class="filter block">
    <form class="filter-form form">
      <CustomInput
        v-model="filterParams.name"
        placeholder="Имя"
      />
      <CustomInput
        v-model="filterParams.city"
        placeholder="Город"
      />
      <div class="filter-online">
        <CustomButton
          type="plain"
          :class="{ active: !filterParams.onlyOnline }"
          @click.prevent="filterParams.onlyOnline = false"
        >
          Все
        </CustomButton>
        <CustomButton
          type="plain"
          :class="{ active: filterParams.onlyOnline }"
          @click.prevent="filterParams.onlyOnline = true"
        >
          Онлайн
        </CustomButton>
      </div>
      <CustomButton @click.prevent="applyFilter">
        Поиск
      </CustomButton>
      <CustomButton
        v-if="isFiltered"
        @click="resetFilter"
      >
        Сбросить
      </CustomButton>
    </form>
  </aside>
</template>

<style lang="scss" scoped>
@import url(./FilterBlock.scss);
</style>
