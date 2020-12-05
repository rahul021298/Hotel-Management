const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookedSchema = new Schema({
    //user info will be retrived from SESSION
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    //room info retrived from Room Type and roomNo would be allocated by the system..
    // room:[{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'room',
    //     required: true
    // }],
    booking:{
        type: mongoose.Schema.ObjectId,
        ref: 'booked',
        required: true
    },
    isVisible:{
        type:Boolean,
        default:true
    }
});

const Booked = mongoose.model('booked', BookedSchema);
module.exports = Booked;






// {
// "username":"shubham",
// "custName":"Shubham Adamane",
// "checkIn":"2019-12-02",
// "checkOut":"2019-12-04",  
// "noOfNights":2,
// "guests":{
//     "noOfChild":0,
//     "noOfAdults":2
// },
// "noOfRooms":1,
// "roomNo":101,
// "isBooked":false,
// "roomType":"Deluxe"
// }