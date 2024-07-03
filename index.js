require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 10000;

const host = '0.0.0.0';
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore =  require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const bcrypt= require("bcryptjs");


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
  name: 'Etalk',
  secret: `${process.env.SESS_SECRET_KEY}`,
  saveUninitialized: false,
  resave: false,
 cookie:{
    maxAge: (1000*60*100)
  },
 store: MongoStore.create({
  mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/Etalk_session`,
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

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
});
