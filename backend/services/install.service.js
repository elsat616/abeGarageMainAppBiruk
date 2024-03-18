// Import the query function from the db.config.js file
const { rejects } = require("assert");
const connection = require("../config/db.config");

// Import the fs module to read our sql file
const fs = require("fs");

// Write a function to create the database tables
async function install() {
  // Create a variable to hold the path to the sql file
  const queryfile = __dirname + "/sql/initial-queries.sql";

  console.log(queryfile);

  // Temporary variable, used to store all queries, the return message and the current query
  let queries = [];
  let finalMessage = {};
  let templine = "";

  // Read the sql file
  const lines = await fs.readFileSync(queryfile, "utf-8").split("\n");

  //   console.log(lines)

  // Create a promise to handle the asynchronous reading of the file and storing of the queries in the variables
  const executed = await new Promise((resolve, rejects) => {
    // Iterate over all lines
    lines.forEach((line) => {
      //   console.log(line);

      //   // If the line is a  comment or empty line, Skip it
      if (line.trim().startsWith("--") || line.trim() === "") {
        return;
      }

      templine += line;
        // console.log(templine);

        
    });
  });
}

install();
