"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCompany = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  const _id = Number(request.params._id);

  try {
    await client.connect();
    const db = client.db("ecommerce");

    // Find method to find any company that has the matching _id to the one used in the request.params
    const company = await db.collection("companies").findOne({ _id });

    //If the company is not found, message sent, if found, company information given in data
    company
      ? response.status(200).json({ status: 200, data: company })
      : response
          .status(404)
          .json({ status: 404, message: "Company not found" });
        } catch (error) {
          console.error(`Internal error: ${error.stack}`);
          response.status(500).json({
            status: 500,
            error: error.message,
          });
        } finally {
          client.close();
        }
};

module.exports = getCompany;
