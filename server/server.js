require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const estimateRoutes = require('./routes/estimateRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const depotsRoutes = require('./routes/depotsRoutes');
const pickupRoutes = require('./routes/pickupRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('RecyclingApp API is running');
});

app.use('/api', estimateRoutes);
app.use('/api', collectionRoutes);
app.use('/api', depotsRoutes);
app.use('/api', pickupRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
