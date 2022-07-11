import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ReactHtmlParser from "react-html-parser";

import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import CoinInfo from '../components/CoinInfo';
import { Typography, CircularProgress } from '@material-ui/core';
import { numberWithCommas } from '../components/Banner/Carousel';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState()

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  console.log("Page", coin);

  const profit = coin?.market_data.price_change_percentage_24h > 0;

  useEffect(() => {
    fetchCoin();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      paddingTop: "80px",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar:{
      width: "31%",
      marginLeft: "60px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginLeft: "0px",
        alignItems: "center",
      },
      display: "flex",
      flexDirection: "column",
      marginTop: 55,
      borderRight: "2px solid grey",
    },
    sidebarTop: {
      display: "flex",
      flexDirection: "row",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        paddingLeft: 0,
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      },
    },
    sidebarTopRow: {
      marginTop: "45px",
      marginInline: "7%",
      [theme.breakpoints.down("md")]: {
        marginTop: "10px",
        marginBottom: "10px",
      },
    },
    heading:{
      marginBottom: 20,
      fontFamily: "Montserrat",
      fontSize: "35px",
      paddingTop: 2,
    },
    symbol:{
      fontWeight: "bold",
      fontSize: "45px",
      fontFamily: "Montserrat",
    },
    row:{
      width: "100%",
      display: "flex",
      flexDirection: "row",
      paddingBottom: "40px",
    },
    column:{
      width: "50%",
      display: "flex",
      flexDirection: "column",
      marginRight: "3rem",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        paddingLeft: 0,
        marginRight: "0rem",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      },
    },
    rowText:{
      fontFamily: "Montserrat",
      fontSize: "22px",
      fontWeight: "600",
      [theme.breakpoints.down("md")]: {
        fontSize: "20px",
        fontWeight: "600",
      },
    },
    rowText2:{
      fontFamily: "Montserrat",
      fontSize: "30px",
    },
    rowText3:{
      fontFamily: "Montserrat",
      fontSize: "20px",
      [theme.breakpoints.down("md")]: {
        paddingLeft: 27
      },
    },
    rowText4:{
      fontFamily: "Montserrat",
      fontSize: "30px",
      fontWeight: "600",
      [theme.breakpoints.down("md")]: {
        paddingLeft: 27,
        fontWeight: "600",
      },
    }
  }));

  const classes = useStyles();

  if(!coin) return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '10rem'}}>
          <CircularProgress
                      style={{ color: "white" }}
                      size={250}
                      thickness={1}
          />
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignContent: "center", width:"69%", paddingTop: '13rem', overflow:"hidden"}}>
          <CircularProgress
                      style={{ color: "white" }}
                      size={350}
                      thickness={1}
          />
      </div>
    </div>
  )

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <div className={classes.sidebarTop}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <div className={classes.sidebarTopRow}>
            <Typography
              variant="h3"
              className={classes.symbol}
              style={{
                textTransform: "uppercase",
              }}
            >
              {coin?.symbol}
            </Typography>
            <Typography
              variant="h3"
              className={classes.heading}
            >
              {coin?.name}
            </Typography>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.column}>
            <Typography className={classes.rowText}>
              Current Price
            </Typography>
            <Typography className={classes.rowText2}>
              {symbol}{numberWithCommas(parseFloat(coin?.market_data.current_price[currency.toLowerCase()]).toFixed(2))}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.rowText}>
              24h Change
            </Typography>
            <Typography 
              className={classes.rowText2}
              style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              }}
            >
            {coin?.market_data.price_change_percentage_24h.toFixed(2)}%
            </Typography>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.column}>
            <Typography className={classes.rowText} style={{color:"#ffcfcf"}}>
            24h Low
            </Typography>
            <Typography className={classes.rowText2}>
            {symbol}{numberWithCommas(parseFloat(coin?.market_data.high_24h[currency.toLowerCase()]).toFixed(2))}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.rowText} style={{color:"#d2ffcf"}}>
              24h High
            </Typography>
            <Typography 
              className={classes.rowText2}
            >
            {symbol}{numberWithCommas(parseFloat(coin?.market_data.low_24h[currency.toLowerCase()]).toFixed(2))}
            </Typography>
          </div>
        </div>
        <div className={classes.row}>
          <div style={{width:"90%"}}>
            <Typography className={classes.rowText4} style={{marginBottom:"20px"}} >
              Coin Description
            </Typography>
            <Typography className={classes.rowText3}>
              {ReactHtmlParser(coin?.description.en.split(". ")[0])}. {ReactHtmlParser(coin?.description.en.split(". ")[1])}.
            </Typography>
          </div>
        </div>
      </div>
      <CoinInfo coin={coin}/>
    </div>
  )
}

export default CoinPage