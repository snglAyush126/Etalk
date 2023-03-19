const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User= require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
  usernameField: 'email'
},
async function(email,password,done){
  // fina a user and establish the identity
  try {
    const user = await User.findOne({ email: email });
    if (!user || user.password != password) {
      console.log('Invalid Username/Password');
      return done(null,false);
    } else {
      return done(null,user);
    }
  } catch (err) {
    console.log('error in finding user in signing up', err);
    return done(err);
  }
}
));

// serializing the user to decide which kry is to be kept in the cookies

passport.serializeUser(function(user,done){
  done(null,user.id);
});

// deserializing the use from the key in the cookies
passport.deserializeUser(async function(id,done){
  try {
    const user = await User.findById(id);
      return done(null,user);
  } catch (err) {
    console.log('error in finding user --> passport', err);
    return done(err);
  }
});

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
  // if the user is signed in then let them to next page
  if( req.isAuthenticated()){
    return next();
  }
 
  // if the user is not signed in return back 
  return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
  if(req.isAuthenticated()){
// req.user contains thr current signed in user from the 
    res.locals.user = req.user;
}
next();
}



module.exports = passport;
