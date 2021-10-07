import React, { useState, useEffect } from 'react';
import RestCard from '../components/RestCard'
import { BASE_URL } from '../App'

import Grid from '@mui/material/Grid';

function Restaurants() {
const [restaurants, setRestaurants] = useState([])

useEffect( () => {
        let config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
            },
        }
        
        fetch(BASE_URL+"restaurants", config)
                .then(res => res.json())
                .then(res => {
                setRestaurants(res)
                })

    }, [])

    const handleLike = () => {
        let config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
            },
        }
        
        fetch(BASE_URL+"likes", config)
                .then(res => res.json())
                .then(res => {
                setRestaurants(res)
                })
    }


    const renderCards = restaurants.map((restaurant) => {
                    return (
                            <Grid item xs={12} sm={6} md={3} key={restaurant.id}>
                                <RestCard liked={true} handleLike={handleLike} restaurant={restaurant}></RestCard>
                            </Grid>
                    )
                }) ;

    return (
        <div>List of Restaurants
            <Grid container alignItems="stretch" spacing={4} sx={{ p: 1 }}>
                {renderCards}
            </Grid>
        </div>
    )
}
export default Restaurants