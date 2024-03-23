// import the logIn service
const logInService = require("../services/login.service");

// Import the jsonwebtoken module
const jwt = require("jsonwebtoken");

// import the secret key from environment variable
const jwtSecret = process.env.JWT_SECRET;

// handle employee logIn
async function logIn(req, res, next) {
  try {
    const employeeData = req.body;

    // call the logIn method from the login service
    const employee = await logInService.logIn(employeeData);

    // if the employee is not found
    if (employee.status == "fail") {
      res.status(403).json({
        status: employee.status,
        message: employee.message,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { logIn };
