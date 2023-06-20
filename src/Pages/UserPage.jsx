import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import TableUser from "../Components/TableUser";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";

export default function UserPage() {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchData(user.uid);
      } else {
        setData([]);
        setGraphData([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchData = async (uid) => {
    try {
      const resultsRef = db.collection("Results");
      const snapshot = await resultsRef.get();
      const tempData = [];
      const tempGraphData = [];

      snapshot.docs.forEach((doc) => {
        const { timeStamp, wpm, userId } = doc.data();
        if (userId === uid) {
          tempData.push(doc.data());
          tempGraphData.push([timeStamp.toDate().toLocaleString().split(",")[0], wpm]);
        }
      });

      setData(tempData);
      setGraphData(tempGraphData);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  return (
    <div className="canvas">
      <UserInfo totalTestTaken={data.length} />
      <div className="graph-user-page">
        <Graph graphData={graphData} />
      </div>
      <TableUser className="table" data={data} />
    </div>
  );
}
