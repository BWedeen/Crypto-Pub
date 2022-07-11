import axios from 'axios';
import React, { useState, useEffect, } from 'react'
import { useHistory } from 'react-router-dom';
import { CoinList } from '../config/api';
import { createTheme,  makeStyles, ThemeProvider, Fade, Container, Typography, TextField, TableContainer, TableHead, TableRow, Table, TableBody, TableCell, LinearProgress } from '@material-ui/core';

import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from '@material-ui/lab';

const CoinsTable = () => {
    const { currency, symbol } = CryptoState();
    const history = useHistory();

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);

    const fetchCoins = async () => {
        setLoading(true);

        const { data } = await axios.get(CoinList(currency));

        setCoins(data);
        setLoading(false);
    };

    console.log("Coins Table Data:", coins)

    const darkTheme = createTheme({
        textfield: {
            fontFamily: "Montserrat", 
        },
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
    }})

    useEffect(() => {
        fetchCoins();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search)
            || coin.symbol.toLowerCase().includes(search)
        ))
    }

    const useStyles = makeStyles(() => ({
        row: {
            backgroundColor: "#110018",
            cursor: "pointer",
            fontFamily: "Montserrat",
            "&:hover" : {
                backgroundColor:"#240036"
            }
        }
    }))

    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <Fade in={true} style={{transitionDelay:'900ms'}} >
                <Container style={{ textAlign: "center" }}>
                    <Typography
                        variant="h4"
                        style={{ 
                            textAlign: "left", 
                            marginTop: "3rem",
                            marginBottom: "1rem",
                            fontFamily: "Montserrat" ,
                            fontWeight: "200",
                            color: "white",
                        }}
                    >
                        Cryptocurrency by Market Cap
                    </Typography>
                    <TextField
                        onChange={(e)=>setSearch(e.target.value)}
                        label="Search Cryptocurrencies"
                        variant="filled"
                        style={{
                            marginBottom: 20,
                            width: "100%",    
                        }}
                    />

                    <TableContainer>
                        {
                            loading ? (
                                <LinearProgress style={{ backgroundColor: "purple" }}/>
                            ) : (
                                <Table>
                                    <TableHead style={{ backgroundColor: "#fcfcfc" }}>
                                        <TableRow>
                                            
                                            {["Coin","Price","24h Change", "Market Cap"].map((head) => (
                                                <TableCell
                                                    style={{
                                                        color: "black",
                                                        fontWeight: "700",
                                                        fontSize: 17,
                                                        fontFamily: "Montserrat" ,
                                                    }}
                                                    key={head}    
                                                    align={head === "Coin" ? "" : "right"}
                                                >
                                                    {head}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {handleSearch()
                                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                        .map((row)=>{
                                            const profit = row.price_change_percentage_24h > 0;

                                            return (
                                                <TableRow
                                                    onClick={() => history.push(`/coins/${row.id}`)}
                                                    className={classes.row}
                                                    key={row.name}
                                                >
                                                    <TableCell
                                                        component='th' 
                                                        scope='row'
                                                        style={{
                                                            display: "flex",
                                                            gap: 15,
                                                        }}
                                                    >
                                                        <img 
                                                            src={row?.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ marginBottom: 10 }}
                                                        />
                                                        <div style= {{ display: "flex", flexDirection: "column" }}>
                                                            <span
                                                                style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 22,
                                                                    fontFamily: "Montserrat",
                                                                }}
                                                            >
                                                                {row.symbol}
                                                            </span>
                                                            <span style={{ 
                                                                color: "white", 
                                                                fontFamily: "Montserrat", 
                                                            }}>
                                                                {row.name}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell 
                                                        align="right"
                                                        style={{
                                                            fontWeight: 300,
                                                            fontFamily: "Montserrat",
                                                        }}
                                                    >
                                                        {symbol}{numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell 
                                                        align="right"
                                                        style={{
                                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                            fontWeight: 500,
                                                            fontFamily: "Montserrat",
                                                        }}
                                                    >
                                                        {profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>   
                                                    <TableCell 
                                                        align="right"
                                                        style={{
                                                            fontWeight: 500,
                                                            fontFamily: "Montserrat",
                                                        }}
                                                    >
                                                        {symbol}{numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                                                    </TableCell>         
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            )
                        }
                    </TableContainer>
                </Container>
            </Fade>
            <Pagination
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    count={(handleSearch()?.length/10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0,450);
                    }}
                />
        </ThemeProvider>
    )
}

export default CoinsTable