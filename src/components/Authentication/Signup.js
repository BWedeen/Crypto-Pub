import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { CryptoState } from "../../CryptoContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match.",
        type: "error",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAlert({
        open: true,
        message: `Account successfully created. Welcome ${result.user.email}.`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message.slice(10),
        type: "error",
      });
      return;
    }
  };

  return (
    <Box
      width={375}
      p={3.5}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "13px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth="true"
        backgroundColor="white"
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{
          backgroundColor: "white",
          fontFamily: "Montserrat",
          fontWeight: "700",
        }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
