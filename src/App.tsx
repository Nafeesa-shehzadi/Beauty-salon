import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "../src/components/Auth/Login";
import AdminDashboard from "./pages/AdminDashboard";
import SignUp from "./components/Auth/SignUp";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/welcome";
import Notfound from "./pages/Notfound";
import ProtectedRoute from "../src/components/Auth/ProtectedRoute";
import CartComponent from "./pages/CartItems";
import UserBookings from "./pages/UserBookings";
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} /> {/* Welcome Page */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Notfound />} /> {/* 404 Page */}
          <Route path="/cartitems" element={<CartComponent />} />
          <Route path="/userbookings/:userId" element={<UserBookings />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
