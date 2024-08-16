import { postData } from './postData'

export class PostController {
  static addPost(newPost) {
    postData.push(newPost)
  }

  static deletePostFromData(id) {
    const index = postData.findIndex(post => post.id === id)
    postData.splice(index, 1)
  }

  static getPosts(id) {
    const posts = postData.filter(post => post.userId === +id)
    return JSON.stringify(posts.reverse())
  }
}
