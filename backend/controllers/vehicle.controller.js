const { addVehiclee } = require("../services/vehicle.service");

async function addVehicle(req, res, next) {
  //   console.log(req.body);

  try {
    const AddedVehicle = await addVehiclee(req.body);

    // console.log(AddedVehicle.affectedRows)

    if (!addVehiclee) {
      return res.status(400).json({
        error: "Failed to add vehicle",
      });
    } else if (AddedVehicle.affectedRows === 1) {
      return res.status(200).json({ status: "Vehicle added successfully" });
    } else {
      return res.status(400).json({
        error: "vehicle not added successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = { addVehicle };
