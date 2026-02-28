const mongoose = require('mongoose')

const Productitem = new mongoose.Schema({
    product:{
        ref:'Product',
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    }
})

const CartSchema = new mongoose.Schema({
    user:{
        ref:'User',
        type:mongoose.Schema.Types.ObjectId,
        require:true

    },
    items:[Productitem]
    
},{timestamps:true})

const cart = mongoose.model('Cart', CartSchema)
module.exports = cart
