const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Order list
router.get('/order',isAuthenticated,  orderController.listOrders);

// Order detail view
router.get('/orderview/:id',isAuthenticated, orderController.viewOrder);
router.get('/orderpdf/:id/download',isAuthenticated, orderController.downloadInvoice);

module.exports = router;
