// import order service
const { createOrderr } = require("../services/order.service");

async function createOrder(req, res, next) {

  // console.log(req.body)

  const createdOrder = await createOrderr(req.body);
}

module.exports = { createOrder };
