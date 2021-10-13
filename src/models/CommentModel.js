import Author from './AuthorModel'

class CommentModel {
  constructor(comment = {}) {
    this.id = comment.id;
    this.body =comment.body;
    this.createdAt = new Date(comment.createdAt).toDateString()
    this.updatedAt = new Date(comment.updatedAt).toDateString()
    this.author = new Author(comment.author)
  }
}

export default CommentModel
