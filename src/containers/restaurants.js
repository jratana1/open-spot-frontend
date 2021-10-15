import React, { useState, useEffect } from 'react';
import RestCard from '../components/RestCard'
import FormDialog from '../components/TableDialog'

import { BASE_URL } from '../App'

import Grid from '@mui/material/Grid';

function Restaurants() {
const [restaurants, setRestaurants] = useState([])
const [likes, setLikes] = useState([])
const [open, setOpen] = useState(false);
const [modalRestaurant, setModalRestaurant] = useState("")



useEffect( () => {
        let config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
            },
        }

        Promise.all([
            fetch(BASE_URL+"restaurants", config).then(res => res.json()),
            fetch(BASE_URL+"likes", config).then(res => res.json())
        ])
        .then(([restaurants, likes]) => ({ restaurants, likes }))
        .then((res) => {
             setRestaurants(res.restaurants)
             setLikes(res.likes)
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])

    const handleLike = (e, index, liked) => {
                    if (liked){
                        let config = {
                          method: 'DELETE',
                          headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                              'Authorization': `Bearer ${localStorage.jwt}`
                          },
                          body: JSON.stringify({id: index})
                      }
                
                        fetch(BASE_URL+"likes/"+index, config)
                        .then(res => res.json())
                        .then(res => {
                        setLikes(res)
                        })
                      }
                      else{
                        let config = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': `Bearer ${localStorage.jwt}`
                            },
                            body: JSON.stringify({id: index})
                        }
                
                        fetch(BASE_URL+"likes/", config)
                        .then(res => res.json())
                        .then(res => {
                        setLikes(res)
                        })
                      }
    }

    const makeTable = (e, restaurant) => {
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.jwt}`
            },
            body: JSON.stringify({id: restaurant.id})
        }
        
        fetch(BASE_URL+"tables", config)
                .then(res => res.json())
                .then(res => {
                setOpen(false);
                console.log(res)
                })
    }

    const handleClickOpen = (e,restaurant) => {
        setOpen(true);
        setModalRestaurant(restaurant)
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const renderCards = restaurants.map((restaurant) => {
        let liked = likes.some(like => like.restaurant_id === restaurant.id)
                    return (
                            <Grid item xs={12} sm={6} md={3} key={restaurant.id}>
                                <RestCard liked={liked} handleClickOpen={handleClickOpen} makeTable={makeTable} handleLike={handleLike} restaurant={restaurant}></RestCard>
                            </Grid>
                    )
                }) ;

    return (
        <div>List of Restaurants
            <Grid container alignItems="stretch" spacing={4} sx={{ p: 1 }}>
                {renderCards}
            </Grid>
            <FormDialog modalRestaurant={modalRestaurant} open={open} handleClose= {handleClose} makeTable={makeTable}></FormDialog>
        </div>
    )
}
export default Restaurants