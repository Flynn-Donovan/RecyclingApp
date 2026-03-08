// Imports the mongoose library — used to connect to and interact with MongoDB
const mongoose = require('mongoose');

// Defines an async function called connectDB that handles the connection logic
const connectDB = async () => {

  // Wraps the connection attempt in try/catch to handle errors gracefully
  try {

    // Calls mongoose.connect() with the MongoDB URI stored in your .env file
    // process.env.MONGO_URI reads the value from the environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Logs a success message showing which host was connected to
    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {

    // If the connection fails, logs the error message
    console.error(`Error: ${error.message}`);

    // Exits the Node process with a failure code (1) so the server doesn't run without a DB
    process.exit(1);
  }
};

// Exports the function so it can be imported and called in index.js
module.exports = connectDB;