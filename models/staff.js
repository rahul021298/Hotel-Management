const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
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
    salary:{
        type:Number,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    doj:{
        type:Date,
        default:Date()
        // required:true
    },
    designation:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    isVisible:{
        type:Boolean,
        default:true
    }
});

const Staff = mongoose.model('staff', StaffSchema);
module.exports = Staff;

// "name":{
//     "firstName":"Paresh",
//     "lastName":"Lachhani",
//  },
// "address":{
//     "name":"abc",
//     "houseNo":123,
//     "landmark":"xyz",
//     "city":"Mumbai",
//     "state":"Maharashtra",
//     "country":"INDIA"
// },
// "phone":9876543210,
// "email":"abc@email.com",
// "gender":"Male",
// "age":21,
// "salary:25000,
// "qualification":"B.E",
// "doj":Date(),
// "designation":"Head Of Restaurant"