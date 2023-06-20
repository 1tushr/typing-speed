import { ThemeProvider } from "styled-components";
//import Header from "./Components/Header";
// import Footer from "./Components/Footer";
// import TypingBox from "./Components/TypingBox";
import { useTheme } from "./Context/ThemeContext";
import { GlobalStyles } from "./Styles/global";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/HomePage";
import { Routes,Route } from "react-router-dom";
import UserPage from "./Pages/UserPage";
function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer></ToastContainer>
      <GlobalStyles></GlobalStyles>
      <Routes>
        <Route path='/'element={<HomePage></HomePage>}></Route>
        <Route path='/user'element={<UserPage></UserPage>}></Route>
      </Routes>
    
    </ThemeProvider>
  );
}

export default App;
