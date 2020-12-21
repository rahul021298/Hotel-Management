const Room = require('../models/room');
const Booked =require('../models/booked');
const availableRoomSchema = require('./../models/availableRoom');
const bookingSchema = require('../models/booking');
module.exports.getRooms = async function(){
    const rooms = await Room.find();
    console.log("in controller");
    return rooms;
}

module.exports.insertRooms = async function(data){
    await Room.create(data);    
}

module.exports.updateRooms = async function(id, data){
    const updatedRoom = await Room.findByIdAndUpdate(id, data);
    return updatedRoom;
}

module.exports.deleteRooms = async function(id){
    const deletedRoom = await Room.findByIdAndRemove(id);
    return deletedRoom;
}

module.exports.getAvailableRoomsByType = async function(roomRequestType){
    const availableRooms = await availableRoomSchema.find();
    var availableRoomsByType=[]; var temp;
    for(var i=0;i<availableRooms.length;i++){
        temp=await Room.findOne({ $and:[{ roomType: roomRequestType},{_id: availableRooms[i].room}]});
        if(temp!=null)
            availableRoomsByType.push(temp);
    }
    return(availableRoomsByType);
}
module.exports.getBookedRooms = async function(){
    const bookeds = await Booked.find().populate('room');
    // let arr = [];
    // for(var i=0;i<bookeds.length;i++){
    //     arr.push(await bookingSchema.findById(bookeds[i]._id));
    // }
    // let bookedRooms;
    // for(var i=0;i<arr.length;i++){
    //     for(var j=0;j<arr[i].room.length;j++)
    //         bookedRooms.push(await Room.findById(arr[i].room[j]));
    // }
    return bookeds;  
}

module.exports.getAvailableRooms = async function(){
    const availableRooms = await availableRoomSchema.find().populate('room');
    // let arr = [];
    // for(var i=0;i<availableRooms.length;i++){
    //     arr.push(await Room.findById(availableRooms[i]._id));
    // }
    // console.log(arr);
    // console.log(availableRooms);
    return availableRooms;  
}