import { ThemeProvider } from "styled-components";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import TypingBox from "./Components/TypingBox";
import { useTheme } from "./Context/ThemeContext";
import { GlobalStyles } from "./Styles/global";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer></ToastContainer>
      <div className="canvas">
        <GlobalStyles />
        <Header></Header>
        <TypingBox />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
