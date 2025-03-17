import { useGetUserInfoQuery } from '@/redux/features/auth/authApi'; // Assuming this is the correct import path

const UserProfile = () => {
  // Get user info with the token handled by the baseApi
  const { data, error, isLoading } = useGetUserInfoQuery({});
  console.log(data);
  // Show loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle error in fetching user info
  if (error) {
    console.error('Error fetching user info:', error);
    return <div>Error: {JSON.stringify(error, null, 2)}</div>;
  }

  // Display the user's profile
  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {data?.name}</p>
      <p>Email: {data?.email}</p>
      {/* Add other user info here */}
    </div>
  );
};

export default UserProfile;



/**
 * import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/user"
          element={user?.role === "user" ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

 */