<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { PostController } from '@/data/posts/postController'
import CustomButton from '@/UI/CustomButton/CustomButton.vue'

const props = defineProps({
  user: Object,
})
const emit = defineEmits(['createPost'])
const authStore = useAuthStore()
const route = useRoute()
const postInput = ref('')

function createPost() {
  if (!postInput.value) {
    return
  }

  const text = postInput.value.replace('\n', '<br >')

  const newPost = {
    id: Date.now(),
    userId: route.params.id,
    text,
    author: { id: route.params.id, name: authStore.authUser.name, surname: authStore.authUser.surname },
    created: new Date(),
  }

  PostController.addPost(newPost)
  emit('createPost', newPost)
  postInput.value = ''
}

const showCreatePostForm = computed(() => {
  if (+route.params.id === authStore.authUser.id || props.user.settings.allowOtherUsersCreatePost) {
    return true
  } else {
    return false
  }
})
</script>

<template>
  <form
    v-if="showCreatePostForm"
    class="post-form block"
  >
    <v-textarea
      v-model="postInput"
      width="100%"
      hide-details="true"
      auto-grow
      rows="1"
      clearable
      label="Создать пост"
    />
    <CustomButton @click.prevent="createPost">
      Создать
    </CustomButton>
  </form>
</template>

<style lang="scss" scoped>
@import url(../styles/PostForm.scss);
</style>
