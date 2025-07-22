const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/change-password', isAuthenticated, authController.getChangePassword);
router.post('/change-password', isAuthenticated, authController.postChangePassword);


module.exports = router;