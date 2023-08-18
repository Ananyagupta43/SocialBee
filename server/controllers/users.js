import User from "../models/User.js";
import Post from "../models/Post.js";
// Read

export const getProfileUsers=async(req,res)=>{
    try{
   const {id}=req.params;
        const profileUser=await User.findById(id);
         res.status(200).json({profileUser})

    }catch(err){
        res.status(404).json({message:err.message});
    }
}

export const getProfileUsersFriends=async(req,res)=>{
    try{

        const {id}=req.params;
        const profileUser=await User.findById(id);

        const friends=await Promise.all(  //we want to grab all the friends so multiple api calls will be made to the database.
        profileUser.friends.map((id)=> User.findById(id))  //each id that the user has.
             //will create a new array from an existing array 
        );

        const finalFriends=friends.map(({_id,firstName,lastName,occupation,location,picturePath})=>
        {
                return {_id,firstName,lastName,occupation,location,picturePath};  //formatting of list
            }
        )
        res.status(200).json(finalFriends);

    }catch(err){
        res.status(404).json({message:err.message});
    }
}

// UPDATE
export const addRemoveProfileUsersFriends = async (req, res) => {
    try {
      const { id, friendId } = req.params;
      const user = await User.findById(id);
      const friend = await User.findById(friendId);
      if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId);//removing friend from user's friend list
        friend.friends = friend.friends.filter((id) => id !== id);// removing user from user friend's friend list
      } else {
        user.friends.push(friendId);
        friend.friends.push(id);
      }
      await user.save();
      await friend.save();
  
      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))//finding all the user friends
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return { _id, firstName, lastName, occupation, location, picturePath };//formatting of list for frontend
        }
      );
  
      res.status(200).json(formattedFriends);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
