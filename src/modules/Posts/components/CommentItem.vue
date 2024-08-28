<script setup>
import { useRoute } from 'vue-router'
import { CommentController } from '@/data/comments/commentController'
import { useAuthStore } from '@/stores/auth'
import CustomButton from '@/UI/CustomButton/CustomButton.vue'

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
      <CustomButton
        v-if="+route.params.id === authStore.authUser.id || comment.author.id === authStore.authUser.id"
        type="icon"
        @click="deleteComment(comment.id)"
      >
        <v-icon icon="mdi mdi-delete" />
      </CustomButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url(../styles/CommentItem.scss);
</style>
