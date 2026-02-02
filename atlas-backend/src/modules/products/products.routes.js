const express = require('express');
const router = express.Router();
const productsController = require('./products.controller');
const { verifyToken, authorizeRoles } = require('../../middleware/auth');


// Create Product - Admin/Super Admin only
router.post('/', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN'), productsController.createProduct);

// Get Products - Admin/Super Admin/Seller
router.get('/', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN', 'SELLER'), productsController.getProducts);

// Update Product - Admin/Super Admin only
router.patch('/:id', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN'), productsController.updateProduct);


module.exports = router;
