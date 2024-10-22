import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import './RestaurantList.css'; // Import the CSS file for additional styles

import { useNavigate } from 'react-router-dom';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  const hardcodedRestaurants = [
    {
      restaurant_name: 'Fog Harbor Fish House',
      profile_picture: 'images/Fog-Harbor-Fish-House.jpg',
      address: '39 Pier, San Francisco',
    },
    {
      restaurant_name: 'House of Prime Rib',
      profile_picture: 'images/Hog_Island_Oyster.jpeg',
      address: '1906 Van Ness Ave, San Francisco',
    },
    {
      restaurant_name: 'Hog Island Oyster',
      profile_picture: 'images/House_prime_Rib.jpeg',
      address: '1 Ferry Bldg, San Francisco',
    },
    {
      restaurant_name: 'Kokkari Estiatorio',
      profile_picture: 'images/Kokkari.jpeg',
      address: '200 Jackson St, San Francisco',
    },
  ];

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/restaurants/')
      .then((response) => {
        const formattedRestaurants = response.data.map(restaurant => ({
          ...restaurant,
          profile_picture: `http://localhost:8000/media/${restaurant.profile_picture.replace('restaurant_images/', '')}`
        }));

        const sortedRestaurants = formattedRestaurants.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA; // Newest first
        });

        const finalRestaurantList = sortedRestaurants.concat(hardcodedRestaurants);
        setRestaurants(finalRestaurantList);
      })
      .catch((error) => {
        console.error('Error fetching restaurant data:', error);
      });
  }, []);


  // Function to handle the restaurant click
  const handleRestaurantClick = (username) => {
    console.log('Navigating to:', username);
    navigate(`/menu/${username}`);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {restaurants.map((restaurant, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card className="restaurant-card"  
          onClick={() => handleRestaurantClick(restaurant.user__username)} // Add onClick handler here
          style={{ cursor: 'pointer' }} // Add pointer cursor to indicate it's clickable
        >
            <CardMedia
              component="img"
              image={restaurant.profile_picture ? restaurant.profile_picture : 'path_to_default_image'}
              alt={restaurant.restaurant_name}
              className="restaurant-image"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {restaurant.restaurant_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {restaurant.address}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RestaurantList;



