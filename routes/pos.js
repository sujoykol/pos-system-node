const express = require('express');
const router = express.Router();
const posController = require('../controllers/posController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/pos',isAuthenticated, posController.viewPOS);
router.post('/pos/add-to-cart',isAuthenticated, posController.addToCart);
router.post('/pos/remove-from-cart',isAuthenticated, posController.removeFromCart);
router.post('/pos/update-cart',isAuthenticated, posController.updateCartQty);
router.get('/pos/get-cart',isAuthenticated, posController.getCart);
router.post('/pos/checkout',isAuthenticated,  posController.checkout);




module.exports = router;
