const connection = require('../database/connection');
// Controller methods for revenue
// Get all revenues
exports.getAllRevenues = (req, res) => {
  connection.query('SELECT * FROM revenue_details', (error, results) => {
    if (error) {
      console.error('Error querying revenues:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};

// Get revenue by RID
exports.getRevenueById = (req, res) => {
  const rid = req.params.id;
  connection.query('SELECT * FROM revenue_details WHERE RID = ?', [rid], (error, results) => {
    if (error) {
      console.error('Error querying revenue by id:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Revenue not found' });
      return;
    }
    res.json(results[0]);
  });
};

// Get Revenue by SID
exports.getRevenueBySID = (req, res) => {
  const sid = req.params.sid;
  connection.query('SELECT * FROM revenue_details WHERE SID = ?', [sid], (error, results) => {
    if (error) {
      console.error('Error querying revenue by SID:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Revenue not found' });
      return;
    }
    res.json(results);
  });
};

// Get revenue by ownerID
exports.getRevenueByOwnerID = (req, res) => {
  const ownerID = req.params.aid;
  const sqlQuery = 'SELECT * FROM revenue_details WHERE ownerID = ?';
  //console.log('SQL Query:', sqlQuery); // Log the SQL query for debugging
  connection.query(sqlQuery, [ownerID], (error, results) => {
    if (error) {
      console.error('Error querying revenue by ownerID:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Revenue not found' });
      return;
    }
    res.json(results);
  });
};

// Close the connection when the application is terminated
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});