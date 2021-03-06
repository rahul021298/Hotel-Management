const express = require('express');
const router = express.Router();
const roomController = require('./roomController');
const bookingSchema = require('./../models/booking');
const availableRoomSchema = require('./../models/availableRoom');
const bookedSchema = require('./../models/booked');
const roomSchema = require('./../models/room'); 
const userSchema = require('./../models/user');
const emailService = require('./emailSetup');
const authController = require('./authController');
const { findOne } = require('./../models/availableRoom');

router.post('/makingBookingFilter', async function(req, res, next){
    req.body.roomType={"noOfDeluxe":0, "noOfStandard":0};
    req.body.guests={"noOfAdults":0, "noOfChild":0}
    // console.log(req.body);
    // console.log(req.body.user);
    var user;
    if(req.body.token!=null){
        user = await userSchema.findOne({loggedInToken:req.body.token});
        req.body.user=user._id;
    }else{
        return res.json({message:"not lagged in"})
    }
    console.log("in booking filter");
    var roomRequest = req.body;
    console.log(roomRequest);
    var guestsCheck=false; 
    var myRoom; var myRooms=[]; var availableRoomsByType=[];
    // roomRequest.roomType.noOfDeluxe = 0; 
    // roomRequest.roomType.noOfStandard=0;
    if(roomRequest.noOfDeluxe>=1){
        roomRequest.roomType.noOfDeluxe=roomRequest.noOfDeluxe;
        roomRequest.guests.noOfAdults=2;
        roomRequest.guests.noOfChild=0;
    }
    else{
        roomRequest.roomType.noOfDeluxe=0;
        roomRequest.guests.noOfAdults=0;
        roomRequest.guests.noOfChild=0;
    }
        
    if(roomRequest.noOfStandard>=1){
        roomRequest.roomType.noOfStandard=roomRequest.noOfStandard;
        roomRequest.guests.noOfAdults=4;
        roomRequest.guests.noOfChild=0;
    }
    else{
        roomRequest.roomType.noOfStandard=0;
        roomRequest.guests.noOfAdults=4;
        roomRequest.guests.noOfChild=0;
    }    
    console.log(roomRequest);
    if(await availableRoomSchema.findOne()!=null){
        if(roomRequest.roomType.noOfDeluxe>=1)
            if((roomRequest.guests.noOfChild+roomRequest.guests.noOfAdults)<=(4*roomRequest.roomType.noOfDeluxe))
                guestsCheck=true;
        else if(roomRequest.roomType.noOfStandard>=1)
            if(roomRequest.guests.noOfChild<= roomRequest.roomType.noOfStandard && roomRequest.guests.noOfAdults<=2 * roomRequest.roomType.noOfStandard)
                guestsCheck=true;
        if(getMyDateFormat(roomRequest.checkIn)<getMyDateFormat(roomRequest.checkOut) && getMyDateFormat(roomRequest.checkIn)>=getMyDateFormat() && getMyDateFormat(roomRequest.checkOut)>getMyDateFormat() && getMyDateFormat(roomRequest.checkOut)!=getMyDateFormat(roomRequest.checkIn)){//remove checkout>getDate to reduce complexity
            // if(getMyDateFormat(roomRequest.checkIn)==getMyDateFormat()){
                if(roomRequest.roomType.noOfStandard>=1){
                    availableRoomsByType= await roomController.getAvailableRoomsByType("Standard");
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
                if(roomRequest.roomType.noOfDeluxe>=1){   // || roomRequest.roomType.noOfDeluxe==1){
                    availableRoomsByType=await roomController.getAvailableRoomsByType("Deluxe");
                    if(availableRoomsByType.length>0){
                    for(var r=0;r<roomRequest.roomType.noOfDeluxe && r<availableRoomsByType.length;r++){
                        myRoom = await roomSchema.findById(availableRoomsByType[r]._id);
                        myRooms.push(myRoom._id);
                    }
                    console.log("Deluxe Rooms checked");
                }else{
                    console.log("No Deluxe Rooms checked");
                }
                }
                console.log("All Rooms:");
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
                roomRequest.noOfNights=(calculateNumberOfNights(new Date(roomRequest.checkIn), new Date(roomRequest.checkOut)));
                delPrice=delPrice*(roomRequest.roomType.noOfDeluxeNights);
                stdPrice=stdPrice*(roomRequest.roomType.noOfStandardNights);
                console.log(delPrice);console.log(stdPrice);
                delPrice+=(0.18*delPrice);  stdPrice+=(0.12*stdPrice);
                var totalPrice={delPrice, stdPrice};
                console.log(totalPrice);
                roomRequest.checkIn=getMyDateFormat(roomRequest.checkIn);
                roomRequest.checkOut=getMyDateFormat(roomRequest.checkOut);
                const t=await bookingSchema.create({user: roomRequest.user, room:myRooms, checkIn: roomRequest.checkIn, checkOut: roomRequest.checkOut, roomType: roomRequest.roomType, guests:roomRequest.guests, totalPrice: totalPrice});//noOfNights: roomRequest.noOfNights,
                if(getMyDateFormat(t.checkIn)==getMyDateFormat()){
                    console.log('today');
                    await bookedSchema.create({user: roomRequest.user, booking: t._id});
                    for(a=0;a<myRooms.length;a++){  
                        await availableRoomSchema.findOneAndDelete({room: myRooms[a]._id});
                    }
                    res.json({
                        message:"today success", 
                        bookingReference: t
                    })
                    const mailData={
                        from: 'rahotels0212@gmail.com',
                        to: user.email,
                        subject: 'We look forward to meet you soon!',
                        text: `check In now with: ${t._id}`
                        };
                    emailService.sendEmail(mailData);
                }else{
                    console.log('future');
                    res.status(200).json({
                        message:"future Bookin..", 
                        bookingReference: t
                    })
                    const mailData={
                        from: 'rahotels0212@gmail.com',
                        to: 'mvazirani01@gmail.com',
                        subject: 'We look forward to meet you soon!',
                        text: `${t}`
                        };
                    emailService.sendEmail(mailData);
                }
            // }
        }else{
            console.log("Date Error!");
        }
    }else{
        console.log("No rooms, We are over booked!");
    }
    next();
});
function getMyDateFormat(date){
    if(date==null || date=="")
        var today = new Date();
    else 
        var today = new Date(date);
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
    // if(date==null){
    //     today = mm+'-'+dd+'-'+yyyy;
    // }else{
    //     today = dd+'-'+mm+'-'+yyyy;
    // }
   today = mm+'-'+dd+'-'+yyyy;
    return(today); 
}
function calculateNumberOfNights(date1, date2) {
    return Math.round((date2-date1)/(1000*60*60*24));
}
module.exports.updateAllRooms = async function(){
    const bookedRooms = await bookedSchema.find();
    
    for(var i=0;i<bookedRooms.length;i++){
        const bookingReference = await bookingSchema.findById(bookedRooms[i].booking);
        if(getMyDateFormat()==getMyDateFormat()){ //getMyDateFormat(bookingReference.checkOut)
           for(var j=0;j<bookingReference.room.length;j++){
              await availableRoomSchema.create({room: bookingReference.room[j]});
           }
        await bookedSchema.findByIdAndDelete(bookedRooms[i]._id);
           console.log("Check out done..!!");
        }else{
            console.log("No Checkouts for today!!");    
        }
    }
    if(bookedRooms.length==0){
        console.log("No bookings!!");
    }
}

module.exports.router = router;