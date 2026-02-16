const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
  
    price: {
        type: Number,
        required: true
    },
    stoke:{
        type: Number,
        required: true,
    
    }
  
},{timestamps:true})

const product = mongoose.model('Products' , ProductSchema)
module.exports = product