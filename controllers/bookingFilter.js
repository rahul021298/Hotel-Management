const express = require('express');
const router = express.Router();
const roomController = require('./roomController');
const bookingSchema = require('./../models/booking');
const availableRoomSchema = require('./../models/availableRoom');
const bookedSchema = require('./../models/booked');
const roomSchema = require('./../models/room'); 
router.post('/makingBookingFilter', async function(req, res, next){
    const roomRequest = req.body;
    var guestsCheck=false; 
    var myRoom; var myRooms=[]; var availableRoomsByType=[];
    if(availableRoomSchema.findOne()!=null){
        if(roomRequest.roomType.noOfDeluxe>=1)
            if((roomRequest.guests.noOfChild+roomRequest.guests.noOfAdults)<=(4*roomRequest.roomType.noOfDeluxe))
                guestsCheck=true;      
        else if(roomRequest.roomType.noOfStandard>=1)
            if(roomRequest.guests.noOfChild<= roomRequest.roomType.noOfStandard && roomRequest.guests.noOfAdults<=2 * roomRequest.roomType.noOfStandard)
                guestsCheck=true;
        if(roomRequest.checkIn<roomRequest.checkOut && roomRequest.checkIn>=getDate() && roomRequest.checkOut>getDate() && roomRequest.checkOut!=roomRequest.checkIn){//remove checkout>getDate to reduce complexity
            if(roomRequest.checkIn==getDate()){
                if(roomRequest.roomType.noOfStandard>=1){
                    availableRoomsByType= await roomController.getAvailableRoomsByType("Standard");
                    console.log(availableRoomsByType);
                    if(availableRoomsByType.length>0){
                        for(var r=0;r<roomRequest.roomType.noOfStandard && r<availableRoomsByType.length;r++){
                            myRoom = await roomSchema.findById(availableRoomsByType[r]._id);
                            myRooms.push(myRoom._id);
                        }
                        console.log("Standard Rooms checked");
                    }else{
                        console.log("No Standard Rooms");
                    }
                }
                console.log("Standard Rooms: ");
                console.log(myRooms);
                if(roomRequest.roomType.noOfDeluxe>=1){   // || roomRequest.roomType.noOfDeluxe==1){
                    availableRoomsByType=await roomController.getAvailableRoomsByType("Deluxe");
                    console.log(availableRoomsByType);
                    if(availableRoomsByType.length>0){
                    for(var r=0;r<roomRequest.roomType.noOfStandard && r<availableRoomsByType.length;r++){
                        myRoom = await roomSchema.findById(availableRoomsByType[r]._id);
                        myRooms.push(myRoom._id);
                    }
                    console.log("Deluxe Rooms checked");
                }else{
                    console.log("No Deluxe Rooms checked");
                }
                }
                console.log("All Rooms:")
                console.log(myRooms);
                // Booking confirmation:
                var tempCost; stdPrice=0, delPrice=0;
                for(var p=0;p<myRooms.length;p++){
                    tempCost = await roomSchema.findById(myRooms[p]);
                    if(tempCost.roomType=="Standard")
                        stdPrice+=tempCost.roomPrice;
                    else if(tempCost.roomType=="Deluxe")
                        delPrice+=tempCost.roomPrice;
                }
                if(roomRequest.roomType.noOfDeluxeNights==null){
                    roomRequest.roomType.noOfDeluxeNights=1;
                }if(roomRequest.roomType.noOfStandardNights==null){
                    roomRequest.roomType.noOfStandardNights=1;
                }
                delPrice=delPrice*(roomRequest.roomType.noOfDeluxeNights);
                stdPrice=stdPrice*(roomRequest.roomType.noOfStandardNights);
                console.log(delPrice);console.log(stdPrice);
                delPrice+=(0.18*delPrice);  stdPrice+=(0.12*stdPrice);
                var totalPrice={delPrice, stdPrice};
                console.log(totalPrice);
                // const t=await bookingSchema.create({user: roomRequest.user, room:myRooms, checkIn: roomRequest.checkIn, checkOut: roomRequest.checkOut, roomType: roomRequest.roomType, guests:roomRequest.guests,noOfNights: roomRequest.noOfNights, totalPrice: totalPrice});
                // await bookedSchema.create({user: roomRequest.user, booking: t._id});
                // await availableRoomSchema.findOneAndDelete({room: myRoom._id});
            }
        }else{
            console.log("Date Error!");
        }
    }else{
        console.log("No rooms, We are over booked!");
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
module.exports = router;