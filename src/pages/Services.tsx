import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Styled components using MUI's styled

const ServiceBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  gap: theme.spacing(2),
  padding: theme.spacing(5),
  overflow: "hidden",
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  margin: "1rem",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
  [theme.breakpoints.up("sm")]: {
    height: "350px",
  },
}));

const ServiceCardMedia = styled(CardMedia)(({ theme }) => ({
  height: "250px",
  [theme.breakpoints.up("sm")]: {
    height: "250px",
  },
}));

const ServiceCardContent = styled(CardContent)(() => ({
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  textAlign: "center",
}));

const HeadingTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary, // This will adapt to light or dark mode
}));

const Services: React.FC = () => {
  // Use Redux to get services from the store
  const services = useSelector((state: RootState) => state.messages.services);

  return (
    <ServiceBox>
      <Box textAlign="center" mb={4}>
        {/* Use the styled HeadingTypography component */}
        <HeadingTypography variant="h3" gutterBottom>
          Our Services
        </HeadingTypography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Link to={`/Notfound`}>
              <ServiceCard>
                <ServiceCardMedia image={service.url} title={service.title} />
                <ServiceCardContent>
                  <Typography variant="h6">{service.title}</Typography>
                </ServiceCardContent>
              </ServiceCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </ServiceBox>
  );
};

export default Services;
