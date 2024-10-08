import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { Button, Typography, Box } from "@mui/material";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import About from "./about";
import Services from "./Services";
import Contact from "./Contact";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import ImageCarousel from "./ImageCrousal";
import { CssBaseline } from "@mui/material";

// Global Reset CSS for Body and Box Sizing
const GlobalStyles = styled("div")({
  "*": {
    boxSizing: "border-box", // Ensure proper box-sizing
  },
  body: {
    margin: 0, // Remove default margin on body
    padding: 0,
    overflowX: "hidden", // Prevent horizontal overflow
  },
});

// Styled Components
const HomePageContainer = styled("div")({
  maxWidth: "100%",
  overflowX: "hidden", // Prevent horizontal scrolling
  margin: 0,
  padding: 0,
  fontFamily: "Roboto, sans-serif",
});

const HeaderContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: "40px 20px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  marginBottom: "20px",
}));

const WelcomeText = styled(Typography)({
  fontSize: "2rem",
  fontWeight: "bold",
});

const LogoutButton = styled(Button)(({ theme }) => ({
  marginTop: "20px",
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  color: theme.palette.primary.contrastText,
  fontWeight: "bold",
}));

const SectionsContainer = styled("div")({
  width: "100%", // Ensure the sections take up 100% of the width
  marginTop: "40px",
  padding: "0", // Remove padding that might affect layout
  overflowX: "hidden", // Prevent any overflow horizontally
});

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.users.isAuthenticated
  );
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const navigate = useNavigate();

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Create MUI theme based on isDarkMode
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: "#ff4081", // Adjust primary color as needed
      },
      background: {
        default: isDarkMode ? "#121212" : "#fff",
      },
    },
  });

  // Handler to toggle theme
  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // State to manage cart count

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <GlobalStyles>
        <HomePageContainer>
          {currentUser && (
            <Navbar
              currentUser={{
                id: currentUser.id,
                username: currentUser.username,
                profileImage: currentUser.profileImage || "",
              }}
              isDarkMode={isDarkMode}
              onThemeToggle={handleThemeToggle}
            />
          )}
          <HeroSection />
          {isAuthenticated && currentUser && (
            <>
              <HeaderContainer>
                <WelcomeText variant="h4">
                  Welcome, {currentUser.username}!
                </WelcomeText>
                <LogoutButton variant="contained" onClick={handleLogout}>
                  Logout
                </LogoutButton>
              </HeaderContainer>
              <SectionsContainer>
                <section id="about">
                  <About />
                </section>
                <section id="services">
                  <Services />
                </section>
                <section id="buy">
                  <ImageCarousel /> {/* Pass setCartCount */}
                </section>
                <section id="contact">
                  <Contact />
                </section>
              </SectionsContainer>
            </>
          )}
          <Footer />
        </HomePageContainer>
      </GlobalStyles>
    </ThemeProvider>
  );
};

export default HomePage;
