Feature: Todo API Operations
  As an API client
  I want to manage todo items
  So that I can keep track of tasks

  @smoke @get
  Scenario: Successfully retrieve a todo item
    Given I have a todo item with ID "1"
    When I request to get the todo item
    Then the response status code should be 200
    And the response should match "todoItem" schema
    And the todo item should have a title

  @regression @list
  Scenario: List all todo items with pagination
    Given I want to list todo items
    When I request the todo list
    Then the response status code should be 200
    And the response should match "todoList" schema
    And the todo list should not be empty

  @negative @get
  Scenario: Attempt to get non-existent todo
    Given I have a todo item with ID "999999"
    When I request to get the todo item
    Then the response status code should be 404
    And the response body should be empty

  @smoke @create
  Scenario: Create a new todo item
    Given I have the following todo data:
      | title     | completed |
      | New Task  | false     |
    When I send a request to create the todo
    Then the response status code should be 201
    And the response should match "todoItem" schema
    And the todo item should have the provided title

  @regression @update
  Scenario: Update an existing todo item
    Given I have a todo item with ID "1"
    And I have the following update data:
      | title           | completed |
      | Updated Task    | true      |
    When I send a request to update the todo
    Then the response status code should be 200
    And the response should match "todoItem" schema
    And the todo item should be marked as completed
