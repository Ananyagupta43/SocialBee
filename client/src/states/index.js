import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    mode: "light", //will specify whether we want to use dark mode or light mode globally
    user: null,
    token: null,  //for auth information 
    posts: [] //will include all the posts

};

export const authSlice = createSlice({
    name: "auth",  //for representing auth workflow
    initialState, //passing initial state 
    reducers: { // these are just function (user functions) that involve modifying the global state.
        setMode: (state) => {  // these functions actually do what we need.

            state.mode = state.mode === "light" ? "dark" : "light"; //state.mode represents the previous condition and what we assigns is the new value.

        },

        setLogin: (state, action) => {   // action will be like a function but here these are just params.
            state.user = action.payload.user;  //in our payload we are sending user as parameter from this function 
            state.token=action.payload.token;   //basically action includes all the parameters

        },

        setLogout:(state)=>{
        state.user=null;
        state.token=null;  //when we will logout the token and user will be set as null.
        },

        setFriends:(state,action)=>{
           if(state.user) {
            state.user.friends=action.payload.friends;
           }else{
            console.error("User friends non-existent");
           }
        },

        setPosts:(state,action)=>{
              state.posts=action.payload.posts;  
             
        },
        setPost:(state,action)=>{
          const updatedPosts=  state.posts.map((post)=>{ //grab the list of posts,map throgh each post and if (post._id===action.payload.post_id)
         
            if(post._id===action.payload.post._id){   //action_payload._post_id is that id that we are sending to this function for checking 
                return action.payload.post; //we are returning that updated post that we changed
            } 

                return post;   //just changing the post that is coming from backend everything will be left as it is.

        })
        state.posts=updatedPosts;
    }


    }
});

export const {setLogin,setFriends,setLogout,setMode,setPosts,setPost}=authSlice.actions;

export default authSlice.reducer;