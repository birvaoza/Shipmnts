const express = require('express');
const bodyParser = require('body-parser');
const uploadRoute = require('./routes/upload');
const { connectDB } = require('./database');

const app = express();
app.use(bodyParser.json());

connectDB(); // Connect to the database

app.use('/api/upload', uploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
