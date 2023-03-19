const User = require('../models/user');
module.exports.profile = async function(req,res){
 if(req.cookies.user_id){
  try {
    const user = await User.findById(req.cookies.user_id);
 if (user) {
      return res.render('user_profile',{
        title: "User Profile",
        user: user
      })
  } 
    return res.redirect('/users/sign-in');
  
  } catch (err) {
    console.log('error in finding user in signing up', err);
    return;
  
 }
}
 else{
   console.log('Error in loading profile page!');
  return res.redirect('/users/sign-in');
 } 

}

// render sign-up page
module.exports.signUp= function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_up',{
    title: "Etalk | Sign up "
  });
}

module.exports.signIn = function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_in',{
    title: "Etalk | Sign In"
  });
}

// get the sign-up data
module.exports.create = async function(req,res){

if(req.body.password != req.body.confirm_password){
  return res.redirect('back');
}
try {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    await User.create(req.body);
    return res.redirect('/users/sign-in');
  } else {
    return res.redirect('back');
  }
} catch (err) {
  console.log('error in finding user in signing up', err);
  return;
}

}

module.exports.createSession = function(req,res){
return res.redirect('/');
}

module.exports.destroySession = function(req,res){
  req.logout(req.user, err => {
    if(err) {
    console.log('Error found!');
      return next(err);
    
    }
      res.redirect('/');
  });
  };
    
  
