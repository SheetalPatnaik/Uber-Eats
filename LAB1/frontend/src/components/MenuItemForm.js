import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './MenuItemForm.css';

// Fetch CSRF token from cookies
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

const MenuItemForm = () => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('available');
  const [menuItems, setMenuItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [originalItemData, setOriginalItemData] = useState({});
  const [snackMessage, setSnackMessage] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  
  const categories = [
    { value: 'cocktail', label: 'Cocktail' },
    { value: 'mocktail', label: 'Mocktail' },
    { value: 'burger', label: 'Burger' },
    { value: 'pizza', label: 'Pizza' },
    { value: 'starter', label: 'Starter' },
    { value: 'maincourse', label: 'Maincourse' },
    { value: 'dessert', label: 'Dessert' },

  ];

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editMode && !image) {
      setSnackMessage("Image is required");
      setSnackOpen(true);
      return;
    }

    const data = { category, name, description, price, status, image };
    const formData = new FormData();

    if (image) {
      formData.append('image', image);
    }

    const updatedData = {};
    Object.keys(data).forEach((key) => {
      if (data[key] !== originalItemData[key]) {
        updatedData[key] = data[key];
      }
    });

    if (editMode && Object.keys(updatedData).length === 0) {
      setSnackMessage("No changes made to update.");
      setSnackOpen(true);
      return;
    }

    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key]) {
        formData.append(key, updatedData[key]);
      }
    });
    console.log([...formData.entries()]);
    console.log(formData.getAll('category'))
    try {
      let response;
      if (editMode) {
        response = await axiosInstance.put(`/accounts/api/menu-items/${editItemId}/`, formData, {
          headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMenuItems(menuItems.map((item) => (item.id === editItemId ? response.data : item)));
      } else {
        response = await axiosInstance.post("/accounts/api/add-menu-item/", formData, {
          headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data) {
          setMenuItems((prevItems) => [...prevItems, response.data]);
          fetchMenuItems();
        }
      }

      resetForm();
      setSnackMessage(editMode ? "Menu item updated successfully!" : "Menu item added successfully!");
      setSnackOpen(true);
    } catch (error) {
      console.error('Error saving menu item:', error);
      setSnackMessage('Failed to save the menu item. Please try again.');
      setSnackOpen(true);
    }
  };

  const resetForm = () => {
    setCategory('');
    setName('');
    setDescription('');
    setPrice('');
    setImage(null);
    setStatus('available');
    setEditMode(false);
    setEditItemId(null);
    setOriginalItemData({});
  };


  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("/accounts/api/menu-items/", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const updatedMenuItems = response.data.map(item => ({
        ...item,
        image: `${process.env.REACT_APP_API_URL}${item.image.startsWith('/') ? '' : '/'}${item.image}`,
      }));
      setMenuItems(updatedMenuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };




  useEffect(() => {
    
    fetchMenuItems();
  }, []);

  const handleEdit = (item) => {
    setCategory(item.category);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setStatus(item.status);
    setEditItemId(item.id);
    setEditMode(true);
    setOriginalItemData({
      category: item.category,
      name: item.name,
      description: item.description,
      price: item.price,
      status: item.status,
    });
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  return (
    <div className="background-container-menu">
    <div className="content-wrapper">
    <Paper sx={{ padding: 3, marginTop: 3, borderRadius: 2, boxShadow: 3, position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/restaurant-profile')}
          sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
        >
          Go to Profile
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/orders')}
          sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
        >
          Show Orders
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>
        {editMode ? 'Update Menu Item' : 'Add Menu Item'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              variant="outlined"
              sx={{ marginBottom: 2 }}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Dish Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              component="label"
              sx={{ backgroundColor: '#00796b', '&:hover': { backgroundColor: '#004d40' }, marginBottom: 2 }}
            >
              Upload Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="not_available">Not Available</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '50%', padding: 1.5, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
            >
              {editMode ? 'Update Item' : 'Add Item'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackClose} severity="info" sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
  {menuItems.map((item) => (
    <Grid item xs={12} sm={6} md={2.4} key={item.id}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={item.image}
          alt={item.name}
          // sx={{
          //   objectFit: 'cover',  // Ensures the image covers the area
          // }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Price: ${item.price}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(item)}
            sx={{ marginTop: 1 }}
          >
            Edit
          </Button>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
    </Paper>
    </div>
    </div>
  );
};

export default MenuItemForm;
