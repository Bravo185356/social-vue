<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PostItem from './PostItem.vue'

const props = defineProps({
  postList: Array,
  filterType: String,
})

defineEmits(['deletePost'])

const route = useRoute()

const filteredPosts = computed(() => {
  if (props.filterType === 'all') {
    return props.postList
  } else {
    return props.postList.filter(post => post.author.id === +route.params.id)
  }
})
</script>

<template>
  <div class="post-list">
    <PostItem
      v-for="post in filteredPosts"
      :key="post.id"
      :post="post"
      @delete-post="(id) => $emit('deletePost', id)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import url(../styles/PostList.scss);
</style>
