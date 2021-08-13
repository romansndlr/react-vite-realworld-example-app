// @ts-nocheck
import { belongsTo, createServer, Factory, hasMany, Model, RestSerializer } from 'miragejs'
import faker from 'faker'
import { orderBy, isNull } from 'lodash-es'

const authUser = {
  email: 'test@test.com',
  username: 'test-user-1',
}

function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    serializers: {
      application: RestSerializer,
      article: RestSerializer.extend({
        include: ['author', 'favorite'],
        embed: true,
        serialize(_, request) {
          const { limit, offset } = request.queryParams
          const start = Number(offset) * Number(limit)
          const end = start + Number(limit)

          // eslint-disable-next-line prefer-rest-params
          const json = RestSerializer.prototype.serialize.apply(this, arguments)

          if ('articles' in json) {
            const { articles } = json
            json.articles = orderBy(
              articles.slice(start, end).map((article) => {
                const favorites = this.schema.favorites.where({ articleId: article.id })
                const favorited = this.schema.favorites.findBy({ articleId: article.id, userId: 11 })
                return { ...article, favoritesCount: favorites.length, favorited: !isNull(favorited) }
              }),
              (article) => new Date(article.createdAt).getTime(),
              'desc'
            )
            json.articlesCount = articles.length
          }

          return json
        },
      }),
      comment: RestSerializer.extend({
        include: ['author'],
        embed: true,
      }),
    },

    models: {
      user: Model.extend({
        articles: hasMany(),
        favorites: hasMany(),
        comments: hasMany(),
      }),
      article: Model.extend({
        author: belongsTo('user'),
        favorite: belongsTo(),
        comments: hasMany(),
      }),
      tag: Model,
      favorite: Model.extend({
        user: belongsTo(),
        article: belongsTo(),
      }),
      comment: Model.extend({
        article: belongsTo(),
        author: belongsTo('user'),
      }),
    },

    factories: {
      article: Factory.extend({
        slug: () => faker.datatype.uuid(),
        title: () => faker.lorem.sentence(),
        description: () => faker.lorem.sentence(),
        body: () => faker.lorem.paragraph(),
        createdAt: () => faker.date.past(),
        updatedAt: () => faker.date.past(),
        favorited: false,
        favoritesCount: 0,
        afterCreate(article, server) {
          const tags = server.db.tags.map(({ text }) => text)

          article.update({
            tagList: tags.sort(() => Math.random() - Math.random()).slice(0, faker.datatype.number(tags.length / 2)),
          })
        },
      }),
      comment: Factory.extend({
        createdAt: () => faker.date.past(),
        updatedAt: () => faker.date.past(),
        body: () => faker.lorem.paragraph(),
      }),
      user: Factory.extend({
        email: () => faker.internet.email(),
        token: () => faker.datatype.uuid(),
        username: () => faker.internet.userName(),
        bio: () => faker.lorem.sentence(),
        image: () => faker.image.avatar(),
        following: false,
        afterCreate(user, server) {
          server.createList('article', 2, { author: user })
          const articles = server.createList('article', 3, { author: user })

          articles.forEach((article) => {
            const favorite = server.create('favorite', { user })
            article.update({ favorite })
          })
        },
      }),
      tag: Factory.extend({
        text: () => faker.lorem.word(),
      }),
    },

    seeds(server) {
      const db = window.localStorage.getItem('mirage-persistance')

      if (db) {
        server.db.loadData(JSON.parse(db))
      } else {
        server.createList('tag', 10)
        server.createList('user', 10)
        server.create('user', authUser)

        window.localStorage.setItem('mirage-persistance', JSON.stringify(server.db.dump()))
      }
    },

    routes() {
      this.get('/articles/feed', (schema) => schema.articles.all().filter((article) => article.author.following))

      this.get('/articles', (schema, request) => {
        const { tag, author, favorited } = request.queryParams

        const articles = schema.articles.all()

        if (tag) {
          return articles.filter(({ tagList }) => tagList.includes(tag))
        }

        if (author) {
          return articles.filter((article) => article.author?.username === author)
        }

        if (favorited) {
          const user = this.schema.users.findBy({ username: favorited })
          const favorites = this.schema.favorites.where({ userId: user.id })

          return schema.articles.find(favorites.models.map(({ articleId }) => articleId))
        }

        return articles
      })

      this.post('/articles', (schema, request) => {
        const { article } = JSON.parse(request.requestBody)

        const author = schema.users.findBy({ email: 'test@test.com' })

        const newArticle = this.create('article', { ...article, author })

        return newArticle
      })

      this.get('/articles/:slug', (schema, request) => {
        const { slug } = request.params

        return schema.articles.findBy({ slug })
      })

      this.get('/articles/:slug/comments', (schema, request) => {
        const { slug } = request.params

        const article = schema.articles.findBy({ slug })

        return article.comments
      })

      this.post('/articles/:slug/comments', (schema, request) => {
        const { slug } = request.params
        const body = JSON.parse(request.requestBody)

        const author = schema.users.findBy({ email: 'test@test.com' })

        const now = new Date().getTime()

        const comment = schema.comments.create({ ...body.comment, createdAt: now, updatedAt: now, author })

        const article = schema.articles.findBy({ slug })

        article.update({ comments: [...article.comments.models, comment] })

        return comment
      })

      this.get('/tags', (schema) => ({
        tags: schema.tags.all().models.map(({ attrs }) => attrs.text),
      }))

      this.post('/users/login', (schema, request) => {
        const { user } = JSON.parse(request.requestBody)

        return schema.users.findBy({ email: user.email })
      })

      this.post('/users', (schema, request) => {
        const { user } = JSON.parse(request.requestBody)

        return schema.users.create(user)
      })

      this.put('/user', (schema, request) => {
        const { user } = JSON.parse(request.requestBody)

        const instance = schema.users.findBy({ email: 'test@test.com' })

        instance.update(user)

        return instance
      })

      this.get('/user', (schema) => schema.users.findBy({ email: 'test@test.com' }))

      this.get('/profiles/:username', (schema, request) => {
        const { username } = request.params

        return {
          profile: schema.users.findBy({ username }),
        }
      })

      this.post('/profiles/:username/follow', (schema, request) => {
        const { username } = request.params

        const user = schema.users.findBy({ username })

        user.update({
          following: true,
        })

        return {
          profile: user,
        }
      })

      this.delete('/profiles/:username/follow', (schema, request) => {
        const { username } = request.params

        const user = schema.users.findBy({ username })

        user.update({
          following: false,
        })

        return {
          profile: user,
        }
      })

      this.post('/articles/:slug/favorite', (schema, request) => {
        const { slug } = request.params
        const article = schema.articles.findBy({ slug })
        const user = schema.users.findBy({ email: 'test@test.com' })
        const favorite = schema.favorites.create({ article, user })

        article.update({ favorite })
        user.update({ favorite })

        return article
      })

      this.delete('/articles/:slug/favorite', (schema, request) => {
        const { slug } = request.params
        const article = schema.articles.findBy({ slug })
        const user = schema.users.findBy({ email: authUser.email })

        user.favorite.destroy()
        article.favorite.destroy()

        return article
      })
    },
  })
}

export default makeServer
