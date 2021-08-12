import Author from './Author'

class Article {
  constructor({
    slug = '',
    title = '',
    description = '',
    body = '',
    tagList = [],
    createdAt = '',
    updatedAt = '',
    favorited = false,
    favoritesCount = 0,
    author = new Author(),
  }) {
    this.slug = slug
    this.title = title
    this.description = description
    this.body = body
    this.tagList = tagList
    this.createdAt = new Date(createdAt).toDateString()
    this.updatedAt = new Date(updatedAt).toDateString()
    this.favorited = favorited
    this.favoritesCount = favoritesCount
    this.author = new Author(author)
  }
}

export default Article
