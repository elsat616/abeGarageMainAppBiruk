import axios from "../axiosConfig";

// A function to send post request to add a new vehicle
async function addVehicle(formData, loggedInEmployeeToken) {
  console.log(formData);

  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.post("/api/vehicle", formData, { headers });

  return data;
}

// A function to get the customer vehicle
async function getCustomerVehicle(formData, loggedInEmployeeToken) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.get(`/api/vehicle/customer?query=${formData}`, {
    headers,
  });

  // console.log(data);

  return data;
}

const vehicleService = {
  addVehicle,
  getCustomerVehicle,
};

export default vehicleService;
