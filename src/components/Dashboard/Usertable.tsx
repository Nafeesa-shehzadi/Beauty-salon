import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Avatar,
  Box,
  Snackbar,
  Alert,
  Container,
  FormControlLabel,
  Switch,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import {
  deleteUser,
  setSearchTerm,
  updateUserRole,
} from "../../redux/userSlice"; // Ensure updateUserRole is imported
import EditUserModal from "./EditUserModal"; // Ensure you import the EditUserModal

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  password: string;
  profileImage?: string;
  isAdmin: boolean; // Add isAdmin property
}

const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const filteredUsers = useSelector(
    (state: RootState) => state.users.filteredUsers
  );
  const searchTerm = useSelector((state: RootState) => state.users.searchTerm);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleAddUser = () => {
    setSelectedUser(null); // Reset for new user
    setModalOpen(true);
    dispatch(setSearchTerm("")); // Reset search term when adding a new user
  };

  const handleUpdateOpen = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleUpdateClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
    dispatch(setSearchTerm("")); // Reset search term after updating a user
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
    setSnackbarMessage("User deleted successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    dispatch(setSearchTerm("")); // Reset search term after deleting a user
  };

  const handleToggleAdmin = (user: User) => {
    const newIsAdmin = !user.isAdmin; // Toggle isAdmin status
    dispatch(updateUserRole({ userId: user.id, isAdmin: newIsAdmin })); // Update in Redux store
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" marginY={2}>
        <TextField
          label="Search user"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleAddUser}
          startIcon={<AddIcon />}
        >
          Add new User
        </Button>
      </Box>
      {filteredUsers.length === 0 ? (
        <p>No user found.</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>isAdmin</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar alt={user.username} src={user.profileImage || ""} />
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={user.isAdmin}
                        onChange={() => handleToggleAdmin(user)}
                        color="primary"
                      />
                    }
                    label={user.isAdmin ? "Admin" : "User"}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleUpdateOpen(user)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(user.id)}
                    style={{ marginLeft: 8 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <EditUserModal
        open={modalOpen}
        handleClose={handleUpdateClose}
        user={selectedUser}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserTable;
