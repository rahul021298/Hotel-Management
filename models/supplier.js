const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
    name:{
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    }
},
    address:{
        name:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        pincode:{
            type:Number,
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
    phoneNumber:{
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