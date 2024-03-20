// import the employee service
const {
  checkIfEmployeeExists,
  createEmploye,
} = require("../services/employee.service");

async function createEmployee(req, res, next) {
  const { employee_email } = req.body;

  // console.log(employee_email);

  const employeeExists = await checkIfEmployeeExists(employee_email);

  // if employee exists, send a response to a client
  if (employeeExists) {
    res.status(400).json({
      msg: "This email address is already associated with  another employee!",
    });
  } else {
    try {
      employeeData = req.body;

      // create the employee
      const employee = await createEmploye(employeeData);

      // console.log(employee);

      if (!employee) {
        res.status(400).json({
          msg: "Failed to add the employee!",
        });
      } else {
        res.status(200).json({
          msg: "Employee added successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}

module.exports = { createEmployee };
