////import database connection from '../database/connection';
const connection = require('../database/connection');
const fs = require('fs');
const path = require('path');

// Controller methods
// get all songs by AID
exports.getAllSongsByAID = (req, res) => {
  const AID = req.params.AID;
  connection.query('SELECT * FROM song_details WHERE AID = ?', [AID], (error, results) => {
    if (error) {
      console.error('Error querying songs:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};
// Get all Songs
exports.getAllSongs = (req, res) => {
  connection.query('SELECT * FROM song_details', (error, results) => {
    if (error) {
      console.error('Error querying songs:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};

// Create Song
exports.createSong = (req, res) => {
  const { songName, AID, language, genreID, remarks } = req.body;
  const songFile = req.file; // Assuming you're using multer or a similar middleware for file upload

  // Fetch artist's full name from artist_details table based on AID
  connection.query('SELECT firstName, lastName FROM artist_details WHERE AID = ?', [AID], (error, results) => {
    if (error) {
      console.error('Error fetching artist details:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Artist not found' });
      return;
    }

    const { firstName, lastName } = results[0];
    const artistName = `${firstName} ${lastName}`;

    // Construct the file path
    const songLocationURL = `/Songs/${artistName}/${songFile.originalname}`;

    // Create directory if it doesn't exist
    const artistDirectory = path.join(__dirname, '..', 'Songs', artistName);
    if (!fs.existsSync(artistDirectory)) {
      fs.mkdirSync(artistDirectory, { recursive: true });
    }

    // Move the uploaded file to the artist directory
    const filePath = path.join(artistDirectory, songFile.originalname);
    fs.writeFileSync(filePath, songFile.buffer);

    // Insert song details into song_details table
    connection.query(
      'INSERT INTO song_details (songName, AID, language, genreID, artistName, songLocationURL, remarks, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())',
      [songName, AID, language, genreID, artistName, songLocationURL, remarks],
      (error, results) => {
        if (error) {
          console.error('Error creating song:', error);
          res.status(500).json({ message: 'Internal server error' });
          return;
        }

        const SID = results.insertId;
        res.status(201).json({ SID, songName, AID, language, genreID, artistName, songLocationURL, remarks, createdDate: new Date().toISOString().split('T')[0] });
      }
    );
  });
};

// Get Song by SID
exports.getSongById = (req, res) => {
  const sid = req.params.id;
  connection.query('SELECT * FROM song_details WHERE SID = ?', [sid], (error, results) => {
    if (error) {
      console.error('Error querying song by SID:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Song not found' });
      return;
    }
    res.json(results[0]);
  });
};
// Update Song
exports.updateSong = async (req, res) => {
  const SID = req.params.id;
  const { songName, AID, language, genreID, artistName, remarks } = req.body;
  const songFile = req.file; // New song file
  //console.log('New songFile Detected:', songFile);
  // Check if no fields are provided for update
  if (!songName && !AID && !language && !genreID && !artistName && !remarks && !songFile) {
    return res.status(400).json({ message: 'At least one field is required for the update' });
  }

  try {
    await connection.beginTransaction();

    // Initialize updateQuery with only non-empty fields
    let updateQuery = 'UPDATE song_details SET ';
    const updateParams = [];
    if (songName !== undefined) {
      updateQuery += 'songName = ?, ';
      updateParams.push(songName);
    }
    if (AID !== undefined) {
      updateQuery += 'AID = ?, ';
      updateParams.push(AID);
    }
    if (language !== undefined) {
      updateQuery += 'language = ?, ';
      updateParams.push(language);
    }
    if (genreID !== undefined) {
      updateQuery += 'genreID = ?, ';
      updateParams.push(genreID);
    }
    if (artistName !== undefined) {
      updateQuery += 'artistName = ?, ';
      updateParams.push(artistName);
    }
    if (remarks !== undefined) {
      updateQuery += 'remarks = ?, ';
      updateParams.push(remarks);
    }

    // Check if songFile is provided, if so, update the file location
    if (songFile) {
      const songLocationURL = `/Songs/${artistName}/${songFile.originalname}`;
      const artistDirectory = path.join(__dirname, '..', 'Songs', artistName);
      const filePath = path.join(artistDirectory, songFile.originalname);
      
      if (!fs.existsSync(artistDirectory)) {
        fs.mkdirSync(artistDirectory, { recursive: true });
      }

      fs.writeFileSync(filePath, songFile.buffer);

      updateQuery += 'songLocationURL = ?, ';
      updateParams.push(songLocationURL);
    }

    // Remove the trailing comma and space
    updateQuery = updateQuery.replace(/,\s*$/, '');
    updateQuery += ' WHERE SID = ?';
    updateParams.push(SID);

    // Execute the update query
    await connection.query(updateQuery, updateParams);
    await connection.commit();

    res.status(200).json({ SID, songName, AID, language, genreID, artistName, remarks });
  } catch (error) {
    await connection.rollback();
    console.error('Error updating song:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Delete Song
exports.deleteSong = (req, res) => {
  const SID = req.params.SID; // Assuming SID is passed in the URL

  // Fetch song details to get SongLocationURL
  connection.query('SELECT SongLocationURL FROM song_details WHERE SID = ?', [SID], (error, results) => {
    if (error) {
      console.error('Error fetching song details:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Song not found' });
      return;
    }

    const songLocationURL = results[0].SongLocationURL;

    // Delete file from file system
    const filePath = path.join(__dirname, '..', songLocationURL);
    fs.unlink(filePath, (error) => {
      if (error) {
        console.error('Error deleting song file:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      // Delete song from song_details table
      connection.query('DELETE FROM song_details WHERE SID = ?', [SID], (error) => {
        if (error) {
          console.error('Error deleting song from database:', error);
          res.status(500).json({ message: 'Internal server error' });
          return;
        }

        res.status(200).json({ message: 'Song deleted successfully' });
      });
    });
  });
};
// Close the connection when the application is terminated
process.on('SIGINT', () => {
    connection.end();
    process.exit();
  });