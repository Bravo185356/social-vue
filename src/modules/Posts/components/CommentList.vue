<script setup>
import { ref, watchEffect } from 'vue'
import CommentItem from './CommentItem.vue'
import CustomInput from '@/UI/CustomInput/CustomInput.vue'
import { CommentController } from '@/data/comments/commentController'
import { useAuthStore } from '@/stores/auth'
import CustomButton from '@/UI/CustomButton/CustomButton.vue'

const props = defineProps({
  postId: Number,
})

const authStore = useAuthStore()

const commentList = ref([])
const commentInput = ref('')

function deleteComment(id) {
  commentList.value = commentList.value.filter(comment => comment.id !== id)
}

function createComment() {
  if (!commentInput.value) {
    return
  }

  const commentItem = {
    id: Date.now(),
    postId: props.postId,
    author: { id: authStore.authUser.id, name: authStore.name, surname: authStore.authUser.surname },
    text: commentInput.value,
  }

  CommentController.addComment(commentItem)

  commentList.value.push(commentItem)
  commentInput.value = ''
}

watchEffect(() => {
  const comments = JSON.parse(CommentController.getComments(props.postId))
  commentList.value = comments
})
</script>

<template>
  <div
    v-if="commentList.length"
    class="comments"
  >
    <CommentItem
      v-for="comment in commentList"
      :key="comment.id"
      :comment="comment"
      @delete-comment="deleteComment"
    />
  </div>
  <form class="comment-form">
    <CustomInput
      v-model="commentInput"
      placeholder="Написать комментарий"
    />
    <CustomButton @click.prevent="createComment">
      Отправить
    </CustomButton>
  </form>
</template>

<style lang="scss" scoped>
@import url(../styles/CommentList.scss);
</style>
