describe('Login Test', () => {
  beforeEach(() => { 
    cy.visit('/');
  });

    it('should log in', () => {
      cy.visit('/');
      cy.get('button[data-auth="login"]').eq(1).click();
      cy.get('#loginModal').should('be.visible');

      cy.get('input[name=email]').first().type(Cypress.env('LOGIN_EMAIL'));
    cy.get('input[name=password]').first().type(Cypress.env('LOGIN_PASSWORD'));
    cy.get('#loginForm').submit();
  });

afterEach (() =>  {
  cy.get('body').then(($body) => {
    if ($body.find('button[data-auth="logout"]').length > 0) {
      cy.get('button[data-auth="logout"]').click();
    }
  });
});
});

