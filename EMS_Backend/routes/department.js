const express = require("express");
const router = express.Router();
const { Department, validate } = require("../models/department");

router.get("/", async (req, res) => {
  const department = await Department.find().sort("name");

  res.send(department);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let department = new Department({ 
    name: req.body.name, 
    code: req.body.code,
    manager: req.body.manager
  });
  department = await department.save();

  res.send(department);
});

router.delete("/:id", async (req, res) => {
  const department = await Department.findByIdAndDelete(req.params.id);

  if (!department)
    return res.status(404).send("The department with the given ID was not found.");

  res.send(department);
});

module.exports = router;