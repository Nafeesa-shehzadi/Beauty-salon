import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUser, registerUser } from "../../redux/userSlice"; // Import actions

// Styled Box for the Modal

// Define the User type locally if it's not imported
interface User {
  id: number;
  username: string;
  email: string;
  password: string; // Optional for simplicity
  phone: string;
  profile?: string;
  isAdmin: boolean; // Add isAdmin property
}

interface EditUserModalProps {
  open: boolean;
  handleClose: () => void;
  user: User | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  handleClose,
  user,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<User>({
    id: 0,
    username: "",
    email: "",
    password: "",
    phone: "",
    profile: "",
    isAdmin: false, // Add isAdmin property
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);

  // Update the form data when the user prop changes
  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      // Reset form data for new user
      setFormData({
        id: 0,
        username: "",
        email: "",
        password: "",
        phone: "",
        profile: "",
        isAdmin: false, // Add isAdmin property
      });
      setProfileImage(null);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (profileImage) {
      const reader = new FileReader();
      reader.readAsDataURL(profileImage);
      reader.onload = () => {
        const profileImageBase64 = reader.result as string;

        const updatedFormData = {
          ...formData,
          profile: profileImageBase64,
        };

        if (user) {
          // If user exists, dispatch updateUser action
          dispatch(updateUser(updatedFormData));
        } else {
          // If creating a new user, dispatch createUser action
          dispatch(registerUser(updatedFormData));
        }

        handleClose(); // Close the modal
      };
    } else {
      // If no image is selected, dispatch without the image
      if (user) {
        // If user exists, dispatch updateUser action
        dispatch(updateUser(formData));
      } else {
        // If creating a new user, dispatch createUser action
        dispatch(registerUser(formData));
      }

      handleClose(); // Close the modal
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{user ? "Edit User" : "Create User"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="phone"
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ margin: "16px 0" }} // Optional styling
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px" }}
          >
            {user ? "Update User" : "Create User"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
