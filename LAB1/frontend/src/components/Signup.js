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
import './Signup.css'; // Import the CSS file for styles

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    user_type: "customer",  // Default user type
    restaurant_name: "",     // Fields for restaurant owner
    address: "",
    profile_picture: null,
  });

  const [errorMessage, setErrorMessage] = useState("");  // To handle the error message
  const navigate = useNavigate(); // To handle redirection

  const handleChange = (e) => {
    if (e.target.name === "profile_picture") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]  // Handle file input
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);  // Append all form data
    }
    
    try {
      const response = await axios.post("http://localhost:8000/accounts/signup/", data);
      // Redirect based on user type
      if (formData.user_type === 'restaurant_owner') {
        navigate("/restlogin");  // Redirect to restaurant owner login after successful signup
      } else {
        navigate("/login");  // Redirect to user login after successful signup
      }
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
      <div className="blur-background" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: '#06C167' }}>
          <Toolbar>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ height: 40, width: 'auto', mr: 2 }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Uber Eats Clone
            </Typography>
            <Button color="inherit" href="/login">Login</Button>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 2, flexGrow: 1 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography component="h1" variant="h5" align="center">
              Sign Up
            </Typography>
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    select
                    name="user_type"
                    label="User Type"
                    fullWidth
                    required
                    value={formData.user_type}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="customer">Customer</option>
                    <option value="restaurant_owner">Restaurant Owner</option>
                  </TextField>
                </Grid>

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

                {formData.user_type === "restaurant_owner" && ( // Updated condition to match dropdown value
                  <>
                    <Grid item xs={12}>
                      <TextField
                        name="restaurant_name"
                        label="Restaurant Name"
                        fullWidth
                        required
                        value={formData.restaurant_name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="address"
                        label="Address"
                        fullWidth
                        required
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <input
                        type="file"
                        name="profile_picture"
                        onChange={handleChange}
                      />
                    </Grid>
                  </>
                )}
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
                  {/* Conditional Link for already have an account */}
                  <Link href={formData.user_type === "restaurant_owner" ? "/restlogin" : "/login"} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>

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
