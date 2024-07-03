<template>
  <form v-if="showCreatePostForm" class="post-form block">
    <v-textarea width="100%" hide-details="true" auto-grow rows="1" v-model="postInput" clearable label="Создать пост" />
    <button @click.prevent="createPost" class="button">Создать</button>
  </form>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js';
import { PostController } from '@/data/posts/postController';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const emit = defineEmits(['createPost']);
const props = defineProps({
  user: Object,
});

const authStore = useAuthStore();
const route = useRoute();
const postInput = ref('');

function createPost() {
  if (!postInput.value) {
    return;
  }

  const text = postInput.value.replace('\n', '<br >');

  const newPost = {
    id: Date.now(),
    userId: route.params.id,
    text,
    author: { id: route.params.id, name: authStore.authUser.name, surname: authStore.authUser.surname },
    created: new Date(),
  };

  PostController.addPost(newPost);
  emit('createPost', newPost);
  postInput.value = '';
}

const showCreatePostForm = computed(() => {
  if (route.params.id == authStore.authUser.id || !props.user.settings.allowOtherUsersCreatePost) {
    return true;
  } else {
    return false;
  }
});
</script>

<style lang="scss" scoped>
@import url(../styles/PostForm.scss);
</style>
