import axios from "../axiosConfig";

async function addOrder(formData, loggedInEmployeeToken) {
  console.log(formData);

  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.post("/api/order", formData, { headers });

  return data;
}



async function getAllOrder(loggedInEmployeeToken) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.get("api/orders", { headers });

  // console.log(data)

  return data;
}




const Order = {
  addOrder,
  getAllOrder,
};

export default Order;
