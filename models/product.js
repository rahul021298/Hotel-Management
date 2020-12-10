const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    supplier:{
        type: mongoose.Schema.ObjectId,
        ref: 'supplier',
        // required: true
    },
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    isVisible:{
        type:Boolean,
        default:true
    }
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;