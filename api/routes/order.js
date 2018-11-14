const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const Order = require('../model/order');
const Product = require('../model/product');

//===== get all order
route.get('/',(req,res,next)=>{
    Order.find().select('_id quantity product').then(result=>{
        let response = {
            count:result.length,
            message : "get value success !",
            data : result.map(x=>{
                return {
                    _id:x._id,
                    product:x.product,
                    quantity:x.quantity,
                }
            }),
            request:{
                type:'GET',
                url:'http://localhost:3000/orders/'+x._id
            }
        };
        return res.status(200).json(response);
    }).catch(err=>{
        return res.status(500).json({
            message:err.message
        });
    });
});
//===== get order by id
route.get('/:orderId',(req,res,next)=>{
    Order.findById( {_id : req.params.orderId} ).then(result=>{
        if(result == null ){
            return res.status(404).json({
                message : "Order not found !",
            });
        }
        let response = {
            message : "get value success !",
            data :{
                id:result._id,
                product:result.product,
                quantity:result.quantity
            }
        };
        return res.status(200).json(response);

    }).catch(err=>{
        return res.status(404).json({
            message: "Order not found !"
        });
    });
});
//===== create order
route.post('/',(req,res,next)=>{
    Product.findById( {_id : req.body.productId } )
    .then(product=>{
        if(product == null){
            return res.status(404).json({
                message : "Product not found !",
            });
        }
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity : req.body.quantity,
            product : req.body.productId
        });
        return order.save();

    }).then(result=>{
        return res.status(201).json({
            message: "insert success !",
            data : {
                _id:result._id,
                product:result.product,
                quantity:result.quantity
            }
        });
    }).catch(err=>{
        return res.status(404).json({
            message : "Product not found !",
        });
    });
});
// route delete order
route.delete('/:orderId',(req,res,next)=>{
    Order.remove({_id:req.params.orderId}).then(result=>{
        return res.status(202).json({
            message:"Deleted success !"
        });
    }).catch(err=>{
        return res.status(404).json({
            message:"Order not found !"
        });
    });
});

module.exports = route;