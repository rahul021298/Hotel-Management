const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // _id?: Object,
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
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
       required:true
    },
    isVisible:{
        type:Boolean,
        default:true
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;



// {
//     "name":{
//         "firstName":"abc",
//         "lastName":"xyz"
//     },
//     "address":{
//         "name":"abc",
//         "houseNo":123,
//         "landmark":"Op",
//         "city":"Mumbai",
//         "state":"Maharashtra",
//         "country":"INDIA"
//      },
//     "phone":9876543210,
//     "email":"abc@email.com",
//     "gender":"Male",
//     "age":21
//     }