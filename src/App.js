import { BrowserRouter, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import 'react-alice-carousel/lib/alice-carousel.css';

import './App.css';
import Header from "./components/Header";
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';

function App() {

  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor:"#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header/>
        <Route path='/' component={HomePage} exact/>
        <Route path="/coins/:id" component={CoinPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
