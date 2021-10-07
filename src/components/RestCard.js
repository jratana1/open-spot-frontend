import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function restCard(props) {
  const { makeTable, handleLike, restaurant, liked}= props
  const buttonText = liked ? "Unlike" : "Like";
  return (
    <Card sx={{ maxWidth: 400, height: 1, justifyContent: "space-between", display: "flex", flexDirection: "column" }} id={restaurant.id}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          src="/stock-rest.jpeg"
          alt="restaurant image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {restaurant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurant.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${restaurant.city}, ${restaurant.state} ${restaurant.postal_code}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={(e) => makeTable(e, restaurant.id)}>
          CreateTable
        </Button>
        <Button size="small" color="primary" onClick={(e) => handleLike(e, restaurant.id, liked)}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}