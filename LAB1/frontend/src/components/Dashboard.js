import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  IconButton
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material"; // Import Material-UI AccountCircle icon
import logo from '../uber_Eats_logo_2.png'; // Import the logo

function Dashboard() {
  const navigate = useNavigate();

  // Function to navigate to the user profile
  const handleProfileClick = () => {
    navigate("/dashboard/profile");
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

            {/* User Profile Icon for direct navigation */}
            <IconButton onClick={handleProfileClick} color="inherit">
              <AccountCircle fontSize="large" /> {/* Use Material-UI AccountCircle icon */}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 2, flexGrow: 1 }}>
          <Box sx={{ mt: 4 }}>
            <Outlet /> {/* Render child routes */}
          </Box>
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

export default Dashboard;
