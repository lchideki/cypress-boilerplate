import Requests from './requests';

class TodoRequests {
    static baseUrl = 'https://jsonplaceholder.typicode.com';

    static getTodos() {
        return Requests.get(`${this.baseUrl}/todos`);
    }

    static getTodoById(id, options = {}) {
        return Requests.get(`${this.baseUrl}/todos/${id}`, {
            failOnStatusCode: false,
            ...options
        });
    }

    static createTodo(todoData) {
        return Requests.post(`${this.baseUrl}/todos`, todoData);
    }

    static updateTodo(id, todoData) {
        return Requests.put(`${this.baseUrl}/todos/${id}`, todoData);
    }

    static deleteTodo(id) {
        return Requests.delete(`${this.baseUrl}/todos/${id}`);
    }
}

export default TodoRequests;
