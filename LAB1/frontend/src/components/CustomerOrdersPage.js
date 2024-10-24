// import React, { useEffect, useState } from 'react';
// import {
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import axios from 'axios';

// const CustomerOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [snackOpen, setSnackOpen] = useState(false);
//   const [snackMessage, setSnackMessage] = useState('');

//   useEffect(() => {
//     // Fetch customer orders from the backend
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/customer-orders/`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you're using token-based auth
//           }
//         });
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//         setSnackMessage('Failed to fetch orders.');
//         setSnackOpen(true);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleSnackClose = () => {
//     setSnackOpen(false);
//   };

//   // Categorize orders based on status
//   const categorizedOrders = {
//     placed: orders.filter((order) => order.order_status === 'placed'),
//     processing: orders.filter((order) => order.order_status === 'processing'),
//     delivered: orders.filter((order) => order.order_status === 'delivered'),
//   };

//   // Function to render a table for each order category
//   const renderOrderTable = (orders, title) => (
//     <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'left', color: '#1976d2' }}>
//         {title}
//       </Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Order ID</TableCell>
//             <TableCell>Restaurant Name</TableCell>
//             <TableCell>Order Date</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell align="right">Items</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {orders.length > 0 ? (
//             orders.map((order) => (
//               <TableRow key={order.order_id}>
//                 <TableCell>{order.order_id}</TableCell>
//                 <TableCell>{order.restaurant_name}</TableCell> {/* Display restaurant name */}
//                 <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
//                 <TableCell>{order.order_status}</TableCell>
//                 <TableCell align="right">
//                   {order.order_items.map((item, index) => (
//                     <span key={index}>
//                       {item.name} (Qty: {item.quantity}),{' '}
//                     </span>
//                   ))}
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={5} align="center">No orders found.</TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );

//   return (
//     <Paper sx={{ padding: 3, marginTop: 3, borderRadius: 2, boxShadow: 3 }}>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>
//         Your Orders
//       </Typography>

//       {/* Render tables for each order category */}
//       {renderOrderTable(categorizedOrders.placed, 'Placed Orders')}
//       {renderOrderTable(categorizedOrders.processing, 'Processing Orders')}
//       {renderOrderTable(categorizedOrders.delivered, 'Delivered Orders')}

//       <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
//         <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
//           {snackMessage}
//         </Alert>
//       </Snackbar>
//     </Paper>
//   );
// };

// export default CustomerOrdersPage;


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
import './CustomerOrdersPage.css'; // Import CSS file

const CustomerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  useEffect(() => {
    // Fetch customer orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/customer-orders/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you're using token-based auth
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setSnackMessage('Failed to fetch orders.');
        setSnackOpen(true);
      }
    };

    fetchOrders();
  }, []);

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  // Categorize orders based on status
  const categorizedOrders = {
    placed: orders.filter((order) => order.order_status === 'placed'),
    processing: orders.filter((order) => order.order_status === 'processing'),
    delivered: orders.filter((order) => order.order_status === 'delivered'),
  };

  // Function to render a table for each order category
  const renderOrderTable = (orders, title) => (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'left', color: '#1976d2' }}>
        {title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Restaurant Name</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.order_id}>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.restaurant_name}</TableCell>
                <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
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
              <TableCell colSpan={5} align="center">No orders found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div className="customer-orders-page"> {/* Wrap your content in this div */}
      <Paper sx={{ padding: 3, marginTop: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>
          Your Orders
        </Typography>

        {/* Render tables for each order category */}
        {renderOrderTable(categorizedOrders.placed, 'Placed Orders')}
        {renderOrderTable(categorizedOrders.processing, 'Processing Orders')}
        {renderOrderTable(categorizedOrders.delivered, 'Delivered Orders')}

        <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
            {snackMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </div>
  );
};

export default CustomerOrdersPage;
