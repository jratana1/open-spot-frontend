import GoogleButton from 'react-google-button'
import React from 'react';
import { BASE_URL } from '../App'

import Button from '@material-ui/core/Button';

export default function Login(props) {

const handleClick = () => {
  let config = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    }

    fetch(BASE_URL+"/guestLogin", config)
    .then(res => res.json())
    .then(res => {
      sessionStorage.setItem("jwt", res.token)
      props.setLoggedIn(true)
    })
}
return (
      <header className="App-header">
        <p>
          Login with google
        </p>
            <GoogleButton
                type="light"
                onClick={() => { window.location.href=BASE_URL+'authenticate-google' }}/>
        <p>
          Sign in as Guest
        </p>
            <Button
                variant="contained"
                color="primary"
                type="light"
                onClick={handleClick}>
                  Sign in as Guest
            </Button>
      </header>

  );
}