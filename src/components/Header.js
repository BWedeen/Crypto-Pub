import React from 'react'
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider, Fade } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { FaFortAwesomeAlt } from 'react-icons/fa';

import { CryptoState } from '../CryptoContext'

    const useStyles = makeStyles((theme) => ({
        title: {
            flex: 1,
            color: "white",
            fontFamily: "'Bungee', cursive",
            letterSpacing: 2.8,
            fontSize: 21,
            fontWeight: "bold",
            cursor: "pointer",
            [theme.breakpoints.down("md")]: {
                letterSpacing: 2.8,
                fontSize: 15,
            },
        },
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
                <AppBar elevation={0}color="transparent" position="absolute">
                    <Container>
                        <Toolbar>
                            <FaFortAwesomeAlt
                                size={"50"}
                                style={{
                                    cursor: "pointer",
                                    paddingRight: "10px",
                                }}
                                onClick={()=> history.push("/")}
                            />
                            <Typography onClick={()=> history.push("/")} className={classes.title}>Crypto Pub</Typography>
                            <Select 
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                variant="outlined"
                                style={{ width: 90, height: 40, marginLeft: 15 }}
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