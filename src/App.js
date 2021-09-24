import './App.css';
import { HashRouter, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Home from './containers/Home';
import Restaurants from './containers/Restaurants'

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import Loader from "react-loader-spinner";
import Grid from '@mui/material/Grid';

export const BASE_URL = "http://localhost:3000/";

function App() {
  
  const [isBusy, setBusy] = useState(true)
  const [loggedIn, setLoggedIn] = useState(!!sessionStorage.jwt);

  useEffect(()=> {
      setBusy(false)

  }, [])


  const renderLoad = () => {
    if (isBusy) {
      return (
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{height: '100%'}}
            >
              <h2>Loading</h2>
              <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  visible={isBusy}
                /> 
            </Grid>
      )
    } else {

      return (
        <HashRouter basename='/'>
          <Switch>
            <PublicRoute path='/' exact restricted={true} component={Home} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
            <PrivateRoute path='/restaurants/' component={Restaurants} />
          </Switch>
        </HashRouter>
      )
    }
  }

    return (
      <div className="App">
        {renderLoad()}  
      </div>
    );
}

export default App;
