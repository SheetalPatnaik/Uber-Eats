// Utility function to get the CSRF token from the cookie
const getCSRFToken = () => {
    let csrfToken = null;
    if (document.cookie) {
      document.cookie.split(';').forEach(cookie => {
        const [key, value] = cookie.split('=');
        if (key.trim() === 'csrftoken') {
          csrfToken = value;
        }
      });
    }
    return csrfToken;
  };
  
  export default getCSRFToken;
  