import { createRouter, createWebHistory } from 'vue-router';
import ProfilePage from '@/views/ProfilePage/ProfilePage.vue';
import FriendsPage from '@/views/FriendsPage/FriendsPage.vue';
import ChatPage from '@/modules/Chat/views/ChatPage.vue';
import UsersPage from '@/views/UsersPage/UsersPage.vue';
import { useAuthStore } from '@/stores/auth';
import LoginPage from '@/modules/Auth/views/LoginPage.vue';
import RegistrationPage from '@/modules/Auth/views/RegistrationPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        const authStore = useAuthStore();
        return authStore.authUser ? `/${authStore.authUser.id}` : '/login';
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
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.authUser) {
          next({ path: `/${authStore.authUser.id}` });
        } else {
          next();
        }
      },
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationPage,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.authUser) {
          next({ path: `/${authStore.authUser.id}` });
        } else {
          next();
        }
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.name !== 'login' && to.path !== '/' && to.name !== 'registration' && !authStore.authUser) {
    console.log('1');
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
