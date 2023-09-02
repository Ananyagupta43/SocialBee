import { useState } from "react";

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../states";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import Loader from "./Loader";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
})

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",

}

const initialValuesLogin = {
  email: "",
  password: ""

}

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const {palette} = useTheme();
  const  dispatch  = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login"
  const isRegister = pageType === "register";




  const register = async (values, onSubmitProps) => {    //params are coming from FORMIK
      //we will create form data so normally whatever we have entered will show up in the values prop
      //we could have passed it directly but because we have an image we will=>
      setIsLoading(true);
      //formData allow us to send information with iamge, we can basically add the key value pairs.
      const formData = new FormData();
      for (let value in values) {
          formData.append(value, values[value]);
      }
      formData.append('picturePath', values.picture.name);
      const savedUserResponse = await fetch(    //to save whatever is returned from the backend
      "http://localhost:3001/auth/register",
          {
              method: "POST",
              body: formData   //sending formdata in api call
          }
      );

      const savedUser=await savedUserResponse.json();
      onSubmitProps.resetForm();
      if(!savedUser.error){
        setIsLoading(false);
          setPageType("login");
      }else{
        setIsLoading(false);
        alert("User Already Exists");
      }
  }

  const login =async(values,onSubmitProps)=>{
    setIsLoading(true);
      const loggedInUserResponse = await fetch("http://localhost:3001/auth/login",  //to save whatever is returned from the backend 
      {
          method: "POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(values)   
      }
  );  
  
  const loggedIn=await loggedInUserResponse.json();
  onSubmitProps.resetForm();
  if(!loggedIn.errorMessage && !loggedIn.error){
      dispatch(
          setLogin({
           user:loggedIn.user,   //coming from redux state
           token:loggedIn.token   
          })
      );
      setIsLoading(false);
      navigate("/home");
  }else if(loggedIn.error){
    setIsLoading(false);
    alert(loggedIn.error);
  }else{
    setIsLoading(false);
    alert(loggedIn.errorMessage); 
  }
  }



  const handleFormSubmit = async (values, onSubmitProps) => {
      if (isLogin) await login(values, onSubmitProps);

      if (isRegister) await register(values, onSubmitProps);
      
  };  //these arguments will come from formik

 
 
  return  ( 
  <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}  // if logged in then initial the login values else the register values.
      validationSchema={isLogin ? loginSchema : registerSchema}
  >
      {({
          values,    //we can use these values inside the component and form
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm
      }) => (
          <form onSubmit={handleSubmit}  >
              <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4,minmax(0,1fr))"
                  sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                  }}
              >

                  {isRegister && (

                      <>
                   
                          <TextField
                               label="First Name"
                               onBlur={handleBlur}
                               onChange={handleChange}
                               value={values.firstName}
                               name="firstName"
                               error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                               helperText={touched.firstName && errors.firstName}   //if it has been touched but we have an error then we will show the error otherwise we will show if it is touched or not.
                               sx={{ gridColumn: "span 2" }}
                          />

                          <TextField
                              label="Last Name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.lastName}
                              name="lastName"
                              error={
                        Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                              helperText={touched.lastName && errors.lastName}   //if it has been touched but we have an error then we will show the error otherwise we will show if it is touched or not.
                              sx={{ gridColumn: "span 2" }}
                          />

                          <TextField
                              label="Location"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.location}
                              name="location"
                              error={Boolean(touched.location) && Boolean(errors.location)}
                              helperText={touched.location && errors.location}   //if it has been touched but we have an error then we will show the error otherwise we will show if it is touched or not.
                              sx={{ gridColumn: "span 4" }}
                          />

                          <TextField
                              label="Occupation"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.occupation}
                              name="occupation"
                              error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                              helperText={touched.occupation && errors.occupation}   //if it has been touched but we have an error then we will show the error otherwise we will show if it is touched or not.
                              sx={{ gridColumn: "span 4" }}
                          />

                          <Box 
                          gridColumn="span 4"
                              border={`1px solid ${palette.neutral.medium}`}
                              borderRadius="5px"
                              p="1rem"
                          >
                              {/* Inside the Dropzone we can have  pass files and have automatic configuration as well.   */}
                              <Dropzone
                                  acceptedFiles=".jpeg, .jpg,.png"
                                  multiple={false}
                                  //                onDrop will have a callback and will decide what we are going to do with the files once the user drops them 
                                  onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])    //we are using this to set the field value as picture
                                  }
                              >
                                  {/* here again we are going to have a callback function */}

                                  {({ getRootProps, getInputProps }) => (

                                      //we can pass in the jsx here.
                                      <Box
                                          {...getRootProps()}  /* First we are basically passing the props that dropzone gives us,.*/
                                          border={`2px dashed ${palette.primary.main}`}
                                          p="1rem"

                                          sx={{ "&:hover": { cursor: "pointer" } }}
                                      >
                                          <input {...getInputProps()} />
                                          {!values.picture ? (<p>Add Picture Here</p>) : (<FlexBetween>
                                              <Typography>{values.picture.name}</Typography>
                                              <EditOutlinedIcon />
                                          </FlexBetween>
                                          )}
                                      </Box>

                                  )}

                              </Dropzone>
                          </Box>
                      </>

                  )}

                  {/* Now this section is going to be for both login and register */}
                  <TextField
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={Boolean(touched.email) && Boolean(errors.email)}
                      helperText={touched.email && errors.email}   //if it has been touched but we have an error then we will show the error otherwise we will show if it is touched or not.
                      sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                      label="Password"
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      error={Boolean(touched.password) && Boolean(errors.password)}
                      helperText={touched.password && errors.password}   //if it has been touched but we have an error then we will show the error otherwise we will show if it is touched or not.
                      sx={{ gridColumn: "span 2" }}
                  />

              </Box>

              {/* BUTTONS */}
              <Box>
                  <Button
                      fullWidth
                      type="submit"
                      sx={{
                          m: "2rem 0",
                          p: "1rem",
                          backgroundColor: palette.primary.main,
                          color: palette.background.alt,
                          "&:hover": { color: palette.primary.main }
                      }}
                  >
                      {isLogin ? "LOGIN" : "REGISTER"}

                  </Button>
                  {  isLoading && <Loader /> }
                  <Typography
                      onClick={() => {
                          setPageType(isLogin ? "register" : "login");
                          setIsLoading(false)
                          resetForm();
                      }}
                      sx={{
                          textDecoration: "underline",
                          color: palette.primary.main,
                          "&:hover": {
                              cursor: "pointer",
                              color: palette.primary.light
                          },
                      }}
                  >
                      {isLogin ? "Don't have an account ? Sign Up here." : "Already have an account ? Login here.."}
                  </Typography>
              </Box>

          </form>     //what formik is doing is that it is grabbing the handleFormSubmit,passing it inside the formik so that we can use it in onSubmit inside the form
      )
      }

  </Formik>
  );
};

export default Form;
