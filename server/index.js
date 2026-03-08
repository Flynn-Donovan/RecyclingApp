const express = require('express');
const app = express();
const refundRoutes = require('./refundRoutes.js');

// Middleware to let the server read JSON from the user
app.use(express.json());

// Tell the app to use your routes
// This means every route inside refundRoutes will start with /api
app.use('/api', refundRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));