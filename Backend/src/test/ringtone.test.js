const request = require('supertest');
const app = require('../../server'); // Update the path to match your server file
const connection = require('../database/connection');

// Mock database query function
jest.mock('../database/connection', () => ({
  query: jest.fn(),
  beginTransaction: jest.fn(),
  commit: jest.fn(),
  rollback: jest.fn(),
}));

describe('Test Ringtone Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  it('should get all ringtones successfully', async () => {
    const mockResults = [{ RTID: 1, SID: 1, Mobitel: 10, Dialog: 11, Hutch: 12, Airtel: 13 }, { RTID: 2, SID: 2, Mobitel: 20, Dialog: 21, Hutch: 22, Airtel: 23 }];
    connection.query.mockImplementation((sql, callback) => {
      callback(null, mockResults); // Simulate successful query execution
    });

    const response = await request(app).get('/ringtones');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResults);
  });

  it('should handle errors when getting all ringtones', async () => {
    const errorMessage = 'Internal server error';
    connection.query.mockImplementation((sql, callback) => {
      callback(new Error(errorMessage)); // Simulate error during query execution
    });

    const response = await request(app).get('/ringtones');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(errorMessage);
  });

  it('should delete a ringtone successfully', async () => {
    const mockId = 1;
    connection.query.mockImplementation((sql, values, callback) => {
      callback(null, { affectedRows: 1 }); // Simulate successful deletion
    });

    const response = await request(app).delete(`/ringtones/${mockId}`);

    expect(response.status).toBe(204);
  });
/*
  it('should handle errors when deleting a ringtone', async () => {
    const mockId = 1;
    const errorMessage = 'Internal server error';
    connection.query.mockImplementation((sql, values, callback) => {
      callback(new Error(errorMessage)); // Simulate error during deletion
    });

    const response = await request(app).delete(`/ringtones/${mockId}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(errorMessage);
  });
*/
  it('should get a ringtone by ID successfully', async () => {
    const mockId = 1;
    const mockRingtone = { id: mockId, name: 'Ringtone 1' };
    connection.query.mockImplementation((sql, values, callback) => {
      callback(null, [mockRingtone]); // Simulate successful query execution
    });

    const response = await request(app).get(`/ringtones/${mockId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRingtone);
  });
/*
  it('should handle errors when getting a ringtone by ID', async () => {
    const mockId = 1;
    const errorMessage = 'Internal server error';
    connection.query.mockImplementation((sql, values, callback) => {
      callback(new Error(errorMessage)); // Simulate error during query execution
    });

    const response = await request(app).get(`/ringtones/${mockId}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(errorMessage);
  });
*/
  it('should create a ringtone successfully', async () => {
    const mockRingtoneData = { SID: 1, Mobitel: 'MobitelID', Dialog: 'DialogID', Hutch: 'HutchID', Airtel: 'AirtelID' };
    connection.query.mockImplementation((sql, values, callback) => {
      callback(null, { insertId: 1 }); // Simulate successful ringtone creation
    });

    const response = await request(app)
      .post('/ringtones')
      .send(mockRingtoneData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(mockRingtoneData);
  });

  it('should handle errors when creating a ringtone', async () => {
    const mockRingtoneData = { SID: 1, Mobitel: 'MobitelID', Dialog: 'DialogID', Hutch: 'HutchID', Airtel: 'AirtelID' };
    const errorMessage = 'Internal server error';
    connection.query.mockImplementation((sql, values, callback) => {
      callback(new Error(errorMessage)); // Simulate error during ringtone creation
    });

    const response = await request(app)
      .post('/ringtones')
      .send(mockRingtoneData);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(errorMessage);
  });

  it('should update a ringtone successfully', async () => {
    const mockId = 1;
    const mockRingtoneData = { Mobitel: 'NewMobitelID', Dialog: 'NewDialogID', Hutch: 'NewHutchID', Airtel: 'NewAirtelID' };
    connection.query.mockImplementation((sql, values, callback) => {
      callback(null); // Simulate successful ringtone update
    });

    const response = await request(app)
      .put(`/ringtones/${mockId}`)
      .send(mockRingtoneData);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ RTID: mockId, ...mockRingtoneData });
  });
/*
  it('should handle errors when updating a ringtone', async () => {
    const mockId = 1;
    const mockRingtoneData = { Mobitel: 'NewMobitelID', Dialog: 'NewDialogID', Hutch: 'NewHutchID', Airtel: 'NewAirtelID' };
    const errorMessage = 'Internal server error';
    connection.query.mockImplementation((sql, values, callback) => {
      callback(new Error(errorMessage)); // Simulate error during ringtone update
    });

    const response = await request(app)
      .put(`/ringtones/${mockId}`)
      .send(mockRingtoneData);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(errorMessage);
  });
  */
});
