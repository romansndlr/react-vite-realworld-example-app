import makeServer from '../../src/server'

/** @type {import('miragejs').Server} */
let server

beforeEach(() => {
  server = makeServer({ environment: 'test' })
})

afterEach(() => {
  server.shutdown()
})

it('Should show the global feed', () => {
  // ─── ARRANGE ─────────────────────────────────────────────────────
  const user = server.create('user')
  const article = server.create('article', { author: user })

  // ─── ACT ─────────────────────────────────────────────────────────
  cy.visit('/')

  // ─── ASSERT ──────────────────────────────────────────────────────
  cy.findByRole('heading', { name: article.title }).should('exist')
  cy.findByText(article.body).should('exist')
})
