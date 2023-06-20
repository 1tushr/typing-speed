import React, { useEffect, useState, useRef, useMemo, createRef } from "react";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";
var randomwords = require("random-words");

export default function TypingBox() {
  const inputRef = useRef(null);
  const { testTime } = useTestMode();
  const [countDown, setCountDown] = useState(testTime);
  const [intervalId, setInervalId] = useState(null);
  const [tesStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [correctChars, setCorrectChar] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [wordsArray, setWordsArray] = useState(() => {
    return randomwords(50);
  });

  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);

  //timer
  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setInervalId(intervalId);
    function timer() {
      setCountDown((latestCountDown) => {
        setCorrectChar((correctChars)=>{
         setGraphData((graphData)=>{
          return [...graphData,[testTime-latestCountDown+1,
          (correctChars/5)/((testTime-latestCountDown+1)/60)]];
         })
          return correctChars;
        })
        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return latestCountDown - 1;
      });
    }
  };

  const resetTest = () => {
    clearInterval(intervalId);
    setCountDown(testTime);
    setCurrWordIndex(0);
    setCurrCharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(randomwords(50));
    resetWordSpanRefClassname();
    focusInput();
  };

  const resetWordSpanRefClassname = () => {
    wordsSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        if (j.className.includes("extra")) {
          j.remove();
        }
        j.className = " ";
      });
    });
    wordsSpanRef[0].current.childNodes[0].className = "char current";
  };

  const handleUserInput = (e) => {
    if (!tesStart) {
      startTimer();
      setTestStart(true);
    }

    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

    //logic for space
    if (e.keyCode === 32) {
      if (allCurrChars.length <= currCharIndex) {
        let correctCharInWord =
          wordsSpanRef[currCharIndex].current.querySelectorAll(".correct");
        if (correctCharInWord.length === allCurrChars.length) {
          setCorrectWords(correctWords + 1);
        }
        //remove cursor from the last place in a word
        allCurrChars[currCharIndex - 1].classList.remove("current-right");
      } else {
        //remove cursor from in between of the word
        setMissedChars(missedChars + (allCurrChars.length - currCharIndex));
        allCurrChars[currCharIndex].classList.remove("current");
      }
      wordsSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "current";
      setCurrCharIndex(0);
      setCurrWordIndex(currWordIndex + 1);

      return;
    }

    //logic for the backspace
    if (e.keyCode === 8) {
      if (currCharIndex !== 0) {
        if (allCurrChars.length === currCharIndex) {
          if (allCurrChars[currCharIndex - 1].className.includes("extra")) {
            allCurrChars[currCharIndex - 1].remove();
            allCurrChars[currCharIndex - 2].className += " current-right";
          } else {
            allCurrChars[currCharIndex - 1].className = "current";
          }
          setCurrCharIndex(currCharIndex - 1);
          return;
        }
        allCurrChars[currCharIndex].className = "";
        allCurrChars[currCharIndex - 1].className = "current";
        setCurrCharIndex(currCharIndex - 1);
      }

      return;
    }

    if (currCharIndex === allCurrChars.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "incorrect extra current-right";
      allCurrChars[currCharIndex - 1].classList.remove("current-right");
      wordsSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex + 1);
      setExtraChars(extraChars + 1);
      return;
    }

    if (e.key === allCurrChars[currCharIndex].innerText) {
      allCurrChars[currCharIndex].className = "correct";
      setCorrectChar(correctChars + 1);
      if (currCharIndex + 1 === allCurrChars.length) {
        allCurrChars[currCharIndex].className += " current-right";
        setCorrectWords(correctWords + 1);
      } else {
        allCurrChars[currCharIndex + 1].className = "current";
      }
      setCurrCharIndex(currCharIndex + 1);
    } else {
      allCurrChars[currCharIndex].className = "incorrect";
      setIncorrectChars(incorrectChars + 1);
    }
  };

  //calculate WPM
  const calculateWPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };

  //calculate accuracy
  const calculateAcc = () => {
    return (correctWords / currWordIndex) * 100;
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    resetTest();
  }, [testTime]);

  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = "char current";
  }, [wordsSpanRef]);

  return (
    <>
        {!testEnd && <UpperMenu countDown={countDown} />}
    
    {testEnd ? (
      <Stats
        wpm={calculateWPM()}
        accuracy={calculateAcc()}
        correctChars={correctChars}
        incorrectChars={incorrectChars}
        missedChars={missedChars}
        extraChars={extraChars}
        graphData={graphData}
      />
    ) : (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {wordsArray.map((words, index) => (
              <span className="word" ref={wordsSpanRef[index]}>
                {words.split("").map((char, index) => (
                  <span key={index}>{char}</span>
                ))}
              </span>
            ))}
          </div>
          <input
            type="text"
            className="hidden-input"
            ref={inputRef}
            onKeyDown={handleUserInput}
          />
        </div>
      )}
    </>
  );
}
