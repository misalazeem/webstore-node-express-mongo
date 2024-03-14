const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = 3001
const connectDB = require('./config/db');

connectDB();
app.use(express.json());
const userRoute = require('./routes/user');
app.use('/user', userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})