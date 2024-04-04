const e = require("express");
const {
  addServicee,
  getAllServicee,
  updateServicee,
  getsingleServicee,
} = require("../services/service.service");

async function addService(req, res, next) {
  //   console.log(req.body);

  try {
    const newService = await addServicee(req.body);

    if (!newService) {
      return res.status(400).json({
        error: "Failed to add the service!",
      });
    } else {
      res.status(200).json({ status: "Service added successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

async function getAllService(req, res, next) {
  try {
    const services = await getAllServicee();

    if (!services) {
      res.status(400).json({
        error: "Failed to get all services!",
      });
    } else {
      res.status(200).json({
        status: "Services retrieved successfully!",
        services: services,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

async function updateService(req, res, next) {
  // console.log(req.body)
  try {
    const updateService = await updateServicee(req.body);

    // console.log(updateService.affectedRows)

    const rows = updateService.affectedRows;

    if (!updateService) {
      return res.status(400).json({
        error: "Failed to update the service!",
      });
    } else if (rows === 1) {
      return res.status(200).json({
        status: "Service Successful Updated!",
      });
    } else {
      return res.status(400).json({
        status: "Service Update Incomplete!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

async function getsingleService(req, res, next) {
  const service_hash = req.params.hash;

  // console.log(service_hash)

  try {
    const singleService = await getsingleServicee(service_hash);

    // console.log(singleService[0].service_id);

    if (!singleService[0]?.service_id) {
      res.status(400).json({
        error: "Failed to get service!",
      });
    } else {
      res.status(200).json({
        status: "Service retrieved successfully! ",
        singleService: singleService,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = { addService, getAllService, updateService, getsingleService };
