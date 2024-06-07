const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/etalk_development');
mongoose.connect('mongodb+srv://snglakshat:Akshat1234@cluster0.5ujyyht.mongodb.net/talkNet');

const db= mongoose.connection;

db.on('error',console.error.bind(console,"Error connectiing to MongoDB"));

db.once('open',function(){
  console.log('Connected to database: MongoDB');

});
module.exports= db;
