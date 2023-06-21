'use strict';
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteCartItem = async (request, response) => {

  //if needed
  // const { userId, itemId } = request.body;
  //if needed
  const { userId, itemId } = request.params;

  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("ecommerce");

    console.log("1")

    const result = await db.collection("users").updateOne({ _id: userId }, { $pull: { cart: { _id: itemId } } });

    console.log("2")
    //SOME LOGIC
    result
        ? response.status(200).json({ status: 200, data: result })
        : response.status(404).json({ status: 404, data: "Not Found" });
  } catch(err) {err => console.log(err)}
  finally { client.close()};

}


module.exports = deleteCartItem

//.delete('/delete/cart/:userId/items/:itemId', deleteCartItem)
//const deleteCartItem = require('./handlers/deletesingleitem');
