const express = require("express");
const router = express.Router();
const cartcontroller = require("../Controller/CartCintoller")


router.post("/addtocart",cartcontroller.add_cart)

module.exports=router

