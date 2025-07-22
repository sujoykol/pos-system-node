const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.get('/', supplierController.list);
router.get('/add', supplierController.showAdd);
router.post('/add', supplierController.add);
router.get('/edit/:id', supplierController.showEdit);
router.post('/edit/:id', supplierController.edit);
router.get('/delete/:id', supplierController.delete);

module.exports = router;
