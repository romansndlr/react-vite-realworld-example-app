class AuthorModel {
  constructor({ email = '', username = '', bio = '', image = '', following = false }) {
    this.email = email
    this.username = username
    this.bio = bio
    this.image = image
    this.following = following
  }
}

export default AuthorModel
