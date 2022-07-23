import React from 'react';
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider, Fade } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { FaFortAwesomeAlt } from 'react-icons/fa';

import { CryptoState } from '../CryptoContext'
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

    const useStyles = makeStyles((theme) => ({
        select: {
            "& ul": {
                
                backgroundColor: "white",
            },
            "& li": {
                marginTop: "5px",
                fontFamily: "Montserrat",
                color: "black",
                fontSize: 15,
            },
        },
        
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
        const {currency, setCurrency, user } = CryptoState();

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
                <AppBar elevation={0} color="transparent" position="static" style={{marginBottom: "-64px", }}>
                    <Container>
                        <Toolbar style={{zIndex: "3"}}>
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
                                MenuProps={{ classes: { paper: classes.select }}}
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                variant="outlined"
                                style={{ width: 90, height: 40, marginLeft: 15, fontFamily: "Montserrat" }}
                            >
                                <MenuItem value={'USD'}>USD</MenuItem>
                                <MenuItem value={'EUR'}>EUR</MenuItem>
                                <MenuItem value={'GBP'}>GBP</MenuItem>
                                <MenuItem value={'ETH'}>ETH</MenuItem>
                            </Select>
                            { user ? <UserSidebar/> : <AuthModal/> }
                        </Toolbar>
                    </Container>
                </AppBar>
            </Fade>
        </ThemeProvider>
    )
}

export default Header