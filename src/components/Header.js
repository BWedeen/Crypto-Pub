import React from 'react'
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider, Fade } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GiSunglasses } from 'react-icons/gi';

import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "white",
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
                main: "#080808",
            },
            type: "dark",
    },
});

  

  return (
    <ThemeProvider theme={darkTheme}>
        <Fade in={true} style={{transitionDelay:'100ms'}}>
            <AppBar elevation={0} color="transparent" position="absolute">
                <Container>
                    <Toolbar>
                        <GiSunglasses
                            size={"60"}
                            style={{
                              cursor: "pointer",
                              paddingRight: "10px",
                            }}
                            onClick={()=> history.push("/")}
                        />
                        <Typography onClick={()=> history.push("/")} className={classes.title}>Crypto Hub</Typography>
                        <Select 
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            variant="outlined"
                            style= {{
                                width: 100,
                                height: 40,
                                marginRight: 15,
                            }}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'EUR'}>EUR</MenuItem>
                            <MenuItem value={'GBP'}>GBP</MenuItem>
                            <MenuItem value={'ETH'}>ETH</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </Fade>
    </ThemeProvider>
  )
}

export default Header