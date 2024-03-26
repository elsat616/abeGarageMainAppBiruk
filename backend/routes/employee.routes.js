// import the express module
const express = require("express");

// call the router method from express to create the router
const router = express.Router();

// import the authMiddleware
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

// import the employee controller
const employeeController = require("../controllers/employee.controller");

// create a route to handle the employee request in get
router.post(
  "/api/employee",
  [verifyToken, isAdmin],
  employeeController.createEmployee
);

// export the router
module.exports = router;
