// Core request functions for API calls
class Requests {
  static get(endpoint, params = {}) {
    return cy.request({
      method: 'GET',
      url: endpoint,
      headers: this.getHeaders(),
      failOnStatusCode: false,  // Permite status codes de erro
      ...params
    });
  }

  static post(endpoint, body = {}, params = {}) {
    return cy.request({
      method: 'POST',
      url: endpoint,
      headers: this.getHeaders(),
      body,
      ...params
    });
  }

  static put(endpoint, body = {}, params = {}) {
    return cy.request({
      method: 'PUT',
      url: endpoint,
      headers: this.getHeaders(),
      body,
      ...params
    });
  }

  static delete(endpoint, params = {}) {
    return cy.request({
      method: 'DELETE',
      url: endpoint,
      headers: this.getHeaders(),
      ...params
    });
  }

  static patch(endpoint, body = {}, params = {}) {
    return cy.request({
      method: 'PATCH',
      url: endpoint,
      headers: this.getHeaders(),
      body,
      ...params
    });
  }

  static getHeaders() {
    // Centraliza a gestão de headers
    return {
      'Content-Type': 'application/json',
      'Authorization': Cypress.env('token') || ''
    };
  }
}

export default Requests;
