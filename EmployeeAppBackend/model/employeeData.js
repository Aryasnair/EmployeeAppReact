const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  employeeName: String,
  employeeDesignation: String,
  employeeSalary: String,
  employeeDepartment: String,
  employeeLocation:String
});

const employeeData = mongoose.model("employee", employeeSchema);

module.exports = employeeData;
