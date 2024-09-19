import React, { useEffect, useState } from "react";
import Joi from "joi";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import dayjs from "dayjs"; // Library for date formatting

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
import employeeService from "../services/employeeService";
import { Link, useNavigate, useParams } from "react-router-dom";
import useEmployee from "../hooks/useEmployee";
import useDepartments from "../hooks/useDepartments";

// Joi schema for validation
const schema = Joi.object({
  firstName: Joi.string().min(2).required().label("First name"),
  lastName: Joi.string().min(2).required().label("Last name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  contact: Joi.number().min(100000000).required().label("Contact"),
  address: Joi.string().min(5).required().label("Address"),
  position: Joi.string().required().label("Position"),
  departmentName: Joi.string().required().label("departmentName"),
  nic: Joi.string().min(10).max(12).required().label("NIC"),
  nic: Joi.string()
    .pattern(/^\d{9}v$|^\d{12}$/)
    .required()
    .label("NIC")
    .messages({
      "string.pattern.base":
        "NIC must be either 9 numbers followed by 'v' or 12 numbers",
    }),
  hireDate: Joi.date().required().label("Hire Date"),
});

const UpdateForm = () => {
  const { id } = useParams();

  const { data, error, refetch } = useEmployee(id);

  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({});

  const { data: depdata } = useDepartments();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        contact: data.contact || "",
        address: data.address || "",
        position: data.position || "",
        departmentName: data.departmentName || "",
        nic: data.nic || "",
        hireDate: dayjs(data.hireDate).format("YYYY-MM-DD") || "",
      });
    }
  }, [data]);

  const validateField = (name, value) => {
    const fieldSchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = fieldSchema.validate({ [name]: value });
    return error ? error.details[0].message : null;
  };

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

      employeeService
        .Update(formData, id)
        .then((res) => {
          console.log("Employee Updated successfully: ", res);
          toast.success("Employee Updated successfully!", {
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
        })
        .catch((err) => {
          console.log("Error adding employee: ", err);
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
            Update employee
          </Typography>
          <IconButton onClick={() => navigate("/")}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* First Column with 5 input fields */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First name"
                variant="outlined"
                onKeyPress={(e) => {
                  const char = String.fromCharCode(e.keyCode || e.which);
                  if (!/^[a-zA-Z\s]*$/.test(char)) {
                    e.preventDefault(); // Prevents the user from entering numbers or special characters
                  }
                }}
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
                onKeyPress={(e) => {
                  const char = String.fromCharCode(e.keyCode || e.which);
                  if (!/^[a-zA-Z0-9.@s]*$/.test(char)) {
                    e.preventDefault(); // Prevents the user from entering numbers or special characters
                  }
                }}
                name="email"
                value={formData.email}
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
                onKeyPress={(e) => {
                  const char = String.fromCharCode(e.keyCode || e.which);
                  if (!/^[a-zA-Z0-9/,\s]*$/.test(char)) {
                    e.preventDefault(); // Prevents symbols other than letters, numbers, spaces, /, and ,
                  }
                }}
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
                  <MenuItem value={data?.position}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                  <MenuItem value="Project Manager">Project Manager</MenuItem>
                  <MenuItem value="HR Specialist">HR Specialist</MenuItem>
                  <MenuItem value="Quality Assurance Engineer">
                    Quality Assurance Engineer
                  </MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
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
                onKeyPress={(e) => {
                  const value = formData.nic || "";
                  const char = String.fromCharCode(e.keyCode || e.which);

                  // Allow only numbers and "v" or "V"
                  if (!/[0-9vV]/.test(char)) {
                    e.preventDefault(); // Prevents any character other than numbers and "v"
                  }

                  // Prevent input if max length of 12 is reached, and only allow "v" or "V" in 10th position
                  if (value.length >= 12 && char !== "Backspace") {
                    e.preventDefault(); // Prevent further input if max length is reached
                  }

                  // Ensure "v" or "V" can only be entered at the 10th position if exactly 9 digits are present
                  if (
                    value.length === 9 &&
                    char.toLowerCase() !== "v" &&
                    !/[0-9]/.test(char)
                  ) {
                    e.preventDefault(); // Only allow "v" or "V" after 9 digits
                  }
                }}
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
                onKeyPress={(e) => {
                  const char = String.fromCharCode(e.keyCode || e.which);
                  if (!/^[a-zA-Z\s]*$/.test(char)) {
                    e.preventDefault(); // Prevents the user from entering numbers or special characters
                  }
                }}
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
                value={formData.hireDate || ""}
                onChange={handleChange}
                error={!!errors.hireDate}
                helperText={errors.hireDate}
              />
              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.departmentName}
              >
                <InputLabel>Department</InputLabel>
                <Select
                  label="Department"
                  name="departmentName"
                  value={formData.departmentName || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {depdata?.map((dep) => (
                    <MenuItem value={dep.name}>{dep.name}</MenuItem>
                  ))}
                </Select>
                {errors.departmentName && (
                  <Typography color="error">{errors.departmentName}</Typography>
                )}
              </FormControl>

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
                  Update
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default UpdateForm;
