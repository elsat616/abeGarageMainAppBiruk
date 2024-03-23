// import the query function from the db.config.js file
const connection = require("../config/db.config");

// Import the bcrypt module
const bcrypt = require("bcrypt");

async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee Where employee_email = ?";

  const rows = await connection.query(query, [email]);

  // console.log(rows);

  if (rows.length > 0) {
    return true;
  } else {
    return false;
  }
}

async function createEmploye(employee) {
  let createdEmployee = {};

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);

    // console.log(salt)

    // hash the password
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

    // console.log(hashedPassword)

    // Insert the email in to the employee table
    const queryEmployee =
      "INSERT INTO employee (employee_email,active_employee) VALUES (?,?)";

    const rows = await connection.query(queryEmployee, [
      employee.employee_email,
      employee.active_employee,
    ]);

    // console.log(rows);

    if (rows.affectedRows !== 1) {
      return false;
    }

    // Get the employee id from the insert
    const employee_id = rows.insertId;

    // insert the employee_info table data

    const queryEmployeeInfo =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?,?,?,?)";

    const rows2 = await connection.query(queryEmployeeInfo, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);

    // insert the employee_pass table data
    const queryEmployeePass =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?,?)";

    const rows3 = await connection.query(queryEmployeePass, [
      employee_id,
      hashedPassword,
    ]);

    // insert the employee_role table data
    const queryEmployeeRole =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?,?)";

    const rows4 = await connection.query(queryEmployeeRole, [
      employee_id,
      employee.company_role_id,
    ]);

    // construct to the employee object to return
    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (error) {
    console.log(error);
  }

  // return the employee object
  return createdEmployee;
}

// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";

  const rows = await connection.query(query, [employee_email]);

  return rows;
}

module.exports = { checkIfEmployeeExists, createEmploye, getEmployeeByEmail };
