const express = require("express");
const { Admin, validate } = require("../models/admin");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
// const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const admins = await Admin.find().sort("name");

  res.send(admins);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let admin = await Admin.findOne({ email: req.body.email });
  if (admin) return res.status(400).send("User already registered");

  admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  admin = await admin.save();

  let token = jwt.sign({ _id: admin._id, name: admin.name }, config.get("jwtPrivateKey"));

  // res
  //   .header("x-auth-token", token)
  //   // .header("access-control-expose-headers", "x-auth-token")
  //   .send({
  //     name: user.name,
  //     email: user.email,
  //   });

  res.send(token);
});

module.exports = router;
