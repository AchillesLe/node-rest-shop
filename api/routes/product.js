const express = require('express');
const route = express.Router();
const checkAuth = require('../middelware/check-auth');
const productController = require('../controller/product');

const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads/');
    },filename :function(req,file,cb){
        let d = new Date();
        let datestring = d.getDate()  + "" + (d.getMonth()+1) + "" + d.getFullYear() + "" + d.getHours() + "" + d.getMinutes()+ "" + d.getSeconds() ;
        cb(null,'FILE_'+ datestring + "." + file.originalname.split('.').pop());
    }
});
const fileFilter = (req,file,cb)=>{
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
const upload = multer({ storage : storage ,
                        limits:{
                            fieldSize:1027*1024*5
                        },
                        fileFilter :fileFilter
                });
//==========================================get all
route.get('/', checkAuth , productController.products_get_all );
//==========================================get by id
route.get('/:id',checkAuth , productController.products_get_by_ID );
//==========================================update===============================
route.post('/:id', checkAuth , productController.products_update );
//==========================================create===============================
route.post('/' , checkAuth ,  upload.single('image'), productController.products_create );
//==========================================delete===============================
route.delete('/:id', checkAuth , productController.products_delete );


module.exports = route;