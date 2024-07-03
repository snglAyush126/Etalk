const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async (req,res) =>{
  //return res.end('<h1>Express is up for Etalk </h1>');
  
  try{
  const posts = await Post.find({})
  .sort('-createdAt')  
  .populate('user') 
  .populate({
    path: 'comments',
    populate:{
      path: 'user'
    }
  })
  .exec();
  let users = await User.find({});
        
        return res.render('home',
        {
            title: ' Etalk',
            posts: posts,
            all_users: users
        });
 
}
catch(err){
 if(err) console.log('Error Found home!!');
 return;
  }

// Post.find({}).populate('user').exec(function(err,posts){
//   return res.render('home',{
//     title: "Etalk | Home",
//     posts: posts
//   });
// });

}
