<script setup>
import { useRoute } from 'vue-router'
import { CommentController } from '@/data/comments/commentController'
import { useAuthStore } from '@/stores/auth'

defineProps({
  comment: Object,
})

const emit = defineEmits(['likeClick', 'deleteComment'])

const authStore = useAuthStore()

const route = useRoute()
function deleteComment(id) {
  CommentController.deleteComment(id)
  emit('deleteComment', id)
}
</script>

<template>
  <div class="comment">
    <div class="avatar">
      <img
        src="@/assets/default-user-image.png"
        alt=""
      >
    </div>
    <div class="right-side">
      <div class="name">
        <RouterLink
          class="link"
          :to="`/${comment.author.id}`"
        >
          {{ comment.author.name }} {{ comment.author.surname }}
        </RouterLink>
      </div>
      <div>{{ comment.text }}</div>
    </div>
    <div class="controls">
      <button
        v-if="+route.params.id === authStore.authUser.id || comment.author.id === authStore.authUser.id"
        class="icon-wrapper"
        @click="deleteComment(comment.id)"
      >
        <span><v-icon icon="mdi mdi-delete" /></span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url(../styles/CommentItem.scss);
</style>
