import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { selectBookingsByUserId } from "../redux/messageSlice"; // Import the selector
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom"; // Import useParams
import { RootState } from "../redux/store";

const StyledCard = styled(Card)(/* styling */);

const UserBookings = () => {
  const { userId } = useParams<{ userId: string }>(); // Get userId from URL parameters
  const bookings = useSelector(
    (state: RootState) => selectBookingsByUserId(state, Number(userId)) // Pass userId as a second argument
  ); // Fetch bookings for the current user

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Bookings
      </Typography>
      <Grid container spacing={2}>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking.id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5">{booking.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {booking.date}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Persons: {booking.persons}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Service: {booking.service}
                  </Typography>
                  <Typography variant="body1" style={{ marginTop: "10px" }}>
                    Description: {booking.desc}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No bookings found.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default UserBookings;
