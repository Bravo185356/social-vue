import { createRouter, createWebHashHistory } from 'vue-router'
import ProfilePage from '@/views/ProfilePage.vue'
import FriendsPage from '@/views/FriendsPage.vue'
import ChatPage from '@/modules/Chat/views/ChatPage.vue'
import UsersPage from '@/views/UsersPage.vue'
import { useAuthStore } from '@/stores/auth'
import LoginPage from '@/modules/Auth/views/LoginPage.vue'
import RegistrationPage from '@/modules/Auth/views/RegistrationPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: () => {
        const authStore = useAuthStore()
        return authStore.authUser ? `/${authStore.authUser.id}` : '/login'
      },
    },
    {
      path: '/:id',
      name: 'profile page',
      component: ProfilePage,
    },
    {
      path: '/settings',
      name: 'settings page',
    },
    {
      path: '/friends/:id',
      name: 'friends page',
      component: FriendsPage,
    },
    {
      path: '/messages',
      name: 'chat',
      component: ChatPage,
    },
    {
      path: '/search',
      name: 'search users',
      component: UsersPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      beforeEnter: () => {
        const authStore = useAuthStore()

        return authStore.authUser ? `/${authStore.authUser.id}` : true
      },
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationPage,
      beforeEnter: () => {
        const authStore = useAuthStore()

        return authStore.authUser ? `/${authStore.authUser.id}` : true
      },
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.name !== 'login' && to.path !== '/' && to.name !== 'registration' && !authStore.authUser) {
    return '/login'
  } else {
    return true
  }
})

export default router
