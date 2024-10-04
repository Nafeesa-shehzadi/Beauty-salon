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
} from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { scroller } from "react-scroll";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit"; // Import EditIcon for editing profile image
import { useDispatch } from "react-redux";
import { updateProfileImage } from "../redux/userSlice"; // Import the action

const Logo = styled("img")({
  width: "100px",
  height: "100px",
});

const NavbarContainer = styled(AppBar)({
  backgroundColor: "#f8c5da", // Light pink background
  position: "sticky",
  color: "white", // Ensure all text inside is white
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
  color: "white", // Button text color
});

const AvatarContainer = styled(Box)({
  position: "relative", // Required for positioning the edit icon
});

const EditIconStyled = styled(EditIcon)({
  position: "absolute", // Position the edit icon absolutely
  bottom: 0,
  right: 0,
  backgroundColor: "black", // Background color for better visibility
  borderRadius: "50%",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.8, // Slightly dim on hover
  },
});

const Navbar: React.FC<{
  currentUser?: { username: string; profileImage: string; id: number }; // Include user ID
}> = ({ currentUser }) => {
  const dispatch = useDispatch(); // Initialize useDispatch
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false); // State to manage hover
  const [profileImage, setProfileImage] = useState(
    currentUser?.profileImage || ""
  ); // Local state for image

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
        // Dispatch the updateProfileImage action with the new image URL
        dispatch(
          updateProfileImage({
            id: currentUser.id,
            newImage: reader.result as string,
          })
        );
        // Update local state to re-render the avatar
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file); // Read the uploaded image file as a data URL
    }
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
              color: "white", // Ensure the logo text is white
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
        </NavLinks>

        <IconButton
          edge="end"
          onClick={() => setShow(!show)}
          style={{ marginLeft: "auto", color: "white" }} // Hamburger icon in white
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
              src={profileImage} // Use local state for image
              style={{ marginLeft: "10px" }} // Space between menu icon and avatar
            />
            {hovered && (
              <>
                <Input
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  onChange={handleImageUpload}
                  style={{ display: "none" }} // Hide the input
                  id="file-input"
                />
                <label htmlFor="file-input">
                  <EditIconStyled
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents the label from triggering the file input again
                      const input = document.getElementById("file-input");
                      if (input) {
                        input.click(); // Programmatically click the input
                      }
                    }}
                  />
                </label>
              </>
            )}
          </AvatarContainer>
        )}
      </Toolbar>
    </NavbarContainer>
  );
};

export default Navbar;
