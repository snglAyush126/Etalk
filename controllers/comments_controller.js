const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    try{
      console.log(req.body,"body information!!!");
        let post = await Post.findById(req.body.post);
      
      if(post){
        console.log(post._id,"post!!!!!!");
        let comment = await Comment.create({
            content: req.body.content,
            post: post._id,
            user: req.user._id
        });
        post.comments.push(comment);
                post.save();
             return res.redirect('/');
      }
        return res.redirect('back');
     }
     catch(err){
        
             console.log(err,'error in creating the post!'); 
             return;
          }
         
}
module.exports.destroy = async (req,res)=>{
  
  try{
  const comment= await Comment.findById(req.params.id);
  if(comment.user == req.user.id){
    
    let postId = comment.post;
    // 6465f45e943f91cc15ed72c6
    console.log(req.params.id);
    await Comment.findByIdAndDelete(req.params.id);
    
    await Post.findByIdAndUpdate(postId, { $pull:
     {comments: req.params.id }});
     console.log("check");
      return res.redirect('back');
  }else{
    console.log("Comment can't be deleted ");
    return res.redirect('back');
  }
 }
 catch(err){
  if(err){
    console.log("Error in deleting the comment", err);
  return res.redirect('back');
  }
 }
}

