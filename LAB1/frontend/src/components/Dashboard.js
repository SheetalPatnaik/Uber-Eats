import React from "react";
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard/profile">User Profile</Link></li>
          <li><Link to="/dashboard/restaurant">Restaurant</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Dashboard;
