describe('Test login', () => {
  it('sucessfully loads', () => {
    cy.visit('http://localhost:5173/')
  })

  it('check for protected routes', () => {
    cy.visit('http://localhost:5173/rooms')
    cy.url().should('include', '/login')
  })

  it('sucessfully redirects to login', () => {
    cy.visit('http://localhost:5173/')
    cy.url().should('include', '/login')
  })

  it('can type in the inputs properly', () => {
    cy.visit('http://localhost:5173/login')
    const username = 'potato';
    const password = 'potato';

    cy.get('input[data-cy=username]').type(username)
    cy.get('input[data-cy=password]').type(`${password}`)
  })

  it('test for invalid user', () => {
    cy.visit('http://localhost:5173/login')
    const username = 'potateishion';
    const password = 'potato';

    cy.get('input[data-cy=username]').type(username)
    cy.get('input[data-cy=password]').type(`${password}`)
    cy.get('input[data-cy=password]').type(`{enter}`);

    cy.get('p[data-cy=error]').should('contain', 'User not found');
  })

  it('test for invalid password', () => {
    cy.visit('http://localhost:5173/login')
    const username = 'admin';
    const password = 'potato123';

    cy.get('input[data-cy=username]').type(username)
    cy.get('input[data-cy=password]').type(`${password}`)
    cy.get('input[data-cy=password]').type(`{enter}`);

    cy.get('p[data-cy=error]').should('contain', 'Password is incorrect');
  })

  it('test for valid login', () => {
    cy.visit('http://localhost:5173/login')
    const username = 'admin';
    const password = 'admin';

    cy.get('input[data-cy=username]').type(username);
    cy.get('input[data-cy=password]').type(`${password}`);
    cy.get('input[data-cy=password]').type(`{enter}`);


    cy.url().should('equal', 'http://localhost:5173/');
    cy.get('p[data-cy=userfullname]').should('contain', 'Juana Dietrich');
  })

  it('test for valid login and protected route', () => {
    cy.visit('http://localhost:5173/login')
    const username = 'admin';
    const password = 'admin';

    cy.get('input[data-cy=username]').type(username);
    cy.get('input[data-cy=password]').type(`${password}`);
    cy.get('input[data-cy=password]').type(`{enter}`);

    cy.url().should('equal', 'http://localhost:5173/');
    cy.get('p[data-cy=userfullname]').should('contain', 'Juana Dietrich');

    cy.visit('http://localhost:5173/rooms')
    cy.url().should('equal', 'http://localhost:5173/rooms');
    cy.get('p[data-cy=userfullname]').should('contain', 'Juana Dietrich');
  })
})