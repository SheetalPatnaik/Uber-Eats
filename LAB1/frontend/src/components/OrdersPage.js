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
  MenuItem,
  Select,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const OrdersPage = ({ username }) => {
  const [orders, setOrders] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState({}); // To store the updated statuses

  useEffect(() => {
    // Fetch the orders for the given restaurant username
    axios
      .get(`http://localhost:8000/api/restaurant-orders/?username=${username}`)
      .then((response) => {
        console.log('Fetched orders:', response.data);
        setOrders(response.data);
        // Initialize selectedStatuses with current order statuses
        const initialStatuses = response.data.reduce((acc, order) => {
          acc[order.order_id] = order.order_status;
          return acc;
        }, {});
        setSelectedStatuses(initialStatuses);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setSnackMessage('Failed to fetch orders.');
        setSnackOpen(true);
      });
  }, [username]);

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [orderId]: newStatus,
    }));
  };

  const handleUpdateStatus = (orderId) => {
    const newStatus = selectedStatuses[orderId];
    axios
      .put(`http://localhost:8000/api/restaurant-orders/${orderId}/`, { order_status: newStatus })
      .then((response) => {
        console.log('Order status updated successfully:', response.data);
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order.order_id === orderId ? { ...order, order_status: newStatus } : order))
        );
        setSnackMessage('Order status updated successfully.');
        setSnackOpen(true);
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
        setSnackMessage('Failed to update order status.');
        setSnackOpen(true);
      });
  };

  const categorizedOrders = {
    placed: orders.filter((order) => order.order_status === 'placed'),
    processing: orders.filter((order) => order.order_status === 'processing'),
    delivered: orders.filter((order) => order.order_status === 'delivered'),
  };

  const renderOrderTable = (orders, title) => (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'left', color: '#1976d2' }}>
        {title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Items</TableCell>
            <TableCell align="right">Action</TableCell> {/* Add Action Column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.order_id}>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Select
                    value={selectedStatuses[order.order_id]} // Use the selected status for the order
                    onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                  >
                    <MenuItem value="placed">Placed</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="right">
                  {order.order_items.map((item) => (
                    <span key={item.id}>
                      {item.name} (Qty: {item.quantity}),{' '}
                    </span> // Display item names with quantities
                  ))}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateStatus(order.order_id)} // Update status on button click
                  >
                    Update Status
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">No orders found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Paper sx={{ padding: 3, marginTop: 3, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>
        Orders for {username} {/* Displaying the restaurant owner's username */}
      </Typography>

      {renderOrderTable(categorizedOrders.placed, 'Upcoming Orders')}
      {renderOrderTable(categorizedOrders.processing, 'Processing Orders')}
      {renderOrderTable(categorizedOrders.delivered, 'Delivered Orders')}

      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default OrdersPage;
