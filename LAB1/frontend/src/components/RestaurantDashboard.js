

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent, Grid } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   CssBaseline,
//   IconButton,
//   Button,
// } from "@mui/material";
// import { AccountCircle } from "@mui/icons-material";
// import logo from "../uber_Eats_logo_2.png";
// import './RestaurantDashboard.css';
// import AddDish from "./AddDish.js"; // Import the modal component

// function RestaurantDashboard() {
//   const [dishes, setDishes] = useState([]); // State to hold the list of dishes
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(true); // State for loading
//   const navigate = useNavigate();
//   const [openModal, setOpenModal] = useState(false); // State for modal visibility

//   // Function to handle opening and closing the modal
//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => {setOpenModal(false);
//     fetchDishes();
//   }

//   // Fetch dishes for the logged-in restaurant owner
//   const fetchDishes = () => {
//     axios
//       .get("http://localhost:8000/api/get_dishes/")
//       .then((response) => {
//         setDishes(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching restaurant data:", error);
//         setError("Failed to fetch dishes");
//       });
//   };

//   useEffect(() => {
//     fetchDishes();
//   }, []);

//   return (
//     <>
//       <CssBaseline />
//       <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//         {/* Header */}
//         <AppBar position="static" sx={{ backgroundColor: "#06C167" }}>
//           <Toolbar>
//             <Box
//               component="img"
//               src={logo}
//               alt="Logo"
//               sx={{ height: 40, width: "auto", mr: 2 }}
//             />
//             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//               Uber Eats Clone
//             </Typography>

//             {/* User Profile Icon */}
//             <IconButton onClick={() => navigate("/profile")} color="inherit">
//               <AccountCircle fontSize="large" />
//             </IconButton>
//           </Toolbar>
//         </AppBar>

//         {/* Main Content */}
//         <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 2, flexGrow: 1 }}>
//           <Box sx={{ mt: 4 }}>
//             <Button variant="contained" onClick={handleOpenModal}>
//               Add New Dish
//             </Button>

//             {/* Render the modal */}
//             <AddDish open={openModal} onClose={handleCloseModal} />
//           </Box>
//           <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
//             {dishes.map((dish, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Card className="dishes-card">
//                   <CardContent>
//                     <Typography variant="h6" component="div">
//                       {dish.dish_name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Price: ${dish.price}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Category: {dish.category}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>

//         {/* Footer */}
//         <Box
//           component="footer"
//           sx={{
//             py: 3,
//             px: 2,
//             mt: "auto",
//             backgroundColor: (theme) =>
//               theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
//           }}
//         >
//           <Container maxWidth="sm">
//             <Typography variant="body1" sx={{ textAlign: "center" }}>
//               © 2024 Uber Eats Clone (Aishwarya Thorat SJSU)
//             </Typography>
//           </Container>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default RestaurantDashboard;



















import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  IconButton,
  Button,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import logo from "../uber_Eats_logo_2.png";
import './RestaurantDashboard.css';
import AddDish from "./AddDish.js"; // Import the AddDish modal
import EditDishModal from "./EditDishModal"; // Import the EditDish modal

function RestaurantDashboard() {
  const [dishes, setDishes] = useState([]); // State to hold the list of dishes
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false); // State for add modal visibility
  const [openEditModal, setOpenEditModal] = useState(false); // State for edit modal visibility
  const [currentDish, setCurrentDish] = useState(null); // Current dish to edit

  // Function to handle opening and closing the add modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    fetchDishes();
  };

  // Function to handle opening and closing the edit modal
  const handleOpenEditModal = (dish) => {
    setCurrentDish(dish);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    fetchDishes(); // Refresh the dishes list after closing the modal
  };

  // Fetch dishes for the logged-in restaurant owner
  const fetchDishes = () => {
    axios
      .get("http://localhost:8000/api/get_dishes/")
      .then((response) => {
        setDishes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurant data:", error);
        setError("Failed to fetch dishes");
      });
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Header */}
        <AppBar position="static" sx={{ backgroundColor: "#06C167" }}>
          <Toolbar>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ height: 40, width: "auto", mr: 2 }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Uber Eats Clone
            </Typography>

            {/* User Profile Icon */}
            <IconButton onClick={() => navigate("/profile")} color="inherit">
              <AccountCircle fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 2, flexGrow: 1 }}>
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" onClick={handleOpenModal}>
              Add New Dish
            </Button>

            {/* Render the Add Dish modal */}
            <AddDish open={openModal} onClose={handleCloseModal} />
          </Box>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            {dishes.map((dish, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="dishes-card">
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {dish.dish_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${dish.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {dish.category}
                    </Typography>
                    {/* Edit button */}
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenEditModal(dish)}
                      sx={{ mt: 2 }}
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Render the Edit Dish modal */}
          {currentDish && (
            <EditDishModal
              open={openEditModal}
              onClose={handleCloseEditModal}
              dish={currentDish}
            
            />
          )}
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              © 2024 Uber Eats Clone (Aishwarya Thorat SJSU)
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default RestaurantDashboard;
