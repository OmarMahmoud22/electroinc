const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    user:{
        ref:'User',
        type:mongoose.Schema.Types.ObjectId,
        require:true

    },
    products:{
        ref:'Products',
        type:mongoose.Schema.Types.ObjectId,
        require:true

    },
    count:{
        type:Number,
        require:true,
        min:1
    }
})