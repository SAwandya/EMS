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

  let department = new Department({ name: req.body.name });
  department = await department.save();

  res.send(department);
});