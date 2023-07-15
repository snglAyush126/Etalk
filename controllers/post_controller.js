const Post = require('../models/post');
const Comment = require('../models/comment')
module.exports.create = async function(req,res){
 try{
 let post =  await Post.create({
        content: req.body.content,
        user: req.user._id
    });
   
    if(req.xhr){
      return res.status(200).json({
        data:{
          post: post
         },
         message: "Post Created!"
      });
    }
      
    req.flash('success','Post Created successfully!');
    return res.redirect('back');
}
catch(err){
        console.log('error in creating the post!'); 
        return;
     }
    
}

module.exports.destroy = async function(req,res){

  try{
    const post= await Post.findById(req.params.id);

    // .id means converting the object id into string
    if(post.user == req.user.id){
  
      //Post.remove();
try{
//Comment.deleteMany({post: req.params.id});
await Post.findByIdAndDelete(req.params.id);
if(req.xhr){
  return res.status(200).json({
    data:{
      post_id: req.params.id
    },
    message: "Post deleted"
  });
}

console.log("post deleted succesfully!");  
req.flash('success','Post deleted successfully!');
return res.redirect('back');
}
  catch(err){
    console.log(err,'error in destroying post!!');
    return ;
  }
  }
    else {
      return res.redirect('back');
    }
    }
  
  catch(err){
    console.log(err,'error in destroying the post');
    return;
  }
}