const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // _id?: Object,
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    name:{
        firstName:{
           type:String,
           required:true
       },
       middleName:{
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
        pincode:{
            type:Number,
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
    phoneNumber:{
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
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
})
//Following fucntion is a instance method available on each document
UserSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
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