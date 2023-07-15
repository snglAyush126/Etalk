const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore =  require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log(`Chat server is running on port: 5000`);

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
// mongo store is used to store the session cookie in the db
app.use(session({
  name: 'etalk',
  secret: 'blahsomething',
  saveUninitialized: false,
  resave: false,
 cookie:{
    maxAge: (1000*60 *100)
  },
 store: MongoStore.create({
 mongoUrl: 'mongodb://127.0.0.1:27017/etalk_development',
 autoRemove: 'disabled'  
  },function(err){
    console.log(err);
    return;
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
  if(err){
    console.log(`erro : ${err}`);
  }
console.log(`server is running on port ${port} ! `);
});
