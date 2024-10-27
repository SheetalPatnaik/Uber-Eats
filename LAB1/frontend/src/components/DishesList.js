import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantDashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log("Auth Token:", token);  // Log the token for debugging
        const response = await axios.get('http://localhost:8000/api/get_dishes', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("Fetched Dishes:", response.data);  // Log the response data
        setDishes(response.data);
      } catch (err) {
        setError('Failed to fetch dishes');
        console.log(err);  // Log the error for debugging
      }
    };

    fetchDishes();
  }, []);

  return (
    <div>
      <h2>Restaurant Dashboard - Dishes</h2>
      {error && <p>{error}</p>}
      <ul>
        {dishes.length > 0 ? (
          dishes.map((dish, index) => (
            <li key={index}>
              <h3>{dish.dish_name}</h3>  {/* Use dish_name from the model */}
              <p>Category: {dish.category}</p>  {/* Use category from the model */}
              <p>Price: ${dish.price}</p>  {/* Use price from the model */}
              <img 
                src={dish.item_image}  // Use only if the model has item_image
                alt={dish.dish_name} 
                style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
              />
            </li>
          ))
        ) : (
          <p>No dishes available.</p>
        )}
      </ul>
    </div>
  );
};

export default RestaurantDashboard;
