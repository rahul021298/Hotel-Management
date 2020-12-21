const { response } = require('express');
const Booked = require('../models/booked');
const bookingSchema = require('../models/booking');

module.exports.getBookedRooms = async function(){
    const bookeds = await Booked.find();
    var arr = [];
    for(var i=0;i<bookeds.length;i++){
        arr.push(await bookingSchema.findById(bookeds[i]._id));
    }
    let bookedRooms;
    if(arr == null){
        console.log("No");
    }else{
      for(var i=0;i<arr.length;i++){
          console.log(arr);
            for(var j=0;j<arr[i].room.length;j++)
            bookedRooms.push(await Room.findById(arr[i].room[j]));
        }
    }
    return bookedRooms;  
}

module.exports.getCurrentBookedRooms = async function(req, res, next){
    return(await Booked.find());
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