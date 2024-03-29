// import the employee service
const {
  checkIfEmployeeExists,
  createEmploye,
  getAllEmployees,
  updateEmploye,
  deleteEmploye,
} = require("../services/employee.service");

// create Employee controller
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

// get all Employee data controller
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

// update Employee controller
async function updateEmployee(req, res, next) {
  try {
    const updateEmployee = await updateEmploye(req.body);

    // console.log(updateEmployee);

    // the returned rows value
    const rows1 = updateEmployee.rows1.affectedRows;
    const rows2 = updateEmployee.rows2.affectedRows;
    const rows3 = updateEmployee.rows3.affectedRows;

    // console.log(rows1)
    // console.log(rows2)
    // console.log(rows3)

    if (!updateEmployee) {
      res.status(400).json({
        error: "Failed to Update Employee",
      });
    } else if (rows1 && rows2 && rows3 === 1) {
      res.status(200).json({
        status: "Employee Succesfully Updated! ",
      });
    } else {
      res.status(400).json({
        status: "Update Incomplete!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

// delete Employee controller
async function deleteEmployee(req, res, next) {
  const { employee_id } = req.body;
  try {
    const deleteEmployee = await deleteEmploye(employee_id);

    if (!deleteEmploye) {
      res.status(200).json({
        error: "Delete Incomplete!",
      });
    } else {
      res.status(400).json({
        status: "Employee Succesfully Delete!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = {
  createEmployee,
  getAllEmployeees,
  updateEmployee,
  deleteEmployee,
};
