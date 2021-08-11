import { belongsTo, createServer, Factory, hasMany, Model, RestSerializer } from 'miragejs'
import faker from 'faker'
import { shuffle } from 'lodash-es'

function makeServer({ environment = 'test' } = {}) {
  return createServer({
    environment,

    serializers: {
      application: RestSerializer,
      article: RestSerializer.extend({
        include: ['author', 'favorites'],
        embed: true,
      }),
      comment: RestSerializer.extend({
        include: ['author'],
        embed: true,
      }),
    },

    models: {
      user: Model.extend({
        articles: hasMany(),
        favorite: belongsTo(),
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
        following: false,
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
        afterCreate(user, server) {
          server.createList('article', 5, { author: user })
        },
      }),
      tag: Factory.extend({
        text: () => faker.lorem.word(),
      }),
    },

    seeds(server) {
      server.createList('tag', 10)
      server.createList('user', 10)
      server.create('user', {
        email: 'test@test.com',
        username: 'test-user-1',
      })
    },

    routes() {
      this.get('/articles/feed', (schema, request) => {
        const { limit, offset } = request.queryParams
        const user = schema.users.findBy({ email: 'test@test.com' })

        return {
          articles: user.articles.models
            .slice(Number(offset), Number(limit))
            .map((article) => ({ ...article.attrs, author: article.author })),
          articlesCount: user.articles.length,
        }
      })

      this.get('/articles', (schema, request) => {
        const { limit, offset, tag, author } = request.queryParams

        const allArticles = schema.articles.all()

        let articles

        if (!tag && !author) {
          articles = allArticles
        }

        if (tag) {
          articles = allArticles.filter(({ tagList }) => tagList.includes(tag))
        }

        if (author) {
          articles = allArticles.filter(({ author: { username } }) => username === author)
        }

        return {
          articles: shuffle(
            articles.models
              .slice(Number(offset), Number(limit))
              .map((article) => ({ ...article.attrs, author: article.author }))
          ),
          articlesCount: articles.length,
        }
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
        const favorite = schema.create('favorite', { article, user })

        article.update({
          favorite,
          favorited: true,
          favoritesCount: article.favoritesCount + 1,
        })

        return article
      })

      this.delete('/articles/:slug/favorite', (schema, request) => {
        const { slug } = request.params
        const article = schema.articles.findBy({ slug })

        article.update({
          favorited: false,
          favoritesCount: article.favoritesCount - 1,
        })

        article.favorite.destroy()

        return article
      })
    },
  })
}

export default makeServer
