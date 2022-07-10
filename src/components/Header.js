import React from 'react'
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "orange",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    }
}))

const Header = () => {

    const history = useHistory();
    const {currency, setCurrency } = CryptoState();
    const classes = useStyles();
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
    },
});

  

  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Typography onClick={()=> history.push("/")}className={classes.title}>Crypto Hub</Typography>
                    <Select 
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        variant="outlined" 
                        style= {{
                            width: 100,
                            height: 40,
                            marginRigh: 15,
                        }}
                    >
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'EUR'}>EUR</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
    </ThemeProvider>
  )
}

export default Header