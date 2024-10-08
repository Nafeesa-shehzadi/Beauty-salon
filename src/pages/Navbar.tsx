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
  ListItemIcon,
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
import BookingsIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";
// Custom switch styled component
const SwitchContainer = styled("label")({
  fontSize: "17px",
  position: "relative",
  display: "inline-block",
  width: "64px",
  height: "34px",
  ".sun": {
    position: "absolute",
    top: "6px",
    left: "36px",
    zIndex: 1,
    width: "24px",
    height: "24px",
  },
  ".moon": {
    position: "absolute",
    top: "5px",
    left: "5px",
    zIndex: 1,
    width: "24px",
    height: "24px",
  },
  ".slider": {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#73C0FC",
    transition: ".4s",
    borderRadius: "30px",
    "&:before": {
      position: "absolute",
      content: '""',
      height: "30px",
      width: "30px",
      borderRadius: "20px",
      left: "2px",
      bottom: "2px",
      zIndex: 2,
      backgroundColor: "#e8e8e8",
      transition: ".4s",
    },
  },
  input: {
    opacity: 0,
    width: 0,
    height: 0,
    "&:checked + .slider": {
      backgroundColor: "#183153",
    },
    "&:checked + .slider:before": {
      transform: "translateX(30px)",
    },
  },
});

// Additional styles for Navbar components
const Logo = styled("img")({
  width: "100px",
  height: "100px",
});

const NavbarContainer = styled(AppBar)({
  backgroundColor: "inherit",
  position: "sticky",
  color: "inherit",
  overflowX: "hidden",
  maxWidth: "100%",
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
  color: "inherit",
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
  currentUser: any;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}> = ({ currentUser, isDarkMode, onThemeToggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [profileImage, setProfileImage] = useState(
    currentUser?.profileImage || ""
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const cartItems = useSelector((state: RootState) => {
    const userId = currentUser?.id;
    return userId ? state.carts.userCarts[userId] || [] : [];
  });

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
              color: "inherit",
            }}
          >
            Glamour
          </Typography>
        </Box>

        {/* Custom Light/Dark Mode Toggle */}
        <Box display="flex" alignItems="center" mr={2}>
          <SwitchContainer>
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={onThemeToggle}
            />
            <span className="slider" />
            <span className="sun">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FFD700"
              >
                <circle cx="12" cy="12" r="5" />
                <g stroke="#FFD700" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="4" />
                  <line x1="12" y1="20" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="4" y2="12" />
                  <line x1="20" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
                </g>
              </svg>
            </span>
            <span className="moon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="#C0C0C0"
              >
                <path d="M283.211 512C126.93 512 0 385.07 0 228.789C0 123.819 51.628 31.514 133.129 0C121.863 22.482 115.2 48.295 115.2 75.2C115.2 166.109 193.891 244.8 284.8 244.8C311.705 244.8 337.518 238.137 360 226.871C328.486 308.372 236.181 360 131.211 360C72.5 360 19.71 336.54 0 293.19C35.597 451.601 173.4 512 283.211 512Z" />
              </svg>
            </span>
          </SwitchContainer>
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
            ({cartCount})
          </StyledButton>
        </NavLinks>

        <IconButton
          edge="end"
          onClick={() => setShow(!show)}
          style={{ marginLeft: "auto", color: "inherit" }}
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
              onClick={(event) => setAnchorEl(event.currentTarget)}
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
                  <EditIconStyled />
                </label>
              </>
            )}
          </AvatarContainer>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleEditProfile}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit Profile
          </MenuItem>

          <MenuItem onClick={handleBookings}>
            <ListItemIcon>
              <BookingsIcon fontSize="small" />
            </ListItemIcon>
            Bookings
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </NavbarContainer>
  );
};

export default Navbar;
