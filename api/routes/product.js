const express = require('express');
const route = express.Router();
const  mongoose = require('mongoose');
const Product = require('../model/product');

//==========================================get all
route.get('/', (req , res , next)=> {

    Product.find().select('_id name price').then(results=>{
        let response = {
            count : results.length,
            data : results.map(result=>{
                return {
                    id : result._id,
                    price : result.price,
                    name : result.name,
                    request : {
                        type:'GET',
                        url :'http://localhost:3000/products/'+ result._id
                    }
                }
            })
        }
        return res.status(200).json(response);
    }).catch(error=>{
        res.status(500).json({
            message: error.message
        });
    });
});
//==========================================get by id
route.get('/:id',( req,res,next ) =>{
    try{
        let id = req.params.id;
        let responseProduct = Product.findById({_id:id}).then(result=>{
            let response = {
                message:'Get value success !',
                data:{
                    id : result._id,
                    price : result.price,
                    name : result.name,
                    request : {
                        type:'GET',
                        url :'http://localhost:3000/products/'+ result._id
                    }
                }
            }
            return res.status(200).json(response);
        })
        .catch(error=>{
            res.status(500).json({
                message: error.message
            });
        });;
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }   
});
//==========================================update===============================
route.post('/:id', (req,res,next)=>{
    try{
        let id = req.params.id;
        let newname = req.body.name;
        let newprice = req.body.price;

        Product.update( { _id : id },{ $set:{ name :newname , price : newprice} } ).then(result=>{
            let response = {
                message:'Update success !',
                data:{
                    id : result._id,
                    price : result.price,
                    name : result.name,
                    request : {
                        type:'GET',
                        url :'http://localhost:3000/products/'+ result._id
                    }
                }
            }
            return res.status(202).json(response);
        })
           .catch(error=>{
                res.status(500).json({
                    message: error.message
                });
            });
    }catch(err){
        return res.status(500).json({
            message : err.message
        });
    }
});
//==========================================create===============================
route.post('/',(req,res,next)=>{
    try{
        let product = new Product({
            _id : new mongoose.Types.ObjectId(),
            name:req.body.name,
            price:req.body.price,
        });
        product.save().then(result=>{
            let response = {
                message:'Insert successfully !',
                data:{
                    id : result._id,
                    price : result.price,
                    name : result.name,
                    request : {
                        type:'GET',
                        url :'http://localhost:3000/products/'+ result._id
                    }
                }
            }
            return res.status(202).json(response);
        }).catch(err=>{
            return res.status(500).json({
                message : err.message
            });
        });
    }catch(err){
        return res.status(500).json({
            message : err.message
        });
    }
});
//==========================================delete===============================

route.delete('/:id',(req,res,next)=>{
    try{
        let id = req.params.id;
        Product.remove({_id:id},function(err,result){
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }else{
                return res.status(500).json({
                    message: "Deleted success !"
                });
            }
        }).catch(err=>{
            return res.status(500).json({
                message : err.message
            });
        });
    }catch(err){
        return res.status(500).json({
            message:err.message
        });
    }
});


module.exports = route;