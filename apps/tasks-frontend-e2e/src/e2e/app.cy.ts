describe('HMCTS Task Manager - e2e', () => {
  it('loads tasks from the API and displays them', () => {
    const mockTasks = [
      {
        id: '1',
        publicId: 'TSK-1',
        title: 'Readme File',
        description: 'Check the technical test instructions',
        status: 'in_progress',
        dueDateTime: '2025-12-10T16:48:00.000Z',
        createdAt: '2025-12-07T16:46:00.000Z',
      },
      {
        id: '2',
        publicId: 'TSK-2',
        title: 'Create basic frontend task form',
        description: 'Implement a simple form using React hooks',
        status: 'todo',
        dueDateTime: '2025-12-20T10:00:00.000Z',
        createdAt: '2025-12-06T13:15:00.000Z',
      },
    ];

    cy.intercept('GET', '**/api/tasks', {
      statusCode: 200,
      body: { items: mockTasks },
    }).as('getTasks');

    cy.visit('/');

    cy.wait('@getTasks');

    cy.get('[data-cy="app-title"]').contains('HMCTS Task Manager');
    cy.get('[data-cy="page-title"]').contains('Caseworker tasks');

    cy.get('[data-cy="task-list"]').within(() => {
      cy.get('[data-cy="task-card"]').should('have.length', 2);
      cy.contains('Readme File').should('be.visible');
      cy.contains('Create basic frontend task form').should('be.visible');
    });
  });

  it('allows creating a new task via the form', () => {
    cy.intercept('GET', '**/api/tasks', {
      statusCode: 200,
      body: { items: [] },
    }).as('getTasks');

    const newTask = {
      id: '123',
      publicId: 'TSK-123',
      title: 'Cypress created task',
      description: 'Task created from Cypress e2e test',
      status: 'in_progress',
      dueDateTime: '2025-12-20T10:30:00.000Z',
      createdAt: '2025-12-07T12:00:00.000Z',
    };

    cy.intercept('POST', '**/api/tasks', (req) => {
      expect(req.body.title).to.eq('Cypress created task');

      req.reply({
        statusCode: 201,
        body: {
          message: 'Task created',
          task: newTask,
        },
      });
    }).as('createTask');

    cy.visit('/');

    cy.wait('@getTasks');

    cy.get('[data-cy="task-title-input"]').type('Cypress created task');
    cy.get('[data-cy="task-description-input"]').type(
      'Task created from Cypress e2e test'
    );
    cy.get('[data-cy="task-status-select"]').select('In progress');
    cy.get('[data-cy="task-due-date-input"]').type('2025-12-20');
    cy.get('[data-cy="task-due-time-input"]').type('10:30');

    cy.get('[data-cy="create-task-button"]').click();

    cy.wait('@createTask');

    cy.get('[data-cy="task-form-success"]')
      .should('be.visible')
      .and('contain', 'Task created successfully.');

    cy.get('[data-cy="task-card"]').should('have.length', 1);
    cy.get('[data-cy="task-card"]')
      .first()
      .within(() => {
        cy.contains('Cypress created task').should('be.visible');
        cy.contains('In progress').should('be.visible');
      });
  });

  it('shows validation error when required fields are missing', () => {
    cy.intercept('GET', '**/api/tasks', {
      statusCode: 200,
      body: { items: [] },
    }).as('getTasks');

    cy.visit('/');

    cy.wait('@getTasks');

    cy.get('[data-cy="create-task-button"]').click();

    cy.get('[data-cy="task-form-error"]')
      .should('be.visible')
      .and('contain', 'Title is required.');

    cy.get('[data-cy="task-list"]').should('not.exist');
    cy.get('[data-cy="task-list-empty"]').should('be.visible');
  });
});
