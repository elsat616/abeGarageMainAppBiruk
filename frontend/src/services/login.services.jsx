import axios from "../axiosConfig";

async function loginEmployee(formData) {
  const data = await axios.post("/api/employee/login", formData);

  return data;
}

export default loginEmployee;
