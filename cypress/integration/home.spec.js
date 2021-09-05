import makeServer from '../../src/server'

/** @type {import('miragejs').Server} */
let server

beforeEach(() => {
  server = makeServer({ environment: 'test' })
})

afterEach(() => {
  server.shutdown()
})

it('should render a list of articles', () => {
  /* ARRANGE */
  const user = server.create('user')
  const article1 = server.create('article', { author: user })
  const article2 = server.create('article', { author: user })
  const article3 = server.create('article', { author: user })

  /* ACT */
  cy.visit('/')

  /* ASSERT */
  cy.findByRole('heading', { name: article1.title }).should('exist')
  cy.findByRole('heading', { name: article2.title }).should('exist')
  cy.findByRole('heading', { name: article3.title }).should('exist')
  cy.findByText(article1.body).should('exist')
  cy.findByText(article2.body).should('exist')
  cy.findByText(article3.body).should('exist')
})

it.only('should filter the list of articles by tag', () => {
  /* ARRANGE */
  const user = server.create('user')
  const tag = server.create('tag')
  const article1 = server.create('article', { author: user })
  const article2 = server.create('article', { author: user })
  const article3 = server.create('article', { author: user })
  article1.update({ tagsList: [tag.text] })
  article2.update({ tagsList: [] })
  article3.update({ tagsList: [] })

  /* ACT */
  cy.visit('/')
  cy.findByTestId('popular-tags').within(() => {
    cy.findByRole('link', { name: tag.text }).click()
  })

  /* ASSERT */
  cy.findByRole('heading', { name: article1.title }).should('exist')
  cy.findByRole('heading', { name: article2.title }).should('not.exist')
  cy.findByRole('heading', { name: article3.title }).should('not.exist')
})

it('should move between pages', () => {})
