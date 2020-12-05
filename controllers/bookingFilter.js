const express = require('express');
const router = express.Router();
const bookingSchema = require('./../models/booking');
const availableRoomSchema = require('./../models/availableRoom');
const bookedSchema = require('./../models/booked');
const roomSchema = require('./../models/room'); 
router.post('/makingBookingFilter', async function(req, res, next){
    const roomRequest = req.body;
    const availableRooms = await availableRoomSchema.find();
    // console.log(availableRooms.length);
    var availableRoomsByType=[];
    // console.log(availableRoomsByType.length);
    for(var i=0;i<availableRooms.length;i++){
        availableRoomsByType.push(await roomSchema.findOne({ $and:[{ roomType: roomRequest.roomType},{_id: availableRooms[i].room}]}));
    }
    res.json(availableRoomsByType);
    var guestsCheck=false; 
    if(availableRoomsByType[0] != null){
        const myRoom = await roomSchema.findById(availableRoomsByType[0]._id);
        if(myRoom.roomType=="Deluxe")
            if((roomRequest.guests.noOfChild+roomRequest.guests.noOfAdults)<=(4*roomRequest.noOfRooms))
                guestsCheck=true;      
        else if(myRoom.roomType=="Standard")
            if(roomRequest.guests.noOfChild<= roomRequest.noOfRooms && roomRequest.guests.noOfAdults<=2 * roomRequest.noOfRooms)
                guestsCheck=true;
        if(roomRequest.checkIn<roomRequest.checkOut && roomRequest.checkIn>=getDate() && roomRequest.checkOut>getDate() && roomRequest.checkOut!=roomRequest.checkIn){
            const t=await bookingSchema.create({user: roomRequest.user, room:myRoom._id, checkIn: roomRequest.checkIn, checkOut: roomRequest.checkOut, roomType: roomRequest.roomType, guests:roomRequest.guests, noOfRooms:roomRequest.noOfRooms,noOfNights: roomRequest.noOfNights}) ;
            if(roomRequest.checkIn==getDate()){
                await bookedSchema.create({user: roomRequest.user, booking: t._id});
                await availableRoomSchema.findOneAndDelete({room: myRoom._id});
                console.log("Booked for today!");
            }
        }else{
            console.log("Date Error!");
        }
    }
    next();
});

function getDate(){
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    }
    today = dd+'-'+mm+'-'+yyyy;
    return(today); 
}
module.exports.updateAllRooms = async function(){
    const bookedRooms = await bookedSchema.find();
    for(var i=0;i<bookedRooms.length;i++){
        const bookingReference = await bookingSchema.findById(bookedRooms[i].booking);
        if("04-12-2020"==getDate()){
            console.log(bookingReference)
        //    for(var j=0;j<bookingReference.room.length;j++){
        //       await availableRoomSchema.create({room: bookingReference.room[j]});
        //    }
        await availableRoomSchema.create({room: bookingReference.room});
        await bookedSchema.findByIdAndDelete(bookedRooms[i]._id);
           console.log("Check out done..!!");
        }
    }
    if(bookedRooms.length==0)
        console.log("No Checkouts!!")
}
// module.exports = router;