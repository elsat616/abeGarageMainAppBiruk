// import the express module
const express = require("express");

// call the router method from express to create the router
const router = express.Router();

// import the install routes
const installRouter = require("./install.routes");

// import the employee routes
const employeeRouter = require("./employee.routes");

// Add the install router to the main router
router.use(installRouter);

// Add the employee router to the main router
router.use(employeeRouter);

// export the router
module.exports = router;
