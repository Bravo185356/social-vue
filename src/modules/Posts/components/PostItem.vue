<script setup>
import { useRoute } from 'vue-router'
import CommentList from './CommentList.vue'
import { useAuthStore } from '@/stores/auth'
import { formatDate } from '@/helpers/formatDate'
import CustomButton from '@/UI/CustomButton/CustomButton.vue'

const props = defineProps({
  post: Object,
})

const emit = defineEmits(['likeClick', 'deletePost'])

const authStore = useAuthStore()
const route = useRoute()

function deletePost() {
  emit('deletePost', props.post.id)
}
</script>

<template>
  <article class="post block">
    <div class="header">
      <div class="avatar">
        <img
          src="@/assets/default-user-image.png"
          alt=""
        >
      </div>
      <div class="author">
        <div class="author-name">
          <RouterLink
            class="link"
            :to="`/${post.author.id}`"
          >
            {{ props.post.author.name }} {{ props.post.author.surname }}
          </RouterLink>
        </div>
        <div class="create-date">
          {{ formatDate(post.created) }}
        </div>
      </div>
      <CustomButton
        v-if="+route.params.id === authStore.authUser.id"
        type="icon"
        @click="deletePost"
      >
        <v-icon icon="mdi mdi-delete" />
      </CustomButton>
    </div>
    <div
      class="text"
      v-html="post.text"
    />
    <CommentList :post-id="post.id" />
  </article>
</template>

<style lang="scss" scoped>
@import url(../styles/PostItem.scss);
</style>
