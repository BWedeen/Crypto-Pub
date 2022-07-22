import React from 'react';
import { CryptoState } from '../CryptoContext';
import { Snackbar } from '@material-ui/core';
import  MuiAlert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const Alert = () => {

    const { alert, setAlert } = CryptoState();
    
    const handleClose = async (event, reason) => {
        if(reason === "clickaway"){
            return;
        }

        setAlert({ open: false, message: alert.message, type: alert.type});
    }

    return (
        <Snackbar 
            open={alert.open} 
            autoHideDuration={3000} 
            onClose={handleClose}
        >
            <MuiAlert
                onClose={handleClose}
                elevation={10}
                variant="filled"
                severity={alert.type}
            >   
                {alert.message}
            </MuiAlert>
        </Snackbar>
    )
}

export default Alert