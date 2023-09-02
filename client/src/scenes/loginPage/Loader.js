import React from "react";
import {Stack} from  "@mui/material";
import { InfinitySpin } from "react-loader-spinner";
import {useTheme} from "@mui/material";

const Loader =() =>{
    const {palette} = useTheme();
    return(
        <Stack direction="row" justifyContent= "center" alignItems= "center" width= "100%">
        <InfinitySpin color="#77b0dd" />
        </Stack>
    )
}

export default Loader;