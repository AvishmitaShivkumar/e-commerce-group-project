'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (request, response) => {

  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("ecommerce");


    // Find method chained with toArray to get all the users found in our database
    const users = await db.collection("users").find().toArray();

    //If users are never found, the server will respond. If found, the data will be a list of all users found in database
    users
        ? response.status(200).json({ status: 200, data: users })
        : response.status(404).json({ status: 404, message: "Users not found" });
  } catch(err) {err => console.log(err)}
  finally { client.close()};
}

module.exports = getUsers