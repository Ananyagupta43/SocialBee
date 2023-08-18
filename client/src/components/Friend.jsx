import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "states";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const  token  = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    let isFriend =false;
    if(friends && friends.length>0){
         isFriend = friends.find((friend) => friend._id === friendId);  //asically on the feed we will see posts of 
    //all the people and there we will have a + icon to add them as friend if they are not already added so here we are just checking that.

    }

    const patchFriend = async () => {

        const response = await fetch(    //here we passing both =>current userId and friendId
            `http://localhost:3001/users/${_id}/${friendId}`, {

            method: "PATCH",
             headers: { Authorization: `Bearer ${token}`,
             "Content-Type":"application/json" },

        }

        );

        const data = await response.json();
        dispatch(setFriends({ friends: data }))
        //so basically if a friend is added then our friendList will be changed and if friend is removed then 
        //also the list will be changed
    };

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />

                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);   //so here the next page will be opened but components will not re render and for that we will use 
                        navigate(0);

                    }}
                >

                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                    >{name}</Typography>

                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>

                </Box>


            </FlexBetween>

        { _id!=friendId &&  <IconButton
                onClick={() => patchFriend()}
                sx={{
                    backgroundColor: primaryLight,
                    p: "0.6rem"
                }}
            >

                {isFriend ? (

                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                )}

            </IconButton> }  

        </FlexBetween>
    )
}

export default Friend;

