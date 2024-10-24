import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
} from '@mui/material';
import './RestaurantList.css'; // Import the CSS file for additional styles
import { useNavigate } from 'react-router-dom';
import backgroundImage from '/Users/aishwaryathorat/Movies/MSCourses/sem2/DS - Data 236/LABS/Uber-Eats/LAB1/frontend/src/restaurant.jpeg'; // Import your background image

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
        const formattedRestaurants = response.data.map((restaurant) => ({
          ...restaurant,
          profile_picture: `http://localhost:8000/media/${restaurant.profile_picture.replace('restaurant_images/', '')}`,
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

  // Function to navigate to CustomerOrdersPage
  const handleViewOrders = () => {
    navigate('/customer-orders'); // Navigate to the Customer Orders page
  };

  return (
    <Box sx={{ padding: 3, position: 'relative' }}>
      <div className="background-image"></div> {/* Background image div */}
      <Grid container spacing={2} justifyContent="center">
        {restaurants.map((restaurant, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}> {/* Adjusted to show 5 in a row */}
            <Card
              className="restaurant-card"
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

      {/* Button to navigate to Customer Orders page positioned at the bottom right */}
      <Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
        <Button
          variant="contained"
          onClick={handleViewOrders}
          sx={{
            backgroundColor: '#03C04A', // Bottle green color
            '&:hover': {
              backgroundColor: '#003300', // Darker shade on hover
            },
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: 2, // Add some shadow for depth
          }} // Style adjustments for the button
        >
          View Your Orders
        </Button>
      </Box>
    </Box>
  );
};

export default RestaurantList;
