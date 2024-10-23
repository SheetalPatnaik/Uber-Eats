import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Snackbar,
  Alert,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'; // Updated import
import axios from 'axios';

const MenuPage = () => {
  const { username } = useParams(); // Get the username from the URL
  const navigate = useNavigate(); // Updated to use useNavigate
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [quantities, setQuantities] = useState({});


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



  useEffect(() => {
    // Fetch the menu items for the restaurant with the given username
    axios
      .get(`http://localhost:8000/api/menu/${username}/`) // Ensure this matches your Django URL pattern
      .then((response) => {
        console.log('Fetched menu:', response.data);
        setMenuItems(response.data); // Set the fetched menu items to the state
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error); // Handle errors
      });
  }, [username]);

  const handleAddToCart = (item) => {
    console.log('Item being added:', item);
    const itemId = item.id !== undefined ? item.id : `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const quantity = quantities[item.id] || 1; // Get the quantity or default to 1

    console.log(`Adding to cart: Item ID - ${itemId}, Quantity - ${quantity}`);
    setCartItems((prev) => [
      ...prev,
      { ...item, id: itemId, quantity }, // Use the unique itemId
    ]);
    
    setSnackMessage(`${item.name} added to cart!`);
    setSnackOpen(true);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.id !== itemId);
      if (updatedCart.length < prev.length) {
        setSnackMessage('Item removed from cart!');
      } else {
        setSnackMessage('Item not found in cart!');
      }
      return updatedCart;
    });
    setSnackOpen(true);
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  // to place the order and items in model 
  const handlePlaceOrder = () => {
    axios.post('http://localhost:8000/api/place-order/', {
      cartItems,
      restaurantUsername: username,
    })
      .then((response) => {
        setSnackMessage('Order placed successfully!');
        setSnackOpen(true);
        setCartItems([]); // Clear the cart after placing the order
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        setSnackMessage('Failed to place order.');
        setSnackOpen(true);
      });
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

    // Function to navigate to CustomerOrdersPage
    const handleViewOrders = () => {
      navigate('/customer-orders'); // Navigate to the Customer Orders page
    };

  return (
    <Paper sx={{ padding: 3, marginTop: 3, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>
        Menu for {username}
      </Typography>


      <Grid container spacing={2}>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={item.id}> {/* Updated to show 5 items in a row */}
              <Card sx={{ transition: '0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`http://localhost:8000${item.image}`} // Update with the correct image path
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                  <Typography variant="body1">Price: ${item.price}</Typography>
                  <Typography variant="body2" color="text.secondary">Status: {item.status}</Typography>
                  <TextField
                    type="number"
                    variant="outlined"
                    label="Quantity"
                    value={quantities[item.id] || ''}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    inputProps={{ min: 1 }}
                    sx={{ marginTop: 1, width: '60%' }}
                  />
                  <Button
                    onClick={() => handleAddToCart(item)}
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 1 }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', width: '100%' }}>No menu items available for this restaurant.</Typography>
        )}
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ marginTop: 3, fontWeight: 'bold', textAlign: 'center' }}>
        Cart Items
      </Typography>
      
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleRemoveFromCart(item.id)} // Pass the specific item ID
                      variant="outlined"
                      color="secondary"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">No items in the cart.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* place order Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={handlePlaceOrder}
        disabled={cartItems.length === 0}
      >
        Place Order
      </Button>


      {/* Button to navigate to Customer Orders page */}
      <Button
        variant="outlined"
        color="secondary"
        sx={{ marginTop: 2, marginLeft: 2 }}
        onClick={handleViewOrders}
      >
        View Your Orders
      </Button>

      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default MenuPage;





