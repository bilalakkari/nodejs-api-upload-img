const express = require('express');

const productsController = require('../controllers/profile');

const storage = require('../helpers/storage');

const router = express.Router();

// PRODUCTS - CRUD OPERATIONS
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductsId);
router.post('/', storage, productsController.postProducts);
router.put('/:id', storage, productsController.updateProducts);
router.delete('/:id', storage, productsController.deleteProducts);

module.exports = router;