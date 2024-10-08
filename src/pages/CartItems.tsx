import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, clearCart } from "../redux/CartSlice";
import { RootState } from "../redux/store";
import {
  CardContent,
  IconButton,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

// Styled components
const BackgroundContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "20px",
  background: "linear-gradient(to right, #f8cdda, #1d2b64)", // Gradient background
  maxWidth: "100%",
  overflow: "hidden",
});

const CartBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
  height: "auto",
  width: "100%",
  maxWidth: "800px", // Max width for the cart box
  margin: "0 auto",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent white background
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow for depth
});

const StyledCard = styled("div")({
  margin: "10px 0",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)", // Slight zoom effect on hover
  },
  cursor: "pointer",
  gap: "10px",
  width: "50%",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "auto",
  borderRadius: "8px 8px 0 0",
});

const CartComponent = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  ); // Get the current logged-in user
  const cartItems = useSelector((state: RootState) => {
    const userId = currentUser?.id;
    return userId ? state.carts.userCarts[userId] || [] : [];
  }); // Get the current user's cart items

  const handleRemoveFromCart = (itemId: number) => {
    if (!currentUser) {
      return; // Handle the case when currentUser is null
    }

    dispatch(removeItemFromCart({ userId: currentUser.id, itemId }));
  };

  const handleClearCart = () => {
    if (!currentUser) {
      return; // Handle the case when currentUser is null
    }

    dispatch(clearCart({ userId: currentUser.id }));
  };

  return (
    <BackgroundContainer>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Your cart is empty!
        </Typography>
      ) : (
        cartItems.map((cartItem) => (
          <StyledCard key={cartItem.id}>
            <Grid container spacing={2}>
              <Grid item md={4}>
                <StyledImage
                  src={cartItem.image}
                  alt={cartItem.name}
                  height="200"
                />
              </Grid>
              <Grid item md={8}>
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ textAlign: "left" }}
                  >
                    <Typography variant="h5">{cartItem.name}</Typography>
                    <IconButton
                      onClick={() => handleRemoveFromCart(cartItem.id)}
                      aria-label="close"
                      sx={{ marginLeft: "auto" }} // Ensure icon is on the right
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body1" className="fw-bold">
                    ${cartItem.price}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </StyledCard>
        ))
      )}

      {/* Clear Cart Button */}
      {cartItems.length > 0 && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClearCart}
          sx={{ mt: 2 }}
        >
          Clear Cart
        </Button>
      )}
    </BackgroundContainer>
  );
};

export default CartComponent;
