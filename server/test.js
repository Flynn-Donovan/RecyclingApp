const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Server is alive!');
});

app.listen(5000, () => {
    console.log('Sanity test: Server is running on port 5000');
});