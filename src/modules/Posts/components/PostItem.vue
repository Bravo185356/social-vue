<script setup>
import { useRoute } from 'vue-router'
import CommentList from './CommentList.vue'
import { useAuthStore } from '@/stores/auth'
import { formatDate } from '@/helpers/formatDate'
import CustomButton from '@/UI/CustomButton.vue'

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
@import '@/styles/_variables.scss';

.post {
  padding: 20px;
}

.text {
  margin-top: 20px;
  white-space: pre-wrap;
  border-bottom: 1px solid $border-color;
  padding-bottom: 20px;
}

.create-date {
  font-size: 12px;
}

.author {
  flex: 1 1 auto;
}

.header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
}
</style>
