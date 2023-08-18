import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,   //used for creating input (text field.)
  Typography, //Use typography to present your design and content as clearly and efficiently as possible.
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "states";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";



const Navbar = () => {
  const [ isToggledMobileMenu, setIsToggledMobileMenu ] = useState(false);  //basically for responsiveness.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); //grabbing store's state
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)")   //same as media query in css

  const chooseTheme = useTheme(); //will allow us to go to the theme.js file and use themes present over there.

  const neutralLight = chooseTheme.palette.neutral.light;
  const dark = chooseTheme.palette.neutral.dark;
  const background = chooseTheme.palette.background.default;
  const primaryLight = chooseTheme.palette.primary.Light;
  const alt = chooseTheme.palette.background.alt;

   const fullName = `${user.firstName} ${user.lastName}`;
  

  return <FlexBetween padding="1rem 6%" backgroundColor={alt}>
    <FlexBetween gap="1.75rem">
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem,2rem,2.25rem)"
        color="primary"
        onClick={() => navigate("/home")}
        sx={{
          "&:hover": {
            color: primaryLight,
            cursor: "pointer"
          }
        }}
      >
        SocialBee
      </Typography>

      {isNonMobileScreen && (
        <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
          <InputBase placeholder="Search" />
          <IconButton>
            <Search /> {/* this value is basically an icon. */}
          </IconButton>
        </FlexBetween>
      )}
    </FlexBetween>
    {/* Desktop Navbar */}

    {isNonMobileScreen ?

      (<FlexBetween gap="2rem">

        <IconButton onClick={() => dispatch(setMode())}>  {/*For setting light and dark mode */}
          {chooseTheme.palette.mode === "dark" ? (

            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (<LightMode sx={{ color: dark, fontSize: "25px" }} />)}   {/*In light mode the text must be dark */}

        </IconButton>

        <Message sx={{ fontSize: "25px" }} />
        <Notifications sx={{ fontSize: "25px" }} />
        <Help sx={{ fontSize: "25px" }} />
        <FormControl variant="standard" value={fullName} > {/* For the dropdown at the top right where we can see the user logged in and the logged out button  */}
          <Select value={fullName}
            sx={{
              backgroundColor: neutralLight,
              borderRadius: "0.25rem",
              width: "150px",
              padding: "0.25rem 1rem",
              "& .MuiSvgIcon-root": {
                pr: "0.25rem",
                width: "3rem"
              },
              "& .MuiSelect-select:focus": {
                backgroundColor: neutralLight
              }
            }}
            input={<InputBase />}
          >
            <MenuItem value={fullName}>
              <Typography>{fullName}</Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>)

      : (<IconButton onClick={() => setIsToggledMobileMenu(!isToggledMobileMenu)}>
        <Menu />
      </IconButton>)}


    {/* MOBILE NAVBAR */}

    {/*for MOBILE screens a box will be opened. */}

    {!isNonMobileScreen && isToggledMobileMenu && (
      <Box
        position="fixed"
        right="0"
        bottom="0"
        height="100%"
        zIndex="10"
        maxWidth="500px"
        minWidth="300px"
        background={background}
      >

        {/* CLOSE ICON */}
        <Box display="flex" justifyContent="flex-end" p="1rem" >
          <IconButton
            onClick={() => setIsToggledMobileMenu(!isToggledMobileMenu)}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Menu items */}

        <FlexBetween display="flex" flexDirection="column" justifyContent='center' alignItems="center" gap="2rem">

          <IconButton
            onClick={() => dispatch(setMode())}
            sx={{ fontSize: "25px" }}>  {/*For setting light and dark mode */}
            {chooseTheme.palette.mode === "dark" ? (

              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (<LightMode sx={{ color: dark, fontSize: "25px" }} />)}   {/*In light mode the text must be dark */}

          </IconButton>

          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName} > {/* For the dropdown at the top right where we can see the user logged in and the logged out button  */}
            <Select value={fullName}
              sx={{
                backgroundColor: neutralLight,
                borderRadius: "0.25rem",
                width: "150px",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem"
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>



      </Box>
    )}

  </FlexBetween>;   //we have taken flex between as a box component which allow us to pass in different css properties and use them as component property like padding.
}

export default Navbar;