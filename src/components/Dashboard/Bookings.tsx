import React, { useState } from "react";
import {
  Container,
  Button,
  Box,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  addMessage,
  updateMessage,
  deleteMessage,
  setSearchTerm,
} from "../../redux/messageSlice";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Booking: React.FC = () => {
  const dispatch = useDispatch();
  const { messages, searchTerm } = useSelector(
    (state: RootState) => state.messages
  );
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const services = useSelector((state: RootState) => state.messages.services);

  const [editingMessage, setEditingMessage] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false); // Modal state
  const [newBooking, setNewBooking] = useState({
    id: Math.random(), // Generate a unique ID for each new booking
    name: "",
    date: "",
    persons: 1,
    desc: "",
    service: [] as string[], // Initialize service as an array of strings
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleOpenModal = (booking: any | null = null) => {
    if (booking) {
      console.log("Editing booking:", booking);
      // Editing an existing booking, prefill form
      setNewBooking({
        ...booking,
        service: booking.service.split(", ") || [], // Split string into array
      });
      setEditingMessage(booking.id);
    } else {
      // Adding a new booking, reset form
      setNewBooking({
        id: Math.random(),
        name: "",
        date: "",
        persons: 1,
        desc: "",
        service: [], // Initialize as empty array for new booking
      });
      setEditingMessage(null);
    }
    setModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close modal
  };

  const handleSaveBooking = () => {
    // Join the service array into a string for compatibility with Redux store
    const bookingToSave = {
      ...newBooking,
      service: newBooking.service.join(", "), // Convert array to string
    };

    if (editingMessage !== null) {
      dispatch(updateMessage(bookingToSave)); // Update booking if in edit mode
    } else {
      dispatch(addMessage(bookingToSave)); // Add new booking
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    dispatch(deleteMessage(id));
  };

  // Filtered messages based on search term or show all if searchTerm is empty
  const filteredMessages = searchTerm
    ? messages.filter(
        (message) =>
          message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.date.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : messages;

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" marginY={2}>
        <TextField
          label="Search Bookings"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => handleOpenModal(null)}
        >
          Add Booking
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Persons</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMessages.map((message) => (
            <TableRow key={message.id}>
              <TableCell>{message.name}</TableCell>
              <TableCell>{currentUser ? currentUser.email : ""}</TableCell>
              <TableCell>{message.date}</TableCell>
              <TableCell>{message.persons}</TableCell>
              <TableCell>{message.desc}</TableCell>
              <TableCell>{message.service}</TableCell>{" "}
              {/* Display services directly */}
              <TableCell>
                <IconButton onClick={() => handleOpenModal(message)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDelete(message.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for Adding/Editing Booking */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>
          {editingMessage !== null ? "Edit Booking" : "Add Booking"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newBooking.name}
            onChange={(e) =>
              setNewBooking({ ...newBooking, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            type="date"
            value={newBooking.date}
            onChange={(e) =>
              setNewBooking({ ...newBooking, date: e.target.value })
            }
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Persons"
            type="number"
            value={newBooking.persons}
            onChange={(e) =>
              setNewBooking({ ...newBooking, persons: Number(e.target.value) })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={newBooking.desc}
            onChange={(e) =>
              setNewBooking({ ...newBooking, desc: e.target.value })
            }
            fullWidth
            margin="normal"
          />

          <FormControl fullWidth>
            <InputLabel>Services</InputLabel>
            <Select
              multiple
              value={newBooking.service} // Ensure this is always an array
              onChange={(e) => {
                const value = e.target.value; // This should be an array
                setNewBooking({
                  ...newBooking,
                  service: Array.isArray(value) ? value : [], // Ensure it’s treated as an array
                });
              }}
              label="Services"
              renderValue={(selected) => {
                // Ensure selected is an array for join()
                const selectedArray = Array.isArray(selected) ? selected : [];
                return selectedArray.join(", "); // Display selected services
              }}
            >
              {services.map((serviceItem) => (
                <MenuItem key={serviceItem.id} value={serviceItem.title}>
                  {serviceItem.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveBooking}
          >
            {editingMessage !== null ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Booking;
