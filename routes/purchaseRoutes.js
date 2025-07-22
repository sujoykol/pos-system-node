const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const upload = require('../middlewares/uploadinvoice');

router.get('/purchases/add', purchaseController.getAddPurchase);
router.post('/purchases/add', upload.single('invoice_image'), purchaseController.postAddPurchase);
router.get('/purchases', purchaseController.listPurchases);

module.exports = router;

