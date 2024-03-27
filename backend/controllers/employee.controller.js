// import the employee service
const {
  checkIfEmployeeExists,
  createEmploye,
  getAllEmployees,
} = require("../services/employee.service");

async function createEmployee(req, res, next) {
  const { employee_email } = req.body;

  // console.log(req.headers);

  const employeeExists = await checkIfEmployeeExists(employee_email);

  // if employee exists, send a response to a client
  if (employeeExists) {
    res.status(400).json({
      msg: "This email address is already associated with  another employee!",
    });
  } else {
    try {
      const employeeData = req.body;

      // create the employee
      const employee = await createEmploye(employeeData);

      // console.log(employee);

      if (!employee) {
        res.status(400).json({
          error: "Failed to add the employee!",
        });
      } else {
        res.status(200).json({
          status: "Employee added successfully! ",
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

async function getAllEmployeees(req, res, next) {
  try {
    // call the getAllEmployees methosd from the emplyees service
    const employees = await getAllEmployees();

    // console.log(employees);

    if (!employees) {
      res.status(400).json({
        error: "Failed to get all employee!",
      });
    } else {
      res.status(200).json({
        status: "Employees retrieved successfully! ",
        employees: employees,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = { createEmployee, getAllEmployeees };
