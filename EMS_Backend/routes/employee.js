const express = require("express");
const router = express.Router();
const { Employee, validate } = require("../models/employee");
const { Department } = require("../models/department");

router.get("/", async (req, res) => {
  const employee = await Employee.find().sort("name");

  res.send(employee);
});

router.get("/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee)
    return res
      .status(404)
      .send("The employee with the given ID was not found.");

  res.send(employee);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    contact: req.body.contact,
    address: req.body.address,
    hireDate: req.body.hireDate,
    position: req.body.position,
    departmentName: req.body.departmentName,
    nic: req.body.nic,
  });
  employee = await employee.save();

  res.send(employee);
});

router.delete("/:id", async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);

  if (!employee)
    return res
      .status(404)
      .send("The employee with the given ID was not found.");

  res.send(employee);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contact: req.body.contact,
      address: req.body.address,
      hireDate: req.body.hireDate,
      position: req.body.position,
      departmentName: req.body.departmentName,
      nic: req.body.nic,
    },
    { new: true }
  );
  res.send(employee);
});
module.exports = router;
