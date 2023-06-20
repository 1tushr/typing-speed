import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth, db } from "../firebaseConfig";

export default function UserInfo({ totalTestTaken }) {
  const [user, setUser] = useState(null);
  const [totalTests, setTotalTests] = useState(0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const { email, metadata } = currentUser;
          const { creationTime } = metadata;
          setUser({ email, creationTime });

          const testsRef = db.collection("Tests");
          const snapshot = await testsRef
            .where("userId", "==", currentUser.uid)
            .get();
          setTotalTests(snapshot.size);

          // Store user information in local storage
          localStorage.setItem("userInfo", JSON.stringify({ email, creationTime }));
          localStorage.setItem("totalTests", snapshot.size);

          // Set up listener for new tests
          testsRef.where("userId", "==", currentUser.uid).onSnapshot((querySnapshot) => {
            setTotalTests(querySnapshot.size);
            localStorage.setItem("totalTests", querySnapshot.size);
          });
        } catch (error) {
          console.log("Error fetching user info:", error);
        }
      }
    };

    // Check if user information exists in local storage
    const storedUserInfo = localStorage.getItem("userInfo");
    const storedTotalTests = localStorage.getItem("totalTests");

    if (storedUserInfo && storedTotalTests) {
      setUser(JSON.parse(storedUserInfo));
      setTotalTests(parseInt(storedTotalTests));
    } else {
      fetchUserInfo();
    }
  }, []);

  return (
    <div className="user-profile">
      <div className="user">
        <div className="picture">
          <AccountCircleIcon
            style={{
              display: "block",
              transform: "scale(6)",
              margin: "auto",
              marginTop: "4rem",
            }}
          />
        </div>
        <div className="info">
          <div className="email">{user?.email}</div>
          <div className="joined-at">{user?.creationTime}</div>
        </div>
        <div className="total-tests">{totalTestTaken} Tests Taken</div>
      </div>
    </div>
  );
}
