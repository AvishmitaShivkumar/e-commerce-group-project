"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCompanies = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");

    // Find method chained with toArray to get all the companies found in our database
    const companies = await db.collection("companies").find().toArray();

    //if companies are never found, the server will respond. If found, the data will be a list of all companies
    companies
      ? response.status(200).json({ status: 200, data: companies })
      : response
          .status(404)
          .json({ status: 404, message: "Companies not found" });
  } catch (err) {
    (err) => console.log(err);
  } finally {
    client.close();
  }
};

module.exports = getCompanies;
