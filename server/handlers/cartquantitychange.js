'use strict';
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const updateCart = async (req, res) => {
    
    const { userId, itemId, quantityChange } = req.body;

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db('ecommerce');

        const user = await db.collection("users").findOne({ _id: userId._id });

        console.log(user)

        const result = await db.collection("users").updateOne({ _id: userId._id, "cart._id": itemId._id }, { $set: { "cart.$.quantity": quantityChange } });

        res.status(200).json({ status: 200, data: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong.' });
    } finally {
        client.close();
    }
};

module.exports = updateCart;