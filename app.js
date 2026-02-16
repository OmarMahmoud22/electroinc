require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const  bcrypt =require("bcrypt")
const User = require('./models/User')
const mongoose =require('mongoose')
const Product = require('./models/Product');
const Cart = require('./models/cart')
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



app.post("/products",async(req,res)=>{
    try{
const {title,price,stoke}=req.body
if(!title || !price || !stoke) return res.status(401).json({
    msg:"must add all data"
})

const user = User.findById(req.user.id)
if(user.role=="admin"){
const product = await Product.create({
title,price,stoke
});

res.status(201).json({
    msg:"created",
    data:product
})
}


    }
    catch(error){
        console.log(error)
        res.status(500).json({
msg:"server error"
        })
    }
})

app.get("/products" , async(req , res)=>{
    try{
        
        res.status(401).json({
            msg:"finded",
            data:product
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            msg:"server error"
        })
    }
})

app.get("/products" , async(req , res)=>{
    try{
        const product =await Product.find(req.query)
        res.status(401).json({
            msg:"finded",
            data:product
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            msg:"server error"
        })
    }
})




app.post("/register",async(req,res)=>{

    try{
   const {name,email,password,role}=req.body;

   if(!name||!email||!password)
   return res.status(400).json({msg:"missing data"})

   const existUser = await User.findOne({email});
   if(existUser)return res.status(400).json({msg:"wrong data"})

   const hashPassword = await bcrypt.hash(password,10);


   const user =await User.create({
       name,
       email,
       password:hashPassword,
       role
   });

   res.status(201).json({
     msg:"done created User",
     data:user,
   });

    }

    catch(error){

        console.log(error);
    }



});

app.post ("/login", async(req,res)=>{

try{
 
const {email,password}=req.body;

if (!email||!password)
return res.status(400).json({msg:"missing data"});

const user = await User.findOne({email});
   if(!user)return res.status(404).json({msg:"your accont not found"});


   const matchPassword = await bcrypt.compare(password,user.password);
   if(!matchPassword)return res.status(400).json({msg:"invalid password"});
   
  res.status(200).json({
      msg: "login success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
}

  catch(error){

        console.log(error);
    }



})

// app.post('/cart' , async(req,res)=>{
//     try{
//         const {product,user,count}=req.body
//         if(!product || !user || !count) return res.status(401).json({msg:"mising data"})

//       const pro =await Product.find(id)
//       if (pro.stock >= count ){
//         const cart = await Cart.create({product,user,count})    
//     res.status(201).json({msg:"created" , data:cart})
//     }
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