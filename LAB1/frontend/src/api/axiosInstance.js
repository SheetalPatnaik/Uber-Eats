// axiosInstance.js

import axios from 'axios';

// Function to get the CSRF token from cookies
const getCSRFToken = () => {
    const cookies = document.cookie.split('; ');
    const csrfToken = cookies.find(row => row.startsWith('csrftoken='));
    console.log('CSRF Token:', csrfToken); // Log the CSRF token for debugging
    return csrfToken ? csrfToken.split('=')[1] : null;
};

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Your Django API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(config => {
    const csrfToken = getCSRFToken();
    console.log('Sending CSRF Token:', csrfToken); // Log the CSRF token being sent
    config.headers['X-CSRFToken'] = csrfToken;
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
