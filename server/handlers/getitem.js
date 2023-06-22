'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getItem = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id  = parseInt(request.params._id);
  try {
    await client.connect();
    const db = client.db("ecommerce");
    const singleItem = await db
      .collection("items")
      .findOne({ _id });
    if (singleItem) {
      return response
        .status(200)
        .json({ status: 200, data: singleItem });
    } else {
      return response
        .status(404)
        .json({ status: 404, message: `No item found with ${_id} id` });
    }
  } catch (error) {
    console.error(`Internal error: ${error.stack}`);
    response.status(500).json({
      status: 500,
      error: error.message,
    });
  } finally {
    client.close();
  }
}

module.exports = { getItem }