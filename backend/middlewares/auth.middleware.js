// import the dot env module
require("dotenv").config();

// import jsonwebroken module
const jwt = require("jsonwebtoken");

// import the employee service
const employeeService = require("../services/employee.service");

async function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];

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

    req.employee_email = decoded.employee_email;
    next();
  });
}

///////////////////

async function isAdmin(req, res, next) {
  //   let token = req.headers["x-access-token"];

  const employee_email = req.employee_email;

  const employee = await employeeService.getEmployeeByEmail(employee_email);

  if (employee[0].company_role_id === 3) {
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
};

//////////
module.exports = authmiddleware;
