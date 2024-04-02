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
const vehicleController = require("../controllers/vehicle.controller");

// create a route to handle the employee request in post
router.post(
  "/api/vehicle",
  [verifyToken, isAdmin],
  vehicleController.addVehicle
);

// create a route to handle the employee request in get
router.get(
  "/api/vehicle/customer",
  // [verifyToken, isAdmin],
  vehicleController.getVehicleById
);

// create a route to handle the employee request in get
router.get(
  "/api/vehicle/single/:customer_hash/:vehicle_id",
  // [verifyToken, isAdmin],
  vehicleController.getSingleVehicle
);

// export the router
module.exports = router;
