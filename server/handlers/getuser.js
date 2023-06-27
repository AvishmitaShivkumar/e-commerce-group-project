
"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getUser = async (request, response) => {
    const { userId } = request.params;

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("ecommerce");
        const user = await db.collection("users").findOne({ _id: userId });

    if (user) {
        return response.status(200).json({ status: 200, data: user });
    } else {
        return response.status(404).json({ status: 404, message: `No user found with ${userId} id` });
    }

    } catch (error) {
        console.error(`Internal error: ${error.stack}`);
        response.status(500).json({status: 500, error: error.message});
    } finally {
        client.close();
    }
}

module.exports = { getUser }

