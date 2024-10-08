import React from "react";
import { Link } from "react-scroll";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeroContainer = styled(Box)({
  backgroundImage: `url("/salon.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  position: "relative",
  display: "flex",
  maxWidth: "100%", // Set width to 100% to cover the entire viewport
  margin: 0,
  padding: 0,
  overflowX: "hidden", // Prevents overflow causing horizontal scroll
});

const Overlay = styled(Box)({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "white",
});

const StyledTitle = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "1rem",
  fontFamily: "Alex Brush",
  color: "#da5e9c",
});

const StyledSubtitle = styled(Typography)({
  fontWeight: "bolder",
  marginBottom: "1.5rem",
});

const StyledBodyText = styled(Typography)({
  marginBottom: "2rem",
});

const StyledButton = styled(Button)({
  backgroundColor: "#da5e9c",
  color: "white",
  fontWeight: "bold",
  padding: "12px 24px",
  borderRadius: "8px",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#a74275",
  },
});

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <Overlay>
        <StyledTitle variant="h3">Dream Maker</StyledTitle>
        <Box>
          <StyledSubtitle variant="h1">
            Turning Dreams into Unforgettable Moments!
          </StyledSubtitle>
          <StyledBodyText variant="body1">
            We believe that it is all about the BIG DREAMS and the small
            details!
          </StyledBodyText>
          <Link to="contact" spy={true} smooth={true} duration={500}>
            <StyledButton variant="contained">BOOK NOW</StyledButton>
          </Link>
        </Box>
      </Overlay>
    </HeroContainer>
  );
};

export default HeroSection;
