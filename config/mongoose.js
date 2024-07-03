require('dotenv').config();
const mongoose = require('mongoose');

const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/Etalk`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  sslValidate: false, // Disable certificate validation (not recommended for production)
};

mongoose.connect(dbUri, options).then(() => {
  console.log('Connected to database: MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
  console.log('Connection options:', options);
  console.log('Database URI:', dbUri);
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', function() {
  console.log('Connected to database: MongoDB');
});

module.exports = db;

