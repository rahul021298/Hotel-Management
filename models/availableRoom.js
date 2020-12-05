const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Room  = require('./room');
const roomController = require('./../controllers/roomController')
const availableRoomSchema = new Schema({
    room:{
        type: mongoose.Schema.ObjectId,
        ref: 'room',
        required: true
    },
    isVisible:{
        type:Boolean,
        default:true
    }
});
// availableRoomSchema.post('save', async function(doc, next){
//     console.log(doc._id);
//     const roomID = doc.room;
//     console.log(roomID);
//     const temp = await roomController.getRoomById(roomID);
//     console.log(temp);
//     next();
// })
const availableRoom = mongoose.model('availableRoom', availableRoomSchema);
module.exports = availableRoom;

// {
// "roomNo":001,
// "roomType":"Deluxe",
// "roomPrice":5000
// }