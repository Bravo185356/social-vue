<template>
  <section class="registration block">
    <div class="title">Регистрация</div>
    <form class="form">
      <InputBlock placeholder="Имя" :errors="v$.name.$errors" v-model="formData.name" />
      <InputBlock placeholder="Фамилия" :errors="v$.surname.$errors" v-model="formData.surname" />
      <InputBlock placeholder="Логин" :errors="v$.login.$errors" v-model="formData.login" />
      <InputBlock placeholder="Пароль" :errors="v$.password.$errors" v-model="formData.password" />
      <InputBlock placeholder="Город" :errors="v$.city.$errors" v-model="formData.city" />
      <button @click.prevent="createUser" class="button">Зарегистрироваться</button>
    </form>
  </section>
</template>

<script setup>
import InputBlock from '@/components/InputBlock/InputBlock.vue';
import { AuthController } from '@/data/auth/authData';
import useVuelidate from '@vuelidate/core';
import { ref } from 'vue';
import { helpers, minLength, required } from '@vuelidate/validators';

const validationRules = {
  name: { required: helpers.withMessage('Обязательное поле', required) },
  surname: { required: helpers.withMessage('Обязательное поле', required) },
  login: {
    required: helpers.withMessage('Обязательное поле', required),
    minLength: helpers.withMessage('Логин должен содержать минимум 6 символов', minLength(6)),
  },
  password: { required, minLength: helpers.withMessage('Пароль должен содержать минимум 6 символов', minLength(6)) },
  city: { required: helpers.withMessage('Обязательное поле', required) },
};

const formData = ref({
  name: '',
  surname: '',
  login: '',
  password: '',
  city: '',
});

const v$ = useVuelidate(validationRules, formData);

async function createUser() {
  const isValid = await v$.value.$validate();

  if (isValid) {
    const userBody = {
      name: formData.value.name,
      surname: formData.value.surname,
      login: formData.value.login,
      password: formData.value.password,
      city: formData.value.city,
    };

    AuthController.createUser(userBody);
  }
}
</script>

<style lang="scss" scoped>
@import url(../styles/RegistrationBlock.scss);
</style>
