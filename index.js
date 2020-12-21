const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouter');
const staffRoutes = require('./routes/staffRouter');
const roomRoutes = require('./routes/roomRouter');
const bookedRoutes = require('./routes/bookedRouter');
const bookingFilter = require('./controllers/bookingFilter');
const supplierRoutes = require('./routes/supplierRouter');
const productRoutes = require('./routes/productRouter');
const paymentRoutes = require('./controllers/payment');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes/userRouter');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

app.use(bodyParser.json());
app.use(cookieParser("secret"));
app.use("/users", userRoutes);
app.use('/staff', staffRoutes);
app.use('/room', roomRoutes);
app.use('/booked', bookedRoutes);
app.use(bookingFilter.router);
app.use('/supplier', supplierRoutes);
app.use('/product', productRoutes);
app.use('/stripe', paymentRoutes);

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:'',
            description:"",
            contact:{
                name:"RA Developer"
            },
            servers:["http://localhost:3000"]
        }
    },
    apis:['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


module.exports = app.listen(3000, function(){
    console.log("listening to 3000");
});

// setInterval(function(){
//     bookingFilter.updateAllRooms();
// }, 5000);
