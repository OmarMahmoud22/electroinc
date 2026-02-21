const express = require("express")
const router = express.Router();
const Productcontroller = require("../Controller/ProductController")

// router.post("/api",usercontroller.createuser)
router.post("/products",Productcontroller.add_product)
router.get("/products",Productcontroller.get_product)
module.exports=router