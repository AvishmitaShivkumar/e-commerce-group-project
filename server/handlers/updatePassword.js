'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const updatePassword = async (request, response) => {
  const { email, password, newPassword } = request.body;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");

    // Check if a user with the provided email and old password exists
    const existingUser = await db
      .collection("users")
      .findOne({ email, password });
    if (!existingUser) {
      return response.status(400).json({
        status: 400,
        message: "Invalid email or password.",
      });
    }

    // Update the user's password
    const result = await db
      .collection("users")
      .updateOne({ email }, { $set: { password: newPassword } });

    result.modifiedCount === 1
      ? response.status(200).json({ status: 200, data: "Password updated" })
      : response.status(400).json({ status: 400, data: "New password is the same as old password, no modifications done" });
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

module.exports = { updatePassword }