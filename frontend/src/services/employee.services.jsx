import axios from "../axiosConfig";

async function createEmployee(formData) {
  const data = await axios.post("/api/employee", formData);

  return data;
}

export default createEmployee;
