import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import CoinInfo from '../components/CoinInfo';
import { Typography } from '@material-ui/core';
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
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      paddingTop: 80,
      marginLeft: "1vw",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    textContainer: {
      paddingTop: 35,
      paddingLeft: "2vw",
      textAlign: "left",
    },
    mainInfo: {
      display: "flex",
      flexDirection: "row",
    },
    row2:{
      display: "flex",
      flexDirection: "row",
    },
    row2text:{
      paddingLeft: 43,
      fontFamily: "Montserrat",
      fontSize: "2vw",
    },
    sidebar:{
      width: "31%",
      paddingLeft: 0,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        paddingLeft: 0,
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 55,
      borderRight: "2px solid grey",
    },
    heading:{
      marginBottom: 20,
      fontFamily: "Montserrat",
      fontSize: "2.5vw",
      paddingTop: 2,
    },
    symbol:{
      fontWeight: "bold",
      fontSize: "3.5vw",
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <div className={classes.mainInfo}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <div className={classes.textContainer}>
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
          <div className={classes.row2}>
            <Typography
                  className={classes.row2text}
                >
                {symbol}{numberWithCommas(parseInt(coin?.market_data.current_price[currency.toLowerCase()]))}
            </Typography>
            <br></br>
            <br></br>
            <Typography
                className={classes.row2text}
                style={{
                  color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                }}
            >
                {coin?.market_data.price_change_percentage_24h.toFixed(2)}%
            </Typography>
          </div>
        </div>
      <CoinInfo coin={coin}/>
    </div>
  )
}

export default CoinPage