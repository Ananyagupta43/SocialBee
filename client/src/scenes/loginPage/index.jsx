import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
//rem is based on root sizes and allow us to have consistency across different browsers
const LoginPage = () => {
    const navigate = useNavigate();
    const chooseTheme = useTheme();
    const primaryLight = chooseTheme.palette.primaryLight;
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    return <Box width="100%" backgroundColor={chooseTheme.palette.background.alt} p="1rem 6%" textAlign="center">
        <Box>
            <Typography
                fontWeight="bold"
                fontSize="32px"
                color="primary"
            >
                SocialBee
            </Typography>
        </Box>

        <Box
            width={isNonMobileScreens ? "50%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={chooseTheme.palette.background.alt}
        >

            <Typography
                fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} >
                Welcome to SocialBee, the Social Media for Sociopaths!
            </Typography>
            <Form />

        </Box>
    </Box>
}

export default LoginPage;