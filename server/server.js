// Loads all variables from the .env file into process.env — must be called first
require('dotenv').config();

const express = require('express');

// Imports the connectDB function from your config folder
const connectDB = require('./config/db');

const app = express();

// Calls connectDB() to establish the MongoDB connection when the server starts
connectDB();

app.use(express.json());

// Person B's routes will be mounted here by them
// e.g. app.use('/api/refunds', require('./routes/refundRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('Server is running! 🚀');
});