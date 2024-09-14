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
  phone: {
    type: Number,
    required: true,
  },
  Address: {
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
});

const Employee = mongoose.model("Employee", employeeSchema);

function validateEmployee(employee) {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(50),
    lastName: Joi.string().required().min(3).max(50),
    email: Joi.string().required(),
    phone: Joi.string().required().min(10),
    Address: Joi.string().required().min(3).max(50),
    hireDate: Joi.string().required(),
    position: Joi.string().required(),
    departmentId: Joi.string().required(),
  });

  var result = schema.validate(employee);

  return result;
}

exports.Employee = Employee;
exports.validate = validateEmployee;
