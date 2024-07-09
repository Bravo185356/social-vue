<template>
  <div class="comment">
    <div class="avatar">
      <img src="@/assets/default-user-image.png" alt="" />
    </div>
    <div class="right-side">
      <div class="name">
        <RouterLink class="link" :to="`/${comment.author.id}`">
          {{ comment.author.name }} {{ comment.author.surname }}
        </RouterLink>
      </div>
      <div>{{ comment.text }}</div>
    </div>
    <div class="controls">
      <div
        v-if="route.params.id == authStore.authUser.id || comment.author.id == authStore.authUser.id"
        @click="deleteComment(comment.id)"
        class="icon-wrapper-gray"
      >
        <span><v-icon icon="mdi mdi-delete" /></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { CommentController } from '@/data/comments/commentController';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  comment: Object,
});

const authStore = useAuthStore();

const route = useRoute();
const emit = defineEmits(['likeClick', 'deleteComment']);

function deleteComment(id) {
  CommentController.deleteComment(id);
  emit('deleteComment', id);
}
</script>

<style lang="scss" scoped>
@import url(../styles/CommentItem.scss);
</style>
