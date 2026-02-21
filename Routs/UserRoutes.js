const express = require("express");
const router = express.Router();
const usercontroller = require("../Controller/UserController")

// router.post("/api",usercontroller.createuser)
router.post("/regester",usercontroller.regester)
router.get("/",usercontroller.getuser)
router.post("/login",usercontroller.login)
router.get("/products",usercontroller.get_product)



module.exports=router