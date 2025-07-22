const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

router.get('/products', isAuthenticated, productController.list);
router.get('/products/add', isAuthenticated, productController.getAdd);
router.post('/products/add', isAuthenticated, upload.single('image'), productController.postAdd);
//router.post('/products/add', isAuthenticated, productController.uploadMiddleware, productController.createProduct);
router.get('/products/edit/:id', isAuthenticated, productController.getEdit);
router.post('/products/edit/:id', isAuthenticated, upload.single('image'), productController.postEdit);
router.get('/products/delete/:id', isAuthenticated, productController.delete);

module.exports = router;
