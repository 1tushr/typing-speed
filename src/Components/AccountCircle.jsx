import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useTheme } from "../Context/ThemeContext";
import GoogleButton from "react-google-button";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import errorMapping from "../utils/errorMapping";
import { auth } from "../firebaseConfig";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function AccountCircle() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();
  const handleModalOpen = () => {
    if (isLoggedIn) {
      navigate("/user");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGoogleSignIn = (handleClose) => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((res) => {
        toast.success("Google Login Success", {
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
        toast.error(
          errorMapping[err.code] ||
            "An error occurred during Google authentication",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out", {
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
      .catch((err) => {
        toast.error("Unable to Logout", {
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
      <AccountCircleIcon onClick={handleModalOpen} />
      {isLoggedIn && <Logout onClick={handleLogout} />}
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          marginLeft: "5rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "400px" }}>
          <AppBar position="static" style={{ background: "transparent" }}>
            <Tabs value={value} onChange={handleTabChange} variant="fullWidth">
              <Tab label="Login" style={{ color: theme.textColor }} />
              <Tab label="Signup" style={{ color: theme.textColor }} />
            </Tabs>
          </AppBar>
          {value === 0 ? <LoginForm handleClose={handleClose} /> : <SignupForm handleClose={handleClose} />}
          <Box>
            <span>OR</span>
            <GoogleButton
              style={{ width: "100%", marginTop: "8px" }}
              onClick={() => handleGoogleSignIn(handleClose)}
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
}
