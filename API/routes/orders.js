const express = require('express');
const router = express.Router();
const checkAuth = require('../Auth/check-auth');


///importing controllers for Orders
const OrdersController = require ('../contollers/orders');

router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth,OrdersController.orders_create);

router.get('/:orderId',checkAuth, OrdersController.Find_Order) ;

router.delete('/:orderId',checkAuth, OrdersController.Delete_Order );

module.exports = router;


