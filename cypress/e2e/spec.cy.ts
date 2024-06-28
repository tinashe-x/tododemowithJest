describe('Tasks API', () => {
  let newTask;

  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3000/tasks', {
      body: {
        id: 1,
        title: 'New Task',
        description: 'This is a new task',
      },
    }).as('newTask');
    cy.request('POST', 'http://localhost:3000/tasks', {
      title: 'New Task',
      description: 'This is a new task',
    }).then((response) => {
      newTask = response;
    });
  });

  it('DELETE /tasks/:id deletes a task', () => {
    cy.request(`http://localhost:3000/tasks/${newTask.body.id}`).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.intercept('DELETE', `http://localhost:3000/tasks/${newTask.body.id}`, {
      status: 200,
    });
    cy.request({
      method: 'DELETE',
      url: `http://localhost:3000/tasks/${newTask.body.id}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.intercept('GET', `http://localhost:3000/tasks/${newTask.body.id}`, {
      status: 404,
    });
    cy.request({
      method: 'GET',
      url: `http://localhost:3000/tasks/${newTask.body.id}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('GET /tasks returns all tasks', () => {
    cy.intercept('GET', 'http://localhost:3000/tasks', {
      body: [
        {
          id: 1,
          title: 'New Task',
          description: 'This is a new task',
        },
      ],
    });
    cy.request('GET', 'http://localhost:3000/tasks').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length.of.at.least(1);
    });
  });

  it('GET /tasks/:id returns a single task', () => {
    cy.intercept('GET', 'http://localhost:3000/tasks/1', {
      body: {
        id: 1,
        title: 'New Task',
        description: 'This is a new task',
      },
    });
    cy.request('GET', `http://localhost:3000/tasks/${newTask.body.id}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', newTask.body.id);
      expect(response.body).to.have.property('title', 'New Task');
      expect(response.body).to.have.property('description', 'This is a new task');
    });
  });

  it('POST /tasks creates a new task', () => {
    cy.intercept('POST', 'http://localhost:3000/tasks', {
      body: {
        id: 2,
        title: 'Another New Task',
        description: 'This is another new task',
      },
    });
    cy.request('POST', 'http://localhost:3000/tasks', {
      title: 'Another New Task',
      description: 'This is another new task',
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('title', 'Another New Task');
      expect(response.body).to.have.property('description', 'This is another new task');
    });
  });

  it('PUT /tasks/:id updates a task', () => {
    cy.intercept('PUT', 'http://localhost:3000/tasks/1', {
      body: {
        id: 1,
        title: 'Updated Task',
        description: 'This is an updated task',
      },
    });
    const updatedTask = {...newTask.body, title: 'Updated Task' };
    cy.request('PUT', `http://localhost:3000/tasks/${newTask.body.id}`, updatedTask).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.request('GET', `http://localhost:3000/tasks/${newTask.body.id}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq(updatedTask.title);
    });
  });
});

