// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddDish = () => {
//   const [dishName, setDishName] = useState('');
//   const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleAddDish = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await axios.post('http://localhost:8000/api/add_dish/', {
//         dish_name: dishName,  // Use dish_name as key to match Django's expected field
//         price: price,
//         category: category
//       });
//       if (response.status === 200) {
//         setMessage('Dish added successfully!');
//         navigate('/restaurantdashboard');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setError('Failed to add dish.');
//     }
//   };

//   return (
//     <div>
//       <h2>Add New Dish</h2>
//       <form onSubmit={handleAddDish}>
//         <input
//           type="text"
//           placeholder="Dish Name"
//           value={dishName}
//           onChange={(e) => setDishName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         />
//         <button type="submit">Add Dish</button>
//       </form>
//       {message && <p>{message}</p>}
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default AddDish;
















// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import FormControl from '@mui/material/FormControl';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export default function BasicModal({ open, onClose }) {
//   const [itemName, setItemName] = React.useState('');
//   const [itemPrice, setItemPrice] = React.useState('');
//   const [category, setCategory] = React.useState('');
//   const [image, setImage] = React.useState(null);

//   // Function to handle image change
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   // Function to handle form submission
//   const handleFormSubmit = () => {
//     console.log({
//       itemName,
//       itemPrice,
//       category,
//       image,
//     });
//     onClose(); // Close the modal after form submission
//   };

//   return (
//     <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
//       <Box sx={style}>
//         <Typography id="modal-modal-title" variant="h6" component="h2">
//           Add New Dish
//         </Typography>

//         {/* Item Name Text Field */}
//         <TextField
//           fullWidth
//           label="Item Name"
//           value={itemName}
//           onChange={(e) => setItemName(e.target.value)}
//           sx={{ mt: 2 }}
//         />

//         {/* Item Price Text Field */}
//         <TextField
//           fullWidth
//           label="Item Price"
//           type="number"
//           value={itemPrice}
//           onChange={(e) => setItemPrice(e.target.value)}
//           sx={{ mt: 2 }}
//         />

//         {/* Category Drop-down */}
//         <FormControl fullWidth sx={{ mt: 2 }}>
//           <InputLabel id="category-label">Category</InputLabel>
//           <Select
//             labelId="category-label"
//             value={category}
//             label="Category"
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <MenuItem value="Main Course">Main Course</MenuItem>
//             <MenuItem value="Appetizer">Appetizer</MenuItem>
//             <MenuItem value="Beverage">Beverage</MenuItem>
//             <MenuItem value="Dessert">Dessert</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Image Upload */}
//         <Button variant="contained" component="label" sx={{ mt: 2 }}>
//           Upload Image
//           <input type="file" hidden accept="image/*" onChange={handleImageChange} />
//         </Button>

//         {/* Submit Button */}
//         <Button variant="contained" color="primary" onClick={handleFormSubmit} sx={{ mt: 2 }}>
//           Add Dish
//         </Button>
//       </Box>
//     </Modal>
//   );
// }

























import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

export default function AddDish({ open, onClose }) {
  const [dishName, setDishName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Function to handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Function to handle form submission (Add new dish)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('dish_name', dishName);
    formData.append('price', price);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);  // Add image if provided
    }

    try {
      const response = await axios.post('http://localhost:8000/api/add_dish/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('Dish added successfully!');
        navigate('/restaurantdashboard');  // Redirect back to dashboard
        onClose();  // Close the modal
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to add dish.');
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Dish
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

        {/* Image Upload */}
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleFormSubmit}
          sx={{ mt: 2 }}
        >
          Add Dish
        </Button>

        {/* Error or Success Message */}
        {message && <Typography color="success" sx={{ mt: 2 }}>{message}</Typography>}
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </Box>
    </Modal>
  );
}
