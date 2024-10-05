import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from '../uber_Eats_logo_2.png';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import { Dashboard } from "@mui/icons-material"; // Import Material-UI Dashboard icon

axios.defaults.withCredentials = true; // Allow sending cookies with requests

// Set the CSRF token from the cookie
const csrftoken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
const csrfTokenValue = csrftoken ? csrftoken.split('=')[1] : null;
axios.defaults.headers.common['X-CSRFToken'] = csrfTokenValue;

function Profile() {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    nickname: "",
    date_of_birth: "",
    country: "",
    city: "",
    state: "",
    profile_picture: null,
  });
  const [initialData, setInitialData] = useState(profileData); // Store initial data
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const placeholderImage = "https://via.placeholder.com/150";

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get("http://localhost:8000/accounts/profile/");
        // Format date_of_birth if it's available
        if (response.data.date_of_birth) {
          response.data.date_of_birth = response.data.date_of_birth.split('T')[0]; // Convert to YYYY-MM-DD
        }
        setProfileData(response.data);
        setInitialData(response.data); // Set initial data
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profile data.");
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({
        ...profileData,
        profile_picture: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append only changed fields to the form data
    Object.keys(profileData).forEach((key) => {
      // Check if the field has changed
      if (profileData[key] !== initialData[key]) {
        if (key === "date_of_birth") {
          // Ensure that date_of_birth is in YYYY-MM-DD format
          const birthdate = new Date(profileData.date_of_birth);
          const formattedDate = birthdate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
          formData.append("date_of_birth", formattedDate);
        } else {
          formData.append(key, profileData[key]);
        }
      }
    });

    // If no fields have changed, return early
    if (formData.size === 0) {
      alert("No changes to update.");
      return;
    }

    try {
      console.log("Form Data: ", Array.from(formData.entries()));
      await axios.post("http://localhost:8000/accounts/profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrfTokenValue,
        },
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
      setInitialData(profileData); // Update initial data after successful submission
    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="fixed" sx={{ backgroundColor: '#06C167' }}>
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
            {/* Dashboard Button for direct navigation */}
            <IconButton onClick={() => window.location.href = "/dashboard"} color="inherit">
              <Dashboard fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container component="main" maxWidth="sm" sx={{ mt: 10, mb: 2, flexGrow: 1, overflowY: 'auto', height: 'calc(100vh - 64px - 32px)' }}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            {/* Profile Picture Section */}
            <Avatar 
              src={profileData.profile_picture ? `http://localhost:8000${profileData.profile_picture}` : placeholderImage}
              alt="Profile" 
              sx={{ 
                width: 150,  // Increased size
                height: 150,  // Increased size
                margin: '20px auto', 
                border: '2px solid #06C167' // Border around the avatar
              }} 
            />

            <CardContent>
              <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>{profileData.username || "No username available"}</Typography>
              <Typography variant="body1" sx={{ fontSize: '1.25rem', mb: 2 }}>{profileData.email || "No email available"}</Typography>
            </CardContent>

            <Grid container spacing={2} sx={{ padding: 2 }}>
              {/* Nickname */}
              <Grid item xs={12}>
                <Typography variant="body2" component="span">Nickname:</Typography>
                <input
                  type="text"
                  name="nickname"
                  value={profileData.nickname || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{ width: "calc(100% - 100px)", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", marginLeft: '10px' }} // Adjusted margin
                />
              </Grid>

              {/* Birthdate */}
              <Grid item xs={12}>
                <Typography variant="body2" component="span">Birthdate:</Typography>
                <input
                  type="date"
                  name="date_of_birth"
                  value={profileData.date_of_birth || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{ width: "calc(100% - 100px)", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", marginLeft: '10px' }} // Adjusted margin
                />
              </Grid>

              {/* Country */}
              <Grid item xs={12}>
                <Typography variant="body2" component="span">Country:</Typography>
                <input
                  type="text"
                  name="country"
                  value={profileData.country || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{ width: "calc(100% - 100px)", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", marginLeft: '10px' }} // Adjusted margin
                />
              </Grid>

              {/* City */}
              <Grid item xs={12}>
                <Typography variant="body2" component="span">City:</Typography>
                <input
                  type="text"
                  name="city"
                  value={profileData.city || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{ width: "calc(100% - 100px)", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", marginLeft: '10px' }} // Adjusted margin
                />
              </Grid>

              {/* State */}
              <Grid item xs={12}>
                <Typography variant="body2" component="span">State:</Typography>
                <input
                  type="text"
                  name="state"
                  value={profileData.state || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{ width: "calc(100% - 100px)", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", marginLeft: '10px' }} // Adjusted margin
                />
              </Grid>

              {/* Profile Picture Upload */}
              <Grid item xs={12}>
                <Typography variant="body2" component="span">Profile Picture:</Typography>
                <input
                  type="file"
                  name="profile_picture"
                  onChange={handleFileChange}
                  disabled={!isEditing}
                  style={{ width: "calc(100% - 100px)", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", marginLeft: '10px' }} // Adjusted margin
                />
              </Grid>
            </Grid>

            {isEditing ? (
              <Button variant="contained" onClick={handleSubmit} sx={{ mb: 2 }}>Save Changes</Button>
            ) : (
              <Button variant="outlined" onClick={() => setIsEditing(true)} sx={{ mb: 2 }}>Update Profile</Button>
            )}
          </Card>
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
              © 2024 Uber Eats Clone
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Profile;
