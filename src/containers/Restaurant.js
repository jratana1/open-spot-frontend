import React, { useState, useEffect } from 'react';
import {
  useParams,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { BASE_URL } from '../App'

import PlaceCard from '../components/PlaceCard'


const useStyles = makeStyles((theme) => ({
showContainer:{
  width: '100%',
  height: 'calc(100% - 56px - 44px)',
  overflow: 'hidden',
  display: 'block',
  position: 'relative'
}
}));


function Show(props) {
    const { id } = useParams();
    const classes = useStyles();
    const [restaurant, setRestaurant]= useState(null);
    const { likes, places, page, setLikes, setPlaces}= props
    let placeIndex = places.findIndex(place => place.yelp_id === id)
    const [liked, setLiked] = useState(false)

    useEffect(()=> {
            let config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.jwt}`
                },
            }

            fetch(BASE_URL+"restaurants/"+id, config)
            .then(res => res.json())
            .then(res => {
            setRestaurant(res.data.business)
            })
            setLiked(likes.some(like => like.restaurant_id === places[placeIndex].id))
    }, [id, placeIndex, places, likes])
    
    if (restaurant) {
        return (
          <div className={classes.showContainer}>
            <PlaceCard  setPlaces={setPlaces} 
                        setLiked={setLiked}
                        liked={liked}
                        places={places}
                        restaurant={restaurant}
                        page={page}
                        setLikes={setLikes}></PlaceCard>
          </div>
          );
        }
          else {return null}
  }

  export default Show