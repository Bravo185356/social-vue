<template>
  <article class="post block">
    <div class="header">
      <div class="avatar">
        <img src="@/assets/default-user-image.png" alt="" />
      </div>
      <div class="author">
        <div class="author-name">
          <RouterLink class="link" :to="`/${post.author.id}`">
            {{ props.post.author.name }} {{ props.post.author.surname }}
          </RouterLink>
        </div>
        <div class="create-date">{{ formatDate(post.created) }}</div>
      </div>
      <div v-if="route.params.id == authStore.authUser.id" @click="deletePost" class="delete icon-wrapper-gray">
        <span><v-icon icon="mdi mdi-delete" /></span>
      </div>
    </div>
    <div class="title">{{ post.title }}</div>
    <div class="text" v-html="post.text"></div>
    <div class="controls"></div>
    <CommentList :postId="post.id" />
  </article>
</template>

<script setup>
import CommentList from './CommentList.vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { formatDate } from '@/helpers/formatDate';

const props = defineProps({
  post: Object,
});

const emit = defineEmits(['likeClick', 'deletePost']);

const authStore = useAuthStore();
const route = useRoute();

function deletePost() {
  emit('deletePost', props.post.id);
}
</script>

<style lang="scss" scoped>
@import url(../styles/PostItem.scss);
</style>
