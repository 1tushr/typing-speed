import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../utils/errorMapping";
export default function LoginForm({handleClose}) {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {theme}=useTheme();
    const handleSubmit=()=>{
if(!email||!password){

  toast.warning('Fill all details', {
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
auth.signInWithEmailAndPassword(email,password).then((res)=>{
  toast.success('Login Success', {
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




}).catch((err)=>{
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
})
    }
  return (
    <div>
      <Box
        p={3}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: 'black',
          //opacity: '.4',
      
        }}
      >
        <TextField variant="outlined" type="email" label="Enter Email" InputLabelProps={{style:{color:theme.textColor}}} onChange={(e)=>setEmail(e.target.value)} />
        <TextField variant="outlined" type="password" label="Enter Password" InputLabelProps={{style:{color:theme.textColor}}} onChange={(e)=>setPassword(e.target.value)}/>
        <Button style={{color:theme.background,backgroundColor:theme.textColor}} variant="contained" size="large" onClick={handleSubmit}>
          LOGIN
        </Button>
      </Box>
    </div>
  );
}
