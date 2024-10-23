import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const CustomerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  useEffect(() => {
    // Fetch the orders for the logged-in customer
    axios
      .get('http://localhost:8000/api/customer-orders/')
      .then((response) => {
        console.log('Fetched orders:', response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setSnackMessage('Failed to fetch orders.');
        setSnackOpen(true);
      });
  }, []);

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const renderOrderTable = () => (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'left', color: '#1976d2' }}>
        Your Orders
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Restaurant Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.order_id}>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.restaurant}</TableCell>
                <TableCell>{order.order_status}</TableCell>
                <TableCell align="right">
                  {order.order_items.map((item, index) => (
                    <span key={index}>
                      {item.name} (Qty: {item.quantity}),{' '}
                    </span>
                  ))}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">No orders found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Paper sx={{ padding: 3, marginTop: 3, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>
        Your Orders
      </Typography>

      {renderOrderTable()}

      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CustomerOrdersPage;
