import Author from './Author'

class Article {
  constructor({
                title = '',
                slug = '',
                body = '',
                createdAt = '',
                updatedAt = '',
                tagList = [],
                description = '',
                author = new Author(),
                favorited = false,
                favoritesCount = 0
              } = {}) {
    this.title = title
    this.slug = slug
    this.body = body
    this.createdAt = new Date(createdAt).toDateString()
    this.updatedAt = new Date(updatedAt).toDateString()
    this.tagList = tagList
    this.description = description
    this.author = author
    this.favorited = favorited
    this.favoritesCount = favoritesCount
  }
}

export default Article