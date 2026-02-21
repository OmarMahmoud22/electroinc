require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const mongoose =require('mongoose')
const userRoutes = require("./Routs/UserRoutes")
const productRoutes = require("./Routs/ProductRoutes")
// const User = require('./models/User');
// const Product = require('./models/Product');
// const Cart = require('./models/cart')
app.use(express.json())


async function main() {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected")
    }
    catch(error){
        console.log(error)
    }
}
main()


app.use('/',userRoutes);
app.use('/',productRoutes)
app.listen(port,()=>{
    console.log(`connected with${port}`)
})