import { BrowserRouter, Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {

  const isAuth = Boolean(useSelector((state) => state.token));
  const mode = useSelector((state) => state.mode);  // will help us grab the value that we created in our initial state 
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); //this will set up our theme 

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>  {/*lets us control the overall design of the project*/}
          <CssBaseline />  {/*will reset the css to basic css  */}
          <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />} />

            <Route path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
