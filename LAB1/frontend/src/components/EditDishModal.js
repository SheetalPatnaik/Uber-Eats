import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditDishModal({ open, onClose, dish }) {
  const [dishName, setDishName] = useState(dish.dish_name);
  const [price, setPrice] = useState(dish.price);
  const [category, setCategory] = useState(dish.category);
  const [dish_id, setDishId] = useState(dish.dish_id);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  // Function to handle form submission (Edit dish)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // try {
    //   const response = await axios.put(`http://localhost:8000/api/edit_dish/${dish.id}/`, {
    //     dish_name: dishName,
    //     price: price,
    //     category: category,
    //   });

    // try {
    //     const response = await axios.put(`http://localhost:8000/api/edit_dish/${dish.dish_name}/`, {
    //       dish_name: dishName, // Updated dish name
    //       price: price,
    //       category: category,
    //     });

    try {
        const response = await axios.put(`http://localhost:8000/api/edit_dish/${dish_id}/`, {
          dish_name: dishName,
          price: price,
          category: category,
        });

      if (response.status === 200) {
        setMessage('Dish updated successfully!');
        onClose(); // Close the modal
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to update dish.');
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Dish
        </Typography>

        {/* Item Name Text Field */}
        <TextField
          fullWidth
          label="Dish Name"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          sx={{ mt: 2 }}
        />

        {/* Item Price Text Field */}
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ mt: 2 }}
        />

        {/* Category Drop-down */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="Main Course">Main Course</MenuItem>
            <MenuItem value="Appetizer">Appetizer</MenuItem>
            <MenuItem value="Beverage">Beverage</MenuItem>
            <MenuItem value="Dessert">Dessert</MenuItem>
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleFormSubmit}
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>

        {/* Success and Error Messages */}
        {message && <Typography color="success" sx={{ mt: 2 }}>{message}</Typography>}
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </Box>
    </Modal>
  );
}



















