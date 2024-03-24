const express = require('express');
const routes = require('./src/router/routes');
const connection = require('./src/database/connection');
//const fs = require('fs');
//const revenueController = require('./src/controllers/revenuecontroller');
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }

));
app.use(express.json());
connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});
// Routes
app.use(routes);

app.listen(PORT, () => {
    console.log('Server is running on port 5000')
})

module.exports = app;