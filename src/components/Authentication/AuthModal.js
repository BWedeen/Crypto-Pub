import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Backdrop, AppBar, Button, Tabs, Tab, Typography, Box } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import GoogleButton from 'react-google-button';
import { FaFortAwesomeAlt } from 'react-icons/fa';

import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import Login from './Signin';
import Signup from './Signup';
import { CryptoState } from '../../CryptoContext';




const useStyles = makeStyles((theme) => ({
    icon: {
        margin: 20,
        marginLeft: 150,
    },
    title: {
        marginLeft: 110,
        color: "white",
        fontFamily: "'Bungee', cursive",
        letterSpacing: 2.8,
        fontSize: 21,
        fontWeight: "bold",
        cursor: "pointer",
    },
        modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#000000',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23414141' fill-opacity='0.21'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        color: "white",
        borderRadius: 10,
    },
    google: {
      padding: 24,
      paddingTop: 0,
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      gap: 20,
      fontSize: 20,
      fontFamily: "Montserrat",
    },
    button: {
      width: 85,
      height: 40,
      marginLeft: 15,
      fontWeight: 700,
      fontSize: 11.6,
      backgroundColor: "white",
      fontFamily: "Montserrat",
    },
}));

export default function AuthModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newTab) => { 
    setTab(newTab);
  };

  const { setAlert } = CryptoState();

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then(res=>{
      setAlert({
        open: true,
        message: `Successfully signed in as ${res.user.email}.`,
        type: "success"
      });
      handleClose();
    })
    .catch((error) => {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    })
  };

  return (
    <div>
      <Button
        className={classes.button}
        variant='contained'
        onClick={handleOpen}
      >
        Log In
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <FaFortAwesomeAlt size={75} className={classes.icon}/>
            <Typography className={classes.title}>Crypto Pub</Typography>
            <AppBar 
                position='static'
                style={{ 
                    backgroundColor: "transparent", 
                    color: "white",
                    borderRadius: 10,
                    
                }}
            >
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant="fullWidth"
                    style={{ borderRadius: 10 }}
                >
                    <Tab label="Log In" style={{fontFamily: "Montserrat"}}/>
                    <Tab label="Sign Up" style={{fontFamily: "Montserrat"}}/>
                </Tabs>
            </AppBar>
            {tab===0 && <Login handleClose={handleClose}/> }
            {tab===1 && <Signup handleClose={handleClose}/> }
            <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", height: "49px", outline: "none", borderBottomRightRadius: 10}}
                onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
