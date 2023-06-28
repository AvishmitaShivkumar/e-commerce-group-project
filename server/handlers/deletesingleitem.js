'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteCartItem = async (request, response) => {
  const { userId, itemId } = request.params;
  // Convert itemId to number
  const itemIdNumber = Number(itemId); 

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");

    const result = await db.collection("users").updateOne(
      { _id: userId },
      { $pull: { cart: { _id: itemIdNumber } } } // Use itemIdNumber
    );

    result
      ? response.status(200).json({ status: 200, data: result })
      : response.status(404).json({ status: 404, data: "Not Found" });
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

module.exports = deleteCartItem;
