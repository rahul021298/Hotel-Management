const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const fs = require('fs');
const emailService = require('./../controllers/emailSetup');
const bcrypt = require('bcrypt');
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
    address:{
        name:{
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
    loggedInToken:{
        type:String
    },
    isVisible:{
        type:Boolean,
        default:true
    },
    passwordChangedAt: {
        type: Date,
        select: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});
UserSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew)
        return next();
    this.passwordChangedAt = Date.now() - 1000;
    //this -1000 means that removing 1 second from current time stamp since, in practical the tokenis created before the password change
    // and so while logging in, code will return false while comparing the timestamps and hence no login possible
    next();
})
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
})
UserSchema.post('save', async function(doc,next){
    const footer = await fs.readFileSync(`${__dirname}/welcomeMail.html`, 'utf8');
    const mailData={
        from: 'rahotels0212@gmail.com',
        to: `${doc.email}`,
        subject: 'Welcome!',
        html: `<h1>Hello ${doc.name.firstName} ${doc.name.lastName}, <br>Its glad to have you here!</h1>${footer}`
        };
    emailService.sendEmail(mailData);
    next();
})
UserSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};
UserSchema.methods.creatPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + (10 * 60 * 1000);
    return resetToken;
}
const User = mongoose.model('user', UserSchema);
module.exports = User;



// {
//     "name":{
//         "firstName":"abc",
//         "lastName":"xyz"
//     },
//     "username":"abc",
//     "password":"abc",
//     "confirmPasword":"abc",
//     "address":{
//         "Pincode":012345
//         "city":"Mumbai",
//         "state":"Maharashtra",
//         "country":"INDIA"
//      },
//     "phoneNumber":9876543210,
//     "email":"abc@email.com",
//     "gender":"Male",
//     "age":21
// }