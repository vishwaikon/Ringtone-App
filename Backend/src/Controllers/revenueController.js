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
/*
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
*/
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
///////////////////////////////////////////////////////////////////////////////////////
/*Dashboard*/
// Get total revenue for all songs
exports.getTotalRevenue = (req, res) => {
  connection.query(`
  SELECT 
      s.songName, 
      s.artistName,
      s.language,
      SUM(r.downloads) AS total_downloads,
      SUM(r.revenue) AS total_revenue
    FROM 
      artist_details a
    JOIN 
      song_details s ON a.AID = s.AID
    JOIN 
      revenue_details r ON a.AID = r.ownerID
    GROUP BY 
      s.songName, s.artistName, s.language;
  `, (error, results) => {
    if (error) {
      console.error('Error querying total revenue:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};
///////////////////////////////////////////////////////////////////////////////////////
// Get total revenue for artists all songs with date range
exports.getTotalArtistRevenueByDate = (req, res) => {
  const { startDate, endDate } = req.body;
  connection.query(`
    SELECT 
      s.artistName,
      s.language,
      SUM(r.downloads) AS total_downloads,
      SUM(r.revenue) AS total_revenue
    FROM 
      artist_details a
    JOIN 
      song_details s ON a.AID = s.AID
    JOIN 
      revenue_details r ON a.AID = r.ownerID
    WHERE 
      r.date >= ? AND r.date <= ?
    GROUP BY 
      s.artistName, s.language;
  `, [startDate, endDate], (error, results) => {
    if (error) {
      console.error('Error querying total revenue by date:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};
///////////////////////////////////////////////////////////////////////////////////////
// Get total revenue for the artist from artist_details table
exports.getTotalArtistRevenue = (req, res) => {
  connection.query(`
    SELECT 
    s.songName, 
    s.artistName,
    s.language,
    SUM(r.downloads) AS total_downloads,
    SUM(r.revenue) AS total_revenue
    FROM 
      artist_details a
    JOIN 
      song_details s ON a.AID = s.AID
    JOIN 
      revenue_details r ON a.AID = r.ownerID
    GROUP BY 
      s.songName, s.artistName, s.language;
  `,(error, results) => {
    if (error) {
      console.error('Error querying total revenue by date:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};

///////////////////////////////////////////////////////////////////////////////////////
/*
// Get total revenue for artist from artist_details table with date range and artist Name
exports.getTotalRevenueByDateAndArtistName = (req, res) => {
  const { startDate, endDate, artistName } = req.body;
  connection.query(`
  SELECT 
  CONCAT(firstName, ' ',lastName) AS Artist_Name,
  SUM(r.downloads) AS total_downloads,
  SUM(r.revenue) AS total_revenue
  FROM 
    artist_details a
  JOIN 
    revenue_details r ON a.AID = r.ownerID
  WHERE
  CONCAT(firstName, ' ',lastName) = ?
  AND r.date BETWEEN ? AND ?
  GROUP BY 
    CONCAT(firstName, ' ',lastName);
  `, [artistName, startDate, endDate], (error, results) => {
    if (error) {
      console.error('Error querying total revenue by date and artist:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};
*/
///////////////////////////////////////////////////////////////////////////////////////
//Get total revenue by service provider
exports.getTotalRevenueByServiceProvider = (req, res) => {
  connection.query(`
    SELECT 
      s.songName, 
      s.artistName,
      s.language, 
      r.service_provider,
      SUM(r.downloads) AS total_downloads,
      SUM(r.revenue) AS total_revenue
    FROM 
      song_details s
    JOIN 
      revenue_details r ON s.SID = r.SID
    GROUP BY 
      s.songName, s.artistName, s.language, r.service_provider;
  `, (error, results) => {
    if (error) {
      console.error('Error querying total revenue by service provider:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};
///////////////////////////////////////////////////////////////////////////////////////
// Get total revenue by service provider and date
exports.getTotalRevenueByServiceProviderAndDate = (req, res) => {
  const { startDate, endDate, serviceProvider } = req.body;
  connection.query(`
    SELECT 
      s.songName, 
      s.artistName,
      s.language, 
      r.service_provider,
      SUM(r.downloads) AS total_downloads,
      SUM(r.revenue) AS total_revenue
    FROM 
      song_details s
    JOIN 
      revenue_details r ON s.SID = r.SID
    WHERE 
      r.service_provider = ? AND
      r.date BETWEEN ? AND ?
    GROUP BY 
      s.songName, s.artistName, s.language, r.service_provider;
  `, [serviceProvider, startDate, endDate], (error, results) => {
    if (error) {
      console.error('Error querying total revenue by service provider and date:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};
///////////////////////////////////////////////////////////////////////////////////////
// Get total revenue for song from song_details with date range and artistName
exports.getTotalRevenueByDateAndArtist = (req, res) => {
  const { startDate, endDate, artistName } = req.body;
  connection.query(`
    SELECT 
      s.songName, 
      s.artistName,
      s.language,
      SUM(r.downloads) AS total_downloads,
      SUM(r.revenue) AS total_revenue
    FROM 
      artist_details a
    JOIN 
      song_details s ON a.AID = s.AID
    JOIN 
      revenue_details r ON a.AID = r.ownerID
    WHERE
      s.artistName = ?
      AND r.date BETWEEN ? AND ?
    GROUP BY 
      s.songName, s.artistName, s.language;
  `, [artistName, startDate, endDate], (error, results) => {
    if (error) {
      console.error('Error querying total revenue by date and artist:', error);
      res.status(500).json({ message: 'Internal server error' });
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