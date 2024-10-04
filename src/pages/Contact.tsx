import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Snackbar, // Import Snackbar
} from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addMessage } from "../redux/messageSlice";
import toast from "react-hot-toast";

const ContactContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

const InfoItem = styled(Box)({
  textAlign: "center",
  gap: "20px",
  border: "10px",
  borderColor: "Highlight",
});

const ImageItem = styled("img")({
  width: "50%",
  height: "600px",
  marginBottom: "16px",
  borderRadius: "10px",
  marginLeft: "5rem",
});

const FormContainer = styled("form")({
  backgroundColor: "#fff",
  padding: "16px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  width: "40%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "600px",
  marginLeft: "1rem",
  marginBottom: "16px",
  marginRight: "5rem",
});

const ContactBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  height: "20vh",
  width: "100%",
  paddingLeft: "15rem",
  paddingRight: "15rem",
});

const Contactimg = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "16px",
  gap: "2px",
});

const FormFields = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  margin: "16px",
  gap: "16px",
  width: "100%",
});

const StyledTextField = styled(TextField)({
  width: "100%",
  marginBottom: "16px",
});

const StyledButton = styled(Button)({
  marginTop: "3rem",
  backgroundColor: "#da5e9c",
  color: "white",
  fontWeight: "bold",
  padding: "12px 280px",
  borderRadius: "8px",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#a74275",
  },
});

const Contact: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [persons, setPersons] = useState<number>(1);
  const [service, setService] = useState<string[]>([]);
  const [desc, setDesc] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar
  const dispatch: AppDispatch = useDispatch();

  // Generate a unique id for each new message/booking
  const generateId = () => Math.floor(Math.random() * 1000000);
  const services = useSelector((state: RootState) => state.messages.services);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newId = generateId();

    try {
      dispatch(
        addMessage({
          id: newId,
          name,
          date,
          persons,
          desc,
          service: service.join(", "),
        })
      );
      toast.success("Message sent successfully");

      // Open the snackbar
      setSnackbarOpen(true);

      // Clear the form after submission
      setName("");
      setDate("");
      setPersons(1);
      setDesc("");
      setService([]);
    } catch (error: any) {
      toast.error("Failed to send message");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close the snackbar
  };

  return (
    <ContactContainer>
      <Box textAlign="center" mt={4} mb={4}>
        <Typography variant="h2">Contact Us</Typography>
      </Box>
      <ContactBox>
        <InfoItem>
          <Typography variant="h4">Address</Typography>
          <Typography>Jail Chowk, Mandi BahaUddin, 50700</Typography>
        </InfoItem>
        <InfoItem>
          <Typography variant="h4">Call Us</Typography>
          <Typography>+92-321-1111111</Typography>
        </InfoItem>
        <InfoItem>
          <Typography variant="h4">Mail Us</Typography>
          <Typography>Glamour@gmail.com</Typography>
        </InfoItem>
      </ContactBox>
      <Contactimg>
        <ImageItem src="/beauty.jpg" alt="beauty" />
        <FormContainer onSubmit={handleSendMessage}>
          <Typography variant="h4" component="h2">
            CONTACT
          </Typography>
          <FormFields>
            <StyledTextField
              type="text"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <StyledTextField
              type="date"
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </FormFields>
          <StyledTextField
            type="number"
            label="Persons"
            value={persons}
            onChange={(e) => setPersons(Number(e.target.value))}
            required
          />
          <StyledTextField
            label="Description"
            multiline
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Services</InputLabel>
            <Select
              multiple
              value={service}
              onChange={(e) => setService(e.target.value as string[])}
              label="Services"
            >
              {services.map((serviceItem) => (
                <MenuItem key={serviceItem.id} value={serviceItem.title}>
                  {serviceItem.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <StyledButton type="submit" variant="contained" color="primary">
            Send
          </StyledButton>
        </FormContainer>
      </Contactimg>

      {/* Snackbar component to show success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Appointment done!"
        action={
          <Button color="secondary" size="small" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      />
    </ContactContainer>
  );
};

export default Contact;
