import React, { useState } from "react";
import { Typography, Container, Button, Box, Paper } from "@mui/material";
import UserTable from "../components/Dashboard/Usertable";
import Booking from "../components/Dashboard/Bookings";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";

// Styled components
const StyledBackground = styled("div")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "auto",
  backgroundImage: "url('/login.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: -1,
}));

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  position: "relative",
  zIndex: 1,
  marginTop: "10px",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(10px)",
  boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
  maxWidth: "auto",
  width: "100%",
  color: "#fff",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  margin: theme.spacing(4, 0),
}));

const StyledButton = styled(Button)(() => ({
  padding: "10px 20px",
  "&.MuiButton-containedPrimary": {
    backgroundColor: "#1976d2",
    "&:hover": {
      backgroundColor: "#115293",
    },
  },
  "&.MuiButton-containedSecondary": {
    backgroundColor: "#f50057",
    "&:hover": {
      backgroundColor: "#ab003c",
    },
  },
}));

const AdminDashboard: React.FC = () => {
  const [view, setView] = useState<"users" | "bookings" | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleViewUsers = () => {
    setView("users");
  };

  const handleViewBookings = () => {
    setView("bookings");
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <StyledBackground>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
          marginLeft: 70,
          marginRight: 5,
          padding: "10px 20px",
        }}
      >
        <Title variant="h4" align="center">
          Admin Dashboard
        </Title>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleLogout}
        >
          Logout
        </StyledButton>
      </Box>

      <Box display="flex" justifyContent="center" gap={2} marginY={2}>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleViewUsers}
        >
          View Users
        </StyledButton>
        <StyledButton
          variant="contained"
          color="secondary"
          onClick={handleViewBookings}
        >
          View Bookings
        </StyledButton>
      </Box>
      <StyledContainer>
        <StyledPaper elevation={3}>
          {view === "users" && (
            <>
              <Typography
                variant="h6"
                align="center"
                marginY={2}
                sx={{ fontWeight: "bold" }}
              >
                Registered Users
              </Typography>
              <UserTable />
            </>
          )}
          {view === "bookings" && (
            <>
              <Typography
                variant="h6"
                align="center"
                marginY={2}
                sx={{ fontWeight: "bold" }}
              >
                All Bookings
              </Typography>
              <Booking />
            </>
          )}
        </StyledPaper>
      </StyledContainer>
    </StyledBackground>
  );
};

export default AdminDashboard;
