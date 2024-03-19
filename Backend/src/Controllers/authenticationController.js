// Importing required packages and modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../database/connection');

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign({ AID: user.AID, email: user.email }, "JWT_SECRET_KEY", { expiresIn: '1d' });
}
// Login user
exports.login = (req, res) => {
  const { email, password } = req.body;
  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  
  // Check if the user is an admin
  connection.query('SELECT * FROM admin_details WHERE email = ?', [email], (adminError, adminResults) => {
    if (adminError) {
      console.error('Error querying admin:', adminError);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // If admin found, verify password without hashing
    if (adminResults.length > 0) {
      if (password !== adminResults[0].password) {
        return res.status(401).json({ message: 'Incorrect password.' });
      }

      // Generate JWT token for admin
      const token = generateToken(adminResults[0]);
      
      // Update token, lastLogin, and active status for admin
      const { adminID } = adminResults[0];
      const lastLogin = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS
      connection.query('UPDATE admin_details SET token = ?, lastLogin = ?, active = 1 WHERE adminID = ?',
        [token, lastLogin, adminID],
        (updateError) => {
          if (updateError) {
            console.error('Error updating admin details:', updateError);
            return res.status(500).json({ message: 'Internal server error' });
          }
          // Return token and user information along with user type
          res.status(200).json({ token, user: { adminID, email }, userType: 'admin' });
        });
    } else {
      // If not an admin, check if the user exists in artist_details table
      connection.query('SELECT * FROM artist_details WHERE email = ?', [email], (userError, userResults) => {
        if (userError) {
          console.error('Error querying user:', userError);
          return res.status(500).json({ message: 'Internal server error' });
        }
        // Check if user exists
        if (userResults.length === 0) {
          return res.status(404).json({ message: 'User not found.' });
        }
        // Verify password
        bcrypt.compare(password, userResults[0].password, (bcryptError, result) => {
          if (bcryptError || !result) {
            return res.status(401).json({ message: 'Incorrect password.' });
          }
          // Generate JWT token for regular user
          const token = generateToken(userResults[0]);
          // Update token and lastLogin for regular user
          const { AID } = userResults[0];
          const lastLogin = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS
          const loginTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS
          // Check if ownerID exists in authentication_details table
          connection.query('SELECT * FROM authentication_details WHERE AID = ?', [AID], (authError, authResults) => {
            if (authError) {
              console.error('Error querying authentication details:', authError);
              return res.status(500).json({ message: 'Internal server error' });
            }
            if (authResults.length === 0) {
              // Insert new authentication details if ownerID does not exist
              connection.query('INSERT INTO authentication_details (AID, email, password, active, token, lastLogin) VALUES (?, ?, ?, 1, ?, ?)',
                [AID, email, userResults[0].password, token, loginTime],
                (insertError) => {
                  if (insertError) {
                    console.error('Error inserting authentication details:', insertError);
                    return res.status(500).json({ message: 'Internal server error' });
                  }
                  // Return token and user information along with user type
                  res.status(200).json({ token, user: { AID, email }, userType: 'user' });
                });
            } else {
              // Update authentication details if ownerID exists
              connection.query('UPDATE authentication_details SET token = ?, lastLogin = ?, active = 1 WHERE AID = ?',
                [token, lastLogin, AID],
                (updateError) => {
                  if (updateError) {
                    console.error('Error updating authentication details:', updateError);
                    return res.status(500).json({ message: 'Internal server error' });
                  }
                  // Return token and user information along with user type
                  res.status(200).json({ token, user: { AID, email }, userType: 'user' });
                });
            }
          });
        });
      });
    }
  });
};

// user logout
exports.userLogout = (req, res) => {
  const userId = req.params.id;
  // Update the active status to 0 for the user
  connection.query('UPDATE authentication_details SET active = 0 WHERE AID = ?', [userId], (error) => {
    if (error) {
      console.error('Error updating user details:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    // User logged out successfully
    res.status(200).json({ message: 'Logout successful.' });
  });
};
// Admin logout
exports.adminLogout = (req, res) => {
  const adminEmail = req.params.email;
  // Update the active status to 0 for the admin
  connection.query('UPDATE admin_details SET active = 0 WHERE email = ?', [adminEmail], (error) => {
    if (error) {
      console.error('Error updating user details:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    // User logged out successfully
    res.status(200).json({ message: 'Logout successful.' });
  });
};
/*
// Logout user
exports.logout = (req, res) => {
  const userId = req.user.AID; // Extracted from JWT token
  const adminEmail = req.user.email;
  console.log(userId);
  console.log(adminEmail);
  // Determine the table name based on the endpoint
  const endpoint = req.url; // Get the endpoint URL
  let tableName;

  // Determine the table name based on the endpoint
  if (endpoint.includes('admin')) {
    tableName = 'admin_details';
  } else if (endpoint.includes('user')) {
    tableName = 'authentication_details';
  } else {
    return res.status(400).json({ message: 'Invalid endpoint.' });
  }
  if(tableName === 'authentication_details'){
    // Update the active status to 0 for the user
      connection.query(`UPDATE ${tableName} SET active = 0 WHERE AID = ?`, [userId], (error) => {
        if (error) {
          console.error('Error updating user details:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
        // User logged out successfully
        res.status(200).json({ message: 'Logout successful.' });
      });
  }else{
    // Update the active status to 0 for the admin
    connection.query(`UPDATE ${tableName} SET active = 0 WHERE email = ?`, [adminEmail], (error) => {
      if (error) {
        console.error('Error updating user details:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
      // User logged out successfully
      res.status(200).json({ message: 'Logout successful.' });
    });
  }
};
*/
// Close the connection when the application is terminated
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});