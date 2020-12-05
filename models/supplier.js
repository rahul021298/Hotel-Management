const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
    supplierName:{
        type:String,
        required:true
    },
    address:{
        name:{
            type:String,
            required:true
        },
        houseNo:{
            type:Number,
            required:true
        },
        landmark:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        }
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    isVisible:{
        type:Boolean,
        default:true
    }
});

const Supplier = mongoose.model('supplier', SupplierSchema);
module.exports = Supplier;