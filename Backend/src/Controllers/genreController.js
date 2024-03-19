//import database connection from '../database/connection';
const connection = require('../database/connection');
  // Controller methods
  // Get all Genres
  exports.getAllGenres = (req, res) => {
    connection.query('SELECT * FROM genre_details', (error, results) => {
      if (error) {
        console.error('Error querying genres:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  };
  
  // Create Genre
  exports.createGenre = (req, res) => {
    const { genre_name, description } = req.body;
    connection.query('INSERT INTO genre_details (genre_name, description) VALUES (?, ?)', [genre_name, description], (error, results) => {
      if (error) {
        console.error('Error creating genre:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      res.status(201).json({ gid: results.insertId, genre_name, description }); // Return the GID of the newly created genre
    });
  };
  // Get genre by GID
  exports.getGenreById = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM genre_details WHERE GID = ?', [id], (error, results) => {
      if (error) {
        console.error('Error querying genre by id:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ message: 'Genre not found' });
        return;
      }
      res.json(results[0]);
    });
  };
  
  // Update Genre
  exports.updateGenre = (req, res) => {
    const gid = req.params.id; // Assuming the ID provided in the request parameter is GID
    const { genre_name, description } = req.body;
    connection.query('UPDATE genre_details SET genre_name = ?, description = ? WHERE GID = ?', [genre_name, description, gid], (error, results) => {
      if (error) {
        console.error('Error updating genre:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Genre not found' });
        return;
      }
      res.status(200).json({ gid, genre_name, description });
    });
  };
  
  // Delete Genre
  exports.deleteGenre = (req, res) => {
    const gid = req.params.id; // Assuming the ID provided in the request parameter is GID
    connection.query('DELETE FROM genre_details WHERE GID = ?', [gid], (error, results) => {
      if (error) {
        console.error('Error deleting genre:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Genre not found' });
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
