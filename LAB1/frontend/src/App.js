// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Restaurant from "./components/Restaurant";
import RestaurantDashboard from "./components/RestaurantDashboard";
import RestLogin from './components/RestLogin'; 
import MenuItemForm from './components/MenuItemForm';
import MenuPage from './components/MenuPage';

function App() {
  return (
    <Router>
      <div>
        {/* <h1>Welcome to Uber Eats Clone</h1> */}
        <Routes>
          {/* Redirect to signup first */}
          <Route path="/" element={<Navigate to="/signup" />} />

          {/* Routes for Signup and Login */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />


          <Route path="/restaurantdashboard" element={<RestaurantDashboard />}>
            {/* <Route path="restaurant" element={<Restaurant />} /> */}
          </Route>
          {/* Dashboard route */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="restaurant" element={<Restaurant />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/restlogin" element={<RestLogin />} />
          <Route path="/restaurant/updatemenu" element={<MenuItemForm />} />

          {/* Route for MenuPage - This displays menu items based on restaurant owner's username */}
          <Route path="/menu/:username" element={<MenuPage />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
