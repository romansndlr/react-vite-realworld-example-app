import makeServer from '../../src/server'

/** @type {import('miragejs').Server} */
let server

beforeEach(() => {
  server = makeServer({ environment: 'test' })
})

afterEach(() => {
  server.shutdown()
})

it('should render a list of articles', () => {})

it('should filter the list of articles by tag', () => {})

it('should move between pages', () => {})
