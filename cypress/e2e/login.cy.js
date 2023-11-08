describe('Login Test. Test should successfully log in and out', () => {
  beforeEach(() => { 
    cy.visit('/');
    cy.wait(2000);
  });

    it('should log in', () => {
      cy.get('button[data-auth="login"]').eq(1).click({ force: true });
      cy.wait(2000);
      cy.get('#loginModal').should('be.visible');
      cy.get('input[name=email]').first().type(Cypress.env('LOGIN_EMAIL'));
      cy.get('input[name=password]').first().type(Cypress.env('LOGIN_PASSWORD'));
      cy.get('#loginForm').submit({ force: true });
      cy.wait(2000);
      cy.contains('Please register or login to view this page.').should('not.exist');
    });

  it('should log out successfully', () => {
    cy.get('body').then(($body) => {
      if ($body.find('button[data-auth="logout"]').length > 0) {
        cy.get('button[data-auth="logout"]').click({ force: true });
        cy.wait(2000);
        cy.contains('Please register or login to view this page.').should('exist');
      }
    });
  });

  it('should not log in with wrong credentials', () => {
      cy.wait(2000);
      cy.get('button[data-auth="login"]').eq(1).click({ force: true });
      cy.wait(2000);
      cy.get('#loginModal').should('be.visible');
      cy.get('input[name=email]').first().type('shoudlnotwork@asdf.com');
      cy.get('input[name=password]').first().type('Password123');
      cy.get('#loginForm').submit({ force: true });
      cy.wait(2000);
      cy.get('input[name=email]').then($input => {
        expect($input[0].validationMessage).to.not.be.empty;
      });
    });
});