// import React, { useEffect, useState } from 'react';
// import { fetchRestaurants } from './api'; // Adjust the path as needed
// import { Grid, Paper, Typography } from '@mui/material'; // Import necessary Material-UI components

// const RestaurantList = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadRestaurants = async () => {
//       try {
//         const data = await fetchRestaurants('San Francisco'); // Update location as needed
//         console.log('Fetched data:', data); // Log the fetched data
//         // Assuming data contains an array of restaurants
//         setRestaurants(data.businesses || []); // Adjust based on the actual structure
//       } catch (err) {
//         setError('Failed to fetch restaurants');
//       }
//     };

//     loadRestaurants();
//   }, []);

//   return (
//     <div>
//       <h2>Restaurants</h2>
//       {error && <p>{error}</p>}
//       <Grid container spacing={2}>
//         {Array.isArray(restaurants) && restaurants.map((restaurant) => (
//           <Grid item xs={12} sm={6} md={4} lg={2} key={restaurant.id}> {/* Adjust item sizes for a 5x5 grid */}
//             <Paper 
//               elevation={3} 
//               sx={{ 
//                 padding: 2, 
//                 height: '300px', 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 justifyContent: 'space-between',
//                 transition: 'transform 0.3s ease', // Transition for zoom effect
//                 '&:hover': {
//                   transform: 'scale(1.05)', // Scale up on hover
//                 }
//               }}
//             >
//               <img
//                 src={restaurant.image_url}
//                 alt={restaurant.name}
//                 style={{ width: '100%', height: '150px', objectFit: 'cover' }} // Ensure the image fits the space
//               />
//               <Typography variant="h6" component="h3" sx={{ mt: 1 }}>
//                 {restaurant.name}
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 {restaurant.location.address1}, {restaurant.location.city}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default RestaurantList;














// // src/components/Restaurants.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Restaurants = () => {
//     const [restaurants, setRestaurants] = useState([]);

//     // Hardcoded restaurants
//     const hardcodedRestaurants = [
//         {
//             restaurant_name: "Fog Harbor Fish House",
//             restaurant_image: "/images/Fog-Harbor-Fish-House.jpg",
//             address: "39 Pier, San Francisco",
//         },
//         {
//             restaurant_name: "House of Prime Rib",
//             restaurant_image: "/images/Hog_Island_Oyster.jpeg",
//             address: "1906 Van Ness Ave, San Francisco",
//         },
//         {
//             restaurant_name: "Hog Island Oyster",
//             restaurant_image: "/images/House_prime_Rib.jpeg",
//             address: "1 Ferry Bldg, San Francisco",
//         },
//         {
//             restaurant_name: "Kokkari Estiatorio",
//             restaurant_image: "/images/Kokkari.jpeg",
//             address: "200 Jackson St, San Francisco",
//         }
//     ];

//     // Fetch restaurants from the backend
//     useEffect(() => {
//         axios.get('http://localhost:8000/api/restaurants/')
//             .then(response => {
//                 setRestaurants(response.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching restaurant data: ", error);
//             });
//     }, []);

//     return (
//         <div className="restaurant-container">
//             <h2>Restaurants</h2>
//             <div className="restaurant-list">
//                 {hardcodedRestaurants.map((restaurant, index) => (
//                     <div key={index} className="restaurant-card">
//                         <img src={restaurant.restaurant_image} alt={restaurant.restaurant_name} />
//                         <h3>{restaurant.restaurant_name}</h3>
//                         <p>{restaurant.address}</p>
//                     </div>
//                 ))}
//                 {restaurants.map((restaurant, index) => (
//                     <div key={index} className="restaurant-card">
//                         <img src={restaurant.restaurant_image} alt={restaurant.restaurant_name} />
//                         <h3>{restaurant.restaurant_name}</h3>
//                         <p>{restaurant.address}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Restaurants;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import './RestaurantList.css'; // Import the CSS file for additional styles

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

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

  return (
    <Grid container spacing={2} justifyContent="center">
      {restaurants.map((restaurant, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card className="restaurant-card">
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



