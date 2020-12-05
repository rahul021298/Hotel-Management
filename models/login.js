const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
    // _id?: Object,
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userRole:{
        type:String,
        required:true
    },
    isVisible:{
        type:Boolean,
        default:true
    }
});

const Login = mongoose.model('login', LoginSchema);
module.exports = Login;