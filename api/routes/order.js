const express = require('express');
const route = express.Router();
const checkAuth = require('../middelware/check-auth');
const orderController = require('../controller/orders');

//===== get all order
route.get('/', checkAuth , orderController.orders_get_all );
//===== get order by id
route.get('/:orderId', checkAuth , orderController.orders_get_by_ID);
//===== create order
route.post('/', checkAuth , orderController.orders_create);
// route delete order
route.delete('/:orderId', checkAuth, orderController.orders_delete);

module.exports = route;