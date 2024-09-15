import React, { useState } from "react";
import Joi from "joi";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

// Joi schema for validation
const schema = Joi.object({
  firstName: Joi.string().min(2).required().label("First name"),
  lastName: Joi.string().min(2).required().label("Last name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  contact: Joi.number().min(1000000000).required().label("Contact"),
  address: Joi.string().min(5).required().label("Address"),
  position: Joi.string().required().label("Position"),
  department: Joi.string().required().label("Department"),
  nic: Joi.string().min(10).required().label("NIC"),
  hireDate: Joi.date().required().label("Hire Date"),
});

const AddForm = () => {
  // State for form fields and errors
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

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

    // Validate form before submission
    const formErrors = validateForm();
    setErrors(formErrors || {});

    if (formErrors) {
      console.log("Form contains errors.");
    } else {
      console.log("Form Data: ", formData);
      // Perform any action, such as submitting to an API
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: "#F5F4FA",
        borderRadius: "20px",
        padding: "20px",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{ textAlign: "left", margin: "10px" }}
        gutterBottom
      >
        Add new employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* First Column with 5 input fields */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First name"
              variant="outlined"
              margin="normal"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
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
              label="Address"
              variant="outlined"
              margin="normal"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
            <FormControl
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.position}
            >
              <InputLabel>Position</InputLabel>
              <Select
                label="Position"
                name="position"
                value={formData.position || ""}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Option 1</MenuItem>
                <MenuItem value={20}>Option 2</MenuItem>
                <MenuItem value={30}>Option 3</MenuItem>
              </Select>
              {errors.position && (
                <Typography color="error">{errors.position}</Typography>
              )}
            </FormControl>
            <TextField
              fullWidth
              label="NIC"
              variant="outlined"
              margin="normal"
              name="nic"
              value={formData.nic || ""}
              onChange={handleChange}
              error={!!errors.nic}
              helperText={errors.nic}
            />
          </Grid>

          {/* Second Column with 4 input fields and a button */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last name"
              variant="outlined"
              margin="normal"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              fullWidth
              label="Contact"
              variant="outlined"
              margin="normal"
              type="number"
              name="contact"
              value={formData.contact || ""}
              onChange={handleChange}
              error={!!errors.contact}
              helperText={errors.contact}
            />
            <TextField
              fullWidth
              label="Hire Date"
              variant="outlined"
              margin="normal"
              type="date"
              name="hireDate"
              InputLabelProps={{ shrink: true }}
              value={formData.hireDate || ""}
              onChange={handleChange}
              error={!!errors.hireDate}
              helperText={errors.hireDate}
            />
            <FormControl
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.department}
            >
              <InputLabel>Department</InputLabel>
              <Select
                label="Department"
                name="department"
                value={formData.department || ""}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Option 1</MenuItem>
                <MenuItem value={20}>Option 2</MenuItem>
                <MenuItem value={30}>Option 3</MenuItem>
              </Select>
              {errors.department && (
                <Typography color="error">{errors.department}</Typography>
              )}
            </FormControl>

            {/* Add Button */}
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Add
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddForm;
