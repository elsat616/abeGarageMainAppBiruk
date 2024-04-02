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
  console.log("kkkkkkkkkkkk");
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
  }
}

async function updateService(req, res, next) {
  try {
    const updateService = await updateServicee(req.body);

        const rows = updateService.rows1.affectedRows;

        console.log(rows)
  } catch (error) {console.log(error)}
}

async function getsingleService(){

}

module.exports = { addService, getAllService, updateService, getsingleServicee };
