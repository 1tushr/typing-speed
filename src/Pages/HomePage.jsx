import React from "react";
import Footer from "../Components/Footer";
import TypingBox from "../Components/TypingBox";

import Header from "../Components/Header";

var randomWords =  require('random-words');

const HomePage = () => {
  
    const words = randomWords(100);

  return (
   
      <div className="canvas">
        <Header/>
        <TypingBox words={words}/>
        <Footer/>
      </div>
  );
}

export default HomePage