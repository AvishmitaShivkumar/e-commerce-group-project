"use strict";

const express = require("express");
const morgan = require("morgan");
const { getCategories } = require("./handlers/getCategories");
const getCompanies = require("./handlers/getCompanies");
const getCompany = require("./handlers/getCompany");
const { getItem } = require("./handlers/getItem");
const getItems = require("./handlers/getitems");
const getUsers = require("./handlers/getUsers");
const { getUser } = require("./handlers/getUser");
const { updatePassword } = require("./handlers/updatePassword");
const { addUser } = require("./handlers/addUser");
const deleteCartItem = require("./handlers/deletesingleitem");
const cartCollection = require("./handlers/addcartcollection");
const updateCart = require("./handlers/cartquantitychange");
const checkOut = require("./handlers/checkout");
const { getUserCart } = require("./handlers/getusercart");
const { getOrder } = require("./handlers/getOrder");
const checkOut = require("./handlers/checkout");


const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/api/allcategories", getCategories)

  .get("/api/companies", getCompanies)

  .get("/api/company/:_id", getCompany)

  .get("/api/item/:_id", getItem)

  .get("/api/items", getItems)

  .get("/api/users", getUsers)

  .get("/api/user/:userId", getUser)

  .get("/api/cart/:userId/:itemId", getUserCart)

  .patch("/api/user/updatepassword", updatePassword)

  .post("/api/signup", addUser)

  .delete("/api/delete/cart/:userId/items/:itemId", deleteCartItem)

  .post("/api/cartcollection", cartCollection)

  .post("/api/updatecart/:userId/:itemId/:quantitychange", updateCart)

  .post("/api/checkout", checkOut)

  .post("/api/orders", checkOut)

  .get("/api/orders/:orderId", getOrder)


  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
