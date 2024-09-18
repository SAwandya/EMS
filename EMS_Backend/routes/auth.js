const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const { Admin } = require("../models/admin");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).send("Invalide email or password");

  const validePassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validePassword)
    return res.status(400).send("Invalide email or password");

  const token = jwt.sign({ _id: admin._id }, config.get("jwtPrivateKey"));

  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  var result = schema.validate(req);

  return result;
}

module.exports = router;
