// import the dot env module
require("dotenv").config();

// import jsonwebroken module
const jwt = require("jsonwebtoken");

// import the employee service
const employeeService = require("../services/employee.service");

// checks if the employee is logged in
async function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];
  // console.log(token)
  if (!token) {
    return res.status(403).send({
      status: "fail",
      msg: "no token provided",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status: "fail",
        msg: "Unauthorized",
      });
    }
    // console.log(decoded)
    req.employee_email = decoded.employee_email;
    next();
  });
}

// checks if the employee is an Admin
async function isAdmin(req, res, next) {
  let token = req.headers["x-access-token"];

  const employee_email = req.employee_email;
  // console.log(req.employee_email);

  const employee = await employeeService.getEmployeeByEmail(employee_email);
  // console.log(employee)

  if (employee[0].company_role_id === 3) {
    next();
  } else {
    return res.status(403).send({
      status: "fail",
      msg: "Not an Admin",
    });
  }
}

// checks if the employee is a Manager
async function isAdmin_Manager(req, res, next) {
  //   let token = req.headers["x-access-token"];

  const employee_email = req.employee_email;
  // console.log(req.employee_email)

  const employee = await employeeService.getEmployeeByEmail(employee_email);
  // console.log(employee)

  if (employee[0].company_role_id === (3 || 2)) {
    next();
  } else {
    return res.status(403).send({
      status: "fail",
      msg: "Not an Admin",
    });
  }
}

// checks if it is an employee
async function isAdmin_Manager_Employee(req, res, next) {
  //   let token = req.headers["x-access-token"];

  const employee_email = req.employee_email;
  console.log(req.employee_email);

  const employee = await employeeService.getEmployeeByEmail(employee_email);
  console.log(employee);

  if (employee[0].company_role_id === (3 || 2 || 1)) {
    next();
  } else {
    return res.status(403).send({
      status: "fail",
      msg: "Not an Admin",
    });
  }
}
////////////////////////
const authmiddleware = {
  verifyToken,
  isAdmin,
  isAdmin_Manager,
  isAdmin_Manager_Employee,
};

/////////////////////////
module.exports = authmiddleware;
