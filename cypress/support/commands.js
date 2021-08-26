// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands'
import faker from 'faker'
import { Author } from '../../src/models'

Cypress.Commands.add('login', (email = 'test@test.com') => {
  cy.window().then((window) => {
    window.localStorage.setItem(
      'jwt',
      JSON.stringify(
        new Author({
          email,
          username: 'test-user-1',
          bio: faker.lorem.paragraph(),
          image: faker.image.avatar(),
        })
      )
    )
  })
})
