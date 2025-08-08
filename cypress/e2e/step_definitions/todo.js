const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
import TodoRequests from '../../support/requests/todoRequests';
const { schemaValidator } = require('../../support/schema-validator');

let response;
let todoData;

// Given steps
Given('I have a todo item with ID {string}', (id) => {
    cy.wrap(id).as('todoId');
});

Given('I want to list todo items', () => {
    // Nothing to do here, just setting context
});

Given('I have the following todo data:', (dataTable) => {
    todoData = dataTable.hashes()[0];
    cy.wrap(todoData).as('todoData');
});

Given('I have the following update data:', (dataTable) => {
    todoData = dataTable.hashes()[0];
    cy.wrap(todoData).as('updateData');
});

// When steps
When('I request to get the todo item', function() {
    cy.get('@todoId').then(todoId => {
        TodoRequests.getTodoById(todoId).then(res => {
            response = res;
            cy.wrap(response).as('response');
        });
    });
});

When('I request the todo list', () => {
    TodoRequests.getTodos().then(res => {
        response = res;
        cy.wrap(response).as('response');
    });
});

When('I send a request to create the todo', () => {
    cy.get('@todoData').then(todoData => {
        TodoRequests.createTodo({
            title: todoData.title,
            completed: todoData.completed === 'true',
            userId: 1 // valor padrão para o JsonPlaceholder
        }).then(res => {
            response = res;
            cy.wrap(response).as('response');
        });
    });
});

When('I send a request to update the todo', () => {
    cy.get('@todoId').then(todoId => {
        cy.get('@updateData').then(updateData => {
            TodoRequests.updateTodo(todoId, {
                title: updateData.title,
                completed: updateData.completed === 'true',
                userId: 1 // valor padrão para o JsonPlaceholder
            }).then(res => {
                response = res;
                cy.wrap(response).as('response');
            });
        });
    });
});

// Then steps
Then('the response status code should be {int}', (statusCode) => {
    expect(response.status).to.equal(statusCode);
});

Then('the response should match {string} schema', (schemaName) => {
    const { schemaValidator } = require('../../support/schema-validator');
    schemaValidator.validate(response.body, schemaName);
});

Then('the todo item should have a title', () => {
    expect(response.body).to.have.property('title').and.not.be.empty;
});

Then('the todo list should not be empty', () => {
    expect(response.body).to.be.an('array').and.not.be.empty;
});

Then('the response body should be empty', () => {
    expect(response.body).to.be.empty;
});

Then('the todo item should have the provided title', () => {
    cy.get('@todoData').then(todoData => {
        expect(response.body).to.have.property('title', todoData.title);
    });
});

Then('the todo item should be marked as completed', () => {
    expect(response.body).to.have.property('completed', true);
});
