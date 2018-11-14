const mongoose = require('mongoose');
const Product = require('../model/product');

exports.products_get_all = (req,res,next)=>{
    Product.find().select('_id name price image').then(results=>{
        let response = {
            count : results.length,
            data : results.map(result=>{
                return {
                    id : result._id,
                    price : result.price,
                    name : result.name,
                    image : result.image,
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
}
exports.products_get_by_ID = (req,res,next)=>{
    try{
        let id = req.params.id;
        let responseProduct = Product.findById({_id:id}).then(result=>{
            let response = {
                message:'Get value success !',
                data:{
                    id : result._id,
                    price : result.price,
                    name : result.name,
                    image : result.image,
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
}
exports.products_create = (req,res,next)=>{
    let product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        image : req.file.path
    });
    product.save().then(result=>{
        let response = {
            message:'Insert successfully !',
            data:{
                id : result._id,
                price : result.price,
                name : result.name,
                image: result.image,
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
}
exports.products_update = (req,res,next)=>{
    try{
        let id = req.params.id;
        let newname = req.body.name;
        let newprice = req.body.price;
        let newImage = req.body.image;
        Product.update( { _id : id },{ $set:{ name :newname , price : newprice , image : newImage} } ).then(result=>{
            let response = {
                message:'Update success !',
                data:{
                    id : result._id,
                    price : result.price,
                    name : result.name,
                    image : result.image,
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
}
exports.products_delete = (req,res,next)=>{
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
}