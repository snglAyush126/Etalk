require('dotenv').config();
const mongoose = require('mongoose');

// Enable detailed debugging for SSL/TLS
process.env.NODE_DEBUG = 'tls,mongodb-native';

// MongoDB connection URI
const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/Etalk`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  sslValidate: true, // Enable certificate validation for more security
  // tlsAllowInvalidCertificates: true, // Only for testing, disable for production
  // tlsInsecure: true, // Only for testing, disable for production
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
