const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const uploadSong = multer({ storage: storage });
const uploadRingTone = multer({ storage: storage });
// Define API endpoints
//Genre Controller
const genreController = require('../controllers/genrecontroller');
// API endpoints for genres
router.get('/genres', genreController.getAllGenres); // Get all genres
router.post('/genres', genreController.createGenre); // Create a new genre
router.get('/genres/:id', genreController.getGenreById); // Get genre by ID
router.put('/genres/:id', genreController.updateGenre); // Update a genre
router.delete('/genres/:id', genreController.deleteGenre); // Delete a genre

//Ringtone Controller
const ringtoneController = require('../controllers/ringtonecontroller');
// API endpoints for ringtones
router.get('/ringtones', ringtoneController.getAllRingtones); // Get all ringtones
router.post('/ringtones', ringtoneController.createRingtone); // Create a new ringtone
//router.post('/ringtones', uploadRingTone.single('ringtoneFile'), ringtoneController.createRingtone); // Create a new ringtone with file // SID is a required field
router.get('/ringtones/:id', ringtoneController.getRingtoneById); // Get ringtone by RTID
//router.put('/ringtones/:id', ringtoneController.updateRingtone); // Update a ringtone
router.put('/ringtones/:id', ringtoneController.updateRingtone); // Update a ringtone by RTID will update service_provider_details table
router.delete('/ringtones/:id', ringtoneController.deleteRingtone); // Delete a ringtone
router.get('/ringtonesbysong', ringtoneController.getAllRingtonesWithSongAndArtist); // Get all ringtones with song and artist

//Service Provider Controller
const serviceProviderController = require('../controllers/serviceprovidercontroller');
// API endpoints for service providers
router.get('/serviceproviders', serviceProviderController.getAllServiceProviders); // Get all service providers
//router.post('/serviceproviders', serviceProviderController.createServiceProvider); // Create a new service provider
router.get('/serviceproviders/:id', serviceProviderController.getServiceProviderById); // Get service provider by ID
//router.put('/serviceproviders/:id', serviceProviderController.updateServiceProvider); // Update a service provider
router.delete('/serviceproviders/:id', serviceProviderController.deleteServiceProvider); // Delete a service provider

//Song Controller
const songController = require('../controllers/songcontroller');
// Multer configuration for file upload

// API endpoints for songs
router.get('/songs', songController.getAllSongs); // Get all songs
//router.post('/songs', songController.createSong); // Create a new song
router.get('/songs/artist/:AID', songController.getAllSongsByAID); // Get all songs by AID
router.post('/songs', uploadSong.single('songFile'), songController.createSong); // Create a new song // AID is a required field
router.get('/songs/:id', songController.getSongById); // Get song by SID
router.put('/songs/:id', uploadSong.single('songFile'), songController.updateSong); // Update a song // artistName is a required field
//router.delete('/songs/:id', songController.deleteSong); // Delete a song

//Artist Controller
const artistController = require('../controllers/artistcontroller');

// API endpoints for artists
router.get('/artists', artistController.getAllArtists); // Get all artists
router.post('/artists', artistController.createArtist); // Create a new artist
router.get('/artists/:id', artistController.getArtistById); // Get artist by AID
router.put('/artists/:id', artistController.updateArtist); // Update an artist
router.delete('/artists/:id', artistController.deleteArtist); // Delete an artist

//Authentication Controller
const authenticationController = require('../controllers/authenticationcontroller');

router.post('/login', authenticationController.login); // Login users
//router.post('logout', authenticationController.logout); // Logout
router.post('/user/logout/:id', authenticationController.userLogout); // Logout user
router.post('/admin/logout/:email', authenticationController.adminLogout); // Logout admin

//Revenue Controller
const revenueController = require('../controllers/revenuecontroller');
// API endpoints for revenue
router.get('/revenue', revenueController.getAllRevenues); // Get all revenue
//router.get('/revenue/:id', revenueController.getRevenueById); // Get revenue by RID
router.get('/revenue/owner/:aid', revenueController.getRevenueByOwnerID); // Get revenue by ownerID (AID)
router.get('/revenue/song/:sid', revenueController.getRevenueBySID); // Get revenue by SID
router.get('/revenue/total_revenue', revenueController.getTotalRevenue); // Get total revenue
router.get('/revenue/total_artist_revenueByDate', revenueController.getTotalArtistRevenueByDate); // Get total revenue by date
router.get('/revenue/total_revenueByArtistAndDate', revenueController.getTotalRevenueByDateAndArtist); // Get total revenue by artist and date
router.get('/revenue/total_revenueByServiceProvider', revenueController.getTotalRevenueByServiceProvider); // Get total revenue by service provider
router.get('/revenue/total_revenueByServiceProviderByDate', revenueController.getTotalRevenueByServiceProviderAndDate); // Get total revenue by service provider and date
router.get('/revenue/total_artist_revenue', revenueController.getTotalArtistRevenue); // Get total revenue by artist from artist_details table
//Removed//router.get('/revenue/total_artist_revenueByDateByArtistName', revenueController.getTotalRevenueByDateAndArtistName); // Get total revenue for artist from artist_details table with date range and artist Name

// API endpoint for CSV file upload and processing data to the database
//const multer = require('multer');
const csvUploadController = require('../controllers/csvUploadController');
// Multer configuration for file upload
const upload = multer({ dest: 'src/csv/' });
// API endpoint for file upload
router.post('/upload-csv', upload.single('csvFile'), csvUploadController.uploadCSV);



module.exports = router;