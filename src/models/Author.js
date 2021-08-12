class Author {
  constructor({ username = '', bio = '', image = '', following = false } = {}) {
    this.username = username
    this.bio = bio
    this.image = image
    this.following = following
  }
}

export default Author
