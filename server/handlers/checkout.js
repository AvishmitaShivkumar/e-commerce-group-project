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


    const { user, cart, shipping } = request.body;

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("ecommerce");

        const users = await db.collection("users").findOne({ _id: user });

        const newId = uuidv4()

        let alreadyRan = null

        for (let i = 0; i < cart.length; i++) {

            const cartItem = users.cart.find(item => item._id === cart[i]);

            const stock = await db.collection("items").findOne({ _id: cart[i] });


            // const companyPurchase = await db.collection("companies").updateOne({ _id: companies._id}, { $push: { purchases: { item: cartItem, user : { email: users.email, name: users.name}, shipping: shipping } }})

            if (alreadyRan === null) {
                const newPurchase = await db.collection("purchases").insertOne({ _id: newId, Items: [cartItem], shipping: shipping, email: users.email})

            } else {
                const existingPurchase = await db.collection("purchases").findOne({ _id: newId });
                const updatedItems = [...existingPurchase.Items, cartItem];
                const samePurchase = await db.collection("purchases").updateOne({ _id: newId },{ $set: { Items: updatedItems } });
            }


            const someCalc = cartItem.quantity - stock.numInStock

            alreadyRan = true

            if (cartItem.quantity <= stock.numInStock) {

                const updateStock = await db.collection("items").updateOne({ _id: cart[i] }, { $inc: { numInStock: -cartItem.quantity } });
                const deleteCart = await db.collection("users").updateOne({ _id: user },{ $set: { cart: [] } });
            } else if (cartItem.quantity >= stock.numInStock) {
                response.status(400).json({ status: 400, message:`Sorry we do not have that many in stock, you have ${someCalc} to many` });

            }
            
        }
        response.status(200).json({ status: 200, data:newId});

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

module.exports = checkOut

// const checkOut = require("./handlers/checkout");
//.post("/api/checkout", checkOut)

