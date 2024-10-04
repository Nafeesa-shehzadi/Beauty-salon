import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Grid2,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PhotoCamera } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { registerUser } from "../../redux/userSlice";

// Styled components for the container and form
const StyledBackground = styled("div")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('/login.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: -1,
}));

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  position: "relative",
  zIndex: 1,
}));

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

const validationSchema = Yup.object({
  username: Yup.string()
    .matches(/^[a-zA-Z]+$/, "No spaces or numbers allowed")
    .required("This field is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("This field is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must be at least 8 characters, include a letter, number, and special character"
    )
    .required("This field is required"),
  phone: Yup.string().required("This field is required"),
});

const SignUp: React.FC = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      profileImage: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let profileImageBase64 = "";
      if (profileImage) {
        const reader = new FileReader();
        reader.readAsDataURL(profileImage);
        reader.onload = () => {
          profileImageBase64 = reader.result as string;
          dispatch(
            registerUser({
              id: Date.now(),
              ...values,
              profileImage: profileImageBase64,
              isAdmin: false,
            })
          );
          resetForm();
        };
      } else {
        dispatch(
          registerUser({
            id: Date.now(),
            ...values,
            profileImage: undefined,
            isAdmin: false,
          })
        );
        resetForm();
      }
    },
  });

  const resetForm = () => {
    formik.resetForm();
    setProfileImage(null);
    navigate("/login");
  };

  return (
    <>
      <StyledBackground />
      <StyledContainer>
        <StyledPaper elevation={3}>
          <Grid2 container direction="column" alignItems="center">
            <Typography variant="h4" component="h2" gutterBottom>
              Create Account
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{ width: "100%", mt: 3 }}
            >
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                InputProps={{
                  style:
                    formik.touched.username && formik.errors.username
                      ? { borderColor: "red" }
                      : {},
                }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <PhoneInput
                country={"us"}
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue("phone", phone)}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: false,
                }}
                containerStyle={{
                  marginTop: "16px",
                }}
                inputStyle={{
                  width: "100%",
                  height: "56px",
                  borderColor:
                    formik.touched.phone && formik.errors.phone ? "red" : "",
                }}
              />
              {formik.touched.phone && formik.errors.phone && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginTop: "8px" }}
                >
                  {formik.errors.phone}
                </Typography>
              )}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  borderColor: "pink",
                }}
              >
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<PhotoCamera />}
                >
                  Upload Profile Image
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setProfileImage(e.target.files[0]);
                      }
                    }}
                  />
                </Button>
                {profileImage && (
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {profileImage.name}
                  </Typography>
                )}
              </Box>
              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
              >
                Register
              </StyledButton>
            </Box>
          </Grid2>
        </StyledPaper>
      </StyledContainer>
    </>
  );
};

export default SignUp;
