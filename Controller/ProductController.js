const Product = require('../models/Product');

const add_product = async(req,res)=>{
    
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
}

const get_product = async(req,res)=>{ 
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
}

module.exports={
    add_product,
    get_product
}