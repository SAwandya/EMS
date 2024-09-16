const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  code: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  manager: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Department = mongoose.model("Department", departmentSchema);

function validateDepartment(department) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    code: Joi.string().required().min(3).max(50),
    manager: Joi.string().required().min(3).max(50),
  });

  var result = schema.validate(department);

  return result;
}

exports.Department = Department;
exports.validate = validateDepartment;
exports.departmentSchema = departmentSchema;
