const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouter');
const staffRoutes = require('./routes/staffRouter');
const roomRoutes = require('./routes/roomRouter');
const bookedRoutes = require('./routes/bookedRouter');
const bookingFilter = require('./controllers/bookingFilter');
const supplierRoutes = require('./routes/supplierRouter');
const productRoutes = require('./routes/productRouter');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// var TMClient = require('textmagic-rest-client');
// const fast2sms = require('fast2sms');

const app = express();

mongoose.connect('mongodb+srv://dbAdmin:dbRahul@cluster0.skcsw.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
// mongoose.Promise = global.Promise;
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// app.get('/', function(req, res, next){
//     res.cookie('book', 'trying cookie',{
//         maxAge: 1000 * 60 * 15, // would expire after 15 minutes
//         httpOnly: true, // The cookie only accessible by the web server
//     });
//     next();
// })
app.use(bodyParser.json());
app.use(cookieParser("secret"));
app.use("/users", userRoutes);
app.use('/staff', staffRoutes);
app.use('/room', roomRoutes);
app.use('/booked', bookedRoutes);
app.use(bookingFilter.router);
app.use('/supplier', supplierRoutes);
app.use('/product', productRoutes);

app.listen(3000, function(){
    console.log("listening to 3000");
});


// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'rahotels0212@gmail.com',
//     pass: 'Rahul@123'
//   }
// });

// var mailOptions = {
//   from: 'rahotels0212@gmail.com',
//   to: 'rahulmakhija02@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
setInterval(function(){
    bookingFilter.updateAllRooms();
}, 500000000);