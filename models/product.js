const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    supplier:{
        type: mongoose.Schema.ObjectId,
        ref: 'supplier',
        required: true
    },
    productName:{
        type:String,
        required:true
    },
    productType:{
        type:String,
        required:true
    },
    productQuantity:{
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