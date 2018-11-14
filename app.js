const config = require("./config.json");
const express = require('express');
const app = express();
const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');
const userRoutes = require('./api/routes/user');

const bodyParser = require('body-parser');

const mongoose= require('mongoose');
mongoose.connect("mongodb://Achilles:haithanhf1@ds039778.mlab.com:39778/noderestshop" , { useNewUrlParser: true });
var conn = mongoose.connection; 
// utilyti
app.use(bodyParser.urlencoded( {extended:false } ) );
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
// edit header
app.use( (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(res.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,PATCH");
    }
    next();
});
// route
app.use('/products' , productRoutes);
app.use('/orders' , orderRoutes);
app.use('/users' , userRoutes);


app.use( (req,res,next)=>{
    let error = new Error('Not found !');
    error.status = 400;
    next(error);
});

app.use( (error,req,res,next) => {
    res.status(error.status || 500 );
    res.json({
        error :{
            message : error.message
        }
    });
});
module.exports = app;