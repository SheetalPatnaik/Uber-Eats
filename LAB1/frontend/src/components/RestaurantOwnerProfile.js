import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Card,
  CardContent,
  Avatar,
  Grid,
  Button,
} from "@mui/material";

import './RestaurantOwnerProfile.css';

axios.defaults.withCredentials = true;

// Set CSRF token
const csrftoken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
const csrfTokenValue = csrftoken ? csrftoken.split('=')[1] : null;
axios.defaults.headers.common['X-CSRFToken'] = csrfTokenValue;

function RestaurantOwnerProfile() {
  const [profileData, setProfileData] = useState({
    restaurant_name: "",
    address: "",
    profile_picture: null,
  });
  const [initialData, setInitialData] = useState(profileData);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const placeholderImage = "https://via.placeholder.com/150";

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get("http://localhost:8000/restaurant_owner/profile/");
        setProfileData(response.data);
        setInitialData(response.data);
        console.log(response.data)
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
    Object.keys(profileData).forEach((key) => {
      if (profileData[key] !== initialData[key]) {
        formData.append(key, profileData[key]);
      }
    });

    if (formData.size === 0) {
      alert("No changes to update.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/restaurant_owner/profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrfTokenValue,
        },
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
      setInitialData(profileData);
    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <>
      <CssBaseline />
      <div className="background-image-rest-profile"></div>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Restaurant Owner Profile
            </Typography>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="sm" sx={{ mt: 10, mb: 2, flexGrow: 1 }}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Avatar 
              src={profileData.profile_picture ? `http://localhost:8000${profileData.profile_picture}` : placeholderImage}
              alt="Profile" 
              sx={{ width: 150, height: 150, margin: '20px auto', border: '2px solid green' }} 
            />

            <CardContent>
              <Typography variant="h5">{profileData.restaurant_name || "Restaurant Name"}</Typography>
              <Typography variant="body1">{profileData.address || "Address"}</Typography>
            </CardContent>

            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={12}>
                <input
                  type="text"
                  name="restaurant_name"
                  value={profileData.restaurant_name || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{ width: "100%", padding: "10px" }}
                  placeholder="Restaurant Name"
                />
              </Grid>

              <Grid item xs={12}>
                <input
                  type="text"
                  name="address"
                  value={profileData.address || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{ width: "100%", padding: "10px" }}
                  placeholder="Address"
                />
              </Grid>

              <Grid item xs={12}>
                <input
                  type="file"
                  name="profile_picture"
                  onChange={handleFileChange}
                  disabled={!isEditing}
                  style={{ width: "100%", padding: "10px" }}
                />
              </Grid>
            </Grid>

            {isEditing ? (
              <Button variant="contained" onClick={handleSubmit}>Save Changes</Button>
            ) : (
              <Button variant="outlined" onClick={() => setIsEditing(true)}>Update Profile</Button>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default RestaurantOwnerProfile;
