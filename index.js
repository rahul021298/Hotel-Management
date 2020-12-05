const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouter');
const staffRoutes = require('./routes/staffRouter');
const roomRoutes = require('./routes/roomRouter');
const bookedRoutes = require('./routes/bookedRouter');
const bookingFilter = require('./controllers/bookingFilter');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://dbAdmin:dbAdmin@cluster0.skcsw.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
// mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use('/staff', staffRoutes);
app.use('/room', roomRoutes);
app.use('/booked', bookedRoutes);
// app.use(bśookingFilter);

app.listen(3000, function(){
    console.log("listening to 3000");
});
setInterval(function(){
    bookingFilter.updateAllRooms();
}, 10000);