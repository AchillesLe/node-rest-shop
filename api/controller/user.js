const config = require("../../config.json")
const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_signup = (req,res,next)=>{
    User.find({email:req.body.email}).then(result=>{
        if( result.length == 1){
            return res.status(409).json({
                message : "Email Exists !"
            });
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        message : err.message
                    });
                }
                else{
                    let user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        email : req.body.email,
                        password : hash
                    });
                    user.save().then(result=>{
                        return res.status(201).json({
                            message : "Created  user success !",
                            data : result
                        });
                    }).catch(err=>{
                        return res.status(500).json({
                            message : err.message
                        });
                    });
                }
            })
        }
    }).catch(err=>{
        return res.status(500).json({
            message : err.message
        });
    });
}
exports.user_login = (req,res,next)=>{
    User.find({email:req.body.email}).then(result=>{
        if( result.length == 0 ){
            return res.status(401).json({
                message : "Auth failed !"
            });
        }else{
            bcrypt.compare(req.body.password, result[0].password , (err,result2)=>{
                if(err){
                    return res.status(401).json({
                        message : "Auth failed !"
                    });
                }
                if(result2 == true){
                    let token = jwt.sign(
                    {  email: result[0].email , userId :  result[0]._id } , 
                    config.env.JWT_KEY ,
                    { expiresIn : "1h" });

                    return res.status(200).json({
                        message : "Auth successful !",
                        token :token
                    });
                }else{
                    return res.status(401).json({
                        message : "Auth failed !"
                    });
                }
            });
        }
    }).catch(err=>{
        return res.status(500).json({
            message : err.message
        });
    });
}
exports.user_delete = (req,res,next)=>{
    let id = req.params.userId;
    let userId = req.userData.userId;
    console.log(req.userData); 

    if(id == userId){
        return res.status(202).json({
            message : "Can not delete yourself !"
        });
    }

    User.remove( { _id : id} ).exec().then(result=>{
        if( result.n == 0){
            return res.status(202).json({
                message : "Not found !"
            });
        }
        return res.status(202).json({
            message : "User deleted !"
        });
    }).catch(err=>{
        return res.status(500).json({
            message : err.message
        });
    });
}