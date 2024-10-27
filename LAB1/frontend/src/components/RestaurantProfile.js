import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantProfile = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [timings, setTimings] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch restaurant details on component mount
  useEffect(() => {
    axios.get('http://localhost:8000/api/restaurant_profile/')
      .then(response => {
        const { name, location, description, contact, timings } = response.data;
        setRestaurantName(name);
        setLocation(location);
        setDescription(description);
        setContactInfo(contact);
        setTimings(timings);
      })
      .catch(error => {
        setError('Failed to load restaurant profile');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('restaurant_name', restaurantName);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('contact_info', contactInfo);
    formData.append('timings', timings);
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/update_restaurant_profile/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  return (
    <div>
      <h2>Restaurant Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Restaurant Name"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Timings"
          value={timings}
          onChange={(e) => setTimings(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default RestaurantProfile;
