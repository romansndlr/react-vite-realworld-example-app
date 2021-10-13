import Author from './AuthorModel'

class CommentModel {
  constructor({
                body = '',
                createdAt = '',
                updatedAt = '',
                id = '',
                author = {}
              }) {
    this.body = body
    this.createdAt = new Date(createdAt).toDateString()
    this.updatedAt = new Date(updatedAt).toDateString()
    this.id = id
    this.author = new Author(author)
  }
}

export default CommentModel