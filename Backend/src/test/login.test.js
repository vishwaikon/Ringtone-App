const request = require('supertest');
const app = require('../../server'); // Update the path to match your server file
const connection = require('../database/connection');

// Mock database query function
jest.mock('../database/connection', () => ({
  query: jest.fn()
}));

describe('Test logout API endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  it('should logout user successfully', async () => {
    const userId = 1; // Assuming user ID is 1 for testing
    // Mock database query for user logout
    connection.query.mockImplementation((sql, values, callback) => {
      callback(null); // Simulate successful query execution
    });

    const response = await request(app)
      .post(`/user/logout/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logout successful.');
  });

  it('should logout admin successfully', async () => {
    const adminEmail = 'admin@example.com'; // Assuming admin email for testing
    // Mock database query for admin logout
    connection.query.mockImplementation((sql, values, callback) => {
      callback(null); // Simulate successful query execution
    });

    const response = await request(app)
      .post(`/admin/logout/${adminEmail}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logout successful.');
  });

  it('should handle errors during user logout', async () => {
    const userId = 1; // Assuming user ID is 1 for testing
    const errorMessage = 'Internal server error';
    // Mock database query for user logout with error
    connection.query.mockImplementation((sql, values, callback) => {
      callback(new Error(errorMessage)); // Simulate error during query execution
    });

    const response = await request(app)
      .post(`/user/logout/${userId}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(errorMessage);
  });

  it('should handle errors during admin logout', async () => {
    const adminEmail = 'admin@example.com'; // Assuming admin email for testing
    const errorMessage = 'Internal server error';
    // Mock database query for admin logout with error
    connection.query.mockImplementation((sql, values, callback) => {
      callback(new Error(errorMessage)); // Simulate error during query execution
    });

    const response = await request(app)
      .post(`/admin/logout/${adminEmail}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(errorMessage);
  });
});
