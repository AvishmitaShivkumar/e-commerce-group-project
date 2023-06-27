const companies = require("./data/companies.json") 
const items = require("./data/items.json")


const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImportCompanies = async () => {
    const client = new MongoClient(MONGO_URI, options);

    try {
      await client.connect();
  
      const db = client.db("ecommerce");
  
      const companiesImport = await db.collection("companies").insertMany(companies);
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
  
  batchImportCompanies();


  const batchImportItems = async () => {
    const client = new MongoClient(MONGO_URI, options);

    try {
      await client.connect();
  
      const db = client.db("ecommerce");
  
      const itemsImport = await db.collection("items").insertMany(items);
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
  
  batchImportItems();