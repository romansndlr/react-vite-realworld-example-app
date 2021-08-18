import makeServer from '../../src/server'

/** @type {import('miragejs').Server} */
let server

beforeEach(() => {
  server = makeServer({ environment: 'test' })
})

afterEach(() => {
  server.shutdown()
})

it('Should show the list of articles', () => {
  // ─── ARRANGE ─────────────────────────────────────────────────────
  let articles = []
  const users = server.createList('user', 2)
  users.forEach((user) => {
    server.createList('article', 2, { author: user }).forEach((article) => {
      articles.push(article)
    })
  })
  articles = Cypress._.orderBy(articles, ['createdAt'], ['desc'])

  // ─── ACT ─────────────────────────────────────────────────────────
  cy.visit('/')

  // ─── ASSERT ──────────────────────────────────────────────────────
  cy.findAllByTestId('article-preview')
    .should('have.length', 4)
    .each(($el, index) => {
      const article = articles[index]
      cy.wrap($el).within(() => {
        cy.findByRole('heading', { name: article.title }).should('exist')
        cy.findByText(article.body).should('exist')
        cy.findByRole('link', { name: article.author.username }).should(
          'have.attr',
          'href',
          `/profiles/${article.author.username}`
        )
        cy.findByTestId('article-date').should('have.text', article.createdAt.toDateString())
        cy.findByRole('img').should('have.attr', 'src', article.author.image)
      })
    })
})

it('should show articles related to selected tag', () => {
  // ─── ARRANGE ─────────────────────────────────────────────────────
  let articles = []
  const users = server.createList('user', 2)
  const tag = server.create('tag')
  users.forEach((user) => {
    server.createList('article', 2, { author: user }).forEach((article) => {
      articles.push(article)
    })
  })
  articles = Cypress._.orderBy(articles, ['createdAt'], ['desc'])

  // ─── ACT ─────────────────────────────────────────────────────────
  cy.visit('/')

  // ─── ASSERT ──────────────────────────────────────────────────────
  cy.findByTestId('popular-tags').within(() => {
    cy.findByRole('link', { name: tag.text }).click()
  })

  cy.findByTestId('feed-toggle').within(() => {
    cy.findByRole('button', { name: `# ${tag.text}` }).should('exist')
  })
})

describe('Guest', () => {
  it('shouldn\'t show "Your Feed"', () => {
    // ─── ARRANGE ─────────────────────────────────────────────────────

    // ─── ACT ─────────────────────────────────────────────────────────
    cy.visit('/')

    // ─── ASSERT ──────────────────────────────────────────────────────
    cy.findByTestId('feed-toggle').within(() => {
      cy.findByRole('button', { name: /Your Feed/i }).should('not.exist')
      cy.findByRole('button', { name: /Global Feed/i }).should('exist')
    })
  })

  it('should show guest links in navbar', () => {
    // ─── ARRANGE ─────────────────────────────────────────────────────

    // ─── ACT ─────────────────────────────────────────────────────────
    cy.visit('/')

    // ─── ASSERT ──────────────────────────────────────────────────────
    cy.findByTestId('navbar').within(() => {
      cy.findByRole('link', { name: /Sign up/i }).should('exist')
      cy.findByRole('link', { name: /Sign in/i }).should('exist')
      cy.findByRole('link', { name: /Home/i }).should('exist')
    })
  })
})

describe('Auth', () => {
  it('should show "Your Feed"', () => {
    // ─── ARRANGE ─────────────────────────────────────────────────────
    cy.login()

    // ─── ACT ─────────────────────────────────────────────────────────
    cy.visit('/')

    // ─── ASSERT ──────────────────────────────────────────────────────
    cy.findByTestId('feed-toggle').within(() => {
      cy.findByRole('button', { name: /Your Feed/i }).should('exist')
      cy.findByRole('button', { name: /Global Feed/i }).should('exist')
    })
  })

  it('should show auth links in navbar', () => {
    // ─── ARRANGE ─────────────────────────────────────────────────────
    cy.login()

    // ─── ACT ─────────────────────────────────────────────────────────
    cy.visit('/')

    // ─── ASSERT ──────────────────────────────────────────────────────
    cy.findByTestId('navbar').within(() => {
      cy.findByRole('link', { name: /New Post/i }).should('exist')
      cy.findByRole('link', { name: /Settings/i }).should('exist')
      cy.findByRole('link', { name: /test-user-1/i }).should('exist')
    })
  })

  it('should allow an auth user to favorite an article', () => {
    // ─── ARRANGE ─────────────────────────────────────────────────────
    const user = server.create('user', { following: true })
    server.create('article', { author: user })
    cy.login()

    // ─── ACT ─────────────────────────────────────────────────────────
    cy.visit('/')

    cy.findByTestId('article-meta')
      .as('articleMeta')
      .within(() => {
        cy.findByTestId('favorites-count').should('have.text', '0')

        cy.findByRole('button', { name: /Favorite article/i }).click()
      })

    // ─── ASSERT ──────────────────────────────────────────────────────
    cy.get('@articleMeta').within(() => {
      cy.findByTestId('favorites-count').should('have.text', '1')
    })
  })
})
