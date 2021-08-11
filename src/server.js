import { belongsTo, createServer, Factory, Model, RestSerializer } from 'miragejs'
import faker from 'faker'

function makeServer({ environment = 'test' } = {}) {
  return createServer({
    environment,

    serializers: {
      application: RestSerializer,
      article: RestSerializer.extend({
        include: ['author'],
        embed: true,
      }),
    },

    models: {
      user: Model,
      article: Model.extend({
        author: belongsTo('user'),
      }),
      tag: Model,
    },

    factories: {
      article: Factory.extend({
        slug: () => faker.datatype.uuid(),
        title: () => faker.lorem.sentence(),
        description: () => faker.lorem.sentence(),
        body: () => faker.lorem.paragraph(),
        createdAt: () => faker.date.past(),
        updatedAt: () => faker.date.past(),
        favorited: () => faker.datatype.boolean(),
        favoritesCount: () => faker.datatype.number(10),
        afterCreate(article, server) {
          const tags = server.db.tags.map(({ text }) => text)

          article.update({
            tagList: tags.sort(() => Math.random() - Math.random()).slice(0, faker.datatype.number(tags.length / 2)),
          })
        },
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
    },

    routes() {
      this.get('/articles', (schema, request) => {
        const { limit, offset } = request.queryParams
        const articles = schema.articles.all()

        return {
          articles: articles.models
            .slice(Number(offset), Number(limit))
            .map((article) => ({ ...article.attrs, author: article.author })),
          articlesCount: articles.length,
        }
      })

      this.get('/tags', (schema) => ({
        tags: schema.tags.all().models.map(({ attrs }) => attrs.text),
      }))
    },
  })
}

export default makeServer
