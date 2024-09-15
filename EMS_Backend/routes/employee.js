const express = require("express");
const router = express.Router();
const { Employee, validate } = require("../models/employee");
const { Department } = require("../models/department");

router.get("/", async (req, res) => {
  const employee = await Employee.find().sort("name");

  res.send(employee);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const department = await Department.findById(req.body.departmentId);
  if (!department) return res.status(400).send("Invalid department.");

  let employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    Address: req.body.Address,
    hireDate: req.body.hireDate,
    position: req.body.position,
    departmentId: department._id
  });
  employee = await employee.save();

  res.send(employee);
});

module.exports = router;
