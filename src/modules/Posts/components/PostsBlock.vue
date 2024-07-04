<template>
  <section class="posts">
    <PostFilter @update-filter="(newType) => (filterType = newType)" :filterType="filterType" />
    <PostForm @createPost="createPost" :user="user" />
    <PostList @delete-post="deletePost" :postList="postList" :filterType="filterType" />
  </section>
</template>

<script setup>
import PostForm from './PostForm.vue';
import PostList from './PostList.vue';
import PostFilter from './PostsFilter.vue';
import { PostController } from '@/data/posts/postController';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  user: Object,
});

const route = useRoute();

const filterType = ref('all');
const postList = ref([]);

function createPost(postBody) {
  postList.value.unshift(postBody);
}

function deletePost(id) {
  PostController.deletePostFromData(id);
  postList.value = postList.value.filter((post) => post.id != id);
}

watchEffect(() => {
  postList.value = JSON.parse(PostController.getPosts(route.params.id));
});
</script>
<style lang="scss" scoped>
.posts {
  flex: 1 1 auto;
}
</style>
