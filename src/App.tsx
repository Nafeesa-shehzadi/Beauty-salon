import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "../src/components/Auth/Login";
import AdminDashboard from "./pages/AdminDashboard";
import SignUp from "./components/Auth/SignUp";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/welcome";
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} /> {/* Welcome Page */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
