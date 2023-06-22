'use strict';
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const updateCart = async (req, res) => {
    
    const { userId, itemId, quantitychange } = req.params;

    const client = new MongoClient(MONGO_URI, options);

    try {

        await client.connect();
        const db = client.db('ecommerce');

        const user = await db.collection("users").findOne({ _id: userId });

        const stock = await db.collection("items").findOne({ _id: Number(itemId) });

        console.log(stock.numInStock);

        if (Number(quantitychange) <= Number(stock.numInStock)) {
            const result = await db.collection("users").updateOne({ _id: userId, "cart._id": Number(itemId) }, { $set: { "cart.$.quantity": Number(quantitychange) } });
            res.status(200).json({ status: 200, data: result });
        } else {
            res.status(400).json({ status: 400, message: "We do not have that many in stock" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong.' });
    } finally {
        client.close();
    }
};

module.exports = updateCart;