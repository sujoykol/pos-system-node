const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/categories', isAuthenticated, categoryController.list);
router.get('/categories/add', isAuthenticated, categoryController.getAdd);
router.post('/categories/add', isAuthenticated, categoryController.postAdd);
router.get('/categories/edit/:id', isAuthenticated, categoryController.getEdit);
router.post('/categories/edit/:id', isAuthenticated, categoryController.postEdit);
router.get('/categories/delete/:id', isAuthenticated, categoryController.delete);

module.exports = router;
