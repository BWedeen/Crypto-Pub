import { createTheme, makeStyles, ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from "chart.js";
import { CryptoState } from '../CryptoContext';
import SelectButton from './SelectButton';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const { currency, symbol } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency ))

    setHistoricData(data.prices);
  };

  //console.log("historic data", historicData)

  useEffect(()=>{
    fetchHistoricData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[currency, days])

  const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "1 Week",
      value: 7,
    },
    {
      label: "2 Weeks",
      value: 14,
    },
    {
      label: "1 Month",
      value: 30,
    },
  ]

  const chartDays2 = [
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
    {
      label: "3 Years",
      value: 1096,
    },
    {
      label: "All Time",
      value: "max",
    },
  ]

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItmes: "center",
      marginTop: 35,
      paddingBlock: 40,
      [theme.breakpoints.down("lg")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
        marginInline:"4rem",
      },
    },
    heading:{
      fontFamily: "Montserrat",
      fontSize: "35px",
      textAlign:"center",
      marginBottom: "10px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        fontSize: 15,
      },
    },
    buttonRow:{
      [theme.breakpoints.down("md")]: {
        width: "100%",
        textAlign: "center",
        fontSize: 13,
      },
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          !historicData ? (
            <></>
          ) : (
            <>
              <Typography
                variant="h3"
                className={classes.heading}
              >
                {coin.name} price ({currency}) over 
                <b>
                  {days===1 && " the past 24 hours"}
                  {days===7 && " the past week"}
                  {days===14 && " the past 2 weeks"}
                  {days===30 && " the past month"}
                  {days===90 && " the past 3 months"}
                  {days===365 && " the past year"}
                  {days===1096 && " the past 3 years"}
                  {days==="max" && " it's lifetime"}
                </b>.
              </Typography>
              <Line
                data={{
                    labels: historicData.map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                          : `${date.getHours()}:${date.getMinutes()} AM`;
                      return days === 1 ? time : date.toLocaleDateString();
                    }),

                  datasets: [
                    {
                      data: historicData.map((coin) => coin[1]),
                      label: `${symbol}`,
                      borderColor: "#FFF",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 0.8,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: 'rgba(145, 145, 145,0.2)',
                        borderColor: 'rgba(145, 145, 145,0.45)'
                      },
                      ticks: {
                        color: 'white',
                        font: {
                          size: 15,
                          
                        }
                      }
                    },
                    y: {
                      grid: {
                        color: 'rgba(145, 145, 145,0.2)',
                        borderColor: 'rgba(145, 145, 145,0.45)'
                      },
                      ticks: {
                        color: 'white',
                        font: {
                          size: 15,
                          family: "Montserrat",
                        }
                      }
                    }
                  },
                }}
              />
              <div
                className={classes.buttonRow}
                style={{
                  display: "flex",
                  marginTop: 20,
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                {chartDays.map(day => (
                  <SelectButton
                    key={day.value}
                    onClick={()=>setDays(day.value)}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                ))}
              </div>
              <div
                className={classes.buttonRow}
                style={{
                  display: "flex",
                  marginTop: 20,
                  justifyContent: "space-around",
                  width: "100%",
                  paddingBottom: 25,
                }}
              >
                {chartDays2.map(day => (
                  <SelectButton
                    key={day.value}
                    onClick={()=>setDays(day.value)}
                    selected={day.value=== days}
                  >
                    {day.label}
                  </SelectButton>
                ))}
              </div>
            </>
          )
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo