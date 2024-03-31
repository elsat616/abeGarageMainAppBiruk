import axios from "../axiosConfig";

// A function to send post request to add a new vehicle
async function addVehicle(formData, loggedInEmployeeToken) {

    console.log(formData)

    const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.post("/api/vehicle", formData, { headers });

  //   return data;
}

const vehicleService = {
  addVehicle,
};

export default vehicleService;
