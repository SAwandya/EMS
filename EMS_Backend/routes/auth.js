const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const { Admin } = require("../models/admin");

router.post("/", async (req, res) => {

  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).send("Invalide email or password");

  const validePassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validePassword)
    return res.status(400).send("Invalide email or password");

  const token = jwt.sign({ _id: admin._id, name: admin.name }, config.get("jwtPrivateKey"));

  res.send(token);
});


module.exports = router;
