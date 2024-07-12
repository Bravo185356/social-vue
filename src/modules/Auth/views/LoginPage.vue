<template>
  <section class="login block">
    <div class="title">Войти</div>
    <div v-if="notFoundError" class="not-found">Неверный логин или пароль</div>
    <form class="form">
      <CustomInput placeholder="Логин" :errors="v$.login.$errors" v-model="formData.login" />
      <CustomInput placeholder="Пароль" :errors="v$.password.$errors" v-model="formData.password" />
      <div class="create-account">
        Ещё нету аккаунта? <RouterLink class="link" to="/registration">Создать аккаунт</RouterLink>
      </div>
      <button class="button" @click.prevent="login">Логин</button>
    </form>
  </section>
</template>

<script setup>
import CustomInput from '@/UI/CustomInput/CustomInput.vue'
import { ref } from 'vue';
import { AuthController } from '@/data/auth/authData';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

const authStore = useAuthStore();
const router = useRouter();

const validationRules = {
  login: { required: helpers.withMessage('Обязательное поле', required) },
  password: { required: helpers.withMessage('Обязательное поле', required) },
};

const formData = ref({
  login: 'test11',
  password: 'test11',
});

const v$ = useVuelidate(validationRules, formData);

const notFoundError = ref(false);

async function login() {
  const isValid = await v$.value.$validate();
  
  if (isValid) {
    const user = JSON.parse(AuthController.getUser(formData.value.login, formData.value.password));
    
    if (!user.error) {
      authStore.setAuthUser(user);
      localStorage.setItem("token", user.id)
      router.push({ path: `/${authStore.authUser.id}` });
    } else {
      notFoundError.value = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(../styles/LoginPage.scss);
</style>
