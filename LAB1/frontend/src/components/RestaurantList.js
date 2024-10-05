import React, { useEffect, useState } from 'react';
import { fetchRestaurants } from './api'; // Adjust the path as needed
import { Grid, Paper, Typography } from '@mui/material'; // Import necessary Material-UI components

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await fetchRestaurants('San Francisco'); // Update location as needed
        console.log('Fetched data:', data); // Log the fetched data
        // Assuming data contains an array of restaurants
        setRestaurants(data.businesses || []); // Adjust based on the actual structure
      } catch (err) {
        setError('Failed to fetch restaurants');
      }
    };

    loadRestaurants();
  }, []);

  return (
    <div>
      <h2>Restaurants</h2>
      {error && <p>{error}</p>}
      <Grid container spacing={2}>
        {Array.isArray(restaurants) && restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={restaurant.id}> {/* Adjust item sizes for a 5x5 grid */}
            <Paper 
              elevation={3} 
              sx={{ 
                padding: 2, 
                height: '300px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease', // Transition for zoom effect
                '&:hover': {
                  transform: 'scale(1.05)', // Scale up on hover
                }
              }}
            >
              <img
                src={restaurant.image_url}
                alt={restaurant.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }} // Ensure the image fits the space
              />
              <Typography variant="h6" component="h3" sx={{ mt: 1 }}>
                {restaurant.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {restaurant.location.address1}, {restaurant.location.city}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RestaurantList;
