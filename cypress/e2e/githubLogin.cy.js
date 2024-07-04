describe('GitHub Login Automation', () => {
  it('should successfully log into GitHub', () => {
    cy.visit('https://github.com/login');
    
    // Enter username
    cy.get('#login_field').type('username');
    
    // Wait for the password field to be enabled and enter password
    cy.get('#password').should('not.be.disabled').type('password', { force: true });
    
    // Click login button
    cy.get('input[type="submit"]').click();
    
    // Verify successful login
    cy.url().should('include', '/');
    
  });
  
  it('should handle incorrect username or password', () => {
    cy.visit('https://github.com/login');
    
    // Enter incorrect username
    cy.get('#login_field').type('incorrect_username');
    
    // Wait for the password field to be enabled and enter incorrect password
    cy.get('#password').should('not.be.disabled').type('incorrect_password', { force: true });
    
    // Click login button
    cy.get('input[type="submit"]').click();
    
    // Verify error message
    cy.get('#js-flash-container').should('contain', 'Incorrect username or password.');
  });
  
  it('should handle account locked scenario', () => {
    cy.visit('https://github.com/login');
    
    // Simulate multiple failed login attempts
    for (let i = 0; i < 5; i++) {
      cy.get('#login_field').type('your_username');
      
      // Wait for the password field to be enabled and enter incorrect password
      cy.get('#password').should('not.be.disabled').type('incorrect_password', { force: true });
      
      // Click login button
      cy.get('input[type="submit"]').click();
      cy.get('#login_field').clear();
      cy.get('#password').clear();
    }
    
    // Verify account locked message
    cy.get('#js-flash-container').should('contain', 'Your account has been locked.');
  });
});
