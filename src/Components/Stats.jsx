import React, { useEffect, useState } from "react";
import Graph from "./Graph";
import { auth, db } from "../firebaseConfig";
import { toast } from "react-toastify";

export default function Stats({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  graphData,
}) {
  const [results, setResults] = useState([]);

  let timeSet = new Set();
  const newGraph = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

  const pushDataToDb = () => {
    if (isNaN(accuracy)) {
      toast.error("Invalid test ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const resultsRef = db.collection("Results");
    const user = auth.currentUser;

    if (user && user.uid) {
      resultsRef
        .add({
          wpm: wpm,
          accuracy: accuracy,
          timeStamp: new Date(),
          characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
          userId: user.uid,
        })
        .then(() => {
          toast.success("Data saved to db", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        })
        .catch(() => {
          toast.error("Unable to save data", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    } else {
      toast.warning("Login to save the result", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    pushDataToDb();
  }, []);

  useEffect(() => {
    const fetchDataFromDb = () => {
      const resultsRef = db.collection("Results");
      const user = auth.currentUser;
  
      if (user && user.uid) {
        resultsRef
          .where("userId", "==", user.uid)
          .orderBy("timeStamp", "desc") // Sort the results in descending order
          .get()
          .then((querySnapshot) => {
            const fetchedResults = querySnapshot.docs.map((doc) => doc.data());
            setResults(fetchedResults);
          })
          .catch((error) => {
            console.log(error)
            toast.error("Unable to fetch data: " + error.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          });
      } else {
        toast.warning("Login to save the result", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    };
  
    fetchDataFromDb();
  }, []);
  return (
    <div className="stats-box">
      <div className="left-stats">
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}</div>
        <div className="title">Characters</div>
        <div className="subtitle">
          {correctChars}/{incorrectChars}/{missedChars}/{extraChars}
        </div>
      </div>
      <div className="right-stats">
        <Graph graphData={newGraph}></Graph>
      </div>
      <div className="results-list">
        <h2>Recent Results:</h2>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <div>WPM: {result.wpm}</div>
              <div>Accuracy: {result.accuracy}</div>
              <div>Timestamp: {result.timeStamp.toDate().toLocaleString()}</div>
              <div>Characters: {result.characters}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
