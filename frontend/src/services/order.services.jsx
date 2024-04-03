import axios from "../axiosConfig";

async function addOrder(formData, loggedInEmployeeToken) {
    console.log(formData);

  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.post("/api/order", formData, { headers });

  return data;
}

const Order = {
  addOrder,
};

export default Order;
