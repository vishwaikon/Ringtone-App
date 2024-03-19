const express = require('express');
const routes = require('./src/router/routes');
const connection = require('./src/database/connection');
const fs = require('fs');
const cors = require('cors'); // Import CORS module

const revenueController = require('./src/controllers/revenuecontroller');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS


// To do the data insertion when server runs
/*
//To check whether the  csv folder and csv file is present or not
const csvFolderPath = './src/csv'; // CSV folder path
fs.readdir(csvFolderPath, (err, files) => {
  if (err) {
    console.error('Error reading CSV folder:', err);
    return;
  }
  // Check if any CSV files are present
  const csvFiles = files.filter(file => file.endsWith('.csv'));
  if (csvFiles.length === 0) {
    console.log('No CSV file found in the folder');
    return;
  }
  // Process each CSV file found
  csvFiles.forEach(csvFile => {
    const csvFilePath = `${csvFolderPath}/${csvFile}`;
    console.log('Processing CSV file:', csvFilePath);
    
    // Call the function to process CSV and insert data
    revenueController.processCSVAndInsertData(csvFilePath, res => {
      // Log the result or handle the response if needed
      console.log(res);
    });
  });
  
});
*/
// Routes
app.use(routes);

app.listen(PORT, () => {
    console.log('Server is running on port 5000')
})