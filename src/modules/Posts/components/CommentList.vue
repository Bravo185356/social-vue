<template>
  <div v-if="commentList.length" class="comments">
    <CommentItem @delete-comment="deleteComment" v-for="comment in commentList" :key="comment.id" :comment="comment" />
  </div>
  <form class="comment-form">
    <CustomInput v-model="commentInput" placeholder="Написать комментарий" />
    <button class="button" @click.prevent="createComment">Отправить</button>
  </form>
</template>

<script setup>
import CustomInput from '@/UI/CustomInput/CustomInput.vue';
import CommentItem from './CommentItem.vue';
import { CommentController } from '@/data/comments/commentController';
import { ref, watchEffect } from 'vue';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  postId: Number,
});

const authStore = useAuthStore();

const commentList = ref([]);
const commentInput = ref('');

function deleteComment(id) {
  commentList.value = commentList.value.filter((comment) => comment.id != id);
}

function createComment() {
  if (!commentInput.value) {
    return;
  }

  const commentItem = {
    id: Date.now(),
    postId: props.postId,
    author: { id: authStore.authUser.id, name: authStore.name, surname: authStore.authUser.surname },
    text: commentInput.value,
  };

  CommentController.addComment(commentItem);

  commentList.value.push(commentItem);
  commentInput.value = '';
}

watchEffect(() => {
  const comments = JSON.parse(CommentController.getComments(props.postId));
  commentList.value = comments;
});
</script>

<style lang="scss" scoped>
@import url(../styles/CommentList.scss);
</style>
