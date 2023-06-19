import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useTheme } from "../Context/ThemeContext";
import GoogleButton from "react-google-button";
import {signInWithPopup,GoogleAuthProvider}from 'firebase/auth';
import { toast } from "react-toastify";
import errorMapping from "../utils/errorMapping";
import { auth } from "../firebaseConfig";




export default function AccountCircle() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { theme } = useTheme();
  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValueChange = (e, v) => {
    setValue(v);
  };
const googleProvider=new GoogleAuthProvider();
  const handleGoogleSignIn=()=>{
     signInWithPopup(auth,googleProvider).then((res)=>{
      toast.success('Google Login Success', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
     }).catch((err)=>{
     
      toast.error( errorMapping[err.code]||'some error occurred while using google authentication', {
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
     
  }

  return (
    <div>
      <AccountCircleIcon onClick={handleModalOpen} />

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
        <div style={{ width: "400px" ,/*textAlign:'centre'*/}}>
          <AppBar position="static" style={{ background: "transparent" }}>
            <Tabs
              value={value}
              onChange={handleValueChange}
              variant="fullWidth"
            >
              <Tab label="Login" style={{ color: theme.textColor }}>
                Login
              </Tab>
              <Tab label="Signup" style={{ color: theme.textColor }}>
                Signup
              </Tab>
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm></LoginForm>}
          {value === 1 && <SignupForm></SignupForm>}
          <Box >
            <span>OR</span>
            <GoogleButton style={{width:'100%',marginTop:'8px'}} onClick={handleGoogleSignIn}></GoogleButton>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
