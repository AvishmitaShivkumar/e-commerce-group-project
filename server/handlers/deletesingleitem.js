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

  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("ecommerce");

    const result = await db.collection("users").updateOne({ _id: userId }, { $pull: { cart: { _id: itemId } } });

    result
        ? response.status(200).json({ status: 200, data: result })
        : response.status(404).json({ status: 404, data: "Not Found" });
  } catch(err) {err => console.log(err)}
  finally { client.close()};

}


module.exports = deleteCartItem
