import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ReactHtmlParser from "react-html-parser";
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import CoinInfo from '../components/CoinInfo';
import { Typography, CircularProgress, Tooltip, Fade } from '@material-ui/core';
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

  const profit1h = coin?.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()].toFixed(2) > 0;
  const profit24h = coin?.market_data.price_change_percentage_24h.toFixed(2) > 0;
  const profit7d = coin?.market_data.price_change_percentage_7d.toFixed(2) > 0;

  useEffect(() => {
    fetchCoin();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      paddingTop: "30px",
      [theme.breakpoints.down("lg")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar:{
      width: "28%",
      marginLeft: "60px",
      [theme.breakpoints.down("lg")]: {
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
      [theme.breakpoints.down("lg")]: {
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
      [theme.breakpoints.down("lg")]: {
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
      [theme.breakpoints.down("lg")]: {
        width: "100%",
        paddingLeft: 0,
        marginRight: "0rem",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      },
    },
    rightColumn:{
      width: "74%",
      display: "flex",
      flexDirection: "column",
      marginInline: "2rem",
      [theme.breakpoints.down("lg")]: {
        width: "100%",
        paddingLeft: 0,
        margin: "0rem",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      },
    },
    rowText:{
      fontFamily: "Montserrat",
      fontSize: "22px",
      fontWeight: "600",
      [theme.breakpoints.down("lg")]: {
        fontSize: "20px",
        fontWeight: "600",
      },
    },
    rowText2:{
      fontFamily: "Montserrat",
      fontSize: "30px",
      color:"#e2dbff"
    },
    rowText3:{
      fontFamily: "Montserrat",
      fontSize: "20px",
      [theme.breakpoints.down("lg")]: {
        paddingLeft: 27
      },
    },
    rowText4:{
      fontFamily: "Montserrat",
      fontSize: "30px",
      fontWeight: "600",
      [theme.breakpoints.down("lg")]: {
        paddingLeft: 27,
        fontWeight: "600",
      },
    },
    rowText5:{
      fontFamily: "Montserrat",
      fontSize: "20px",
      marginBottom: "50px",
      [theme.breakpoints.down("lg")]: {
        paddingInline: 27
      },
    },
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
          size={250}
          thickness={1}
        />
      </div>
    </div>
  )

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <Fade in={true} style={{transitionDelay:'100ms'}}>
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
        </Fade>
        <Fade in={true} style={{transitionDelay:'150ms'}}>
          <div className={classes.row}>
            <div className={classes.column}>
              <Tooltip title="The current price of the coin." placement='top-start'>
                <Typography className={classes.rowText}>
                  Current Price
                  <AiOutlineInfoCircle
                    size={"15"}
                    style={{
                      marginLeft: "5px",
                    }}     
                 />
                </Typography>
              </Tooltip>
              <Typography className={classes.rowText2}>
                {symbol}{numberWithCommas(parseFloat(coin?.market_data.current_price[currency.toLowerCase()]).toFixed(2))}
              </Typography>
            </div>
            <div className={classes.column}>
              <Tooltip title="The percent change in trading volume for this asset compared to 1 hour ago." placement='top-start'>
                <Typography className={classes.rowText}>
                  1H Change
                  <AiOutlineInfoCircle
                      size={"15"}
                      style={{
                        marginLeft: "5px",
                      }}     
                  />
                </Typography>
              </Tooltip>
              <Typography 
                className={classes.rowText2}
                style={{
                  color: profit1h > 0 ? "rgb(14, 203, 129)" : "red",
                }}
              >
              {profit1h && "+"}{coin?.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()].toFixed(2)}%
              </Typography>
            </div>
          </div>
        </Fade>
        <Fade in={true} style={{transitionDelay:'200ms'}}>
          <div className={classes.row}>
            <div className={classes.column}>
              <Tooltip title="The percent change in trading volume for this asset compared to 24 hours ago." placement='top-start'>
                <Typography className={classes.rowText}>
                  24H Change
                  <AiOutlineInfoCircle
                      size={"15"}
                      style={{
                        marginLeft: "5px",
                      }}     
                  />
                </Typography>
              </Tooltip>
              <Typography className={classes.rowText2} style={{color: profit24h > 0 ? "rgb(14, 203, 129)" : "red"}}>
              {profit24h && "+"}{coin?.market_data.price_change_percentage_24h.toFixed(2)}%
              </Typography>
            </div>
            <div className={classes.column}>
              <Tooltip title="The percent change in trading volume for this asset compared to 7 days ago." placement='top-start'>
                <Typography className={classes.rowText}>
                  7D Change
                  <AiOutlineInfoCircle
                      size={"15"}
                      style={{
                        marginLeft: "5px",
                      }}     
                  />
                </Typography>
              </Tooltip>
              <Typography 
                className={classes.rowText2}
                style={{color: profit7d > 0 ? "rgb(14, 203, 129)" : "red"}}
              >
              {profit7d && "+"}{coin?.market_data.price_change_percentage_7d.toFixed(2)}%
              </Typography>
            </div>
          </div>
        </Fade>
        <Fade in={true} style={{transitionDelay:'250ms'}}>
          <div className={classes.row}>
            <div className={classes.column}>
              <Tooltip title="The lowest price paid for this asset in the last day." placement='top-start'>
                <Typography className={classes.rowText}>
                  24H Low
                  <AiOutlineInfoCircle
                        size={"15"}
                        style={{
                          marginLeft: "5px",
                        }}     
                    />
                </Typography>
              </Tooltip>
              <Typography className={classes.rowText2} style={{color:"#ffcfcf"}}>
              {symbol}{numberWithCommas(parseFloat(coin?.market_data.low_24h[currency.toLowerCase()]).toFixed(2))}
              </Typography>
            </div>
            <div className={classes.column}>
              <Tooltip title="The highest price paid for this asset in the last day." placement='top-start'>
                <Typography className={classes.rowText}>
                  24H High
                  <AiOutlineInfoCircle
                      size={"15"}
                      style={{
                        marginLeft: "5px",
                      }}     
                  />
                </Typography>
              </Tooltip>
              <Typography className={classes.rowText2} style={{color:"#d2ffcf"}}>
                {symbol}{numberWithCommas(parseFloat(coin?.market_data.high_24h[currency.toLowerCase()]).toFixed(2))}
              </Typography>
            </div>
          </div>
        </Fade>
        <Fade in={true} style={{transitionDelay:'250ms'}}>
          <div className={classes.row}>
            <div className={classes.column}>
              <Tooltip title="A high market cap implies that the asset is highly valued by the market." placement='top-start'>
                <Typography className={classes.rowText}>
                  Market Cap
                  <AiOutlineInfoCircle
                      size={"15"}
                      style={{
                        marginLeft: "5px",
                      }}     
                  />
                </Typography>
              </Tooltip>
              <Typography className={classes.rowText2}>
                {symbol}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
              </Typography>
            </div>
            <div className={classes.column}>
              <Tooltip title="The total dollar value of all transactions for this asset over it's lifetime." placement='top-start'>
                <Typography className={classes.rowText}>
                  Total Volume
                  <AiOutlineInfoCircle
                      size={"15"}
                      style={{
                        marginLeft: "5px",
                      }}     
                  />
                </Typography>
              </Tooltip>
              <Typography 
                className={classes.rowText2}>
                  {symbol}{numberWithCommas(coin?.market_data.total_volume[currency.toLowerCase()].toString().slice(0, -6))}M
              </Typography>
            </div>
          </div>
        </Fade>
      </div>
        <Fade in={true} style={{transitionDelay:'250ms'}}>      
          <div className={classes.rightColumn}>
            <CoinInfo coin={coin}/>
            <div style={{width:"100%"}}>
              <Typography className={classes.rowText4} style={{marginBottom:"20px"}} >
                About {coin?.name}
              </Typography>
              <Typography className={classes.rowText5}>
                {ReactHtmlParser(coin?.description.en.split(". ")[0] + ". " + coin?.description.en.split(". ")[1] + ". " + coin?.description.en.split(". ")[2])}.
              </Typography>
          </div>
        </div>
      </Fade>  
    </div>
  )
}

export default CoinPage