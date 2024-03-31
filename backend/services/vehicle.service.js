// import the query function from the db.config.js file
const connection = require("../config/db.config");

async function addVehiclee(vehicle) {
  const customer_hash = vehicle.customer_hash;

  // console.log(customer_hash);

  const query = "SELECT * FROM customer_identifier WHERE customer_hash = ?";

  const rows = await connection.query(query, [customer_hash]);

  //   console.log(rows[0].customer_id)

  const customer_id = rows[0].customer_id;

  // //////////////////////////////
  const query1 =
    "INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag,vehicle_serial,vehicle_color) VALUES (?,?,?,?,?,?,?,?,?)";

  const values = [
    customer_id,
    vehicle.vehicle_year,
    vehicle.vehicle_make,
    vehicle.vehicle_model,
    vehicle.vehicle_type,
    vehicle.vehicle_mileage,
    vehicle.vehicle_tag,
    vehicle.vehicle_serial,
    vehicle.vehicle_color,
  ];

  const rows1 = await connection.query(query1, values);

  //   console.log(rows1);

  return rows1;
}

module.exports = { addVehiclee };
