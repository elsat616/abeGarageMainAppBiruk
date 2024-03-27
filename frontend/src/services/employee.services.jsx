import axios from "../axiosConfig";

// A function to send post request to create a new employee
async function createEmployee(formData, loggedInEmployeeToken) {
  // define your headers
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.post("/api/employee", formData, { headers });

  return data;
}

// A function to send get request to get all employees
async function getAllEmployees(token) {
  const headers = {
    "x-access-token": token,
  };

  const data = await axios.get("/api/employees", { headers });

  return data;
}

const employeeService = {
  createEmployee,
  getAllEmployees,
};

export default employeeService;
