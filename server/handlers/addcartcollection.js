"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const cartCollection = async (request, response) => {
  //if needed
  const { userId, items } = request.body;
  //if needed
  // const { somethingElse } = request.params;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");

    const user = await db.collection("users").findOne({ _id: userId._id });

    console.log(user)

    if (user && user.cart.some(item => item._id === items._id)) {
      const result = await db.collection("users").updateOne({ _id: userId._id, "cart._id": items._id }, { $inc: { "cart.$.quantity": 1 } });
      response.status(200).json({ status: 200, data: result });
    } else {
      const result = await db.collection("users").updateOne({ _id: userId._id}, { $push: { cart: { ...items, quantity: 1 } } })
    }

    result
      ? response.status(200).json({ status: 200, data: result })
      : response.status(404).json({ status: 404, data: "Not Found" });
  } catch (err) {
    (err) => console.log(err);
  } finally {
    client.close();
  }
};

module.exports = cartCollection

//.post("/api/cartcollection", cartCollection)
//const cartCollection = require('./handlers/addcartcollection');

