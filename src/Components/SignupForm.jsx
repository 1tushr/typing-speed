import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../utils/errorMapping";

export default function SignupForm({handleClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password || !confirmPassword) {
      toast.warning("Please fill in all the details", {
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
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
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
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        toast.success("User created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleClose();
      })
      .catch((err) => {
        
        toast.error(errorMapping[err.code]||'some error occurred', {
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
  };

  return (
    <div>
      <Box
        p={3}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "white",
        }}
      >
        <TextField
          variant="outlined"
          type="email"
          label="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          type="password"
          label="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          type="password"
          label="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button variant="contained" size="large" onClick={handleSubmit}>
          SIGN UP
        </Button>
      </Box>
    </div>
  );
}
