import Post from "../models/Post.js";
import User from "../models/User.js"
// CREATE

export  const createNewPost=async(req,res)=>{    //it will have a picture path as well.

    try{

        const {userId,description,picturePath}=req.body;
        const user=await User.findById(userId);
        const newPost=new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath:user.picturePath,  //profile image of user
            picturePath,   //coming from req.body
            likes:{},  //post will start  from 0 likes so this is going to be empty at first and when someone will like it => likes:{"someId":true}
           comments:[]   //same as likes empty in the start
        })
        await newPost.save();
        const post=await Post.find()  //here we are grabbing the new created post and then we will return this
        return res.status(201).json(post);

    }catch(err){
      res.status(409).json({"message":err.message});   //409 for creating 
    }
} 


// READ

export const getFeedPosts=async (req,res)=>{     //will grab all the posts of everyone
  try{
    const post=await Post.find()  //here we are grabbing the newsfeed
    return res.status(201).json(post);
  }catch(err){
    res.status(404).json({"message":err.message});   //for not found

  } 

}

// getting user posts
export const getUserPosts=async(req,res)=>{

    try{
        const {userId}=req.params
        const post=await Post.find({userId})  //here we are grabbing the newsfeed (only those posts that are related to the user)
        return res.status(201).json(post);
      }catch(err){
        res.status(404).json({"message":err.message});   //for not found
    
      }  
}

// UPDATE
export const getLikePosts=async(req,res)=>{
  try{

    const {id}=req.params;  //present in the url (comes from query string)
    const {userId}=req.body; //sending from frontend

    const post =await Post.findById(id);
    const isLiked=post.likes.get(userId);   //so here we are checking that if a particular userId is present for that particular post 
                                           //if yes that means that post has been liked previously by that particular user.
      if(isLiked){
      post.likes.delete(userId);
      }else{
        post.likes.set(userId,true);   //likes is of type map so setting key value pair here
      }

      const updatedPost=await Post.findByIdAndUpdate(
        id,
        {likes:post.likes}, //this is the new list of likes that we have modified.
        {new:true}   //for new object
      )

     return res.status(201).json(updatedPost);
  }catch(err){
    res.status(404).json({"message":err.message});   //for not found

  }  
}