<script setup>
import useVuelidate from '@vuelidate/core'
import { ref } from 'vue'
import { registrationRules } from '../utils/validationRules'
import { AuthController } from '@/data/auth/authData'
import CustomInput from '@/UI/CustomInput.vue'

const formData = ref({
  name: '',
  surname: '',
  login: '',
  password: '',
  city: '',
})

const v$ = useVuelidate(registrationRules, formData)

async function createUser() {
  const isValid = await v$.value.$validate()

  if (isValid) {
    const userBody = {
      name: formData.value.name,
      surname: formData.value.surname,
      login: formData.value.login,
      password: formData.value.password,
      city: formData.value.city,
    }

    AuthController.createUser(userBody)
  }
}
</script>

<template>
  <section class="registration block">
    <div class="header">
      <RouterLink
        to="/login"
        class="icon-wrapper-gray"
      >
        <v-icon icon="mdi mdi-arrow-left" />
      </RouterLink>
      <div class="title">
        Регистрация
      </div>
    </div>
    <form class="form">
      <CustomInput
        v-model="formData.name"
        placeholder="Имя"
        :errors="v$.name.$errors"
      />
      <CustomInput
        v-model="formData.surname"
        placeholder="Фамилия"
        :errors="v$.surname.$errors"
      />
      <CustomInput
        v-model="formData.login"
        placeholder="Логин"
        :errors="v$.login.$errors"
      />
      <CustomInput
        v-model="formData.password"
        placeholder="Пароль"
        :errors="v$.password.$errors"
      />
      <CustomInput
        v-model="formData.city"
        placeholder="Город"
        :errors="v$.city.$errors"
      />
      <button
        class="button"
        @click.prevent="createUser"
      >
        Зарегистрироваться
      </button>
    </form>
  </section>
</template>

<style lang="scss" scoped>
.registration {
  width: 50%;
  margin: 0px auto;
  padding: 15px;
}

.title {
  text-align: center;
  font-size: 20px;
  flex: 1 1 auto;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
</style>
