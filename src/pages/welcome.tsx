import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, styled } from "@mui/material";

// Styled components
const BackgroundBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundImage: "url('/salon.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const ContentBox = styled(Box)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.md, // Use theme breakpoints for maxWidth
  width: "100%",
  backgroundColor: "white",
  opacity: 0.8,
  padding: theme.spacing(4), // 4 * 8px (theme spacing)
  borderRadius: "8px",
  boxShadow: theme.shadows[3],
}));

const RegisterButton = styled(Button)({
  backgroundColor: "#da5e9c",
  "&:hover": {
    backgroundColor: "#a74275",
  },
  width: "100%",
  padding: "16px", // 2 * 8px (theme spacing)
  color: "#fff",
  fontWeight: "bold",
});

const LoginButton = styled(Button)({
  backgroundColor: "#d786ae",
  "&:hover": {
    backgroundColor: "#b47092",
  },
  width: "100%",
  padding: "16px", // 2 * 8px (theme spacing)
  color: "#fff",
  fontWeight: "bold",
});

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <BackgroundBox>
      <ContentBox>
        <Typography
          variant="h3"
          color="#FF007F"
          textAlign="left"
          fontFamily="'Alex Brush', cursive"
        >
          Glamour
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={2}
          fontFamily="'Alex Brush', cursive"
        >
          Welcome to Glamour Beauty Salon
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <RegisterButton onClick={handleRegisterClick}>
            Register
          </RegisterButton>
          <LoginButton onClick={handleLoginClick}>Login</LoginButton>
        </Box>
      </ContentBox>
    </BackgroundBox>
  );
};

export default WelcomePage;
