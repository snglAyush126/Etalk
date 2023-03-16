const User = require('../models/user');
module.exports.profile = function(req,res){
  //return res.end('<h1> user profile </h1>');

  return res.render('user_profile',{
    title: "profile!"
  });
}

// render sign-up page
module.exports.signUp= function(req,res){
  return res.render('user_sign_up',{
    title: "Etalk | Sign up "
  });
}

module.exports.signIn = function(req,res){
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

}
