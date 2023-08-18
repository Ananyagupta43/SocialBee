import mongoose from 'mongoose';

const postSchema=new mongoose.Schema({
        userId:{
            type:String,
            required:true,
        },
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        location:String,
       description:String,
       picturePath:String,
       userPicturePath:String,      
        likes:{
            type:Map,  //this is how mongoDB saves object 
            of:Boolean,  //we will check if the userId exists in this Map and the value is going to be true always if it does exists 
        },             // so if we will like a post it is going to get added in  the map otherwise it will be removed from the map if we don't like it
        comments:{
          type:Array,
          default:[],  
        }
    },
    {timeStamps:true}
);

const Post=mongoose.model("Post",postSchema);

export default Post;