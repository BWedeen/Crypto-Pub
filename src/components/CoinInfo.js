import axios from 'axios';
import React, { useState } from 'react'
import { HistoricalChart } from '../config/api';

import { CryptoState } from '../CryptoContext';

const CoinInfo = ({ coin }) => {
  const [history, setHistory] = useState();
  const [days, setDays] = useState(1);

  const { currency, symbol } = CryptoState;

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days))
  }

  return (
    <div>CoinInfo</div>
  )
}

export default CoinInfo