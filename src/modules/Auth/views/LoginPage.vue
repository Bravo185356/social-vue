<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { loginRules } from '../utils/validationRules'
import { useAuthStore } from '@/stores/auth'
import { AuthController } from '@/data/auth/authData'
import CustomInput from '@/UI/CustomInput.vue'

const authStore = useAuthStore()
const router = useRouter()

const formData = ref({
  login: 'test11',
  password: 'test11',
})

const v$ = useVuelidate(loginRules, formData)

const notFoundError = ref(false)

async function login() {
  const isValid = await v$.value.$validate()

  if (isValid) {
    const user = JSON.parse(AuthController.getUser(formData.value.login, formData.value.password))

    if (!user.error) {
      authStore.setAuthUser(user)
      localStorage.setItem('token', user.id)
      router.push({ path: `/${authStore.authUser.id}` })
    } else {
      notFoundError.value = true
    }
  }
}
</script>

<template>
  <section class="login block">
    <div class="title">
      Войти
    </div>
    <div
      v-if="notFoundError"
      class="not-found"
    >
      Неверный логин или пароль
    </div>
    <form class="form">
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
      <div class="create-account">
        Ещё нету аккаунта? <RouterLink
          class="link"
          to="/registration"
        >
          Создать аккаунт
        </RouterLink>
      </div>
      <button
        class="button"
        @click.prevent="login"
      >
        Логин
      </button>
    </form>
  </section>
</template>

<style lang="scss" scoped>
@import url(../styles/LoginPage.scss);
</style>
