// src/axios.js
import axios from 'axios';

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

// Set the CSRF token in Axios defaults
axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
axios.defaults.baseURL = 'http://localhost:8000'; // Your Django backend URL

export default axios;

