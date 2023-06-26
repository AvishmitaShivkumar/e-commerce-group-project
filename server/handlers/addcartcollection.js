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

    const { userId, items } = request.body;


    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("ecommerce");

        const user = await db.collection("users").findOne({ _id: userId._id });

        const stock = await db.collection("items").findOne({ _id: items._id });


        if (user && user.cart.some(item => item._id === items._id)) {
            if (stock.numInStock === 0) {
            response.status(400).json({ error: "Sorry, we don't have that many in stock." });
        } else {
            const result = await db.collection("users").updateOne({ _id: userId._id, "cart._id": items._id }, { $inc: { "cart.$.quantity": 1 } });
            response.status(200).json({ status: 200, data: result });
        }
        } else {
            const result = await db.collection("users").updateOne({ _id: userId._id}, { $push: { cart: { ...items, quantity: 1 } } })
            response.status(200).json({ status: 200, data: result });
        }


    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
};

module.exports = cartCollection


