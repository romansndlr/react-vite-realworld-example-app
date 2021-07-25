import AuthorModel from "./Author"

class ArticleModel {
  constructor({
                author = new AuthorModel(),
                body = "",
                createdAt = new Date().toDateString(),
                description = "",
                title = "",
                slug = "",
                updatedAt = "",
                tagList = [],
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
    this.author = new AuthorModel(author)
    this.favorited = favorited
    this.favoritesCount = favoritesCount
  }
}

export default ArticleModel