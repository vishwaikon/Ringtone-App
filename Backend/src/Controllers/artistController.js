//import database connection from '../database/connection';
const bcrypt = require('bcrypt');
const connection = require('../database/connection');

// Controller methods
// Get all Artists
exports.getAllArtists = (req, res) => {
    connection.query('SELECT *, DATE_FORMAT(createdDate, "%Y-%m-%d") AS createdDate FROM artist_details', (error, results) => {
      if (error) {
        console.error('Error querying artists:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  };
// Get Artist by AID
exports.getArtistById = (req, res) => {
  const AID = req.params.id;
  connection.query('SELECT *, DATE_FORMAT(createdDate, "%Y-%m-%d") AS createdDate FROM artist_details WHERE AID = ?', [AID], (error, results) => {
    if (error) {
      console.error('Error querying artist by AID:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Artist not found' });
      return;
    }
    res.json(results[0]);
  });
};
///////////////////////////////////
// Create Artist
exports.createArtist = (req, res) => {
  const { firstName, lastName, phone, email, password, createdBy } = req.body;

  // Validate input data
  if (!firstName || !lastName || !phone || !email || !password || !createdBy) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  // Validate email format
  if (!isValidEmail(email)) {
    res.status(400).json({ message: 'Invalid email format' });
    return;
  }

  // Validate phone format
  const phoneRegex = /^\+\d{1,3}\d{9,}$/; // Updated regex for country code (1-3 digits) and phone number (at least 9 digits)
  if (!phoneRegex.test(phone)) {
    res.status(400).json({ message: 'Invalid phone format. Please enter the country code followed by a valid phone number' });
    return;
  }

  // Check if email already exists
  connection.query('SELECT COUNT(*) AS emailCount FROM artist_details WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const emailCount = results[0].emailCount;
    if (emailCount > 0) {
      res.status(400).json({ message: 'Email already exists. Please enter a different email address' });
      return;
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      // Insert the artist with hashed password and current date
      connection.query('INSERT INTO artist_details (firstName, lastName, phone, email, password, createdBy, createdDate) VALUES (?, ?, ?, ?, ?, ?, CURDATE())',
        [firstName, lastName, phone, email, hashedPassword, createdBy],
        (error, results) => {
          if (error) {
            console.error('Error creating artist:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
          }
          res.status(201).json({ AID: results.insertId, firstName, lastName, phone, email, createdBy, createdDate: new Date().toISOString().split('T')[0] });
        });
    });
  });
};
// Update Artist
exports.updateArtist = (req, res) => {
  const AID = req.params.id;
  const { firstName, lastName, phone, email, password, createdBy } = req.body;
  // Format the phone number to remove the comma
  const formattedPhone = phone.replace(',', '');

  // Validate input data
  if (!firstName || !lastName || !formattedPhone || !email || !password || !createdBy) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  // Validate email format
  if (!isValidEmail(email)) {
    res.status(400).json({ message: 'Invalid email format' });
    return;
  }

  // Validate phone format
  const phoneRegex = /^\+\d{1,3}\d{9,}$/; // Regex for country code (1-3 digits) and phone number (at least 9 digits)
  if (!phoneRegex.test(formattedPhone)) {
    res.status(400).json({ message: 'Invalid phone format. Please enter the country code followed by a valid phone number' });
    return;
  }

  // Check if the new email already exists
  connection.query('SELECT COUNT(*) AS emailCount FROM artist_details WHERE email = ? AND AID != ?', [email, AID], (error, results) => {
    if (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const emailCount = results[0].emailCount;
    if (emailCount > 0) {
      res.status(400).json({ message: 'Email already exists. Please enter a different email address' });
      return;
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      // Update the artist with hashed password and current date
      connection.query('UPDATE artist_details SET firstName = ?, lastName = ?, phone = ?, email = ?, password = ?, createdBy = ?, createdDate = CURDATE() WHERE AID = ?',
        [firstName, lastName, formattedPhone, email, hashedPassword, createdBy, AID],
        (error, results) => {
          if (error) {
            console.error('Error updating artist:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
          }
          if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Artist not found' });
            return;
          }
          res.status(200).json({ AID, firstName, lastName, phone: formattedPhone, email, createdBy, createdDate: new Date().toISOString().split('T')[0] });
        });
    });
  });
};

// Delete Artist
exports.deleteArtist = (req, res) => {
  const aid = req.params.id;
  connection.query('DELETE FROM artist_details WHERE AID = ?', [aid], (error, results) => {
    if (error) {
      console.error('Error deleting artist:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Artist not found' });
      return;
    }
    res.status(204).end(); // No content to send back
  });
};

// Function to validate email format
function isValidEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
// Close the connection when the application is terminated
process.on('SIGINT', () => {
    connection.end();
    process.exit();
  });