import axios from 'axios';

// ##

// const YELP_API_KEY = 'o1b6sAfSMLNCsQ8XlSb71wW_CyhZLFwH-16Wuz10OoMLGXQfuEnz4YmOHOOI9DPSSmb8FrV5vtEh5jXoSIf35vP3mNL1WwpaXKyHxDHC6NQDmoqwyGKjrJeJDkj_ZnYx';
// const BASE_URL = 'https://api.yelp.com/v3/businesses/search';

// export const fetchRestaurants = async (location) => {
//   try {
//     const response = await axios.get(BASE_URL, {
//       headers: {
//         Authorization: `Bearer ${YELP_API_KEY}`,
//       },
//       params: {
//         location: location,
//         limit: 10, // You can change the limit as per your need
//       },
//     });
//     return response.data.businesses; // This will return the list of restaurants
//   } catch (error) {
//     console.error('Error fetching restaurants:', error);
//     throw error;
//   }
// };






const BASE_URL = 'http://localhost:8000/api/yelp/search/'; // Your local Django endpoint

// Assuming you have your API key here (if needed for your Django backend)
const YELP_API_KEY = 'hgb0K92RUziF7C0BeOdy1WHRp_TJQmtcNkDNGjJ6M8Nqig6ZL-3nnxtlvf23g6_TPE49tGqUFzQYUGS2LVOZDOZQp4RT83wiKWedfQEPBtYRmxm_cq75DbVsRln_ZnYx';

export const fetchRestaurants = async (location) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        location: location,
      },
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`, // Add this line if your Django endpoint requires it
      },
    });

    // Ensure you return the right structure from the response
    return response.data; // Adjust this line depending on how your Django view formats the response
  } catch (error) {
    console.error('Error fetching restaurants:', error.response || error.message);
    console.error('Error fetching restaurants:', error);
    throw error; // Propagate the error to handle it in your component
  }
};





// const BASE_URL = 'http://localhost:8000/api/yelp/search/'; // Your local Django endpoint
// const YELP_API_KEY = 'hgb0K92RUziF7C0BeOdy1WHRp_TJQmtcNkDNGjJ6M8Nqig6ZL-3nnxtlvf23g6_TPE49tGqUFzQYUGS2LVOZDOZQp4RT83wiKWedfQEPBtYRmxm_cq75DbVsRln_ZnYx';

// export const fetchRestaurants = async (location) => {
//   try {
//     const response = await axios.get(BASE_URL, {
//       params: {
//         location: location,
//       },
//       headers: {
//         Authorization: `Bearer ${YELP_API_KEY}`, // Include this if needed
//       },
//     });

//     console.log('API Response:', response.data); // Log the API response

//     // Assuming the API response structure
//     return response.data; // Adjust this depending on your Django view response structure
//   } catch (error) {
//     console.error('Error fetching restaurants:', error);
//     console.error('Error fetching restaurants:', error.response || error.message);
//     throw error; // Propagate the error
//   }
// };
