const User = require('../models/user');
const bcrypt= require("bcryptjs");
// module.exports.profile = async function(req,res){
//   if(req.cookies.user_id){
//   try {
//     const user = await User.findById(req.cookies.user_id);
//  if (user) {
//       return res.render('user_profile',{
//         title: "User Profile",
//         user: user
//       });
//   } 
//     return res.redirect('/users/sign-in');
  
//   } catch (err) {
//     console.log('error in finding user in signing up', err);
//     return;
  
//  }
// }
//   else{
//     console.log('Error in loading profile page!');
//    return res.redirect('/users/sign-in');
//   } 

// }


module.exports.profile = async function(req, res)
{
  const user = await User.findById(req.params.id);
    
  try{
        return res.render('user_profile',
        {
            title: 'TalkNet | Profile',
            user: user
        });
    }
    catch(err){
      console.log('error in finding user in signing up', err);
      return;
    };
}

// module.exports.profile = function(req, res){
//   return res.render('user_profile', {
//       title: 'User Profile'
//   })
// }

// render sign-up page
module.exports.signup= function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/');
  }
  return res.render('user_sign_up',{
    title: "TalkNet | Sign up "
  });

}
module.exports.sudoku= function(req,res){
  
  // return res.render('user_sign_up',{
  //   title: "TalkNet | Sign up "
  // });
  return res.render('sudoku',{
    title: "TalkNet | Games"
  });
}

module.exports.signIn = function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/');
  }
  return res.render('user_sign_in',{
    title: "TalkNet | Sign In"
  });
}

// get the sign-up data
module.exports.create = async function(req,res){

if(req.body.password != req.body.confirm_password){
  req.flash('error','Passwords do not match. Please try again');
  return res.redirect('back');
}
try {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    const passhash= await bcrypt.hash(req.body.password,10);
    req.body.password= passhash;
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

  req.flash('success','Logged in');
  return res.redirect('/');
}

module.exports.destroySession = function(req,res){
 
  req.logout(req.user, err => {
   req.flash('success','Logged Out');
  
   if(err) {
    console.log('Error found!');
      return next(err);
    
    }
      res.redirect('/');
    });

  };
    
  
