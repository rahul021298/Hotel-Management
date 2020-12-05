const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    _id?: Object,
    billNo:{
        type:Number
    },
    services:{
        type:String
    },
    taxes:{
        type:String
    },
    total:{
        type:Number
    },
    modeOfPayement:{
        type:String
    },
    isVisible:{
        type:Boolean,
        default:true
    }
});

const Invoice = mongoose.model('invoice', InvoiceSchema);
module.exports = Invoice;