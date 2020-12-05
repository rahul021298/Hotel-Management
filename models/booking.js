const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    room:[{
        type: mongoose.Schema.ObjectId,
        ref: 'room',
        required: true
    }],
    checkIn:{
        type:Date,
        required:true
    },
    checkOut:{
        type:Date,
        required:true
    },
    roomType:{
        noOfDeluxe:{
            type:Number,
            required:true,
            default: 0
        },
        noOfDeluxeNights:{
            type:Number,
            required:true,
            default: 1
        },
        noOfStandard:{
            type:Number,
            required:true,
            default: 0
        },
        noOfStandardNights:{
            type:Number,
            required:true,
            default: 1
        }
    },  
    guests:{
        noOfChild:{
            type:Number,
            required:true
        },
        noOfAdults:{
            type:Number,
            required:true
        }
    },
    noOfRooms:{
        type:Number,
        required:true
    },
    noOfNights:{
        type:Number,
        required:true
    },
    totalPrice:{
        deluxePrice:{
            type:Number,
            default:0
        },
        standardPrice:{
            type:Number,
            default:true
        }
    },
    isVisible:{
        type:Boolean,
        default:true
    }
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;






// {
// "checkIn":"2019-12-02",
// "checkOut":"2019-12-04",  
// "noOfNights":2,
// "guests":{
//     "noOfChild":0,
//     "noOfAdults":2
// },
// "noOfRooms":1
// }