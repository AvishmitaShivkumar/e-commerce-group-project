"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getUserCart = async (request, response) => {
    const { userId, itemId } = request.params;

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("ecommerce");
        const user = await db.collection("users").findOne({ _id: userId });

        const cartItem = user.cart.find(item => itemId === itemId);

        console.log(cartItem)

    if (user) {
        return response.status(200).json({ status: 200, data: cartItem });
    } else {
        return response.status(404).json({ status: 404, message: `No cart item found with ${itemId} id` });
    }

    } catch (error) {
        console.error(`Internal error: ${error.stack}`);
        response.status(500).json({status: 500, error: error.message});
    } finally {
        client.close();
    }
}

module.exports = { getUserCart }

