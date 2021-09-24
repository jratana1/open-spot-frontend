import React, { useEffect } from 'react';

import './home.css'
import Login from '../containers/Login'

import { useLocation, useHistory, Redirect } from 'react-router-dom';

const Home = (props) => {
  const location = useLocation()
  const history = useHistory()

  const { OneSignal, loggedIn, setLoggedIn } = props

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)

    if (queryParams.has('token')) {
      let jwt = queryParams.get('token');
      let userId = queryParams.get('user_id');
      console.log(queryParams)
      localStorage.setItem("jwt", jwt)
      localStorage.setItem("userId", userId)
      props.setLoggedIn(true)
      queryParams.delete('token')
      history.replace({
        search: queryParams.toString(),
      })
    }
  }, [history, props, location.search])

    return(   
      <div className="Home">
        {loggedIn ? <Redirect to="restaurants" /> : <Login setLoggedIn={setLoggedIn} />}
      </div>
    )
  }
  
  export default Home