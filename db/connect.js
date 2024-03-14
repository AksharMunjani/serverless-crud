"use strict";
const mongoose = require("mongoose");
require("dotenv").config();

let conn = null;

const uri = process.env.MONGODB_URI;

module.exports = async function () {
  if (conn == null) {
    conn = mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn;
  }

  return conn;
};

// mongoose.connect(process.env.MONGODB_URI);
