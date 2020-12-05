const Room = require('../models/room');
const Booked =require('../models/booked');

module.exports.getRooms = async function(){
    const rooms = await Room.find();
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
module.exports.getRoomById = async function(id){
    const room = await Room.findById(id);
    return room;
}

module.exports.getBookedRooms = async function(){
    const bookedRooms = await Room.find({"isBooked":true});
    return bookedRooms;  
}

module.exports.getAvailableRooms = async function(){
    const availableRooms = await Room.find({"isBooked":false});
    return availableRooms;  
}

module.exports.getAvailableRoomsByType = async function(type){
    const availableRooms = await Room.find({"roomType":type});
    return availableRooms;  
}

// module.exports.getAvailableRoomsByDate = async function(date1, date2){
//     const availableRooms = await Room.find({  });
//     return availableRooms;  
// }