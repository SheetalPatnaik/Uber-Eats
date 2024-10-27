// import React, { useState } from 'react';
// import axios from 'axios';
// import getCSRFToken from './csrf'; 

// const RestaurantOwnerLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   // Function to handle the login form submission
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       // Send POST request to the /rest_login endpoint
//       const response = await axios.post('http://localhost:8000/api/rest_login/', {
//         username,
//         password
//       }, { withCredentials: true }); // Allow sending cookies with requests

//       // Handle successful login
//       if (response.status === 200) {
//         console.log('Login successful', response.data);
//         // Here, you can redirect the user
//         window.location.href = '/restaurantdashboard'; // Redirect to the dashboard after login
//       }
//     } catch (err) {
//       console.error('Login failed', err.response?.data || err);
//       setError('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div>
//       <h2>Restaurant Owner Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default RestaurantOwnerLogin;




















import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../uber_Eats_logo_2.png';

const FormContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

const RestaurantOwnerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the /rest_login endpoint
      const response = await axios.post('http://localhost:8000/api/rest_login/', {
        username,
        password
      }, { withCredentials: true }); // Allow sending cookies with requests

      // Handle successful login
      if (response.status === 200) {
        console.log('Login successful', response.data);
        // Redirect to the restaurant dashboard after login
        navigate('/restaurantdashboard');
      }
    } catch (err) {
      console.error('Login failed', err.response?.data || err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <FormContainer component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{ height: 50, width: 'auto', mb: 2 }}
        />
        <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
          Restaurant Owner Login
        </Typography>

        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#06C167' }}
          >
            LOGIN
          </Button>
        </Box>
      </Box>

      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Button
              variant="text"
              sx={{ color: '#06C167' }}
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default RestaurantOwnerLogin;
