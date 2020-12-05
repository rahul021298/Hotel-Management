const mongoose = require('mongoose');
const availableRoom = require('./availableRoom');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    // _id?: Object,
    roomNo:{
        type:Number,
        required:true
    },
    roomType:{
        type:String,
        required:true
    },
    roomPrice:{
        type:Number,
        required:true
    },
    isVisible:{
        type:Boolean,
        default:true
    },
    isBooked:{
        type:Boolean,
        default:false
    }
});
RoomSchema.post('save', async function(doc, next){
    const id = doc._id;
    await availableRoom.create({
        room: id
    })
    next(); 
})
const Room = mongoose.model('room', RoomSchema);
module.exports = Room;



// {
// "roomNo":001,
// "roomType":"Deluxe",
// "roomPrice":5000
// }