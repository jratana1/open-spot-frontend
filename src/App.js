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
  window.OneSignal = window.OneSignal || [];
  const OneSignal = window.OneSignal;

  const [isBusy, setBusy] = useState(true)
  const [loggedIn, setLoggedIn] = useState(!!localStorage.jwt);
  
  const getAuthHash = async () => {
    let config = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.jwt}`
      },
    }
  
    if (loggedIn) {
      const hash = await fetch(BASE_URL+"onesignal_auth_hash", config)
            .then(res => res.json())
            .then(res => {
            return res
            })
      console.log("here bigtime")
      return hash
    }
  }

  useEffect(()=> {
      setBusy(false)

  }, [])

  useEffect(() => {
      OneSignal.push(function() {
        OneSignal.on('subscriptionChange', function (isSubscribed) {
          console.log("The user's subscription state is now:",isSubscribed);
            OneSignal.push(function() {
              OneSignal.getUserId(function(userId) {
                console.log("OneSignal User ID:", userId);
                getAuthHash().then(res => {
                  let externalUserId= localStorage.getItem("userId")
                  console.log(res)
                  OneSignal.setExternalUserId(externalUserId, res.hash)
                })

              });
            });  
        });
      });

    OneSignal.push(() => {
      OneSignal.init({
        appId: "f4244a76-d8ad-4774-9e54-e0f48b8110ce"
      })
    });
   },[]);

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
            <PublicRoute path='/' exact restricted={true} component={Home} OneSignal={OneSignal} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
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
