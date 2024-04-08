import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const Form = () => {
  const [pageType, setPageType] = React.useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifyError = (message) => {
    toast.error(message, { position: toast.POSITION.TOP_CENTER });
  };

  const notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.TOP_CENTER });
  };

  const register = async (values, onSubmitProps) => {
    // Do registration logic here
    try {
      // Simulated registration
      console.log("Registration successful:", values);
      notifySuccess("Registration successful!");
      onSubmitProps.resetForm();
      setPageType("login");
    } catch (error) {
      console.error("Registration error:", error.message);
      notifyError("Registration failed. Please try again later.");
    }
  };

  const login = async (values, onSubmitProps) => {
    // Do login logic here
    try {
      // Simulated login
      console.log("Login successful:", values);
      notifySuccess("Login successful!");
      dispatch(setLogin({ user: values.email, token: "exampleToken" }));
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error.message);
      notifyError("Login failed. Please check your credentials and try again.");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (pageType === "login") await login(values, onSubmitProps);
    if (pageType === "register") await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        location: "",
        occupation: "",
      }}
      validationSchema={pageType === "login" ? loginSchema : registerSchema}
    >
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          {/* ... */}

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              {pageType === "login" ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => setPageType(pageType === "login" ? "register" : "login")}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {pageType === "login" ? "Don't have an account? Sign Up here." : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
