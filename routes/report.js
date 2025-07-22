const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/customer-report', isAuthenticated, reportController.customerReport);
//router.get('/products', isAuthenticated, productController.list);
router.get('/sales-report', isAuthenticated, reportController.salesReport);
router.get('/stock-report', isAuthenticated, reportController.stockReport);

module.exports = router;
