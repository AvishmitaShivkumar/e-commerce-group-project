'use strict';
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  const newId = uuidv4();

  if (!firstName || !lastName || !email || !password) {
    return response.status(400).json({
      status: 400,
      message: {
        firstName: firstName || "Missing first name.",
        lastName: lastName || "Missing last name.",
        password: password || "Missing password",
        email: email || "Missing Email",
      },
    });
  }

  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("ecommerce");

    // Check if a user with the same email already exists
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    return response.status(400).json({
      status: 400,
      message: "A user with this email already exists. Please sign in",
    });
  }
    //we create the new user that will be pushed to our users collection
    const user = {
      _id: newId,
      name: `${firstName} ${lastName}`,
      password,
      email,
      cart: [],
    };
    const isReservationAdded = await db.collection("users").insertOne(user);
    isReservationAdded
    ? response.status(200).json({
      status: 200,
      modified: isReservationAdded.acknowledged,
      success: true,
      userId: newId,
    })
  : //this line shouldnt hit, because even if there is a duplicate ID that would be handlked by the catch
    response.status(501).json({
      status: 501,
      message: "Something went wrong creating this user",
    });
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


module.exports = { addUser }