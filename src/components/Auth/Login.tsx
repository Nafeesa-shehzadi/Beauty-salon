import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { styled } from "@mui/material/styles";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUser } from "../../redux/userSlice";

// Styled components...
const StyledBackground = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('/login.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: -1,
});

const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  position: "relative",
  zIndex: 1,
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(10px)",
  boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
  maxWidth: "400px",
  width: "100%",
  color: "#fff",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: "#fff",
  textDecoration: "underline",
  marginTop: theme.spacing(2),
}));

const StyledForm = styled("form")({
  width: "100%",
});
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#da5e9c",
  color: "white",
  fontWeight: "bold",
  padding: "12px 24px",
  borderRadius: "8px",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#a74275",
  },
}));

// Validation Schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, users } = useSelector(
    (state: RootState) => ({
      isAuthenticated: state.users.isAuthenticated,
      currentUser: state.users.currentUser,
      users: state.users.users,
    })
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle form submission
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsSubmitting(true); // Start submitting
      dispatch(loginUser(values)); // Dispatch the login action
    },
  });

  // Handle side effects after form submission
  useEffect(() => {
    if (isAuthenticated) {
      if (currentUser && currentUser.isAdmin) {
        setSnackbarMessage("Login Successfully as Admin!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        navigate("/admin");
      } else {
        setSnackbarMessage("Login Successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        navigate("/home");
      }
    } else if (isSubmitting) {
      setSnackbarMessage("Login Failed. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    setIsSubmitting(false); // Reset submitting status
  }, [isAuthenticated, currentUser, navigate, isSubmitting]);
  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
  };

  // Close dialog
  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Handle password reset
  const handleResetPassword = () => {
    const user = users.find((u) => u.email === email);
    if (user) {
      if (newPassword === confirmPassword) {
        dispatch(updateUser({ ...user, password: newPassword }));
        setSnackbarMessage("Password updated successfully!");
        setSnackbarSeverity("success");
        handleForgotPasswordClose();
      } else {
        setSnackbarMessage("Passwords do not match!");
        setSnackbarSeverity("error");
      }
    } else {
      setSnackbarMessage("Email not found!");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };
  // Snackbar handling
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {" "}
      <StyledBackground />
      {/* Your existing components for layout */}
      <StyledContainer>
        <StyledPaper elevation={3}>
          <Typography variant="h4" component="h2" gutterBottom>
            Login <span className="primary-color">Welcome</span> Back 👋
          </Typography>
          <StyledForm onSubmit={formik.handleSubmit}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box textAlign="right">
              <Button
                onClick={handleForgotPasswordOpen}
                sx={{
                  color: "#fff",
                  textDecoration: "underline",
                  cursor: "pointer",
                  textTransform: "none",
                }}
              >
                Forgot Password?
              </Button>
            </Box>
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </StyledButton>
          </StyledForm>
          <Typography
            variant="body2"
            style={{ marginTop: "16px", color: "#fff" }}
          >
            Don't have an account?{" "}
            <StyledLink href="/signup">Register</StyledLink>
          </Typography>
        </StyledPaper>
      </StyledContainer>
      <Dialog open={forgotPasswordOpen} onClose={handleForgotPasswordClose}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {users.some((user) => user.email === email) && (
            <>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgotPasswordClose}>Cancel</Button>
          <Button
            onClick={handleResetPassword}
            variant="contained"
            color="primary"
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <StyledBackground />
    </>
  );
};

export default Login;
