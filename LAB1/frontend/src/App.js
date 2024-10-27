import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Restaurant from "./components/Restaurant";
import RestaurantDashboard from "./components/RestaurantDashboard";
import RestLogin from './components/RestLogin'; 
import AddDish from './components/AddDish'; 


function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Redirect to signup by default */}
          <Route path="/" element={<Navigate to="/signup" />} />

          {/* Routes for Signup and Login */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Restaurant owner login route */}
          <Route path="/restlogin" element={<RestLogin />} />

          {/* Restaurant Dashboard with nested AddDish route */}
          <Route path="/restaurantdashboard" element={<RestaurantDashboard />} />
          <Route path="/adddish" element={<AddDish />} />

          {/* User Profile route */}
          <Route path="/profile" element={<Profile />} />

          {/* General Dashboard route */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="restaurant" element={<Restaurant />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
