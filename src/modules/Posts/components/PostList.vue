<template>
  <div class="post-list">
    <PostItem @delete-post="(id) => $emit('deletePost', id)" v-for="post in filteredPosts" :key="post.id" :post="post" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import PostItem from './PostItem.vue';

const props = defineProps({
  postList: Array,
  filterType: String,
});

const emit = defineEmits(['deletePost']);
const route = useRoute();

const filteredPosts = computed(() => {
  if (props.filterType === 'all') {
    return props.postList;
  } else {
    return props.postList.filter((post) => post.author.id == route.params.id);
  }
});
</script>

<style lang="scss" scoped>
@import url(../styles/PostList.scss);
</style>
