const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/customers', isAuthenticated, customerController.list);
router.get('/customers/add', isAuthenticated, customerController.getAdd);
router.post('/customers/add', isAuthenticated, customerController.postAdd);
router.get('/customers/edit/:id', isAuthenticated, customerController.getEdit);
router.post('/customers/edit/:id', isAuthenticated, customerController.postEdit);
router.get('/customers/delete/:id', isAuthenticated, customerController.delete);
router.post('/customers/ajaxadd', customerController.addCustomer);

module.exports = router;
