const express = require('express');
const app = express();
const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');

app.use(bodyParser.urlencoded( {extended:false } ) );
app.use(bodyParser.json());

mongoose.connect("mongodb://Achilles:haithanhf1@ds039778.mlab.com:39778/noderestshop" , { useNewUrlParser: true });
var conn = mongoose.connection;   

app.use( (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(res.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,PATCH");
    }
    next();
});

app.use('/products' , productRoutes);
app.use('/orders' , orderRoutes);
// route
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