import React, { useState } from "react";
import Joi from "joi";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

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
import { useNavigate } from "react-router-dom";
import departmentSevice from "../services/departmentSevice";
import useEmployees from "../hooks/useEmployees";

// Joi schema for validation
const schema = Joi.object({
  name: Joi.string().min(2).required().label("Department name"),
  code: Joi.string().min(2).required().label("Department code"),
  code: Joi.string()
    .pattern(/^[A-Za-z]{2}\d{4}$/)
    .required()
    .label("Department code")
    .messages({
      "string.pattern.base": "Code must 2 characters followed by 4 numbers",
    }),
  manager: Joi.string().min(2).required().label("Manager"),
});

const AddDeptForm = () => {
  // State for form fields and errors
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const {data} = useEmployees();

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

      departmentSevice
        .Create(formData)
        .then((res) => {
          console.log("Employee added successfully: ", res);
          toast.success("Employee added successfully!", {
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
          marginLeft: "110px",
          marginTop: "50px",
          marginRight: "70px",
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
            Add new department
          </Typography>
          <IconButton onClick={() => navigate("/")}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Department name"
            variant="outlined"
            margin="normal"
            onKeyPress={(e) => {
              const char = String.fromCharCode(e.keyCode || e.which);
              if (!/^[a-zA-Z\s]*$/.test(char)) {
                e.preventDefault(); // Prevents the user from entering numbers or special characters
              }
            }}
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Department code"
            variant="outlined"
            margin="normal"
            onKeyPress={(e) => {
              const char = String.fromCharCode(e.keyCode || e.which);
              if (!/^[a-zA-Z0-9]*$/.test(char)) {
                e.preventDefault();
              }
            }}
            type="text"
            name="code"
            value={formData.code || ""}
            onChange={handleChange}
            error={!!errors.code}
            helperText={errors.code}
          />

          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.manager}
          >
            <InputLabel>Manager</InputLabel>
            <Select
              label="Manager"
              name="manager"
              value={formData.manager || ""}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {data?.map((employee) => (
                <MenuItem value={employee.firstName + " " + employee.lastName}>
                  {employee.firstName + " " + employee.lastName}
                </MenuItem>
              ))}
            </Select>
            {errors.manager && (
              <Typography color="error">{errors.manager}</Typography>
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
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddDeptForm;
