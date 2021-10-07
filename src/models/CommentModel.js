import Author from './AuthorModel'

class CommentModel {
  constructor({
    id = '',
    createdAt = '',
    updatedAt = '',
    body= '',
    author = {},
  } = {}) {
    this.id = id;
    this.body = body;
    this.createdAt = new Date(createdAt).toDateString()
    this.updatedAt = new Date(updatedAt).toDateString()
    this.author = new Author(author)
  }
}

export default CommentModel
