const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/Etalk`);
const db= mongoose.connection;

db.on('error',console.error.bind(console,"Error connectiing to MongoDB"));

db.once('open',function(){


  console.log('Connected to database: MongoDB');

});
module.exports= db;
