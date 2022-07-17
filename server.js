const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/social-network";

mongoose.connect(MONGODB_URI);
// mongoose.set('debug', true);

mongoose.connection.on('connected', () =>
  console.log('Connected to MongoDB Endpoint')
  );

  mongoose.connection.on('error', (err) =>
  console.log(`MONGOOSE DISCONNECTED ERROR: ${err}`)
  );
  
app.listen(PORT, () => console.log(`App listening on: ${PORT}!`));