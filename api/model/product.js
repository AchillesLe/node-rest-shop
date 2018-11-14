var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: {type :String , required : true},
    price: {type :Number , required : true},
    image :{type :String ,required :true}
});
module.exports = mongoose.model('Product',ProductSchema);