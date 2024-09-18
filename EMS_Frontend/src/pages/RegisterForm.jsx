import React, { useState } from "react";
import Joi from "joi";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import adminService from "../services/adminService";

// Joi schema for validation
const schema = Joi.object({
  name: Joi.string().min(2).required().label("Name"),
  email: Joi.string().min(2).required().label("Email"),
  password: Joi.string().min(2).required().label("Password"),
});

const RegisterForm = () => {
  // State for form fields and errors
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Validate a single field based on Joi schema
  const validateField = (name, value) => {
    const fieldSchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = fieldSchema.validate({ [name]: value });
    return error ? error.details[0].message : null;
  };

  // Handle changes dynamically based on the field name
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the field and update errors
    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  // Validate the entire form before submission
  const validateForm = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (!error) return null;

    const newErrors = {};
    error.details.forEach((detail) => {
      newErrors[detail.path[0]] = detail.message;
    });
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data: ", formData);

    // Validate form before submission
    const formErrors = validateForm();
    setErrors(formErrors || {});

    if (formErrors) {
      console.log("Form contains errors.");
    } else {
      console.log("Form Data: ", formData);

      adminService
        .Create(formData)
        .then((res) => {
          console.log("Register successfully: ", res);
          toast.success("Register successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });

          navigate("/");
          localStorage.setItem("token", res);
        })
        .catch((err) => {
          console.log("Error registering admin: ", err);
        });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#F5F4FA",
          borderRadius: "20px",
          padding: "60px",
          alignItems: "center",
          marginTop: "30px",
          marginLeft: "200px",
          marginTop: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "left" }} gutterBottom>
            Sign Up
          </Typography>
          <IconButton onClick={() => navigate("/")}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          {/* Add Button */}
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{
                marginRight: "40px",
                borderRadius: "8px",
                backgroundColor: "#7350F5",
                height: "50px",
                marginTop: "2px",
              }}
            >
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default RegisterForm;
