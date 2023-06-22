'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCategories = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);
  
    try {
        await client.connect();
        const db = client.db("ecommerce");
  
        // Gets all distinct categories
        const categories = await db.collection("items").distinct("category");
  
       return response.status(200).json({ status: 200, data: categories });
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








module.exports = { getCategories }

//for the server
// .get("/api/allcategories", getCategories )