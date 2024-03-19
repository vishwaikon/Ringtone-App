//import database connection from '../database/connection';
const connection = require('../database/connection');
// Controller methods
// Get all Service Providers
exports.getAllServiceProviders = (req, res) => {
  connection.query('SELECT * FROM service_provider_details', (error, results) => {
    if (error) {
      console.error('Error querying service providers:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};
/*
// Create Service Provider
exports.createServiceProvider = (req, res) => {
  const { service_provider, ownerID, active, description } = req.body;
  connection.query('INSERT INTO service_provider_details (service_provider, ownerID, active, description) VALUES (?, ?, ?, ?)', [service_provider, ownerID, active, description], (error, results) => {
    if (error) {
      console.error('Error creating service provider:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.status(201).json({ SPID: results.insertId, service_provider, ownerID, active, description }); // Return the SPID of the newly created service provider
  });
};
*/
// Get Service Provider by ID
exports.getServiceProviderById = (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM service_provider_details WHERE ID = ?', [id], (error, results) => {
    if (error) {
      console.error('Error querying service provider by id:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Service provider not found' });
      return;
    }
    res.json(results[0]);
  });
};
//Commented because this process will be automatically done through the ringingtones controller.
/*
// Update Service Provider
exports.updateServiceProvider = (req, res) => {
  const SPID = req.params.id;
  const { service_provider, ownerID, active, description } = req.body;
  connection.query('UPDATE service_provider_details SET service_provider = ?, ownerID = ?, active = ?, description = ? WHERE SPID = ?', [service_provider, ownerID, active, description, SPID], (error, results) => {
    if (error) {
      console.error('Error updating service provider:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Service provider not found' });
      return;
    }
    res.status(200).json({ SPID, service_provider, ownerID, active, description });
  });
};
*/
// Delete Service Provider
exports.deleteServiceProvider = (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM service_provider_details WHERE ID = ?', [id], (error, results) => {
    if (error) {
      console.error('Error deleting service provider:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Service provider not found' });
      return;
    }
    res.status(204).end(); // No content to send back
  });
};
// Close the connection when the application is terminated
process.on('SIGINT', () => {
    connection.end();
    process.exit();
  });