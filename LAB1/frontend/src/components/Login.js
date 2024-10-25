import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Grid,
  Link,
  CssBaseline,
  Paper,
} from "@mui/material";
import logo from '../uber_Eats_logo_2.png';
import './Login.css'; // Import the CSS file for styles


// Function to get the CSRF token from cookies
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


function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });



  const [errorMessage, setErrorMessage] = useState("");  // To handle the error message
  const navigate = useNavigate(); // To handle redirection

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/accounts/login/", formData);
      navigate("/dashboard");  // Redirect to dashboard after successful login
    } catch (err) {
      console.error(err);
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <CssBaseline />
      {/* Background Image */}
      <div className="blur-background" />
      {/* Flex Container for the whole page */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Header */}
        <AppBar position="static" sx={{ backgroundColor: '#06C167' }}>
          <Toolbar>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ height: 40, width: 'auto', mr: 2 }} // Set height, width auto
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Uber Eats Clone
            </Typography>
            <Button color="inherit" href="/signup">Sign Up</Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 2, flexGrow: 1 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography component="h1" variant="h5" align="center">
              Login
            </Typography>
            {errorMessage && <Typography color="error" align="center">{errorMessage}</Typography>}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="username"
                    label="Username"
                    fullWidth
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#06C167' }}
              >
                Login
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              © 2024 Uber Eats Clone (Aishwarya Thorat SJSU)
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Login;
