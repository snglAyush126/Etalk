const Post = require('../models/post');

module.exports.home = async function(req,res){
  //return res.end('<h1>Express is up for etalk </h1>');

  try{
  const posts = await Post.find({}).populate('user').exec();
   return res.render('home',{
    title: "| Home!",
    posts: posts
  });
}
catch(err){
 if(err) console.log('Error Found!!');
 return;
  }

// Post.find({}).populate('user').exec(function(err,posts){
//   return res.render('home',{
//     title: "Etalk | Home",
//     posts: posts
//   });
// });

}
