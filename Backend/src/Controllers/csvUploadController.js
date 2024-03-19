const fs = require('fs');
const path = require('path');
const { processCSVAndInsertData } = require('../controllers/processCSVFileData');

// Controller function to handle CSV file upload
const uploadCSV = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        const csvFilePath = req.file.path;
        const currentTime = new Date().toISOString().replace(/:/g, '-'); // Get current date and time
        const fileNameWithTimestamp = `${currentTime}_${req.file.originalname}`; // Append timestamp to filename
        const newPath = path.join(__dirname, '../csv', fileNameWithTimestamp); // New path with timestamped filename
        fs.renameSync(csvFilePath, newPath); // Rename file with timestamped filename
        processCSVAndInsertData(newPath, result => {
            res.json({ ...result, fileName: fileNameWithTimestamp }); // Send back result along with filename
        });
    } catch (error) {
        console.error('Error uploading CSV:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
/*
const uploadCSV = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        const csvFilePath = req.file.path;
        processCSVAndInsertData(csvFilePath, result => {
            //now the file gets processed and saved to the csv folder.
            //fs.unlinkSync(csvFilePath); // Remove the uploaded CSV file after processing
            res.json(result);
        });
    } catch (error) {
        console.error('Error uploading CSV:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
*/
module.exports = { uploadCSV };
