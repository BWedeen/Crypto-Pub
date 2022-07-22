import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Fade } from "@material-ui/core";
import axios from "axios";

import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../../config/api';
import AliceCarousel from 'react-alice-carousel';

const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      backgroundColor: "rgba(0, 0, 0, 0.65)",
      marginBlock: "1rem",
      marginInline: "1.5rem",
      borderRadius: "20px",
      boxShadow: "8px 8px rgba(255,220,255,0.3)",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
      fontFamily: "Montserrat",
      "&:hover" : {
        transform: "scale(1.02)",
      }
    },
  }));

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {

    const { currency, symbol } = CryptoState();
    const [trending, setTrending] = useState([]);

    const classes = useStyles();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

        setTrending(data);
    };

    //console.log("Trending Coin Data:", trending);

    useEffect(() => {
        fetchTrendingCoins();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const items = trending.map((coin) => {

        let profit = coin.price_change_percentage_24h >= 0;

        return(
            <Fade in={true} style={{transitionDelay:'400ms'}}>
                <Link
                    className={classes.carouselItem}
                    to={`/coins/${coin.id}`}
                >
                    <img 
                        src={coin?.image}
                        alt={coin.name}
                        height="80"
                        style={{ marginBottom: 10 }}
                    />
                    <span>
                        {coin?.symbol}
                        &nbsp;
                        <span
                            style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 700,
                            }}
                        >
                            {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                    </span>
                    <span style={{ fontSize: 22, fontWeight: 500 }}>
                        {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
                    </span>
                </Link>
            </Fade>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        600: {
            items: 3,
        },
        850: {
            items: 4,
        },
    };

    return (
        <div className='classes.carousel'>
            <AliceCarousel
                mouseTracking infinite
                autoPlayInterval={1100}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay 
                items={items}
                autoPlayDirection="rtl"
            />
        </div>
    )
}

export default Carousel;