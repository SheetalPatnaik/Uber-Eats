// import React, { useEffect, useState } from 'react';
// import { fetchRestaurants } from './api'; // Adjust the path as needed

// const RestaurantList = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadRestaurants = async () => {
//       try {
//         const data = await fetchRestaurants('San Francisco'); // You can replace 'San Francisco' with the desired location
//         setRestaurants(data);
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
//       <ul>
//         {restaurants.map((restaurant) => (
//           <li key={restaurant.id}>
//             <h3>{restaurant.name}</h3>
//             <img src={restaurant.image_url} alt={restaurant.name} />
//             <p>{restaurant.location.address1}, {restaurant.location.city}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RestaurantList;




import React, { useEffect, useState } from 'react';
import { fetchRestaurants } from './api'; // Adjust the path as needed

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
      <ul>
        {Array.isArray(restaurants) && restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <h3>{restaurant.name}</h3>
            <img src={restaurant.image_url} alt={restaurant.name} />
            <p>{restaurant.location.address1}, {restaurant.location.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
