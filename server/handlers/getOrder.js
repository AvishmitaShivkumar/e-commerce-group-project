"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Get one order based on ID
const getOrder = async (request, response) => {
  const { orderId } = request.params;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");

    const order = await db.collection("purchases").findOne({ _id: orderId });

    if (!order) {
      return response
        .status(404)
        .json({ status: 404, message: "Order not found." });
    }

    return response.status(200).json({ status: 200, data: order });

  } catch (error) {
    console.error(`Internal error: ${error.stack}`);
    response.status(500).json({ status: 500, error: error.message });
  } finally {
    client.close();
  }
};

module.exports = { getOrder };