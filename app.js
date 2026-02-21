require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const mongoose =require('mongoose')
const userRoutes = require("./Routs/UserRoutes")
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


// app.post("/products",async(req,res)=>{
//     try{
// const {title,price,stoke}=req.body
// if(!title || !price || !stoke) return res.status(401).json({
//     msg:"must add all data"
// })

// const user = User.findById(req.user.id)
// if(user.role=="admin"){
// const product = await Product.create({
// title,price,stoke
// });

// res.status(201).json({
//     msg:"created",
//     data:product
// })
// }


//     }
//     catch(error){
//         console.log(error)
//         res.status(500).json({
// msg:"server error"
//         })
//     }
// })

// app.get("/products" , async(req , res)=>{
//     try{
        
//         res.status(401).json({
//             msg:"finded",
//             data:product
//         })

//     }
//     catch(error){
//         console.log(error)
//         res.status(500).json({
//             msg:"server error"
//         })
//     }
// })

// app.get("/products" , async(req , res)=>{
//     try{
//         const product =await Product.find(req.query)
//         res.status(401).json({
//             msg:"finded",
//             data:product
//         })

//     }
//     catch(error){
//         console.log(error)
//         res.status(500).json({
//             msg:"server error"
//         })
//     }
// })




app.listen(port,()=>{
    console.log(`connected with${port}`)
})