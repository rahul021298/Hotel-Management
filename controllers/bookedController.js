const Booked = require('../models/booked');

module.exports.getBookedRooms = async function(){
    const rooms = await Booked.find();
    return rooms;
}

module.exports.getCurrentBookedRooms = async function(){
    const rooms = await Booked.find({isBooked:true});
    return rooms;
}

module.exports.insertBookedRooms = async function(data){
    await Booked.create(data);    
}

module.exports.updateBookedRooms = async function(id, data){
    const updatedRoom = await Booked.findByIdAndUpdate(id, data);
    return updatedRoom;
}

module.exports.deleteBookedRooms = async function(id){
    const deletedRoom = await Booked.findByIdAndRemove(id);
    return deletedRoom;
}

// module.exports.getBookedRooms = async function(){
//     const bookedRooms = await Room.find({"isBooked":true});
//     return bookedRooms;  
// }

// module.exports.getAvailableRooms = async function(){
//     const availableRooms = await Room.find({"isBooked":false});
//     return availableRooms;  
// }

// module.exports.getAvailableRoomsByType = async function(type){
//     const availableRooms = await Room.find({"roomType":type});
//     return availableRooms;  
// }

// module.exports.getAvailableRoomsByDate = async function(type){
//     const availableRooms = await Room.find({"roomType":type});
//     return availableRooms;  
// }