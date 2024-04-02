// import the query function from the db.config.js file
const connection = require("../config/db.config");

// import the crypto module to generate random id
const crypto = require("crypto");

async function addServicee(servicee) {
  // console.log(servicee)

  const hash_id = crypto.randomUUID();

  const query =
    "INSERT INTO common_services (service_name,service_description,service_hash) VALUES(?,?,?)";

  const rows = await connection.query(query, [
    servicee.service_name,
    servicee.service_description,
    hash_id,
  ]);

  //   console.log(rows);

  return rows;
}

async function getAllServicee() {
  try {
    const query = "SELECT * FROM common_services";

    const rows = await connection.query(query);

    // console.log(rows);

    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updateServicee(service) {
  // console.log(service)

  const query =
    "UPDATE common_services SET  service_name = ?, service_description = ? WHERE service_hash = ?";

  const rows = await connection.query(query, [
    service.service_name,
    service.service_description,
    service.service_hash,
  ]);

  return rows;
}

async function getsingleServicee(service) {
  // console.log(service)

  const query = "SELECT * FROM common_services WHERE service_hash = ?";

  const rows = await connection.query(query, [service]);

  // console.log(rows)

  return rows;
}

module.exports = {
  addServicee,
  getAllServicee,
  updateServicee,
  getsingleServicee,
};
