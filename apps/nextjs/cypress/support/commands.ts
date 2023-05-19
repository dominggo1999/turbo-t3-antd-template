/// <reference types="cypress" />

import "@testing-library/cypress/add-commands";

Cypress.Commands.add("getByDataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});

declare global {
  namespace Cypress {
    interface Chainable {
      getByDataCy(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
