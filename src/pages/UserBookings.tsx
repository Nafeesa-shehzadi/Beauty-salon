import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { selectBookingsByUserId } from "../redux/messageSlice"; // Import the selector
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom"; // Import useParams
import { RootState } from "../redux/store";

// Styled components
const BackgroundContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "20px",
  background: "linear-gradient(to right, #f8cdda, #1d2b64)", // Gradient background
});

const StyledCard = styled(Card)({
  margin: "10px 0",
  borderRadius: "15px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)", // Lift effect on hover
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)", // Increase shadow on hover
  },
});

const UserBookings = () => {
  const { userId } = useParams<{ userId: string }>(); // Get userId from URL parameters
  const bookings = useSelector(
    (state: RootState) => selectBookingsByUserId(state, Number(userId)) // Pass userId as a second argument
  ); // Fetch bookings for the current user

  return (
    <BackgroundContainer>
      <Typography
        variant="h4"
        gutterBottom
        color="#2c3e50"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        Your Bookings
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking.id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" color="#2980b9">
                    {booking.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {booking.date}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Persons: {booking.persons}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Service: {booking.service}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ marginTop: "10px", color: "#34495e" }}
                  >
                    Description: {booking.desc}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Typography
            variant="body1"
            style={{ textAlign: "center", color: "#e74c3c" }}
          >
            No bookings found.
          </Typography>
        )}
      </Grid>
    </BackgroundContainer>
  );
};

export default UserBookings;
