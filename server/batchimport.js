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
      console.log(companiesImport)
    } catch (error) {
      console.log(error);
    }
    client.close();

  };
  
  batchImportCompanies();


  const batchImportItems = async () => {
    const client = new MongoClient(MONGO_URI, options);

    try {
      await client.connect();
  
      const db = client.db("ecommerce");
  
      const itemsImport = await db.collection("items").insertMany(items);
      console.log(itemsImport)
    } catch (error) {
      console.log(error);
    }
    client.close();

  };
  
  batchImportItems();