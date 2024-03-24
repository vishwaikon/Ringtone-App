//import database connection from '../database/connection';
const connection = require('../database/connection');
const fs = require('fs');
const path = require('path');
// Controller methods
// Get all Ringtones
exports.getAllRingtones = (req, res) => {
  connection.query('SELECT * FROM ringtone_details', (error, results) => {
    if (error) {
      console.error('Error querying ringtones:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};
// Delete Ringtone
exports.deleteRingtone = (req, res) => {
  const RTID = req.params.id;
  connection.query('DELETE FROM ringtone_details WHERE RTID = ?', [RTID], (error, results) => {
    if (error) {
      console.error('Error deleting ringtone:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Ringtone not found' });
      return;
    }
    res.status(204).end(); // No content to send back
  });
};
// Join song_details and ringtone_details tables
exports.getAllRingtonesWithSongAndArtist = (req, res) => {
  connection.query(
    `SELECT 
        sd.SID,
        sd.songName,
        sd.artistName,
        rd.RTID,
        rd.Mobitel,
        rd.Dialog,
        rd.Hutch,
        rd.Airtel
    FROM 
        song_details sd
    INNER JOIN 
        ringtone_details rd ON sd.SID = rd.SID;`,
    (error, results) => {
      if (error) {
        console.error('Error querying ringtones with song and artist:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      res.json(results);
    }
  );
};

// Get Ringtone by RTID
exports.getRingtoneById = (req, res) => {
  const rtid = req.params.id;
  connection.query('SELECT * FROM ringtone_details WHERE RTID = ?', [rtid], (error, results) => {
    if (error) {
      console.error('Error querying ringtone by id:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Ringtone not found' });
      return;
    }
    res.json(results[0]);
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.createRingtone = (req, res) => {
  const { songName, artistName, Mobitel, Dialog, Hutch, Airtel } = req.body;

  connection.query(
    'INSERT INTO ringtone_details (SID, Mobitel, Dialog, Hutch, Airtel) VALUES ((SELECT SID FROM song_details WHERE songName = ? AND artistName = ?), ?, ?, ?, ?)',
    [songName, artistName, Mobitel, Dialog, Hutch, Airtel],
    async (error, results) => {
      if (error) {
        console.error('Error creating ringtone:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      
      const RTID = results.insertId; // Get the ID of the inserted row
      console.log('RTID:', RTID);
      
      // Fetch the SID based on the songName and artistName
      connection.query(
        'SELECT SID FROM song_details WHERE songName = ? AND artistName = ?',
        [songName, artistName],
        async (error, results) => {
          if (error) {
            console.error('Error fetching SID:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
          }
          
          const SID = results[0].SID; // Assuming there's only one matching record
          console.log('SID:', SID);
          
          try {
            await connection.beginTransaction();
            // Update service_provider_details based on non-empty fields
            if (Mobitel !== undefined) {
              await InsertServiceProvider(Mobitel, 'Mobitel', SID);
            }
            if (Dialog !== undefined) {
              await InsertServiceProvider(Dialog, 'Dialog', SID);
            }
            if (Hutch !== undefined) {
              await InsertServiceProvider(Hutch, 'Hutch', SID);
            }
            if (Airtel !== undefined) {
              await InsertServiceProvider(Airtel, 'Airtel', SID);
            }
  
            await connection.commit();
  
            res.status(201).json({ RTID, SID, Mobitel, Dialog, Hutch, Airtel });
          } catch (error) {
            await connection.rollback();
            console.error('Error creating ringtone:', error);
            res.status(500).json({ message: 'Internal server error' });
          }
        }
      );
    }
  );
};
async function InsertServiceProvider(spid, serviceProvider, SID) {
  try {
    // Insert into service_provider_details
    const serviceProviderQuery = `
      INSERT INTO service_provider_details (SPID, service_provider, ownerID, active, SID)
      VALUES (?, ?, (SELECT AID FROM song_details WHERE SID = ?), 1, ?)`;
    await connection.query(serviceProviderQuery, [spid, serviceProvider, SID, SID]);
  } catch (error) {
    throw error;
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getSID(songName, artistName) {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT SID FROM song_details WHERE songName = ? AND artistName = ?',
      [songName, artistName],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results[0].SID);
      }
    );
  });
}
// Update Ringtone by RTID
exports.updateRingtone = async (req, res) => {
  const RTID = req.params.id;
  const { songName, artistName, Mobitel, Dialog, Hutch, Airtel } = req.body;
  

  try {
    // Fetch the SID based on the songName and artistName
    const SID = await getSID(songName, artistName);
    console.log('SID:', SID, 'RTID:', RTID);

    await connection.beginTransaction();

    // Initialize updateQuery with only non-empty fields
    let updateQuery = 'UPDATE ringtone_details SET ';
    const updateParams = [];
    if (Mobitel !== undefined) {
      updateQuery += 'Mobitel = ?, ';
      updateParams.push(Mobitel);
    }
    if (Dialog !== undefined) {
      updateQuery += 'Dialog = ?, ';
      updateParams.push(Dialog);
    }
    if (Hutch !== undefined) {
      updateQuery += 'Hutch = ?, ';
      updateParams.push(Hutch);
    }
    if (Airtel !== undefined) {
      updateQuery += 'Airtel = ?, ';
      updateParams.push(Airtel);
    }
    /*
    if (SID !== undefined) {
      updateQuery += 'SID = ?, ';
      updateParams.push(SID);
    }
    */
    // Remove the trailing comma and space
    updateQuery = updateQuery.replace(/,\s*$/, '');
    updateQuery += ' WHERE RTID = ?';
    updateParams.push(RTID);

    // Execute the update query for ringtone_details
    await connection.query(updateQuery, updateParams);

    // Update service_provider_details based on non-empty fields
    if (Mobitel !== undefined) {
      await updateServiceProvider(Mobitel, 'Mobitel', SID, RTID);
    }
    if (Dialog !== undefined) {
      await updateServiceProvider(Dialog, 'Dialog', SID, RTID);
    }
    if (Hutch !== undefined) {
      await updateServiceProvider(Hutch, 'Hutch', SID, RTID);
    }
    if (Airtel !== undefined) {
      await updateServiceProvider(Airtel, 'Airtel', SID, RTID);
    }

    await connection.commit();

    res.status(200).json({ RTID, SID, Mobitel, Dialog, Hutch, Airtel });
  } catch (error) {
    await connection.rollback();
    console.error('Error updating ringtone:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Update service_provider_details table
async function updateServiceProvider(spid, serviceProvider, SID, RTID) {
  try {
    await connection.beginTransaction();
    
    // Delete previous records where SPID is 'Pending' and service_provider matches
    const deletePendingQuery = `
      DELETE FROM service_provider_details
      WHERE SPID = 'Pending' AND service_provider = ?`;
    await connection.query(deletePendingQuery, [serviceProvider]);
    
    // Delete previous records for the same SID and service_provider
    const deleteQuery = `
      DELETE spd FROM service_provider_details spd
      JOIN ringtone_details rd ON spd.SPID = rd.${serviceProvider}
      WHERE rd.RTID = ? AND spd.service_provider = ?`;
    await connection.query(deleteQuery, [RTID, serviceProvider]);
    

    // Check if a record with the same SPID and service_provider exists
    const checkQuery = `
      SELECT ID FROM service_provider_details WHERE SPID = ? AND service_provider = ?`;
    const queryResult = await connection.query(checkQuery, [spid, serviceProvider]);
    const existingRecord = queryResult ? queryResult[0] : null;

    if (existingRecord && existingRecord.length > 0) {
      // Update the existing record
      const updateQuery = `
        UPDATE service_provider_details 
        SET ownerID = (SELECT AID FROM song_details WHERE SID = ?), active = 1 
        WHERE SPID = ? AND service_provider = ?`;
      await connection.query(updateQuery, [SID, spid, serviceProvider]);
    } else {
      // Insert a new record
      const insertQuery = `
        INSERT INTO service_provider_details (SPID, service_provider, ownerID, active, SID) 
        VALUES (?, ?, (SELECT AID FROM song_details WHERE SID = ?), 1, ?)`;
      await connection.query(insertQuery, [spid, serviceProvider, SID, SID]);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}


// Close the connection when the application is terminated
process.on('SIGINT', () => {
    connection.end();
    process.exit();
  });