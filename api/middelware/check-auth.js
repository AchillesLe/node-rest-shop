const config = require("../../config.json")
const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    try{
        let token = req.headers.token;
        let decode =  jwt.verify( token , config.env.JWT_KEY);
        req.userData = decode;
        next();
    }catch(error){
        res.status(401).json({
            message : "Auth failed !"
        });
    };
    
}