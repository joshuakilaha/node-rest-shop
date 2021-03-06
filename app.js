const  express = require('express');
const  app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./API/routes/products');
const orderRouters = require('./API/routes/orders');
const userRouters = require('./API/routes/users');

mongoose.Promise = global.Promise;

//connecting to database
mongoose.connect('mongodb+srv://node-rest-shop:' +
    process.env.MONGO_ATLAS_PW +
    '@node-rest-shop-8fkpg.mongodb.net/test?retryWrites=true&w=majority',
    {
    auth: {
        user:'node-rest-shop',
        password:'4G42UOh1vYX8gAen' },
        useCreateIndex: true,
        useNewUrlParser:true

}, function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Test on Postman');
});


app.use(morgan('dev'));

//making a folder statically available
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// PREVENTING CORS (security mechanism for the browser) ERRORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//Routes that handle requests
app.use('/products',productRoutes);
app.use('/orders', orderRouters);
app.use('/users',userRouters);

//Error Handling
app.use( function(req,res,next){
   const error = new  Error('Not Found');
   error.status = 404;
   next(error);
});

//Other Errors
app.use( function(error, req,res){
   res.status(error.status|| 500);
   res.json({
       error: {
           message: error.message
       }
   });
});

module.exports = app;
