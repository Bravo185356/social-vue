<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import PostForm from './PostForm.vue'
import PostList from './PostList.vue'
import PostFilter from './PostsFilter.vue'
import { PostController } from '@/data/posts/postController'

defineProps({
  user: Object,
})

const route = useRoute()

const filterType = ref('all')
const postList = ref([])

function createPost(postBody) {
  postList.value.unshift(postBody)
}

function deletePost(id) {
  PostController.deletePostFromData(id)
  postList.value = postList.value.filter(post => post.id !== id)
}

watchEffect(() => {
  postList.value = JSON.parse(PostController.getPosts(route.params.id))
})
</script>

<template>
  <section class="posts">
    <PostFilter
      :filter-type="filterType"
      @update-filter="(newType) => (filterType = newType)"
    />
    <PostForm
      :user="user"
      @create-post="createPost"
    />
    <PostList
      :post-list="postList"
      :filter-type="filterType"
      @delete-post="deletePost"
    />
  </section>
</template>

<style lang="scss" scoped>
.posts {
  flex: 1 1 auto;
}
</style>
