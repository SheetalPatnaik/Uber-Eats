import React, { useState } from "react";
import axios from '../axios.js';
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

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
      const response = await axios.post("http://localhost:8000/accounts/signup/", formData);
      navigate("/login");  // Redirect to login after successful signup
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.error);  // Set the error message from the backend
      } else {
        console.error(err);
        setErrorMessage("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <CssBaseline />
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
            <Button color="inherit" href="/login">Login</Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 2, flexGrow: 1 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography component="h1" variant="h5" align="center" >
              Sign Up
            </Typography>
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
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
                    name="email"
                    label="Email Address"
                    fullWidth
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Password"
                    fullWidth
                    required
                    type="password"
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
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
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

export default Signup;