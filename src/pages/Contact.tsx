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
  Alert, // Import Alert
} from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addMessage } from "../redux/messageSlice";
const ContactContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "100%",
});

const InfoItem = styled(Box)(() => ({
  textAlign: "center",
  gap: "30px",
  border: "5px solid pink", // Added pink border
  borderRadius: "10px", // Optional: adds rounded corners
  flex: "1", // Make all boxes equal width
  minWidth: "250px", // Minimum width for boxes
  alignContent: "center",
}));

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
  color: "#000",
});

const ContactBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "40px",
  height: "20vh",
  width: "100%",
  paddingLeft: "15rem",
  paddingRight: "15rem",
  marginBottom: "5rem",
}));

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

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  marginBottom: "16px",
  "& .MuiInputBase-input": {
    color: "#000", // Input text color (black for white background)
  },
  "& .MuiInputLabel-root": {
    color: "#000", // Label text color (black for white background)
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000", // Border color (black)
    },
    "&:hover fieldset": {
      borderColor: theme.palette.secondary.main, // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main, // Border color when focused
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  width: "100%",
  marginBottom: "16px",
  "& .MuiInputBase-input": {
    color: "#000", // Text color for the select field (black)
  },
  "& .MuiInputLabel-root": {
    color: "#000", // Label text color (black)
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000", // Border color (black)
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.secondary.main, // Border color on hover
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.secondary.main, // Border color when focused
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "100%",
  marginBottom: "16px",
  "& .MuiInputLabel-root": {
    color: "#000", // Label text color (black)
  },
  "& .MuiSelect-select": {
    color: "#000", // Select field text color (black)
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000", // Border color (black)
  },
}));

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
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  // Generate a unique id for each new message/booking
  const generateId = () => Math.floor(Math.random() * 1000000);
  const services = useSelector((state: RootState) => state.messages.services);
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentDate = new Date().toISOString().split("T")[0]; // Get current date

    if (date < currentDate) {
      setSnackbarMessage("Please select a future date.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (persons < 1) {
      setSnackbarMessage("At least one person must be selected.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const newId = generateId();

    try {
      // Check if currentUser is not null before accessing its properties
      if (currentUser) {
        dispatch(
          addMessage({
            id: newId,
            name,
            date,
            userId: currentUser.id,
            persons,
            desc,
            service: service.join(", "),
            email: currentUser.email,
          })
        );
      } else {
        // Handle the case when currentUser is null
        console.error("currentUser is null");
      }
      setSnackbarMessage("Message sent successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Clear the form after submission
      setName("");
      setDate("");
      setPersons(1);
      setDesc("");
      setService([]);
    } catch (error: any) {
      setSnackbarMessage("Failed to send message");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
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
          <StyledFormControl fullWidth>
            <InputLabel>Services</InputLabel>
            <StyledSelect
              multiple
              value={service}
              onChange={(e) => setService(e.target.value as string[])}
              label="Services"
              required
            >
              {services.map((serviceItem) => (
                <MenuItem key={serviceItem.id} value={serviceItem.title}>
                  {serviceItem.title}
                </MenuItem>
              ))}
            </StyledSelect>
          </StyledFormControl>

          <StyledButton type="submit" variant="contained" color="primary">
            Send
          </StyledButton>
        </FormContainer>
      </Contactimg>

      {/* Snackbar component to show success message */}
      {/* Snackbar for success and error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ContactContainer>
  );
};

export default Contact;
