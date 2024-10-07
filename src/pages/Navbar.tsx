import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Avatar,
  Input,
  Menu,
  MenuItem,
} from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { scroller } from "react-scroll";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileImage } from "../redux/userSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store"; // Import the RootState type

const Logo = styled("img")({
  width: "100px",
  height: "100px",
});

const NavbarContainer = styled(AppBar)({
  backgroundColor: "#f8c5da",
  position: "sticky",
  color: "white",
  overflowX: "hidden", // Prevent horizontal scroll
});

const NavLinks = styled(Box)<{ show: boolean }>(({ show }) => ({
  display: show ? "flex" : "none",
  justifyContent: "center",
  flexGrow: 1,
  marginLeft: "20px",
}));

const StyledButton = styled(Button)({
  fontWeight: "bold",
  marginLeft: "10px",
  color: "white",
});

const AvatarContainer = styled(Box)({
  position: "relative",
});

const EditIconStyled = styled(EditIcon)({
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: "black",
  borderRadius: "50%",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.8,
  },
});

const Navbar: React.FC<{
  currentUser?: { username: string; profileImage: string; id: number };
}> = ({ currentUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [profileImage, setProfileImage] = useState(
    currentUser?.profileImage || ""
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State for menu anchor

  // Fetch the cart items for the logged-in user from the Redux store
  const cartItems = useSelector((state: RootState) => {
    const userId = currentUser?.id;
    return userId ? state.carts.userCarts[userId] || [] : [];
  });

  // Calculate the cart count
  const cartCount = cartItems.length;

  const handleCartClick = () => {
    navigate("/cartitems");
  };

  const handleNavigation = (section: string) => {
    scroller.scrollTo(section, {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
    setShow(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentUser) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          updateProfileImage({
            id: currentUser.id,
            newImage: reader.result as string,
          })
        );
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Menu item click handlers
  const handleEditProfile = () => {
    // Add functionality to edit profile
    console.log("Edit Profile");
    setAnchorEl(null); // Close the menu
  };

  const handleBookings = () => {
    // Add functionality to view bookings
    console.log("Bookings");
    setAnchorEl(null); // Close the
    if (currentUser) {
      navigate(`/userbookings/${currentUser.id}`); // Pass userId in the URL
    }
  };

  const handleLogout = () => {
    // Add functionality for logout
    console.log("Logout");
    setAnchorEl(null); // Close the menu
  };

  return (
    <NavbarContainer>
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Logo src="/logo.png" alt="Logo" />
          <Typography
            variant="h5"
            style={{
              marginLeft: "13px",
              fontWeight: "bolder",
              color: "white",
            }}
          >
            Glamour
          </Typography>
        </Box>

        <NavLinks show={show}>
          <StyledButton onClick={() => handleNavigation("hero")}>
            HOME
          </StyledButton>
          <StyledButton onClick={() => handleNavigation("services")}>
            SERVICES
          </StyledButton>
          <StyledButton onClick={() => handleNavigation("about")}>
            ABOUT
          </StyledButton>
          <StyledButton onClick={() => handleNavigation("contact")}>
            CONTACT
          </StyledButton>
          <StyledButton onClick={() => handleNavigation("buy")}>
            BUY HERE
          </StyledButton>
          <StyledButton
            onClick={handleCartClick}
            startIcon={<ShoppingCartIcon />}
          >
            ({cartCount}) {/* Show the cart count */}
          </StyledButton>
        </NavLinks>

        <IconButton
          edge="end"
          onClick={() => setShow(!show)}
          style={{ marginLeft: "auto", color: "white" }}
        >
          <GiHamburgerMenu />
        </IconButton>

        {currentUser && (
          <AvatarContainer
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar
              alt={currentUser.username}
              src={profileImage}
              style={{ marginLeft: "10px" }}
              onClick={(event) => setAnchorEl(event.currentTarget)} // Open menu on avatar click
            />
            {hovered && (
              <>
                <Input
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="file-input"
                />
                <label htmlFor="file-input">
                  <EditIconStyled
                    onClick={(e) => {
                      e.stopPropagation();
                      const input = document.getElementById("file-input");
                      if (input) {
                        input.click();
                      }
                    }}
                  />
                </label>
              </>
            )}
          </AvatarContainer>
        )}

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
          <MenuItem onClick={handleBookings}>Bookings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </NavbarContainer>
  );
};

export default Navbar;
