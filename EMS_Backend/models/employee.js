const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  hireDate: {
    type: Date,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

function validateEmployee(employee) {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(50),
    lastName: Joi.string().required().min(3).max(50),
    email: Joi.string().required(),
    contact: Joi.number().required().min(10),
    address: Joi.string().required().min(3).max(50),
    hireDate: Joi.string().required(),
    position: Joi.string().required(),
    departmentName: Joi.string().required(),
    nic: Joi.string().required().min(10),
  });

  var result = schema.validate(employee);

  return result;
}

exports.Employee = Employee;
exports.validate = validateEmployee;
