import { commentsData } from './commentsData';

export class CommentController {
  static addComment(comment) {
    commentsData.push(comment);
  }

  static getComments(postId) {
    const comments = commentsData.filter((comment) => comment.postId == postId);
    return JSON.stringify(comments);
  }

  static deleteComment(id) {
    const commentIndex = commentsData.findIndex((comment) => comment.id == id);
    commentsData.splice(commentIndex, 1);
  }
}
