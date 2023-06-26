"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
useNewUrlParser: true,
    useUnifiedTopology: true,
};

const checkOut = async (request, response) => {

    const { user, items, companies } = request.body;

    // const { somethingElse } = request.params;

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("ecommerce");

        const users = await db.collection("users").findOne({ _id: user._id });

        console.log(users.email)

        const cartItem = users.cart.find(item => item._id === items._id);

        const stock = await db.collection("items").findOne({ _id: items._id });

        const companyPurchase = await db.collection("companies").updateOne({ _id: companies._id}, { $push: { purchases: { item: cartItem, user : { email: users.email, name: users.name} } }})

        const newPurchase = await db.collection("purchases").insertOne({ item: cartItem, user: { email: users.email, name: users.name } })

        const someCalc = cartItem.quantity - stock.numInStock

        if (cartItem.quantity <= stock.numInStock) {
            const updateStock = await db.collection("items").updateOne({ _id: items._id },{ $inc: { numInStock: -cartItem.quantity } });
            response.status(200).json({ status: 200 });
        } else if (cartItem.quantity >= stock.numInStock) {
            response.status(200).json({ status: 200, message:`Sorry we do not have that many in stock, you have ${someCalc} to many` });
        }

    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
};

module.exports = checkOut

// const checkOut = require("./handlers/checkout");
//.post("/api/checkout", checkOut)

