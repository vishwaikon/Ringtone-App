// processCSVFileData.js
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const connection = require('../database/connection');

// Function to read and parse a CSV file
function readCSVFile(csvFilePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', data => {
        results.push(data);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', error => {
        reject(error);
      });
  });
}

async function getSIDFromServiceProvider(RingToneID, ISPID) {
  const query = `
    SELECT SID FROM service_provider_details WHERE service_provider = ? AND SPID = ?`;
  const results = await executeQuery(query, [ISPID, RingToneID]);
  return results.length > 0 ? results[0].SID : null;
}

module.exports = {
  processCSVAndInsertData: async (csvFilePath, callback) => {
    try {
      // Read and parse the CSV file
      const results = await readCSVFile(csvFilePath);
      console.log('CSV Parsing Completed. Total Rows:', results.length);
      

      // Process each row of the CSV file
      const processedRows = [];
      for (const csvRow of results) {
        console.log('Processing CSV Row:', csvRow);
        const { Date, RingToneID, ISPID, Revenue, Downloads } = csvRow;
        const formattedDate = parseDate(Date);
        console.log('Fetching Owner Details for RingToneID:', RingToneID, 'and ISPID:', ISPID);
        const ownerDetails = await getOwnerDetails(RingToneID, ISPID);
        if (!ownerDetails) {
          console.error(`Owner details not found for RingToneID: ${RingToneID} and ISPID: ${ISPID}`);
          continue; // Skip to the next row
        }
        console.log('Inserting Revenue Details for RingToneID:', RingToneID);
        await insertRevenueDetails(RingToneID, ownerDetails, formattedDate, Revenue, Downloads, ISPID);
        console.log('Revenue Details Inserted for RingToneID:', RingToneID);
        processedRows.push(csvRow);
      }

      console.log('Data insertion process completed');
      callback({ success: true, message: 'Data inserted successfully', processedRows });
    } catch (error) {
      console.error('Error processing CSV and inserting data:', error);
      callback({ success: false, message: 'Error processing CSV and inserting data' });
    }
  }
};

function parseDate(dateString) {
  if (!dateString) {
    console.error('Date string is undefined or empty');
    return null;
  }
  if (dateString.includes('-')) {
    return dateString;
  }
  const [month, day, year] = dateString.split('/');
  return `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

async function executeQuery(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function getOwnerDetails(RingToneID, ISPID) {
  const query = `
    SELECT AID, createdBy, createdDate 
    FROM artist_details WHERE AID = ( SELECT AID FROM song_details 
      WHERE SID = ( SELECT SID FROM ringtone_details WHERE ${ISPID} = ?))`;

  const ownerDetails = await executeQuery(query, [RingToneID]);
  return ownerDetails.length ? ownerDetails[0] : null;
}

async function insertRevenueDetails(RingToneID, ownerDetails, Date, Revenue, Downloads, ISPID) {
  // Get the SID corresponding to the RingtoneID and ISPID
  const SID = await getSIDFromServiceProvider(RingToneID, ISPID);
  if (!SID) {
    console.error(`SID not found for RingToneID: ${RingToneID} and ISPID: ${ISPID}`);
    return;
  }
  // Check if the combination of RingToneID and ISPID already exists in the revenue_details table
  const existingDataQuery = `
    SELECT COUNT(*) AS count FROM revenue_details WHERE RTID = ? AND service_provider = ?`;
  const existingData = await executeQuery(existingDataQuery, [RingToneID, ISPID]);

  // If the combination already exists, skip insertion
  if (existingData[0].count > 0) {
    console.log(`Data already exists for RingToneID: ${RingToneID} and ISPID: ${ISPID}. Skipping insertion.`);
    return;
  }

  // Insert new data if the combination does not exist
  const query = `
    INSERT INTO revenue_details (RTID, ownerID, createdBy, createdDate, date, revenue, downloads, service_provider, SID) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    RingToneID,
    ownerDetails.AID,
    ownerDetails.createdBy,
    ownerDetails.createdDate,
    Date,
    Revenue,
    Downloads,
    ISPID,
    SID
  ];
  await executeQuery(query, values);
}
