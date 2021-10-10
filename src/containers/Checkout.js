import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import Loader from "react-loader-spinner";


const Checkout = () => {
    const { id } = useParams()

  useEffect(() => {
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.jwt}`
        },
        body: JSON.stringify({id: id})
    }

    fetch(BASE_URL+"checkout/", config)
    .then(res => res.json())
    .then(res => {
    })
    
  }, [])

    return(   
      <div className="Checkout">
        <Loader></Loader>
      </div>
    )
  }
  
  export default Checkout