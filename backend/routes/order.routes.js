// import the express module
const express = require("express");

// call the router method from express to create the router
const router = express.Router();

// import the authMiddleware
const {
  verifyToken,
  isAdmin,
  isAdmin_Manager,
  isAdmin_Manager_Employee,
} = require("../middlewares/auth.middleware");

// import the customer controller
const orderController = require("../controllers/order.controller");

// create a route to handle the service request in post
router.post(
  "/api/order",
    // [verifyToken, isAdmin],
  orderController.createOrder
);

// export the router
module.exports = router;
