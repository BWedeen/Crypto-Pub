import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { CoinList } from '../config/api';

import { CryptoState } from '../CryptoContext';

const CoinsTable = () => {
    const { currency } = CryptoState();
    
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchCoins = async () => {
        setLoading(true);

        const { data } = await axios.get(CoinList(currency));

        setCoins(data);
        setLoading(false);
    };

    //console.log(Coins Table Data:, coins)

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    return (
        <div>CoinsTable</div>
    )
}

export default CoinsTable